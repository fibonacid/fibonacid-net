import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ip: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  res.send({
    ip: ip || "unknown",
  });
  res.end();
}

export default handler;
