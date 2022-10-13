class FlagsBosses {
    constructor(flags) {
        this.flags = flags;

        this.bossBattles = new Select("boss_battles", this.flags);
        this.mixBossesDragons = new Toggle("mix_bosses_dragons", "-bmbd", this.flags);
        this.shuffleRandomPhunbaba3 = new Toggle("shuffle_random_phunbaba3", "-srp3", this.flags);
        this.bossNormalizeDistortStats = new Toggle("boss_normalize_distort_stats", "-bnds", this.flags);
        this.bossExperience = new Toggle("boss_experience", "-be", this.flags);
        this.bossNoUndead = new Toggle("boss_no_undead", "-bnu", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.bossBattles.getFlag();
        flags += this.mixBossesDragons.getFlag();
        flags += this.shuffleRandomPhunbaba3.getFlag();
        flags += this.bossNormalizeDistortStats.getFlag();
        flags += this.bossExperience.getFlag();
        flags += this.bossNoUndead.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.bossBattles.readFlag();
        this.mixBossesDragons.readFlag();
        this.shuffleRandomPhunbaba3.readFlag();
        this.bossNormalizeDistortStats.readFlag();
        this.bossExperience.readFlag();
        this.bossNoUndead.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
