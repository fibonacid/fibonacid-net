import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  foo: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.send({
    foo: "bar",
  });
  res.end();
}

export default handler;
