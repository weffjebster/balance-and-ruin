class FlagsSwdTechs {
    constructor(flags) {
        this.flags = flags;

        this.fastSwdTech = new Toggle("fast_swdtech", "-fst", this.flags);
        this.swdTechEveryoneLearns = new Toggle("swdtech_everyone_learns", "-sel", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.fastSwdTech.getFlag();
        flags += this.swdTechEveryoneLearns.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.fastSwdTech.readFlag();
        this.swdTechEveryoneLearns.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
