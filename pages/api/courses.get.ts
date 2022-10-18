import type { NextApiRequest, NextApiResponse } from "next";
import { Course, User } from "database/models";
import { Op } from "sequelize";

type QueryParams = {
  q: string;
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
  if (!!reqQuery.q) {
    query.where = {
      [Op.or]: [
        {
          name: { [Op.substring]: reqQuery.q }
        },
        {
          description: { [Op.substring]: reqQuery.q }
        }
      ]
    };
  }
  const courses = await Course.findAll(query);
  res.status(200).json(courses);
}
