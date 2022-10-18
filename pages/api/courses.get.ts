import type { NextApiRequest, NextApiResponse } from "next";
import { Course, User } from "database/models";

type QueryParams = {
  limit: string;
  email: string;
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
  if (reqQuery.email) {
    const user = await User.findOne({ where: { email: reqQuery.email } });
    if (user) {
      query.where.UserId = user?.get("id");
    }
  }
  const courses = await Course.findAll(query);
  res.status(200).json(courses);
}
