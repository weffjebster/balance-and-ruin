class FlagsEncounters {
    constructor(flags) {
        this.flags = flags;

        this.randomEncounters = new Select("random_encounters", this.flags);
        this.fixedEncounters = new Select("fixed_encounters", this.flags);
        this.escapable = new Select("escapable", this.flags);

        this.randomEncountersRandom = new Slider("random_encounters_random", "-rer", 0, this.flags);
        this.randomEncounters.addSubOption(this.randomEncountersRandom);

        this.fixedEncountersRandom = new Slider("fixed_encounters_random", "-fer", 0, this.flags);
        this.fixedEncounters.addSubOption(this.fixedEncountersRandom);

        this.escapableRandom = new Slider("escapable_random", "-escr", 100, this.flags);
        this.escapable.addSubOption(this.escapableRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.randomEncounters.getFlag();
        flags += this.fixedEncounters.getFlag();
        flags += this.escapable.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.randomEncounters.readFlag();
        this.fixedEncounters.readFlag();
        this.escapable.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
