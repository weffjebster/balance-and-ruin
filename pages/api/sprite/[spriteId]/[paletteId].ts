import { NextApiHandler } from 'next';
import { PythonShell } from 'python-shell';
import path from 'path';

export const getSprite = async (spriteId: string, paletteId: string) => {
  const directory = path.join(process.cwd(), 'WorldsCollide');
  const script = path.resolve(directory, 'graphics/tools/print_sprite.py');

  return new Promise((resolve, reject) => {
    const py = PythonShell.run(
      script,
      {
        args: [spriteId, paletteId],
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
  const { spriteId, paletteId } = req.query as Record<string, string>;
  const data = await getSprite(spriteId, paletteId);
  res.send({ data });
};

export default handler;
