import { NextPage } from 'next';
import 'rc-slider/assets/index.css';
import Card from '~/components/Card';
import { FlagGroupSelect } from '~/components/Flags/FlagGroupSelect';
import { Flags } from '~/components/Flags/Flags';

const Create: NextPage = () => {
  return (
    <div className="mb-4">
      <dl className="p-4 mb-8 gap-2 grid grid-cols-1 md:grid-cols-2">
        <Card title={'Debug'} className="border-pink-400">
          <FlagGroupSelect mutuallyExclusiveGroup="XP/GP Scaling" label="Mode" nullable />
        </Card>
      </dl>
      <Card title="" className="border-gray-500">
        <Flags />
      </Card>
    </div>
  );
};

export default Create;
