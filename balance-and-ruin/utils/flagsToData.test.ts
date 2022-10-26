import metadata from '../pages/api/flag-metadata.json';
import { flagsToData } from './flagsToData';


describe(flagsToData, () => {
  it('will transform "primitive" flags', () => {
    expect(flagsToData('-sal -sn -eu -csrp 55 100 -s sdaf -sl', metadata)).toMatchObject({
        "character_stat_random_percent": "-csrp 55 100",
        "equipable_umaro": "-eu",
        "seed": "-s sdaf",
        "spoiler_log": "-sl",
        "start_average_level": "-sal",
        "start_naked": "-sn",
    })
  });

  it('uses the mutually_exclusive_group name if available', () => {
    expect(flagsToData('-cg', metadata)).toMatchObject({
        'Game Mode': '-cg'
    })
  });

  it('will use the earliest defined mutually_exclusive flag', () => {
    expect(flagsToData('-cg -ow', metadata)).toMatchObject({
        'Game Mode': '-cg'
    })
  });

  it('will use the latest defined mutually_exclusive flag', () => {
    expect(flagsToData('-ow -cg', metadata)).toMatchObject({
        'Game Mode': '-cg'
    })
  });

  it('works with standard flags(?)', () => {
    const flags = '-cg -oa 2.2.2.2.7.7.4.10.10 -ob 30.8.8.1.1.11.8 -sc1 random -sc2 random -sal -eu -fst -brl -slr 1 5 -lmprp 75 125 -lel -srr 3 15 -rnl -rnc -sdr 1 1 -das -dda -dns -com 98989898989898989898989898 -rec1 28 -rec2 23 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2 -hmced 2 -xgced 2 -ase 2 -msl 40 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 5 -ebr 68 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -smc 3 -ieor 33 -ieror 33 -csb 1 32 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -ccsr 20 -cms -cor -crr -crvr 255 255 -ari -anca -adeh -nfps -nu -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr';
    expect(flagsToData(flags, metadata)).toMatchObject({
        "Ability Scaling": "-ase 2",
        "Boss Battles": "-bbs",
        "Chest Contents": "-ccsr 20",
        "Coliseum Opponents": "-cor",
        "Coliseum Rewards": "-crr",
        "Equipable Items": "-ieor 33",
        "Equipable Relics": "-ieror 33",
        "Escapable Encounters": "-escr 100",
        "Esper Bonuses": "-ebr 68",
        "Esper MP": "-emprp 75 125",
        "Esper Spells": "-esr 1 5",
        "Fixed Encounters": "-fer 0",
        "Game Mode": "-cg",
        "HP/MP Scaling": "-hmced 2",
        "Level Scaling": "-lsced 2",
        "Random Encounters": "-res",
        "Shop Inventory": "-sisr 20",
        "Shop Prices": "-sprp 75 125",
        "XP/GP Scaling": "-xgced 2",
        "auction_door_esper_hint": "-adeh",
        "auction_no_chocobo_airship": "-anca",
        "auction_random_items": "-ari",
        "auto_sprint": "-as",
        "boss_experience": "-be",
        "boss_no_undead": "-bnu",
        "bum_rush_last": "-brl",
        "chadarnook_more_demon": "-cmd",
        "chest_monsters_shuffle": "-cms",
        "coliseum_rewards_visible_random": "-crvr 255 255",
        "commands": "-com 98989898989898989898989898",
        "cursed_shield_battles": "-csb 1 32",
        "dances_display_abilities": "-dda",
        "dances_no_stumble": "-dns",
        "dances_shuffle": "-das",
        "doom_gaze_no_escape": "-dgne",
        "equipable_umaro": "-eu",
        "fast_swdtech": "-fst",
        "fix_boss_skip": "-fbs",
        "fix_enemy_damage_counter": "-fedc",
        "fix_evade": "-fe",
        "fix_jump": "-fj",
        "fix_retort": "-fr",
        "fix_sketch": "-fs",
        "fix_vanish_doom": "-fvd",
        "gp_mult": "-gpm 5",
        "lores_everyone_learns": "-lel",
        "lores_mp_random_percent": "-lmprp 75 125",
        "magimaster_no_ultima": "-mmnu",
        "max_scale_level": "-msl 40",
        "moogle_charm_all": "-mca",
        "mp_mult": "-mpm 5",
        "natural_magic1": "-nm1 random",
        "natural_magic2": "-nm2 random",
        "natural_magic_menu_indicator": "-nmmi",
        "no_exp_party_divide": "-nxppd",
        "no_free_paladin_shields": "-nfps",
        "no_priceless_items": "-npi",
        "no_ultima": "-nu",
        "objective_a": "-oa 2.2.2.2.7.7.4.10.10",
        "objective_b": "-ob 30.8.8.1.1.11.8",
        "original_name_display": "-ond",
        "rages_no_charm": "-rnc",
        "rages_no_leap": "-rnl",
        "random_exclude_command1": "-rec1 28",
        "random_exclude_command2": "-rec2 23",
        "random_natural_levels1": "-rnl1",
        "random_natural_levels2": "-rnl2",
        "random_natural_spells1": "-rns1",
        "random_natural_spells2": "-rns2",
        "random_rng": "-rr",
        "scale_eight_dragons": "-sed",
        "shop_dried_meat": "-sdm 4",
        "start_average_level": "-sal",
        "start_char1": "-sc1 random",
        "start_char2": "-sc2 random",
        "start_dances_random": "-sdr 1 1",
        "start_lores_random": "-slr 1 5",
        "start_moogle_charms": "-smc 3",
        "start_rages_random": "-srr 3 15",
        "stronger_atma_weapon": "-saw",
        "swdtech_runic_all": "-stra",
        "wrexsoul_no_zinger": "-wnz",
        "xp_mult": "-xpm 3"
    })
  })
});
