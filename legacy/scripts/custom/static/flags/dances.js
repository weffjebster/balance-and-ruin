class FlagsDances {
    constructor(flags) {
        this.flags = flags;

        this.startDances = new MinMaxSlider("start_dances", "-sdr", 0, 0, this.flags);
        this.danceShuffle = new Toggle("dance_shuffle", "-das", this.flags);
        this.danceDisplayAbilities = new Toggle("dance_display_abilities", "-dda", this.flags);
        this.danceNoStumble = new Toggle("dance_no_stumble", "-dns", this.flags);
        this.danceEveryoneLearns = new Toggle("dance_everyone_learns", "-del", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.startDances.getFlag();
        flags += this.danceShuffle.getFlag();
        flags += this.danceDisplayAbilities.getFlag();
        flags += this.danceNoStumble.getFlag();
        flags += this.danceEveryoneLearns.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.startDances.readFlag();
        this.danceShuffle.readFlag();
        this.danceDisplayAbilities.readFlag();
        this.danceNoStumble.readFlag();
        this.danceEveryoneLearns.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
