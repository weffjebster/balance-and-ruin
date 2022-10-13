class SelectValue extends Select {
    constructor(id, flag, defaultFlagValue, flags) {
        super(id, flags);
        this.flag = flag;
        this.defaultFlagValue = defaultFlagValue;
    }

    getFlag() {
        var strVal = this.value.toString();
        if (strVal != this.defaultFlagValue) {
            return " " + this.flag + " " + strVal;
        }
        return "";
    }

    readFlag() {
        this.flags.helpers.selectValueIndex(this.select, this.flag, this.defaultFlagValue);
    }
}
