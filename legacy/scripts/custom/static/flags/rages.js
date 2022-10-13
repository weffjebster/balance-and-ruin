class FlagsRages {
    constructor(flags) {
        this.flags = flags;

        this.startRages = new Select("start_rages", this.flags);
        this.rageNoLeap = new Toggle("rage_no_leap", "-rnl", this.flags);
        this.rageNoCharm = new Toggle("rage_no_charm", "-rnc", this.flags);

        this.startRagesRandom = new MinMaxSlider("start_rages_random", "-srr", 0, 0, this.flags);
        this.startRages.addSubOption(this.startRagesRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.startRages.getFlag();
        flags += this.rageNoLeap.getFlag();
        flags += this.rageNoCharm.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.startRages.readFlag();
        this.rageNoLeap.readFlag();
        this.rageNoCharm.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
