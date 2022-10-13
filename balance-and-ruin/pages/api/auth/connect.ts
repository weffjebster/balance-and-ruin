import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token_type, access_token, expires_in, scope } = req.body;

  if (!access_token) {
    return res.status(500).send({});
  }

  const { data } = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `${token_type} ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const user = {
    username: data.username,
    discordId: data.id
  };

  return res.status(200).send(user);
}
