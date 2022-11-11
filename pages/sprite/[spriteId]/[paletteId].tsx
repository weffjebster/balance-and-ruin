import { GetServerSideProps } from 'next';
import { useEffect, useRef } from 'react';
import { getSprite } from '~/pages/api/sprite/[spriteId]/[paletteId]';
import { draw_rgb, scale_rgb } from '~/utils/rgb';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { paletteId, spriteId } = query as Record<string, string>;

  const result = await getSprite(spriteId, paletteId);
  return {
    props: {
      data: result
    }
  };
};

type SpriteProps = {
  data: number[];
  scale?: number;
};
const width = 16;
const height = 24;

const Sprite = ({ data, scale = 6 }: SpriteProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    const rgb_data = data.slice(0, -3);
    const alpha_rgb = data.slice(-3);
    const scaled_rgb_data = scale_rgb(rgb_data, scale, width, height);
    draw_rgb(scaled_rgb_data, alpha_rgb, canvas.getContext('2d'), width * scale, height * scale);
  });

  return (
    <div className="m-12 border-red-500 border-3">
      <canvas className="inline" ref={ref} width={width * scale} height={height * scale} />
    </div>
  );
};

export default Sprite;
