import { GetServerSideProps } from 'next';
import DrawSprite from '~/components/DrawSprite';
import { getSprite } from '~/pages/api/sprite/[spriteId]/[paletteId]';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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

const Sprite = ({ data, scale = 4 }: SpriteProps) => {
  return <DrawSprite data={data} scale={scale} />;
};

export default Sprite;
