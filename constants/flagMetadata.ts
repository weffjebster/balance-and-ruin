export type RawFlagValue = string | number | string[] | number[];

export type RawFlagMetadata = {
  /** Description of flag. this is usually less-than-human-readable */
  description: string;
  /** default value */
  default?: RawFlagValue;
  /** shorthand flag i.e. `-cg` */
  flag: string;
  /** human readable version of the flag i.e. `character_gated` */
  key: string;
  /** data type */
  type: string; //'str' | 'lower' | 'bool' | 'int' | 'float';
  /** how flags are grouped in code */
  group: string;

  /** Whether or not this option is mutually exclusive. Grouping will create options for a select. */
  mutually_exclusive_group?: string;
  allowed_values?: RawFlagValue[];
  options?: {
    min_val?: number;
    max_val?: number;
  };

  /** number of args */
  nargs?: number;
  /** the arg names (probably not relevant) */
  args?: string[] | string; //['MIN', 'MAX'] | 'COUNT' | 'PERCENT' | 'VALUE';
};
