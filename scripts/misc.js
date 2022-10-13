class FlagsMisc {
    constructor(flags) {
        this.flags = flags;

        this.autoSprint = new Toggle("auto_sprint", "-as", this.flags);
        this.originalNameDisplay = new Toggle("original_name_display", "-ond", this.flags);
        this.randomRNG = new Toggle("random_rng", "-rr", this.flags);
        this.randomClock = new Toggle("random_clock", "-rc", this.flags);
        this.scanAll = new Toggle("scan_all", "-scan", this.flags);
        this.eventTimers = new Select("event_timers", this.flags);
        this.yNPC = new Select("y_npc", this.flags);
        this.removeFlashes = new Select("remove_flashes", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.autoSprint.getFlag();
        flags += this.originalNameDisplay.getFlag();
        flags += this.randomRNG.getFlag();
        flags += this.randomClock.getFlag();
        flags += this.scanAll.getFlag();
        flags += this.eventTimers.getFlag();
        flags += this.yNPC.getFlag();
        flags += this.removeFlashes.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.autoSprint.readFlag();
        this.originalNameDisplay.readFlag();
        this.randomRNG.readFlag();
        this.randomClock.readFlag();
        this.scanAll.readFlag();
        this.eventTimers.readFlag();
        this.yNPC.readFlag();
        this.removeFlashes.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.eventTimers.value == " -etr") {
            this.eventTimers.helpMessage = "Collapsing House, Opera House, and Floating Continent timers randomized";
        } else if (this.eventTimers.value == " -etn") {
            this.eventTimers.helpMessage = "Collapsing House, Opera House, and Floating Continent timers removed";
        } else {
            this.eventTimers.helpMessage = "Collapsing House, Opera House, and Floating Continent timers unmodified";
        }

        if (this.removeFlashes.value == "") {
            this.removeFlashes.helpMessage = "Flash animations not changed";
        } else if (this.removeFlashes.value == " -frw") {
            this.removeFlashes.helpMessage = "Removes only the worst flashes from animations. Ex: Learning Bum Rush, Bum Rush, Quadra Slam/Slice, Flash, etc.";
        } else if (this.removeFlashes.value == " -frm") {
            this.removeFlashes.helpMessage = "Removes most flashes from animations. Includes Kefka Death";
        }
    }
}
