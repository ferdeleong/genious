import type { NextApiRequest, NextApiResponse } from "next";
import { User, Course } from "database/models";

type RequestBodyType = {
  name: string;
  description: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body as RequestBodyType;
  const course = Course.build(reqBody);
  const user = await User.findOne({ where: { email: reqBody.email } });
  course.set("UserId", user?.get("id"));
  await course.save();
  res.status(200).json(course);
}
