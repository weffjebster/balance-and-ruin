class IntText {
    constructor(id, flag, defaultFlagValue, min, max, flags) {
        this.id = id;
        this.flag = flag;
        this.defaultFlagValue = defaultFlagValue;
        this.min = min;
        this.max = max;
        this.flags = flags;

        this.input = document.getElementById(id);

        this.flags.helpers.addUpdateFlagsEvent(this.input);
        minMaxFilter(this);
    }

    get value() {
        return this.input.value;
    }

    set value(val) {
        this.input.value = val;
    }

    getFlag() {
        if (this.value != this.defaultFlagValue) {
            return " " + this.flag + " " + this.value;
        }
        return "";
    }

    readFlag() {
        this.input.value = this.flags.helpers.valueRange(this.flag, this.defaultFlagValue, this.min, this.max);
    }
}
