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
        <Card title={'SwdTech'} className="border-red-600">
          <FlagSwitch id="fast_swdtech" label="Fast SwdTech" />
          <FlagSwitch id="swdtechs_everyone_learns" label="Everyone Learns" />
        </Card>
        <Card title={'Blitz'} className="border-red-600">
          <FlagSwitch id="bum_rush_last" label="Bum Rush Last" />
          <FlagSwitch id="blitzes_everyone_learns" label="Everyone Learns" />
        </Card>
        <Card title={'Lore'} className="border-red-600">
          <FlagGroupSelect
            mutuallyExclusiveGroup={null}
            label="Starting Lores"
            nullable
            nullableLabel="Original"
            options={['start_lores_random']}
          />
          <FlagGroupSelect
            mutuallyExclusiveGroup={null}
            label="MP"
            nullable
            nullableLabel="Original"
            options={['lores_mp_shuffle', 'lores_mp_random_value', 'lores_mp_random_percent']}
          />
          <FlagSwitch id="lores_everyone_learns" label="Everyone Learns" />
        </Card>
        <Card title={'Rage'} className="border-red-600">
          <FlagGroupSelect
            mutuallyExclusiveGroup={null}
            label="Start Rages"
            nullable
            nullableLabel="Original"
            options={['start_rages_random']}
          />

          <FlagSwitch id="rages_no_leap" label="No Leap" />
          <FlagSwitch id="rages_no_charm" label="No Charm" />
        </Card>
        <Card title={'Dance'} className="border-red-600">
          <FlagRangeSlider id="start_dances_random" label="Start Dances" />

          <FlagSwitch id="dances_shuffle" label="Shuffle Abilities" />
          <FlagSwitch id="dances_display_abilities" label="Display Abilities" />
          <FlagSwitch id="dances_no_stumble" label="Enable Stumble" invert />
          <FlagSwitch id="dances_everyone_learns" label="Everyone Learns" />
        </Card>
        <Card title={'Experience, Magic Points, Gold'} className="border-red-600">
          <FlagInput id="xp_mult" label="Experience Multiplier" type="number" />
          <FlagInput id="mp_mult" label="Magic Point Multiplier" type="number" />
          <FlagInput id="gp_mult" label="Gold Multiplier" type="number" />
          <FlagSwitch id="no_exp_party_divide" label="Split Party Exp" invert />
        </Card>
        <Card title={'Bosses'} className="border-red-600">
          <FlagGroupSelect
            mutuallyExclusiveGroup={'Boss Battles'}
            label="Boss Battles"
            nullable
            nullableLabel="Original"
          />

          <FlagSwitch id="mix_bosses_dragons" label="Mix Bosses & Dragons" />
          <FlagSwitch id="shuffle_random_phunbaba3" label="Shuffle/Random Phubaba 3" />
          <FlagSwitch id="boss_normalize_distort_stats" label="Normalize & Distor" />
          <FlagSwitch id="boss_experience" label="Boss Experience" />
          <FlagSwitch id="boss_no_undead" label="Bosses Can Be Undead" invert />
        </Card>
        <Card title={'Boss AI'} className="border-red-600">
          <FlagSwitch id="doom_gaze_no_escape" label="Doom Gaze Escapes" invert />
          <FlagSwitch id="wrexsoul_no_zinger" label="Wrex Soul Zingers" invert />
          <FlagSwitch id="magimaster_no_ultima" label="MagiMaster Ultima on Death" invert />
          <FlagSwitch id="chadarnook_more_demon" label="Chadarnook More Demon" />
        </Card>
        <Card title={'Scaling'} className="border-red-600">
          <FlagGroupSelect mutuallyExclusiveGroup="Level Scaling" label="Level Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="HP/MP Scaling" label="HP/MP Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="XP/GP Scaling" label="XP/GP Scaling" nullable />
          <FlagGroupSelect mutuallyExclusiveGroup="Ability Scaling" label="Ability Scaling" nullable />
          <FlagSlider id="max_scale_level" label="Max Scale Level" />
        </Card>
        <Card title={'Encounters'} className="border-red-600">
          <FlagGroupSelect
            mutuallyExclusiveGroup="Random Encounters"
            label="Random Encounters"
            nullable
            nullableLabel="Original"
          />
          <FlagGroupSelect
            mutuallyExclusiveGroup="Fixed Encounters"
            label="Fixed Encounters"
            nullable
            nullableLabel="Original"
          />
          <FlagGroupSelect
            mutuallyExclusiveGroup="Escapable Encounters"
            label="Escapable"
            nullable
            nullableLabel="Original"
          />
        </Card>
        <Card title={'Espers'} className="border-red-600">
          <FlagGroupSelect
            mutuallyExclusiveGroup={'Esper Spells'}
            label="Spells"
            nullable
            nullableLabel="Original"
          />

          <FlagGroupSelect
            mutuallyExclusiveGroup={'Esper Bonuses'}
            label="Bonuses"
            nullable
            nullableLabel="Original"
          />

          <FlagGroupSelect mutuallyExclusiveGroup={'Esper MP'} label="MP" nullable nullableLabel="Original" />

          <FlagGroupSelect
            mutuallyExclusiveGroup={'Equipable Espers'}
            label="Equipable"
            nullable
            nullableLabel="Original"
          />

          <FlagSwitch id="esper_multi_summon" label="Multi Summon" />
        </Card>

        <Card title={'Natural Magic'} className="border-red-600">
          <FlagSelect id="natural_magic1" label="Natural Magic" nullable />
          <FlagSwitch id="random_natural_levels1" label="Randomize Levels" />
          <FlagSwitch id="random_natural_spells1" label="Randomize Spells" />

          <FlagSelect id="natural_magic2" label="Natural Magic" nullable />
          <FlagSwitch id="random_natural_levels2" label="Randomize Levels" />
          <FlagSwitch id="random_natural_spells2" label="Randomize Spells" />

          <FlagSwitch id="natural_magic_menu_indicator" label="Menu Indicator" />
        </Card>
      </dl>
      <Card title="" className="border-gray-500">
        <Flags />
      </Card>
    </div>
  );
};

export default Create;
