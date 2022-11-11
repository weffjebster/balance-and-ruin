import { NextApiHandler } from 'next';
import { PythonShell } from 'python-shell';
import path from 'path';

type Response = {
  palettes: Record<number, string>;
  sprites: Record<number, string>;
};

export const getSpriteFiles = async () => {
  const directory = path.join(process.cwd(), 'WorldsCollide');
  const script = path.resolve(directory, 'graphics/tools/print_sprites_and_palettes.py');

  return new Promise<Response>((resolve, reject) => {
    const py = PythonShell.run(
      script,
      {
        args: [],
        mode: 'json'
      },
      function (err) {
        if (err) reject(err);
      }
    );

    py.on('message', (data) => {
      resolve(data);
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  const data = await getSpriteFiles();
  res.send({ data });
};

export default handler;
