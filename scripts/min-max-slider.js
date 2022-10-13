class MinMaxSlider {
    constructor(id, flag, defaultMinValue, defaultMaxValue, flags, percentage = false) {
        this.id = id;
        this.flag = flag;
        this.defaultMinValue = defaultMinValue;
        this.defaultMaxValue = defaultMaxValue;
        this.flags = flags;
        this.percentage = percentage;

        this.minSlider = new Slider(this.id + "_min", this.flag, this.defaultMinValue, this.flags);
        this.maxSlider = new Slider(this.id + "_max", this.flag, this.defaultMaxValue, this.flags);

        this.preview = document.getElementById(this.id + "_preview");
        this.field = document.getElementById(this.id + "_min_max_field");
        this.help = document.getElementById(this.id + "_help");
        this.parentElement = null;

        this.updatePreview();

        ["input", "click"].forEach(function(event) {
            this.minSlider.slider.addEventListener(event, function() {
                if (parseInt(this.maxValue, 10) < parseInt(this.minValue, 10)) {
                    this.maxValue = this.minValue;
                    this.flags.updateFlags();
                }
                this.updatePreview();
            }.bind(this));
        }, this);
        ["input", "click"].forEach(function(event) {
            this.maxSlider.slider.addEventListener(event, function() {
                if (parseInt(this.minValue, 10) > parseInt(this.maxValue, 10)) {
                    this.minValue = this.maxValue;
                    this.flags.updateFlags();
                }
                this.updatePreview();
            }.bind(this));
        }, this);
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.minSlider.input.addEventListener(event, function() {
                if (parseInt(this.maxValue, 10) < parseInt(this.minValue, 10)) {
                    this.maxValue = this.minValue;
                    this.flags.updateFlags();
                }
                this.updatePreview();
            }.bind(this));
        }, this);
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            this.maxSlider.input.addEventListener(event, function() {
                if (parseInt(this.minValue, 10) > parseInt(this.maxValue, 10)) {
                    this.minValue = this.maxValue;
                    this.flags.updateFlags();
                }
                this.updatePreview();
            }.bind(this));
        }, this);
    }

    updatePreview() {
        if (this.preview !== null) {
            this.preview.innerHTML = this.minValue + "-" + this.maxValue;
            if (this.percentage) {
                this.preview.innerHTML += "%";
            }
        }
    }

    set value(val) {
        this.minValue = val;
        this.maxValue = val;
        this.updatePreview();
    }

    get minValue() {
        return this.minSlider.value;
    }

    set minValue(val) {
        this.minSlider.value = val;
        this.updatePreview();
    }

    get maxValue() {
        return this.maxSlider.value;
    }

    set maxValue(val) {
        this.maxSlider.value = val;
        this.updatePreview();
    }

    set min(val) {
        this.minSlider.min = val;
        this.maxSlider.min = val;
    }

    set max(val) {
        this.minSlider.max = val;
        this.maxSlider.max = val;
    }

    getFlag() {
        if (this.parentElement != null || this.minValue != this.defaultMinValue || this.maxValue != this.defaultMaxValue) {
            return " " + this.flag + " " + this.minValue + " " + this.maxValue;
        }
        return "";
    }

    readFlag() {
        var min_value = this.flags.helpers.valueRange(this.flag, this.defaultMinValue,
                                                      this.minSlider.min, this.minSlider.max);

        var max_value = this.flags.helpers.valueRange(this.flag + " " + min_value, this.defaultMaxValue,
                                                      this.maxSlider.min, this.maxSlider.max);

        if (parseInt(min_value, 10) > parseInt(max_value, 10)) {
            var temp = min_value;
            min_value = max_value;
            max_value = temp;
        }

        this.minValue = min_value;
        this.maxValue = max_value;
    }

    hide() {
        this.field.classList.add("is-hidden");
        this.preview.classList.add("is-hidden");
    }

    show() {
        this.field.classList.remove("is-hidden");
        this.preview.classList.remove("is-hidden");
        this.updatePreview();
    }
}
