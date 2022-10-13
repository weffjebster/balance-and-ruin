class Slider {
    constructor(id, flag, defaultFlagValue, flags, step = 1) {
        this.id = id;
        this.flag = flag;
        this.defaultFlagValue = defaultFlagValue;
        this.flags = flags;
        this.step = step;

        this.slider = document.getElementById(id);
        this.input = document.getElementById(id + "_input");
        this.preview = document.getElementById(id + "_preview");
        this.field = document.getElementById(id + "_slider_field");
        this.help = document.getElementById(id + "_help");
        this.parentElement = null;

        this.flags.helpers.addUpdateFlagsEvent(this.slider);
        this.flags.helpers.addUpdateFlagsEvent(this.input);

        ["input", "click"].forEach(function(event) {
            this.slider.addEventListener(event, function() {
                if (this.input.value !== this.slider.value) {
                    this.input.value = this.slider.value;
                }
            }.bind(this));
        }, this);

        if (Number.isInteger(this.step)) {
            minMaxFilter(this);
        } else {
            decimalMinMaxFilter(this);
        }

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.input.addEventListener(event, function() {
                if (this.slider.value !== this.input.value && this.input.value) {
                    this.slider.value = this.input.value;
                }
            }.bind(this));
        }, this);

        this.input.addEventListener("focus", function(event) {
            event.target.select();
        });
    }

    get value() {
        return this.slider.value;
    }

    set value(val) {
        this.slider.value = val;
        this.input.value = val;
    }

    get min() {
        return this.slider.getAttribute("min");
    }

    set min(val) {
        this.slider.setAttribute("min", val);
    }

    get max() {
        return this.slider.getAttribute("max");
    }

    set max(val) {
        this.slider.setAttribute("max", val);
    }

    getFlag() {
        if (this.parentElement != null || this.value != this.defaultFlagValue) {
            return " " + this.flag + " " + this.value;
        }
        return "";
    }

    readFlag() {
        this.value = this.flags.helpers.valueRange(this.flag, this.defaultFlagValue, this.min, this.max);
        this.value = this.value - (this.value % this.step);
    }

    hide() {
        this.field.classList.add("is-hidden");
        this.help.classList.add("is-hidden");
    }

    show() {
        this.field.classList.remove("is-hidden");
        this.help.classList.remove("is-hidden");
    }
}
