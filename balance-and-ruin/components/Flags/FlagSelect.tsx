import { useMemo } from 'react';
import { useFlag, useFlagContext, useMetadata } from '~/utils/useFlagContext';
import { useFlagSelect } from '~/utils/useFlagSelect';
import Select, { SelectOption } from '../Select';

type Props = {
  mutuallyExclusiveGroup: string;
  label: string;
};

// /**
//  *
//  * @param key key of mutually exclusive group
//  */
// const useSelectOptions = (key: string) => {
//   const { metadata } = useFlagContext();
//   return useMemo(
//     () =>
//       Object.values(metadata)
//         .filter((item) => item.mutually_exclusive_group === key)
//         .map(
//           (item) =>
//             ({
//               current: false,
//               description: item.description,
//               key: item.key,
//               label: item.key
//             } as SelectOption)
//         ),
//     [key, metadata]
//   );
// };

export const FlagSelect = ({ mutuallyExclusiveGroup, label }: Props) => {
  const { options, selected, setValue } = useFlagSelect(mutuallyExclusiveGroup);

  return (
    <div>
      <Select label={label} onChange={setValue} options={options} value={selected} />
    </div>
  );
};
