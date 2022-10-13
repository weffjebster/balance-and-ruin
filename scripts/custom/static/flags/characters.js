class FlagsCharacters {
    constructor(flags) {
        this.flags = flags;

        this.startAverageLevel = new Toggle("start_average_level", "-sal", this.flags);
        this.startNaked = new Toggle("start_naked", "-sn", this.flags);
        this.equipableUmaro = new Toggle("equipable_umaro", "-eu", this.flags);
        this.characterStats = new MinMaxSlider("character_stats_random_percent", "-csrp", 100, 100, this.flags, true);
    }

    getFlags() {
        var flags = "";

        flags += this.startAverageLevel.getFlag();
        flags += this.startNaked.getFlag();
        flags += this.equipableUmaro.getFlag();
        flags += this.characterStats.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.startAverageLevel.readFlag();
        this.startNaked.readFlag();
        this.equipableUmaro.readFlag();
        this.characterStats.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
