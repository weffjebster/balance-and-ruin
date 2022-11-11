class FlagsBossAI {
    constructor(flags) {
        this.flags = flags;

        this.doomGazeNoEscape = new Toggle("doom_gaze_no_escape", "-dgne", this.flags);
        this.wrexsoulNoZinger = new Toggle("wrexsoul_no_zinger", "-wnz", this.flags);
        this.magiMasterNoUltima = new Toggle("magimaster_no_ultima", "-mmnu", this.flags);
        this.chadarnookMoreDemon = new Toggle("chadarnook_more_demon", "-cmd", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.doomGazeNoEscape.getFlag();
        flags += this.wrexsoulNoZinger.getFlag();
        flags += this.magiMasterNoUltima.getFlag();
        flags += this.chadarnookMoreDemon.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.doomGazeNoEscape.readFlag();
        this.wrexsoulNoZinger.readFlag();
        this.magiMasterNoUltima.readFlag();
        this.chadarnookMoreDemon.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
