import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "database/models";

type ReqQuery = {
  courseId: string;
};

type ReqBody = {
  imageUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body as ReqBody;
  const reqQuery = req.query as ReqQuery;
  Course.update(reqBody, { where: { id: reqQuery.courseId } });
  res.status(200).send("ok");
}
