class ResultSelect extends Select {
    constructor(id, flags, result) {
        let select = document.getElementById(id);
        select.addEventListener("change", result.updateSubSelect.bind(result));
        select.addEventListener("change", result.updateSubMinMax.bind(result));

        super(id, flags);
        this.result = result;
        this.select.addEventListener("change", function() {
            this.result.subSelect.updatePreview();
        }.bind(this));
    }
}
class ResultSubSelect extends Select {
    constructor(id, flags, result) {
        let select = document.getElementById(id);
        select.addEventListener("change", result.updateSubMinMax.bind(result));

        super(id, flags);
        this.result = result;
        this.preview = result.select.preview;
        this.select.addEventListener("change", this.updatePreview.bind(this));
    }

    updatePreview() {
        if (!this.result.subMinMax.hidden) {
            this.result.subMinMax.updatePreview();
        } else {
            this.preview.innerHTML = this.text;
            if (this.text === "Random" && this.result.select.text !== "Random") {
                this.preview.innerHTML += " " + this.result.select.text;
            }
        }
    }

    get value() {
        return super.value;
    }

    set value(val) {
        super.value = val;
        this.updatePreview();
    }

    get index() {
        return super.index;
    }

    set index(idx) {
        super.index = idx;
        this.updatePreview();
    }
}
class ResultMinMaxSlider extends MinMaxSlider {
    constructor(id, flags, result) {
        super(id, null, 0, 0, flags);
        this.result = result;
        this.preview = result.select.preview;
        this.hidden = true;
    }

    updatePreview() {
        if (this.preview !== null) {
            this.preview.innerHTML = this.result.subSelect.text + " " + this.minValue;
            if (this.minValue !== this.maxValue) {
                this.preview.innerHTML += "-" + this.maxValue;
            }
            if (this.percentage) {
                this.preview.innerHTML += "%";
            }
        }
    }

    hide() {
        super.hide();
        this.preview.classList.remove("is-hidden");
        this.hidden = true;
    }

    show() {
        super.show();
        this.hidden = false;
    }
}

class ConditionSelect extends Select {
    constructor(id, flags, condition) {
        let select = document.getElementById(id);
        select.addEventListener("change", condition.updateSubElement.bind(condition));
        select.addEventListener("change", condition.objective.updateConditionsRequired.bind(condition.objective, condition));

        super(id, flags);
        this.condition = condition;
        this.select.addEventListener("change", this.updatePreview.bind(this));
    }

    updatePreview() {
        if (this.index > 0) {
            if (this.condition.subElement !== null && this.text !== "Random") {
                this.condition.subElement.updatePreview();
            } else {
                this.preview.innerHTML = this.text;
            }
        } else {
            this.preview.innerHTML = "";
        }
    }
}
class ConditionSubSelect extends Select {
    constructor(id, flags, condition) {
        super(id, flags);
        this.condition = condition;
        this.preview = condition.select.preview;
        this.select.addEventListener("change", this.updatePreview.bind(this));
    }

    updatePreview() {
        this.preview.innerHTML = this.text;
        if (this.text === "Random") {
            this.preview.innerHTML += " " + this.condition.select.text;
        }
    }

    get value() {
        return super.value;
    }

    set value(val) {
        super.value = val;
        this.updatePreview();
    }
}
class ConditionMinMaxSlider extends MinMaxSlider {
    constructor(id, flags, condition) {
        super(id, null, 0, 0, flags);
        this.condition = condition;
        this.preview = condition.select.preview;
    }

    updatePreview() {
        if (this.preview !== null) {
            this.preview.innerHTML = this.minValue;
            if (this.minValue !== this.maxValue) {
                this.preview.innerHTML += "-" + this.maxValue;
            }
            if (this.percentage) {
                this.preview.innerHTML += "%";
            }
            this.preview.innerHTML += " " + this.condition.select.text;
        }
    }

    hide() {
        super.hide();
        this.preview.classList.remove("is-hidden");
    }
}

class ConditionsRequiredMinMaxSlider extends MinMaxSlider {
    constructor(id, flags, objective) {
        super(id, null, 0, 0, flags);
        this.objective = objective;
    }

    updatePreview() {
        if (this.preview !== null) {
            this.preview.innerHTML = this.minValue;
            if (this.minValue !== this.maxValue) {
                this.preview.innerHTML += "-" + this.maxValue;
            }
            if (this.percentage) {
                this.preview.innerHTML += "%";
            }
            this.preview.innerHTML += " / " + this.maxSlider.max;
        }
    }

    set min(val) {
        super.min = val;
        this.updatePreview();
    }

    set max(val) {
        super.max = val;
        this.updatePreview();
    }
}

function getRandomResultArgs(result) {
    let possible = []
    for (let i = 0; i < result.types.length; i++) {
        if (result.types[i].name !== "Random") {
            possible.push(i);
        }
    }

    let randIndex = Math.floor(Math.random() * possible.length);
    let randTypeIndex = possible[randIndex];
    let randType = result.types[randTypeIndex];

    let args = [randTypeIndex];
    if (randType.values !== null) {
        let randValueIndex = Math.floor(Math.random() * randType.values.length);
        let randValue = randType.values[randValueIndex];

        args.push(randValue);
        args.push(randValue);
    }
    return args;
}

function getRandomConditionArgs(possible) {
    let randTypeIndex = Math.floor(Math.random() * possible.length);
    let randType = possible[randTypeIndex];

    let randValueIndex = Math.floor(Math.random() * randType.values.length);
    let randValue = randType.values[randValueIndex];

    let args = [randType.index];
    args.push(randValue);
    if (randType.min_max) {
        args.push(randValue);
        possible.splice(randTypeIndex, 1);
    } else {
        possible[randTypeIndex].values.splice(randValueIndex, 1);
    }
    return args;
}

function getRandomConditionsArgs(objective, condition_count) {
    let possible = [];
    for (let i = 0; i < objective.conditions[0].condition_types.length; i++) {
        let condition = objective.conditions[0].condition_types[i];
        if (condition.name !== "None" && condition.name !== "Random") {
            let type = {
                "index" : i,
                "name" : condition.name,
                "min_max" : condition.min_max,
                "values" : [],
            };
            for (let j = 0; j < condition.values.length; j++) {
                if (condition.values[j] !== "r") {
                    type.values.push(condition.values[j]);
                }
            }
            possible.push(type);
        }
    }

    let args = [];
    for (let i = 0; i < condition_count; i++) {
        let conditionArgs = getRandomConditionArgs(possible);
        args.push(...conditionArgs);
    }
    return args;
}
