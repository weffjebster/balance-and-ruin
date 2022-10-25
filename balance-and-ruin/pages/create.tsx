import { NextPage } from 'next';
import Card from '~/components/Card';
import { FlagInput } from '~/components/Flags/FlagInput';
import { FlagRangeSlider } from '~/components/Flags/FlagRangeSlider';
import { Flags } from '~/components/Flags/Flags';
import { FlagSlider } from '~/components/Flags/FlagSlider';
import { FlagSwitch } from '~/components/Flags/FlagSwitch';

const Create: NextPage = () => {
  return (
    <div className="mb-4">
      <div className="p-4 mb-8 gap-2 flex flex-col">
        <Card title={'Settings'}>
          <FlagInput id="seed" label="Seed" />
          {/* <FlagSelect mutuallyExclusiveGroup="Game Mode" label="Mode" /> */}
        </Card>

        <Card title={'Characters'}>
          <FlagSwitch id="start_average_level" label="Start Average Level" />
        </Card>

        <Card title={'Scaling'}>
          <FlagSlider id="max_scale_level" label="Max Scale Level" />
          <FlagRangeSlider id="character_stat_random_percent" label="Character Stats" />
        </Card>

        <Card title="">
          <Flags />
        </Card>
      </div>
    </div>
  );
};

export default Create;
