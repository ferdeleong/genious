import type { NextApiRequest, NextApiResponse } from "next";
import { Artifact } from "database/models";

type QueryParams = {
  limit: string;
  courseId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqQuery = req.query as QueryParams;
  const query: { [key: string]: any } = {
    where: {},
    limit: Number(reqQuery.limit ?? 20)
  };
  if (reqQuery.courseId) {
    query.where.CourseId = reqQuery.courseId;
  }
  const artifacts = await Artifact.findAll(query);
  res.status(200).json(artifacts);
}
