class Flags {
    constructor() {
        this.flagsInput = document.getElementById("flags");
        this.helpers = new FlagHelpers(this);

        this.flagGroups = [
                           new FlagsSettings(this),
                           new FlagsObjectives(this),
                           new FlagsStartingParty(this),
                           new FlagsCharacters(this),
                           new FlagsSwdTechs(this),
                           new FlagsBlitzes(this),
                           new FlagsLores(this),
                           new FlagsRages(this),
                           new FlagsDances(this),
                           new FlagsSteal(this),
                           new FlagsCommands(this),
                           new FlagsXPMPGP(this),
                           new FlagsScaling(this),
                           new FlagsBosses(this),
                           new FlagsEncounters(this),
                           new FlagsBossAI(this),
                           new FlagsEspers(this),
                           new FlagsNaturalMagic(this),
                           new FlagsStartingGoldItems(this),
                           new FlagsItems(this),
                           new FlagsShops(this),
                           new FlagsChests(this),
                           new FlagsGraphics(this),
                           new FlagsColiseum(this),
                           new FlagsAuctionHouse(this),
                           new FlagsChallenges(this),
                           new FlagsBugFixes(this),
                           new FlagsMisc(this)
                          ];

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.flagsInput.addEventListener(event, this.updateFields.bind(this));
        }, this)
        this.flagsInput.addEventListener("blur", this.updateFlags.bind(this)); // clear invalid user input and apply ordering

        this.presetSelect = document.getElementById("preset");
        this.presetHelp = document.getElementById("preset_help");
        this.presetSelect.addEventListener("change", this.updatePreset.bind(this));
        this.updatePresetHelp();

        if (this.helpers.emptyFlags()) {
            this.updateFlags();
        } else {
            this.updateFields();
        }
    }

    updateFlags() {
        // objects do not update their own flags because they would need to replace existing flags to maintain an ordering
        // however, it is possible for there to not be an existing flag to replace if the default value is chosen/selected/input
        // e.g. empty seeds are not shown in flags, if the seed was cleared then added it would be placed at the end of flags
        var flags = "";

        for (var index = 0; index < this.flagGroups.length; ++index) {
            flags += this.flagGroups[index].getFlags();
        }

        this.helpers.setFlags(flags.trim());
    }

    updateFields() {
        for (var index = 0; index < this.flagGroups.length; ++index) {
            this.flagGroups[index].updateFields();
        }
    }

    updatePreset() {
        this.helpers.setFlags(this.presetSelect.value);

        this.updatePresetHelp();
        this.updateFields();
    }

    updatePresetHelp() {
        let selectedIndex = this.presetSelect.selectedIndex;
        let helpText = this.presetSelect.options[selectedIndex].getAttribute("help");
        this.presetHelp.innerHTML = helpText;
    }
}
