class FlagHelpers {
    constructor(flagsObject) {
        this.flagsObject = flagsObject;
        this.flagsInput = flagsObject.flagsInput;
    }

    getFlags() {
        return this.flagsInput.value;
    }

    setFlags(flags) {
        this.flagsInput.value = flags;
    }

    emptyFlags() {
        return !this.getFlags().trim().length;
    }

    index(flag) {
        var flags = this.getFlags();
        var paddedSingleLineFlags = ' ' + flags.replace(/\n/g, ' ') + ' ';
        return paddedSingleLineFlags.lastIndexOf(' ' + flag + ' ');
    }

    exists(flag) {
        return this.index(flag) >= 0;
    }

    selectIndex(select, defaultIndex = 0) {
        // find which option is in flag string and select that option
        var emptyIndex = defaultIndex;
        for (var index = 0; index < select.length; index++) {
            var value = select.options[index].value.trim();
            if (!value) {
                emptyIndex = index;
            } else if (this.exists(value)) {
                select.selectedIndex = index;
                return;
            }
        }
        select.selectedIndex = emptyIndex;
    }

    selectValueIndex(select, flag, defaultValue) {
        // for select with option values that do not include flag (i.e. just a number)
        var value = this.value(flag);
        select.value = value;
        if (!select.value.trim() || select.value != value) {
            select.value = defaultValue;    // value not in options, set to defaultValue
        }
    }

    value(flag) {
        var flagIndex = this.index(flag);
        if (flagIndex >= 0) {
            var flags = this.getFlags();
            var singleLineFlags = flags.replace(/\n/g, ' ');
            var valStart = singleLineFlags.indexOf(' ', flagIndex + flag.length) + 1;
            var value = singleLineFlags.substr(valStart).trim();
            var valEnd = value.indexOf(' ');
            if (valEnd < 0) {
                valEnd = value.length;
            }
            return value.substr(0, valEnd);
        }
        return "";
    }

    isUnsignedInt(value) {
      return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)) && parseInt(value, 10) >= 0;
    }

    isFloat(value) {
      return !isNaN(value) && parseFloat(Number(value)) == value && !isNaN(parseFloat(value));
    }

    valueRange(flag, defaultValue, min, max) {
        var value = this.value(flag);
        if (this.isUnsignedInt(value)) {
            value = parseInt(value, 10);
        } else if (this.isFloat(value)) {
            value = parseFloat(value);
        } else {
            value = defaultValue;
        }
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    addUpdateFlagsEvent(element) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "change", "contextmenu", "drop"].forEach(function(event) {
            element.addEventListener(event, this.flagsObject.updateFlags.bind(this.flagsObject));
        }, this);
    }
}
