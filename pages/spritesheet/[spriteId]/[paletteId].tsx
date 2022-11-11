import times from 'lodash/times';
import { GetServerSideProps } from 'next';
import DrawSprite from '~/components/DrawSprite';
import { getSprite } from '~/pages/api/sprite/[spriteId]/[paletteId]';

type SpritePaletteId = {
  spriteId: string;
  paletteId: string;
};
export const getServerSideProps: GetServerSideProps<{ data: number[][] }, SpritePaletteId> = async ({
  params
}) => {
  const { spriteId = '0', paletteId = '2' } = params || {};

  const promises = times(50, (idx) => {
    return getSprite(spriteId, paletteId, idx);
  });

  const data = await Promise.all(promises);

  return {
    props: {
      data
    }
  };
};

type SpriteProps = {
  data: number[][];
};

const width = 16;

const Spritesheet = ({ data }: SpriteProps) => {
  const scale = 4;
  const itemsPerRow = 6;
  return (
    <div style={{ maxWidth: width * scale * itemsPerRow * 4 }}>
      {data.map((spriteData, idx) => (
        <DrawSprite key={idx} data={spriteData} scale={scale} />
      ))}
    </div>
  );
};

export default Spritesheet;
