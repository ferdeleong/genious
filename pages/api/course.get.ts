import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "database/models";

type QueryParams = {
  courseId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqQuery = req.query as QueryParams;
  const course = await Course.findByPk(reqQuery.courseId);
  res.status(200).json(course);
}
