import { useMemo } from 'react';
import { useFlag } from '~/utils/useFlagContext';
import { FlagGroupSelect } from '../Flags/FlagGroupSelect';
import { FlagSelect } from '../Flags/FlagSelect';
import Select, { SelectOption } from '../Select';

const COMMANDS: Record<string, number> = {
  Fight: 0,
  Item: 1,
  Magic: 2,
  Morph: 3,
  Revert: 4,
  Steal: 5,
  Capture: 6,
  SwdTech: 7,
  Throw: 8,
  Tools: 9,
  Blitz: 10,
  Runic: 11,
  Lore: 12,
  Sketch: 13,
  Control: 14,
  Slot: 15,
  Rage: 16,
  Leap: 17,
  Mimic: 18,
  Dance: 19,
  Row: 20,
  Def: 21,
  Jump: 22,
  'X Magic': 23,
  'GP Rain': 24,
  Summon: 25,
  Health: 26,
  Shock: 27,
  Possess: 28,
  MagiTek: 29,
  None: 97,
  'Random Unique': 98,
  Random: 99
};

const COMMANDS_ID_NAME = Object.entries(COMMANDS).reduce((acc, [key, value]) => {
  return { ...acc, [value]: key };
}, {});

const COMMAND_OPTIONS = Object.entries(COMMANDS).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: {
      key: value,
      label: key,
      description: key
    }
  };
}, {});

const RANDOM_COMMAND = 99;
const RANDOM_UNIQUE_COMMAND = 98;
const NONE_COMMAND = 97;

const COMMAND_OPTION_NAMES = [
  'Morph',
  'Steal',
  'SwdTech',
  'Throw',
  'Tools',
  'Blitz',
  'Runic',
  'Lore',
  'Sketch',
  'Slot',
  'Dance',
  'Rage',
  'Leap'
];

const options = COMMAND_OPTION_NAMES.map((commandName) => {
  const value = COMMANDS[commandName] || '';
  return {
    label: commandName,
    key: Number.isFinite(value) ? value : RANDOM_COMMAND
  } as SelectOption;
});

const Commands = () => {
  const [rawFlag, updateRawFlag] = useFlag('commands');
  const [flag, rawValue] = rawFlag.split(' ');

  const parsed = useMemo(() => rawValue.match(/.{1,2}/g), [rawValue]);

  const commands = COMMAND_OPTION_NAMES.map((value, idx) => {
    return {
      label: value,
      value: idx
    };
  });

  return (
    <>
      {/* {commands.map(({ label, value }) => {
        return <Select key={label} label={''} onChange={() => {}} options={options} value={null} />;
      })} */}
    </>
  );
};

export default Commands;
