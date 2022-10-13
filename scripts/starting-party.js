class FlagsStartingParty {
    constructor(flags) {
        this.flags = flags;

        this.startCharacters = [
                                new SelectValue("start_char1", "-sc1", "", this.flags),
                                new SelectValue("start_char2", "-sc2", "", this.flags),
                                new SelectValue("start_char3", "-sc3", "", this.flags),
                                new SelectValue("start_char4", "-sc4", "", this.flags)
                               ];
    }

    getFlags() {
        var flags = "";

        for (var index = 0; index < this.startCharacters.length; index++) {
            flags += this.startCharacters[index].getFlag();
        }

        this.updateHelp();
        return flags;
    }

    updateFields() {
        for (var index = 0; index < this.startCharacters.length; index++) {
            this.startCharacters[index].readFlag();
        }

        this.updateHelp();
    }

    updateHelp() {
    }
}
