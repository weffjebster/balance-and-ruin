class FlagsLores {
    constructor(flags) {
        this.flags = flags;

        this.startLores = new Select("start_lores", this.flags);
        this.loreMP = new Select("lore_mp", this.flags);
        this.loreEveryoneLearns = new Toggle("lore_everyone_learns", "-lel", this.flags);

        this.startLoresRandom = new MinMaxSlider("start_lores_random", "-slr", 0, 24, this.flags);
        this.startLores.addSubOption(this.startLoresRandom);

        this.loreMPRandomValue = new MinMaxSlider("lores_mp_random_value", "-lmprv", 0, 99, this.flags);
        this.loreMP.addSubOption(this.loreMPRandomValue);

        this.loreMPRandomPercent = new MinMaxSlider("lores_mp_random_percent", "-lmprp", 100, 100, this.flags, true);
        this.loreMP.addSubOption(this.loreMPRandomPercent);
    }

    getFlags() {
        var flags = "";

        flags += this.startLores.getFlag();
        flags += this.loreMP.getFlag();
        flags += this.loreEveryoneLearns.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.startLores.readFlag();
        this.loreMP.readFlag();
        this.loreEveryoneLearns.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.loreMP.value == " -lmps") {
            this.loreMP.helpMessage = "Original MP costs shuffled between lores";
        } else if (this.loreMP.value == " -lmprv") {
            this.loreMP.helpMessage = "Each lore's MP cost set to random value within given range";
        } else if (this.loreMP.value == " -lmprp") {
            this.loreMP.helpMessage = "Each lore's MP cost set to random percent of original within given range";
        } else {
            this.loreMP.helpMessage = "";
        }
    }
}
