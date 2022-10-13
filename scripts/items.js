class FlagsItems {
    constructor(flags) {
        this.flags = flags;

        this.itemsEquipable = new Select("items_equipable", this.flags);
        this.itemsEquipableRelic = new Select("items_equipable_relic", this.flags);
        this.cursedShieldBattles = new MinMaxSlider("cursed_shield_battles", "-csb", 256, 256, this.flags);
        this.moogleCharmAll = new Toggle("moogle_charm_all", "-mca", this.flags);
        this.swdTechRunicAll = new Toggle("swdtech_runic_all", "-stra", this.flags);
        this.strongerAtmaWeapon = new Toggle("stronger_atma_weapon", "-saw", this.flags);

        // equipment
        this.itemsEquipableRandom = new MinMaxSlider("items_equipable_random", "-ier", 1, 14, this.flags);
        this.itemsEquipable.addSubOption(this.itemsEquipableRandom);

        this.itemsEquipableBalancedRandom = new Slider("items_equipable_balanced_random", "-iebr", 7, this.flags);
        this.itemsEquipable.addSubOption(this.itemsEquipableBalancedRandom);

        this.itemsEquipableOriginalRandom = new Slider("items_equipable_original_random", "-ieor", 20, this.flags);
        this.itemsEquipable.addSubOption(this.itemsEquipableOriginalRandom);

        this.itemsEquipableShuffleRandom = new Slider("items_equipable_shuffle_random", "-iesr", 20, this.flags);
        this.itemsEquipable.addSubOption(this.itemsEquipableShuffleRandom);

        // relics
        this.itemsEquipableRelicRandom = new MinMaxSlider("items_equipable_relic_random", "-ierr", 1, 14, this.flags);
        this.itemsEquipableRelic.addSubOption(this.itemsEquipableRelicRandom);

        this.itemsEquipableRelicBalancedRandom = new Slider("items_equipable_relic_balanced_random", "-ierbr", 7, this.flags);
        this.itemsEquipableRelic.addSubOption(this.itemsEquipableRelicBalancedRandom);

        this.itemsEquipableRelicOriginalRandom = new Slider("items_equipable_relic_original_random", "-ieror", 20, this.flags);
        this.itemsEquipableRelic.addSubOption(this.itemsEquipableRelicOriginalRandom);

        this.itemsEquipableRelicShuffleRandom = new Slider("items_equipable_relic_shuffle_random", "-iersr", 20, this.flags);
        this.itemsEquipableRelic.addSubOption(this.itemsEquipableRelicShuffleRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.itemsEquipable.getFlag();
        flags += this.itemsEquipableRelic.getFlag();
        flags += this.cursedShieldBattles.getFlag();
        flags += this.moogleCharmAll.getFlag();
        flags += this.swdTechRunicAll.getFlag();
        flags += this.strongerAtmaWeapon.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.itemsEquipable.readFlag();
        this.itemsEquipableRelic.readFlag();
        this.cursedShieldBattles.readFlag();
        this.moogleCharmAll.readFlag();
        this.swdTechRunicAll.readFlag();
        this.strongerAtmaWeapon.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.itemsEquipable.value == " -ier") {
            this.itemsEquipable.helpMessage = "Each item equipable by between " + this.itemsEquipableRandom.min + "-" + this.itemsEquipableRandom.max + " random characters";
        } else if (this.itemsEquipable.value == " -iebr") {
            this.itemsEquipable.helpMessage = "Each item equipable by " + this.itemsEquipableBalancedRandom.value + " random characters. Total number of items equipable by each character is balanced";
        } else if (this.itemsEquipable.value == " -ieor") {
            if (this.itemsEquipableOriginalRandom.value >= 0) {
                this.itemsEquipable.helpMessage = "Characters have a " + this.itemsEquipableOriginalRandom.value + "% chance of being able to equip each item they could not previously equip";
            } else {
                this.itemsEquipable.helpMessage = "Characters have a " + -this.itemsEquipableOriginalRandom.value + "% chance of not being able to equip each item they could previously equip";
            }
        } else if (this.itemsEquipable.value == " -iesr") {
            if (this.itemsEquipableShuffleRandom.value >= 0) {
                this.itemsEquipable.helpMessage = "Shuffle character equipment. After randomization, characters have a " + this.itemsEquipableShuffleRandom.value + "% chance of being able to equip each item they could not previously equip";
            } else {
                this.itemsEquipable.helpMessage = "Shuffle character equipment. After randomization, characters have a " + -this.itemsEquipableShuffleRandom.value + "% chance of not being able to equip each item they could previously equip";
            }
        } else {
            this.itemsEquipable.helpMessage = "Equipment characters can wear unmodified";
        }

        if (this.itemsEquipableRelic.value == " -ierr") {
            this.itemsEquipableRelic.helpMessage = "Each relic equipable by between " + this.itemsEquipableRelicRandom.min + "-" + this.itemsEquipableRelicRandom.max + " random characters";
        } else if (this.itemsEquipableRelic.value == " -ierbr") {
            this.itemsEquipableRelic.helpMessage = "Each relic equipable by " + this.itemsEquipableRelicBalancedRandom.value + " random characters. Total number of relics equipable by each character is balanced";
        } else if (this.itemsEquipableRelic.value == " -ieror") {
            if (this.itemsEquipableRelicOriginalRandom.value >= 0) {
                this.itemsEquipableRelic.helpMessage = "Characters have a " + this.itemsEquipableRelicOriginalRandom.value + "% chance of being able to equip each relic they could not previously equip";
            } else {
                this.itemsEquipableRelic.helpMessage = "Characters have a " + -this.itemsEquipableRelicOriginalRandom.value + "% chance of not being able to equip each relic they could previously equip";
            }
        } else if (this.itemsEquipableRelic.value == " -iersr") {
            if (this.itemsEquipableRelicShuffleRandom.value >= 0) {
                this.itemsEquipableRelic.helpMessage = "Shuffle character relics. After randomization, characters have a " + this.itemsEquipableRelicShuffleRandom.value + "% chance of being able to equip each relic they could not previously equip";
            } else {
                this.itemsEquipableRelic.helpMessage = "Shuffle character relics. After randomization, characters have a " + -this.itemsEquipableRelicShuffleRandom.value + "% chance of not being able to equip each relic they could previously equip";
            }
        } else {
            this.itemsEquipableRelic.helpMessage = "Relics characters can wear unmodified";
        }
    }
}
