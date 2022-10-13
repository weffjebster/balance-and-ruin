class FlagsSettings {
    constructor(flags) {
        this.flags = flags;

        this.mode = new Select("mode", this.flags);
        this.seed = document.getElementById("seed");
        this.spoilerLog =  new Toggle("spoiler_log", "-sl", this.flags);

        this.flags.helpers.addUpdateFlagsEvent(this.seed);

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.seed.addEventListener(event, function() {
                this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
            });
        }, this);
    }

    getFlags() {
        var flags = "";

        var seedValue = this.seed.value.trim();
        if (seedValue) {
            flags = " -s " + seedValue;
        }

        flags += this.mode.getFlag();
        flags += this.spoilerLog.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.seed.value = this.flags.helpers.value("-s").replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);

        this.mode.readFlag();
        this.spoilerLog.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.mode.value == " -cg") {
            this.mode.helpMessage = "Events locked until required characters recruited<br />Find what each character unlocks: <a href='/static/character_gates.png' target='_blank'>PNG</a> or <a href='/static/character_gates.txt' target='_blank'>TXT</a>";
        } else {
            this.mode.helpMessage = "Unrestricted event access";
        }
    }
}
