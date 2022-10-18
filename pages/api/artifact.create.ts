import { Artifact, Course } from "database/models";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBodyType = {
  name: string;
  type: string;
  url: string;
  courseId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body as RequestBodyType;
  const artifact = Artifact.build(reqBody);
  const course = await Course.findByPk(reqBody.courseId);
  artifact.set("CourseId", course?.get("id"));
  await artifact.save();
  res.status(200).json(artifact);
}
