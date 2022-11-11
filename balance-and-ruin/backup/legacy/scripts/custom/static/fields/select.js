class Select {
    constructor(id, flags) {
        this.id = id;
        this.flags = flags;

        this.select = document.getElementById(id);
        this.preview = document.getElementById(id + "_preview");
        this.field = document.getElementById(id + "_select_field");
        this.help = document.getElementById(id + "_help");

        this.flags.helpers.addUpdateFlagsEvent(this.select);

        this.subOptions = new Array();
        this.currentSubOption = null;
    }

    get value() {
        return this.select.value;
    }

    set value(val) {
        this.select.value = val;
        if (this.select.selectedIndex < 0) {
            this.index = 0;
        } else {
            this.updateSubOption();
        }
    }

    get index() {
        return this.select.selectedIndex;
    }

    set index(idx) {
        this.select.selectedIndex = idx;
        this.updateSubOption();
    }

    get text() {
        return this.select.options[this.index].text;
    }

    addOption(value, text) {
        let option = document.createElement("option");
        option.value = value;
        option.text = text;
        this.select.add(option);
    }

    removeOptions() {
        for (let i = this.select.options.length - 1; i >= 0; i--) {
            this.select.remove(i);
        }
    }

    getOption(value) {
        return this.querySelector('[value="' + value + '"]');
    }

    getFlag() {
        if (this.currentSubOption !== null) {
            return this.currentSubOption.getFlag();
        }
        return this.select.value;
    }

    readFlag() {
        this.flags.helpers.selectIndex(this.select);
        this.updateSubOption();
        if (this.currentSubOption !== null && this.flags.helpers.exists(this.currentSubOption.flag)) {
            this.currentSubOption.readFlag();
        }
    }

    updateSubOption() {
        var selectedValue = this.select.options[this.select.selectedIndex].value.trim();

        this.currentSubOption = null;
        for (var i = 0; i < this.subOptions.length; i++) {
            if (this.subOptions[i].flag.trim() == selectedValue) {
                this.currentSubOption = this.subOptions[i];
            } else {
                this.subOptions[i].hide();
            }
        }
        if (this.currentSubOption !== null) {
            this.currentSubOption.show();
            this.help.classList.add("invisible-help");
            this.field.classList.add("is-marginless");
        } else {
            this.help.classList.remove("invisible-help");
            this.field.classList.remove("is-marginless");
        }
    }

    addSubOption(subOption) {
        if (subOption.preview == null) {
            subOption.preview = this.preview;
            subOption.help.innerHTML = this.help.innerHTML;
        }
        subOption.parentElement = this;
        this.subOptions.push(subOption);

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.select.addEventListener(event, this.updateSubOption.bind(this));
        }, this);

        this.updateSubOption();
    }

    set helpMessage(message) {
        this.help.innerHTML = message;
        if (this.currentSubOption !== null) {
            this.currentSubOption.help.innerHTML = message;
        }
    }

    hide() {
        this.field.classList.add("is-hidden");
    }

    show() {
        this.field.classList.remove("is-hidden");
    }
}
