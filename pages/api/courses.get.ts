import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "database/models";

type QueryParams = {
  limit: string;
  userId: string;
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
  if (reqQuery.userId) {
    query.where.UserId = reqQuery.userId;
  }
  const courses = await Course.findAll(query);
  res.status(200).json(courses);
}
