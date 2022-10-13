class FlagsBlitzes {
    constructor(flags) {
        this.flags = flags;

        this.bumRushLast = new Toggle("bum_rush_last", "-brl", this.flags);
        this.blitzEveryoneLearns = new Toggle("blitz_everyone_learns", "-bel", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.bumRushLast.getFlag();
        flags += this.blitzEveryoneLearns.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.bumRushLast.readFlag();
        this.blitzEveryoneLearns.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
