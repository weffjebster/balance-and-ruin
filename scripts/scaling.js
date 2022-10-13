class FlagsScaling {
    constructor(flags) {
        this.flags = flags;

        this.levelScaling = new Select("level_scaling", this.flags);
        this.hpmpScaling = new Select("hp_mp_scaling", this.flags);
        this.xpgpScaling = new Select("xp_gp_scaling", this.flags);
        this.abilityScaling = new Select("ability_scaling", this.flags);
        this.maxScaleLevel = new Slider("max_scale_level", "-msl", 99, this.flags);

        this.scaleEightDragons = new Toggle("scale_eight_dragons", "-sed", this.flags);
        this.scaleFinalBattles = new Toggle("scale_final_battles", "-sfb", this.flags);

        this.levelScalingAverage = new Slider("level_scaling_average", "-lsa", 1.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingAverage);
        this.levelScalingHighest = new Slider("level_scaling_highest", "-lsh", 1.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingHighest);
        this.levelScalingCE = new Slider("level_scaling_ce", "-lsce", 2.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingCE);
        this.levelScalingCED = new Slider("level_scaling_ced", "-lsced", 2.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingCED);
        this.levelScalingChecks = new Slider("level_scaling_checks", "-lsc", 2.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingChecks);
        this.levelScalingTime = new Slider("level_scaling_time", "-lst", 2.0, this.flags, 0.5);
        this.levelScaling.addSubOption(this.levelScalingTime);

        this.hpmpScalingAverage = new Slider("hp_mp_scaling_average", "-hma", 1.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingAverage);
        this.hpmpScalingHighest = new Slider("hp_mp_scaling_highest", "-hmh", 1.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingHighest);
        this.hpmpScalingCE = new Slider("hp_mp_scaling_ce", "-hmce", 2.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingCE);
        this.hpmpScalingCED = new Slider("hp_mp_scaling_ced", "-hmced", 2.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingCED);
        this.hpmpScalingChecks = new Slider("hp_mp_scaling_checks", "-hmc", 2.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingChecks);
        this.hpmpScalingTime = new Slider("hp_mp_scaling_time", "-hmt", 2.0, this.flags, 0.5);
        this.hpmpScaling.addSubOption(this.hpmpScalingTime);

        this.xpgpScalingAverage = new Slider("xp_gp_scaling_average", "-xga", 1.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingAverage);
        this.xpgpScalingHighest = new Slider("xp_gp_scaling_highest", "-xgh", 1.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingHighest);
        this.xpgpScalingCE = new Slider("xp_gp_scaling_ce", "-xgce", 2.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingCE);
        this.xpgpScalingCED = new Slider("xp_gp_scaling_ced", "-xgced", 2.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingCED);
        this.xpgpScalingChecks = new Slider("xp_gp_scaling_checks", "-xgc", 2.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingChecks);
        this.xpgpScalingTime = new Slider("xp_gp_scaling_time", "-xgt", 2.0, this.flags, 0.5);
        this.xpgpScaling.addSubOption(this.xpgpScalingTime);

        this.abilityScalingElement = new Slider("ability_scaling_element", "-ase", 2.0, this.flags, 0.5);
        this.abilityScaling.addSubOption(this.abilityScalingElement);
        this.abilityScalingRandom = new Slider("ability_scaling_random", "-asr", 2.0, this.flags, 0.5);
        this.abilityScaling.addSubOption(this.abilityScalingRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.levelScaling.getFlag();
        flags += this.hpmpScaling.getFlag();
        flags += this.xpgpScaling.getFlag();
        flags += this.abilityScaling.getFlag();
        flags += this.maxScaleLevel.getFlag();

        flags += this.scaleEightDragons.getFlag();
        flags += this.scaleFinalBattles.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.levelScaling.readFlag();
        this.hpmpScaling.readFlag();
        this.xpgpScaling.readFlag();
        this.abilityScaling.readFlag();
        this.maxScaleLevel.readFlag();

        this.scaleEightDragons.readFlag();
        this.scaleFinalBattles.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.levelScaling.value == " -lsa") {
            this.levelScaling.helpMessage = "Enemy and boss levels equal to " + this.levelScalingAverage.value + "x party average level";
        } else if (this.levelScaling.value == " -lsh") {
            this.levelScaling.helpMessage = "Enemy and boss levels equal to " + this.levelScalingHighest.value + "x highest level in party";
        } else if (this.levelScaling.value == " -lsce") {
            this.levelScaling.helpMessage = "Enemies and bosses gain " + this.levelScalingCE.value + " levels for each character recruited and esper acquired";
        } else if (this.levelScaling.value == " -lsced") {
            this.levelScaling.helpMessage = "Enemies and bosses gain " + this.levelScalingCED.value + " levels for each character recruited, esper acquired, and dragon defeated";
        } else if (this.levelScaling.value == " -lsc") {
            this.levelScaling.helpMessage = "Enemies and bosses gain " + this.levelScalingChecks.value + " levels for each check completed";
        } else if (this.levelScaling.value == " -lst") {
            this.levelScaling.helpMessage = "Enemies and bosses gain 1 level every " + this.levelScalingTime.value + " minutes";
        } else {
            this.levelScaling.helpMessage = "Enemy and boss levels not scaled";
        }

        if (this.hpmpScaling.value == " -hma") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales " + this.hpmpScalingAverage.value + "x party average level";
        } else if (this.hpmpScaling.value == " -hmh") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales " + this.hpmpScalingHighest.value + "x highest level in party";
        } else if (this.hpmpScaling.value == " -hmce") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales " + this.hpmpScalingCE.value + "x each character recruited and esper acquired";
        } else if (this.hpmpScaling.value == " -hmced") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales " + this.hpmpScalingCED.value + "x each character recruited, esper acquired, and dragon defeated";
        } else if (this.hpmpScaling.value == " -hmc") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales " + this.hpmpScalingChecks.value + "x each check completed";
        } else if (this.hpmpScaling.value == " -hmt") {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp scales every " + this.hpmpScalingTime.value + "x minutes";
        } else {
            this.hpmpScaling.helpMessage = "Enemy and boss hp/mp not scaled";
        }

        if (this.xpgpScaling.value == " -xga") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales " + this.xpgpScalingAverage.value + "x party average level";
        } else if (this.xpgpScaling.value == " -xgh") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales " + this.xpgpScalingHighest.value + "x highest level in party";
        } else if (this.xpgpScaling.value == " -xgce") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales " + this.xpgpScalingCE.value + "x each character recruited and esper acquired";
        } else if (this.xpgpScaling.value == " -xgced") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales " + this.xpgpScalingCED.value + "x each character recruited, esper acquired, and dragon defeated";
        } else if (this.xpgpScaling.value == " -xgc") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales " + this.xpgpScalingChecks.value + "x each check completed";
        } else if (this.xpgpScaling.value == " -xgt") {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp scales every " + this.xpgpScalingTime.value + "x minutes";
        } else {
            this.xpgpScaling.helpMessage = "Enemy and boss exp/gp not scaled";
        }

        if (this.abilityScaling.value == " -ase") {
            var value = this.abilityScalingElement.value;
            if (this.flags.helpers.isUnsignedInt(value)) {
                var value = parseInt(value, 10) + 3;
            } else {
                var value = parseFloat(value) + 3.0;
            }
            this.abilityScaling.helpMessage = "Enemy and boss abilities retain element and increase in tier approximately every " + value + " levels reaching max tier at level " + (value * 8);
        } else if (this.abilityScaling.value == " -asr") {
            var value = this.abilityScalingRandom.value;
            if (this.flags.helpers.isUnsignedInt(value)) {
                var value = parseInt(value, 10) + 3;
            } else {
                var value = parseFloat(value) + 3.0;
            }
            this.abilityScaling.helpMessage = "Enemy and boss abilities increase in tier approximately every " + value + " levels reaching max tier at level " + (value * 8);
        } else {
            this.abilityScaling.helpMessage = "Enemy and boss abilities not scaled";
        }
    }
}
