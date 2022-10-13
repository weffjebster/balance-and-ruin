class FlagsSteal {
    constructor(flags) {
        this.flags = flags;

        this.chances = new Select("steal_chances", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.chances.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.chances.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.chances.value === "") {
            this.chances.helpMessage = "Steal rate unmodified";
        } else if (this.chances.value === " -sch") {
            this.chances.helpMessage = "Steal rate is improved and rare steals are more likely";
        } else if (this.chances.value === " -sca") {
            this.chances.helpMessage = "Steal will always succeed if enemy has an item";
        }
    }
}
