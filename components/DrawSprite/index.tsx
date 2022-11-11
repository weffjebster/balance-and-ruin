import { useEffect, useRef } from 'react';
import { draw_rgb, scale_rgb } from '~/utils/rgb';

type DrawSpriteProps = {
  data: number[];
  scale: number;
};

const width = 16;
const height = 24;

const DrawSprite = ({ data, scale }: DrawSpriteProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    const rgb_data = data;
    const alpha_data = data.slice(-3);
    const scaled_rgb_data = scale_rgb(rgb_data, scale, width, height);
    draw_rgb(scaled_rgb_data, alpha_data, canvas.getContext('2d'), width * scale, height * scale);
  });

  return (
    <div className="m-8 inline-block">
      <canvas className="inline" ref={ref} width={width * scale} height={height * scale} />
    </div>
  );
};

export default DrawSprite;
