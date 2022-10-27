import { NextPage } from 'next';
import 'rc-slider/assets/index.css';
import Card from '~/components/Card';
import { FlagGroupSelect } from '~/components/Flags/FlagGroupSelect';
import { FlagInput } from '~/components/Flags/FlagInput';
import { FlagRangeSlider } from '~/components/Flags/FlagRangeSlider';
import { Flags } from '~/components/Flags/Flags';
import { FlagSelect } from '~/components/Flags/FlagSelect';
import { FlagSlider } from '~/components/Flags/FlagSlider';
import { FlagSwitch } from '~/components/Flags/FlagSwitch';

const Create: NextPage = () => {
  return (
    <div className="mb-4">
      <div className="p-4 mb-8 gap-2 flex flex-col">
        <Card title={'Settings'}>
          <FlagInput id="seed" label="Seed" />
          <FlagGroupSelect mutuallyExclusiveGroup="Game Mode" label="Mode" />
          <FlagSwitch id="spoiler_log" label="Spoiler Log" />
        </Card>

        <Card title={'Starting Party'}>
          <FlagSelect id="start_char1" label="Starting Character" />
          <FlagSelect id="start_char2" label="Starting Character" nullable />
          <FlagSelect id="start_char3" label="Starting Character" nullable />
          <FlagSelect id="start_char4" label="Starting Character" nullable />
        </Card>
        
        <Card title={'Characters'}>
          <FlagSwitch id="start_average_level" label="Start Average Level" />
          <FlagSwitch id="start_naked" label="Start Naked" />
          <FlagSwitch id="equipable_umaro" label="Equipable Umaro" />
          <FlagRangeSlider id="character_stat_random_percent" label="Character Stats" />
        </Card>

        <Card title={'Scaling'}>
          <FlagSlider id="max_scale_level" label="Max Scale Level" />
        </Card>

        <Card title="">
          <Flags />
        </Card>
      </div>
    </div>
  );
};

export default Create;
