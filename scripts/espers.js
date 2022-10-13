class FlagsEspers {
    constructor(flags) {
        this.flags = flags;

        this.esperSpells = new Select("esper_spells", this.flags);
        this.esperBonuses = new Select("esper_bonuses", this.flags);
        this.esperMP = new Select("esper_mp", this.flags);
        this.esperEquipable = new Select("esper_equipable", this.flags);
        this.esperMultiSummon = new Toggle("esper_multi_summon", "-ems", this.flags);

        this.esperSpellsRandom = new MinMaxSlider("esper_spells_random", "-esr", 0, 5, this.flags);
        this.esperSpells.addSubOption(this.esperSpellsRandom);

        this.esperBonusesRandom = new Slider("esper_bonuses_random", "-ebr", 0, this.flags);
        this.esperBonuses.addSubOption(this.esperBonusesRandom);

        this.esperMPRandomValue = new MinMaxSlider("esper_mp_random_value", "-emprv", 1, 128, this.flags);
        this.esperMP.addSubOption(this.esperMPRandomValue);

        this.esperMPRandomPercent = new MinMaxSlider("esper_mp_random_percent", "-emprp", 100, 100, this.flags, true);
        this.esperMP.addSubOption(this.esperMPRandomPercent);

        this.esperEquipableRandom = new MinMaxSlider("esper_equipable_random", "-eer", 1, 12, this.flags);
        this.esperEquipable.addSubOption(this.esperEquipableRandom);

        this.esperEquipableBalancedRandom = new Slider("esper_equipable_balanced_random", "-eebr", 6, this.flags);
        this.esperEquipable.addSubOption(this.esperEquipableBalancedRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.esperSpells.getFlag();
        flags += this.esperBonuses.getFlag();
        flags += this.esperMP.getFlag();
        flags += this.esperEquipable.getFlag();
        flags += this.esperMultiSummon.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.esperSpells.readFlag();
        this.esperBonuses.readFlag();
        this.esperMP.readFlag();
        this.esperEquipable.readFlag();
        this.esperMultiSummon.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.esperSpells.value == " -esr") {
            this.esperSpells.helpMessage = "Each esper teaches random number of spells within given range";
        } else {
            this.esperSpells.helpMessage = "";
        }

        if (this.esperBonuses.value == " -ebr") {
            this.esperBonuses.helpMessage = "Percent of espers with a level bonus";
        } else {
            this.esperBonuses.helpMessage = "";
        }

        if (this.esperMP.value == " -emps") {
            this.esperMP.helpMessage = "Original MP costs shuffled between espers";
        } else if (this.esperMP.value == " -emprv") {
            this.esperMP.helpMessage = "Each esper's MP cost set to random value within given range";
        } else if (this.esperMP.value == " -emprp") {
            this.esperMP.helpMessage = "Each esper's MP cost set to random percent of original within given range";
        } else {
            this.esperMP.helpMessage = "";
        }

        if (this.esperEquipable.value == " -eer") {
            this.esperEquipable.helpMessage = "Each esper equipable by between " + this.esperEquipableRandom.minValue + "-" + this.esperEquipableRandom.maxValue + " random characters";
        } else if (this.esperEquipable.value == " -eebr") {
            this.esperEquipable.helpMessage = "Each esper equipable by " + this.esperEquipableBalancedRandom.value + " random characters. Total number of espers equipable by each character is balanced";
        } else {
            this.esperEquipable.helpMessage = "Espers can be equipped by all characters";
        }
    }
}
