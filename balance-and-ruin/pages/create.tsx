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
      <dl className="p-4 mb-8 gap-2 grid grid-cols-1 md:grid-cols-2">
        <Card title={'Settings'} className="border-blue-200">
          <FlagInput id="seed" label="Seed" />
          <FlagGroupSelect mutuallyExclusiveGroup="Game Mode" label="Mode" />
          <FlagSwitch id="spoiler_log" label="Spoiler Log" />
        </Card>
        <Card title={'Starting Party'} className="border-blue-300">
          <FlagSelect id="start_char1" label="Starting Character 1" />
          <FlagSelect id="start_char2" label="Starting Character 2" nullable />
          <FlagSelect id="start_char3" label="Starting Character 3" nullable />
          <FlagSelect id="start_char4" label="Starting Character 4" nullable />
        </Card>
        <Card title={'Characters'} className="border-blue-400">
          <FlagSwitch id="start_average_level" label="Start Average Level" />
          <FlagSwitch id="start_naked" label="Start Naked" />
          <FlagSwitch id="equipable_umaro" label="Equipable Umaro" />
          <FlagRangeSlider id="character_stat_random_percent" label="Character Stats" />
        </Card>

        <Card title={'Scaling'} className="border-red-600">
          <FlagGroupSelect mutuallyExclusiveGroup="Level Scaling" label="Level Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="HP/MP Scaling" label="HP/MP Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="XP/GP Scaling" label="XP/GP Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="Ability Scaling" label="Ability Scaling" nullable />
          <FlagSlider id="max_scale_level" label="Max Scale Level" />
        </Card>

        <Card title={'Coliseum'} className="border-red-600">
          <FlagGroupSelect mutuallyExclusiveGroup="Coliseum Opponents" label="Opponents" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="Coliseum Rewards" label="Rewards" nullable />
          <FlagSwitch id="coliseum_rewards_menu" label="Rewards Menu" />
          <FlagSwitch id="coliseum_no_exp_eggs" label="No Exp. Eggs" />
          <FlagSwitch id="coliseum_no_illuminas" label="No Illuminas" />
        </Card>
      </dl>
      <Card title="" className="border-gray-500">
        <Flags />
      </Card>
    </div>
  );
};

export default Create;
