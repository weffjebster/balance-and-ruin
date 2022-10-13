class Objective {
    constructor(id, flags) {
        this.id = id;
        this.flags = flags;

        this.div = document.getElementById("objective_" + this.id);
        this.tbody = document.getElementById("objective_tbody_" + this.id);
        this.result = new Result(this.id, this.flags, this);

        this.conditionsRequired = new ConditionsRequiredMinMaxSlider("conditions_required_" + this.id, this.flags, this);
        this.maxConditions = document.getElementById("max_conditions").value;

        this.conditions = []
        for (let ci = 0; ci < this.maxConditions; ci++) {
            let condition = new Condition(this.id + ci, this.flags, this);
            this.conditions.push(condition);

            condition.select.select.dataset.previousIndex = condition.select.index;
            condition.select.select.addEventListener("change", function() {
                if (ci < this.maxConditions - 1 && !this.conditions[ci + 1].visible() && this.conditions[ci].select.index !== 0) {
                    this.conditions[ci + 1].reset();
                    this.conditions[ci + 1].show();
                }
            }.bind(this, ci));
        }

        this.reset();
    }

    getFlag() {
        let flag = " -o" + this.id;
        flag += " " + this.result.getFlag();

        flag += "." + this.conditionsRequired.minValue + "." + this.conditionsRequired.maxValue;

        for (let ci = 0; ci < this.conditions.length; ci++) {
            let conditionFlag = this.conditions[ci].getFlag();
            if (conditionFlag !== "") {
                flag += "." + conditionFlag;
            }
        }
        return flag;
    }

    getNumberConditions() {
        let count = 0;
        for (let ci = 0; ci < this.maxConditions; ci++) {
            if (this.conditions[ci].visible() && this.conditions[ci].select.index !== 0) {
                ++count;
            }
        }
        return count;
    }

    updateMinMaxConditionsRequired() {
        let count = this.getNumberConditions();
        if (this.conditionsRequired.maxValue > count) {
            this.conditionsRequired.maxValue = count;
        }
        if (this.conditionsRequired.minValue > count) {
            this.conditionsRequired.minValue = count;
        }
        this.conditionsRequired.max = count;
    }

    updateConditionsRequired(condition_changed) {
        let maxConditions = this.getNumberConditions()
        let previousIndex = parseInt(condition_changed.select.select.dataset.previousIndex, 10);
        if (condition_changed.select.index !== 0 && previousIndex === 0) {
            this.conditionsRequired.max = maxConditions;
            ++this.conditionsRequired.minValue;
            ++this.conditionsRequired.maxValue;
        } else if (condition_changed.select.index === 0 && previousIndex !== 0) {
            if (this.conditionsRequired.minValue > 0) {
                --this.conditionsRequired.minValue;
            }
            if (this.conditionsRequired.maxValue > 0) {
                --this.conditionsRequired.maxValue;
            }
            this.conditionsRequired.max = maxConditions;
        } else {
            this.conditionsRequired.max = maxConditions;
        }
        condition_changed.select.select.dataset.previousIndex = condition_changed.select.index;
    }

    updateFields(args) {
        this.result.updateFields(args);

        let newMin = 0;
        let newMax = 0;
        if (args.length == 1) {
            args.shift();
        }
        if (args.length >= 2) {
            newMin = args.shift();
            newMax = args.shift();
        }

        for (let ci = 0; ci < this.maxConditions; ci++) {
            this.conditions[ci].updateFields(args);
            this.conditions[ci].select.select.dataset.previousIndex = this.conditions[ci].select.index;
        }

        // add a single None condition at the end if not already all visible
        for (let ci = 1; ci < this.maxConditions; ci++) {
            if (this.conditions[ci - 1].visible() && !this.conditions[ci].visible()) {
                this.conditions[ci].show();
                break;
            }
        }

        this.updateMinMaxConditionsRequired();
        this.conditionsRequired.minValue = newMin;
        this.conditionsRequired.maxValue = newMax;
    }

    assign(other) {
        this.result.assign(other.result);

        for (let ci = 0; ci < this.conditions.length; ci++) {
            this.conditions[ci].assign(other.conditions[ci]);
            this.conditions[ci].select.select.dataset.previousIndex = this.conditions[ci].select.index;
        }

        this.updateMinMaxConditionsRequired();
        this.conditionsRequired.minValue = other.conditionsRequired.minValue;
        this.conditionsRequired.maxValue = other.conditionsRequired.maxValue;
    }

    reset() {
        this.result.reset();

        this.conditionsRequired.max = 0;
        this.conditionsRequired.minValue = 0;
        this.conditionsRequired.maxValue = 0;

        for (let ci = 0; ci < this.conditions.length; ci++) {
            this.conditions[ci].reset();
            this.conditions[ci].select.select.dataset.previousIndex = this.conditions[ci].select.index;
        }
    }

    hide() {
        for (let ci = 0; ci < this.conditions.length; ci++) {
            this.conditions[ci].hide();
        }
        this.div.classList.add("is-hidden");
    }

    show() {
        this.conditions[0].show();
        this.div.classList.remove("is-hidden");
    }

    randomize() {
        let args = []

        let resultArgs = getRandomResultArgs(this.result);
        args.push(...resultArgs);

        let randConditionCount = Math.floor(Math.random() * this.maxConditions) + 1;

        let randRequiredCount = Math.floor(Math.random() * randConditionCount) + 1;
        args.push(randRequiredCount);
        args.push(randRequiredCount);

        let conditionsArgs = getRandomConditionsArgs(this, randConditionCount);
        args.push(...conditionsArgs);

        this.updateFields(args);
        this.flags.updateFlags();
    }
}

class Result {
    constructor(id, flags, objective) {
        this.id = id;
        this.flags = flags;
        this.objective = objective;

        this.category_types = JSON.parse(document.getElementById("result_category_types").value);

        this.types = [];
        this.id_type = {};
        this.id_category = {};
        for (let category in this.category_types) {
            for (let type_index = 0; type_index < this.category_types[category].length; type_index++) {
                let type = this.category_types[category][type_index];
                this.types.push(type);
                this.id_type[type.id] = type;
                this.id_category[type.id] = category;
            }
        }

        this.select = new ResultSelect("result_" + this.id, this.flags, this);
        this.subSelect = new ResultSubSelect("result_sub_select_" + this.id, this.flags, this);
        this.subMinMax = new ResultMinMaxSlider("result_sub_minmax_" + this.id, this.flags, this);
    }

    getFlag() {
        let flags = this.subSelect.value;

        if (!this.subMinMax.hidden) {
            flags += "." + this.subMinMax.minValue;
            flags += "." + this.subMinMax.maxValue;
        }

        return flags;
    }

    updateFields(args) {
        this.reset();

        let type_id = args.shift();
        this.select.value = this.id_category[type_id];

        this.updateSubSelect();
        this.subSelect.value = this.id_type[type_id].id;

        this.updateSubMinMax();
        if (!this.subMinMax.hidden) {
            let min_value = parseInt(args.shift(), 10);
            let max_value = parseInt(args.shift(), 10);
            if (min_value > max_value) {
                this.subMinMax.minValue = max_value;
                this.subMinMax.maxValue = min_value;
            } else {
                this.subMinMax.minValue = min_value;
                this.subMinMax.maxValue = max_value;
            }
        }
    }

    updateSubSelect() {
        let category_types = this.category_types[this.select.value];
        this.subSelect.removeOptions();
        for (let type_index = 0; type_index < category_types.length; type_index++) {
            this.subSelect.addOption(category_types[type_index].id, category_types[type_index].name);
        }
        this.subSelect.index = 0;

        if (this.select.text === "Random") {
            this.subSelect.hide();
        } else {
            this.subSelect.show();
        }
    }

    updateSubMinMax() {
        let type = this.category_types[this.select.value][this.subSelect.index];
        if (type.values === null) {
            this.subMinMax.hide();
        } else {
            this.subMinMax.min = type.values[0];
            this.subMinMax.max = type.values[type.values.length - 1];
            this.subMinMax.value = type.values[0];
            this.subMinMax.show();
        }
    }

    assign(other) {
        this.select.value = other.select.value;

        this.updateSubSelect();
        this.subSelect.value = other.subSelect.value;

        this.updateSubMinMax();
        if (!this.subMinMax.hidden) {
            this.subMinMax.minValue = other.subMinMax.minValue;
            this.subMinMax.maxValue = other.subMinMax.maxValue;
        }

        this.select.preview.innerHTML = other.select.preview.innerHTML;
        if (other.select.preview.classList.contains("is-hidden")) {
            this.select.preview.classList.add("is-hidden");
        } else {
            this.select.preview.classList.remove("is-hidden");
        }
    }

    reset() {
        this.select.index = 0;
        this.updateSubSelect();
        this.updateSubMinMax();
        this.subSelect.updatePreview();
    }
}

class Condition {
    constructor(id, flags, objective) {
        this.id = id;
        this.flags = flags;
        this.objective = objective;

        this.block = document.getElementById("condition_block_" + this.id);
        this.condition_types = JSON.parse(document.getElementById("condition_types").value);

        this.select = new ConditionSelect("condition_" + this.id, this.flags, this);
        this.subSelect = new ConditionSubSelect("condition_sub_select_" + this.id, this.flags, this);
        this.subMinMax = new ConditionMinMaxSlider("condition_sub_minmax_" + this.id, this.flags, this);
        this.subElement = null;

        this.subSelectField = document.getElementById("condition_sub_select_" + this.id + "_select_field");
        this.subSelectField.style.paddingBottom = "12px";
    }

    getFlag() {
        if (this.select.text === "None") {
            return "";
        }

        let flag = this.select.index;
        if (this.subElement == this.subMinMax) {
            flag += "." + this.subMinMax.minValue + "." + this.subMinMax.maxValue;
        } else if (this.subElement == this.subSelect) {
            flag += "." + this.subSelect.value;
        }
        return flag;
    }

    updateFields(args) {
        this.reset();

        if (args.length === 0) {
            this.hide();
            return;
        }

        this.select.value = args.shift();
        this.updateSubElement();

        if (this.subElement == this.subSelect) {
            if (args.length >= 1) {
                this.subSelect.value = args.shift();
            }
        } else if (this.subElement !== null) {
            if (args.length >= 2) {
                let min_value = parseInt(args.shift(), 10);
                let max_value = parseInt(args.shift(), 10);

                if (min_value > max_value) {
                    this.subMinMax.minValue = max_value;
                    this.subMinMax.maxValue = min_value;
                } else {
                    this.subMinMax.minValue = min_value;
                    this.subMinMax.maxValue = max_value;
                }
            }
        }
        this.show();
    }

    updateSubElement() {
        if (this.subElement !== null) {
            this.subElement.hide();
            this.subElement = null;
        }

        if (this.condition_types[this.select.value].min_max) {
            this.subMinMax.min = this.condition_types[this.select.value].min;
            this.subMinMax.max = this.condition_types[this.select.value].max;
            this.subMinMax.value = this.condition_types[this.select.value].min;

            this.subElement = this.subMinMax;
            this.subElement.show();
        } else if (this.select.text !== "None") {
            let values = this.condition_types[this.select.value].values;
            let strings = this.condition_types[this.select.value].strings;

            this.subSelect.removeOptions();
            for (let index = 0; index < values.length && index < strings.length; index++) {
                this.subSelect.addOption(values[index], strings[index]);
            }
            this.subSelect.index = 0;

            this.subElement = this.subSelect;
            if (this.select.text === "Random") {
                this.subElement.hide();
            } else {
                this.subElement.show();
            }
        }
    }

    assign(other) {
        this.block.style.display = other.block.style.display;
        this.select.value = other.select.value;

        this.updateSubElement();

        if (this.subElement == this.subSelect) {
            this.subSelect.value = other.subSelect.value;
        } else {
            this.subMinMax.minValue = other.subMinMax.minValue;
            this.subMinMax.maxValue = other.subMinMax.maxValue;
        }

        this.select.preview.innerHTML = other.select.preview.innerHTML;
        if (other.select.preview.classList.contains("is-hidden")) {
            this.select.preview.classList.add("is-hidden");
        } else {
            this.select.preview.classList.remove("is-hidden");
        }
    }

    reset() {
        this.select.index = 0;
        if (this.subElement !== null) {
            this.subElement.hide();
            this.subElement = null;
        }
    }

    visible() {
        return this.block.style.display !== "none";
    }

    hide() {
        this.block.style.display = "none";
        this.subMinMax.hide();
        this.subSelect.hide();
        this.select.preview.classList.add("is-hidden");
    }

    show() {
        this.select.updatePreview();
        this.block.style.display = "";
        this.select.preview.classList.remove("is-hidden");
    }
}

class FlagsObjectives {
    constructor(flags) {
        this.flags = flags;

        this.maxObjectives = document.getElementById("max_objectives").value;

        this.objectives = []
        this.randomButtons = []
        this.deleteButtons = []
        for (let oi = 0; oi < this.maxObjectives; oi++) {
            let character = String.fromCharCode(97 + oi);

            let objective = new Objective(character, this.flags);
            this.objectives.push(objective);
            objective.hide();

            this.randomButtons.push(document.getElementById("random_objective_" + character));
            this.deleteButtons.push(document.getElementById("delete_objective_" + character));
        }

        this.visibleObjectives = 1;
        this.objectives[0].show();

        this.add_objective_button = document.getElementById("add_objective");
        this.add_objective_button.onclick = function() {
            if (this.visibleObjectives < this.maxObjectives) {
                this.objectives[this.visibleObjectives].reset();
                this.objectives[this.visibleObjectives].show();
                ++this.visibleObjectives;

                this.flags.updateFlags();
            }
        }.bind(this);

        for (let i = 0; i < this.randomButtons.length; i++) {
            this.randomButtons[i].onclick = function() {
                this.randomObjective(i);
            }.bind(this, i);
        }

        for (let i = 0; i < this.deleteButtons.length; i++) {
            this.deleteButtons[i].onclick = function() {
                this.deleteObjective(i);
                this.flags.updateFlags();
            }.bind(this, i);
        }
    }

    getFlags() {
        let flags = "";

        for (let i = 0; i < this.visibleObjectives; i++) {
            flags += this.objectives[i].getFlag();
        }

        this.updateHelp();
        return flags;
    }

    updateFields() {
        let objectiveIndex = 0;
        for (let flagIndex = 0; flagIndex < this.maxObjectives; flagIndex++) {
            let character = String.fromCharCode(97 + flagIndex);
            let args = this.flags.helpers.value("-o" + character).split('.').filter(function(val) { return val !== ""; });

            if (args.length > 1) {
                this.objectives[objectiveIndex].updateFields(args);
                this.objectives[objectiveIndex].show();
                objectiveIndex++;
            }
        }
        while (this.visibleObjectives > objectiveIndex) {
            this.deleteObjective(objectiveIndex);
        }
        this.visibleObjectives = objectiveIndex;

        this.updateHelp();
    }

    updateHelp() {
    }

    randomObjective(objectiveIndex) {
        this.objectives[objectiveIndex].randomize();
    }

    deleteObjective(deleteIndex) {
        --this.visibleObjectives;
        for (let oi = deleteIndex; oi < this.visibleObjectives; oi++) {
            this.objectives[oi].assign(this.objectives[oi + 1]);
        }
        this.objectives[this.visibleObjectives].hide();
    }
}
