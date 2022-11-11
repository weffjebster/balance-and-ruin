class FlagsXPMPGP {
    constructor(flags) {
        this.flags = flags;

        this.xpm = new IntText("xpm", "-xpm", 1, 0, 255, this.flags);
        this.mpm = new IntText("mpm", "-mpm", 1, 0, 255, this.flags);
        this.gpm = new IntText("gpm", "-gpm", 1, 0, 255, this.flags);
        this.noExpPartyDivide = new Toggle("no_exp_party_divide", "-nxppd", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.xpm.getFlag();
        flags += this.mpm.getFlag();
        flags += this.gpm.getFlag();
        flags += this.noExpPartyDivide.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.xpm.readFlag();
        this.mpm.readFlag();
        this.gpm.readFlag();
        this.noExpPartyDivide.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
