import { NextPage } from 'next';
import { useState } from 'react';
import Card from '~/components/Card';
import Input from '~/components/Input';
import Select, { SelectOption } from '~/components/Select';
import Textarea from '~/components/Textarea';

const logChange = (name: string, callback: (val: any) => void) => (newValue: any) => {
  console.log(`${name} changed`, newValue);
  callback(newValue);
};

const options: SelectOption[] = [
  {
    current: true,
    description: 'Events locked until characters are found',
    label: 'Character Gating'
  },
  {
    current: true,
    description: 'All events are available from the start',
    label: 'Open World'
  }
];

const Create: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(options[0]);

  return (
    <div className="mb-4">
      <div className="p-4 mb-8">
        <Card title={'Settings'}>
          <Input
            onChange={logChange('Input', setInputValue)}
            label="Seed"
            name="seed"
            placeholder="Generate Random"
            value={inputValue}
          />
          <Select label="Mode" onChange={logChange('Select', setSelectValue)} options={options} value={selectValue} />
        </Card>
      </div>
      {/* <div>
      <Card title={'Generage'}>
        <Textarea label='Flags' onChange={} />
      </Card>
      </div> */}
    </div>
  );
};

export default Create;
