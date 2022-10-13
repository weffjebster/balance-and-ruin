class FlagsStartingGoldItems {
    constructor(flags) {
        this.flags = flags;

        this.startGold = new IntText("start_gold", "-gp", 0, 0, 999999, this.flags);
        this.startMoogleCharms = new Slider("start_moogle_charms", "-smc", 0, this.flags);
        this.startWarpStones = new Slider("start_warp_stones", "-sws", 0, this.flags);
        this.startFenixDowns = new Slider("start_fenix_downs", "-sfd", 0, this.flags);
        this.startTools = new Slider("start_tools", "-sto", 0, this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.startGold.getFlag();
        flags += this.startMoogleCharms.getFlag();
        flags += this.startWarpStones.getFlag();
        flags += this.startFenixDowns.getFlag();
        flags += this.startTools.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.startGold.readFlag();
        this.startMoogleCharms.readFlag();
        this.startWarpStones.readFlag();
        this.startFenixDowns.readFlag();
        this.startTools.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
