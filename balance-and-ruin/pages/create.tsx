import { NextPage } from 'next';
import Card from '~/components/Card';
import { FlagInput } from '~/components/Flags/FlagInput';
import { FlagRangeSlider } from '~/components/Flags/FlagRangeSlider';
import { Flags } from '~/components/Flags/Flags';
import { FlagSlider } from '~/components/Flags/FlagSlider';
import { FlagSwitch } from '~/components/Flags/FlagSwitch';

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FlagSelect } from '~/components/Flags/FlagSelect';

const style = { width: 400, margin: 50 };
const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

const Create: NextPage = () => {
  return (
    <div className="mb-4">
      <div className="p-4 mb-8 gap-2 flex flex-col">
        <Card title={'Settings'}>
          <FlagInput id="seed" label="Seed" />
          <FlagSelect mutuallyExclusiveGroup="Game Mode" label="Mode" />
          <FlagSwitch id="spoiler_log" label="Spoiler Log" />
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
