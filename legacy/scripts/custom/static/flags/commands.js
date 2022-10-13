class FlagsCommands {
    constructor(flags) {
        this.flags = flags;

        this.commandSelects = [
                               document.getElementById("morph_command"),
                               document.getElementById("steal_command"),
                               document.getElementById("swdtech_command"),
                               document.getElementById("throw_command"),
                               document.getElementById("tools_command"),
                               document.getElementById("blitz_command"),
                               document.getElementById("runic_command"),
                               document.getElementById("lore_command"),
                               document.getElementById("sketch_command"),
                               document.getElementById("slot_command"),
                               document.getElementById("dance_command"),
                               document.getElementById("rage_command"),
                               document.getElementById("leap_command")
                              ];

        this.shuffleCommands = new Toggle("shuffle_commands", "-scc", this.flags);

        this.originalCommands = [3, 5, 7, 8, 9, 10, 11, 12, 13, 15, 19, 16, 17];
        this.originalCommandFlags = "03050708091011121315191617";

        var randomExcludeCount = 6;
        var randomExcludeNone = "97";
        this.randomExcludes = [];
        for (var index = 1; index < randomExcludeCount + 1; index++) {
            var indexStr = index.toString();
            this.randomExcludes.push(new SelectValue("random_exclude_command" + indexStr,
                                                     "-rec" + indexStr, randomExcludeNone, this.flags));
        }

        for (var index = 0; index < this.commandSelects.length; index++) {
            this.flags.helpers.addUpdateFlagsEvent(this.commandSelects[index]);
        }

        this.randomizeCommandsButton = document.getElementById("randomizeCommands");
        this.allRandomCommandsButton = document.getElementById("allRandomCommands");
        this.allRandomUniqueCommandsButton = document.getElementById("allRandomUniqueCommands");
        this.originalCommandsButton = document.getElementById("originalCommands");
        this.randomizeCommandsButton.addEventListener("click", this.randomize.bind(this));
        this.allRandomCommandsButton.addEventListener("click", this.allRandom.bind(this));
        this.allRandomUniqueCommandsButton.addEventListener("click", this.allRandomUnique.bind(this));
        this.originalCommandsButton.addEventListener("click", this.original.bind(this));
    }

    getFlags() {
        var flags = "";

        var commandFlags = "";
        for (var index = 0; index < this.commandSelects.length; index++) {
            var strVal = this.commandSelects[index].value.toString();
            if (strVal.length == 1) {
                strVal = "0" + strVal;
            }
            commandFlags += strVal;
        }
        if (commandFlags != this.originalCommandFlags) {
            flags += " -com " + commandFlags;
        }

        flags += this.shuffleCommands.getFlag();
        for (var index = 1; index < this.randomExcludes.length + 1; index++) {
            flags += this.randomExcludes[index - 1].getFlag();
        }

        this.updateHelp();
        return flags;
    }

    updateFields() {
        var selectIndex = 0;
        var commandsValue = this.flags.helpers.value("-com");
        for (var index = 0; index < commandsValue.length; index += 2, selectIndex++) {
            var strVal = commandsValue.substr(index, 2);
            this.commandSelects[selectIndex].value = parseInt(strVal, 10);
        }
        for (; selectIndex < this.commandSelects.length; selectIndex++) {
            this.commandSelects[selectIndex].value = this.originalCommands[selectIndex];
        }
        this.shuffleCommands.readFlag();
        for (var index = 1; index < this.randomExcludes.length + 1; index++) {
            this.randomExcludes[index - 1].readFlag();
        }

        this.updateHelp();
    }

    updateHelp() {
    }

    randomize() {
        let exclude = ["Random", "Random Unique", "None", "Fight"];
        for (let index = 0; index < this.randomExcludes.length; index++) {
            let randomExclude = this.randomExcludes[index].select;
            exclude.push(randomExclude.options[randomExclude.selectedIndex].text);
        }

        for (let index = 0; index < this.commandSelects.length; index++) {
            let possible = [];
            for (let commandIndex = 0; commandIndex < this.commandSelects[index].length; commandIndex++) {
                if (!exclude.includes(this.commandSelects[index].options[commandIndex].text)) {
                    possible.push(commandIndex);
                }
            }

            let randomPossibleIndex = Math.floor(Math.random() * possible.length);
            this.commandSelects[index].selectedIndex = possible[randomPossibleIndex];
        }
        this.flags.updateFlags();
    }

    allRandom() {
        for (var index = 0; index < this.commandSelects.length; index++) {
            this.commandSelects[index].selectedIndex = 0;
        }
        this.flags.updateFlags();
    }

    allRandomUnique() {
        for (var index = 0; index < this.commandSelects.length; index++) {
            this.commandSelects[index].selectedIndex = 1;
        }
        this.flags.updateFlags();
    }

    original() {
        for (var index = 0; index < this.commandSelects.length; index++) {
            this.commandSelects[index].value = this.originalCommands[index];
        }
        this.flags.updateFlags();
    }
}
