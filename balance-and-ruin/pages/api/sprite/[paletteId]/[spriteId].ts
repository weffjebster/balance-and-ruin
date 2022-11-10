import { NextApiHandler } from 'next';
import { PythonShell } from 'python-shell';
import { promises as fs } from 'fs';
import path from 'path';

const handler: NextApiHandler = (req, res) => {
  const { spriteId, paletteId } = req.query as Record<string, string>;
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
        if (err) throw err;
      }
    );

    py.on('message', (chunk) => {
      res.send(chunk);
      resolve(chunk);
    });
  });
};

export default handler;
