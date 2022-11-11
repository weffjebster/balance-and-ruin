class FlagsChests {
    constructor(flags) {
        this.flags = flags;

        this.chestsContents = new Select("chests_contents", this.flags);
        this.chestsMonstersShuffle = new Toggle("chests_monsters_shuffle", "-cms", this.flags);

        this.chestsContentsRandom = new Slider("chests_contents_random", "-ccsr", 0, this.flags);
        this.chestsContents.addSubOption(this.chestsContentsRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.chestsContents.getFlag();
        flags += this.chestsMonstersShuffle.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.chestsContents.readFlag();
        this.chestsMonstersShuffle.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
