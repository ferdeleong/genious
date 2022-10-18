import s3 from "libs/aws/s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { join } from "path";

type QueryParams = {
  courseId: string;
  fileName: string;
  fileType: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqQuery = req.query as QueryParams;
  const session = await getSession({ req });
  /*
    Format of folders in bucket:
    user@domain.com/#/file-name.ext
  */
  const filePath = join(
    session!.user.email,
    reqQuery.courseId,
    reqQuery.fileName
  );
  const signedUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.AWS_S3_BUCKET_,
    Key: filePath,
    Expires: 500, // TODO: maybe enable.
    ContentType: reqQuery.fileType,
    ACL: "public-read"
  });
  res.status(200).json({
    signedUrl,
    fileUrl: `https://${
      process.env.AWS_S3_BUCKET_
    }.s3.amazonaws.com/${encodeURI(filePath)}`
  });
}
