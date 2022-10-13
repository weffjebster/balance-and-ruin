class FlagsShops {
    constructor(flags) {
        this.flags = flags;

        this.shopsInventory = new Select("shops_inventory", this.flags);
        this.shopsPrice = new Select("shops_price", this.flags);
        this.shopsSellFraction = new Select("shops_sell_fraction", this.flags);
        this.shopsDriedMeat = new Slider("shops_dried_meat", "-sdm", 1, this.flags);
        this.noPricelessItems = new Toggle("no_priceless_items", "-npi", this.flags);
        this.shopsNoBreakableRods = new Toggle("shops_no_breakable_rods", "-snbr", this.flags);
        this.shopsNoElementalShields = new Toggle("shops_no_elemental_shields", "-snes", this.flags);
        this.shopsNoSuperBalls = new Toggle("shops_no_super_balls", "-snsb", this.flags);
        this.shopsNoExpEggs = new Toggle("shops_no_exp_eggs", "-snee", this.flags);
        this.shopsNoIlluminas = new Toggle("shops_no_illuminas", "-snil", this.flags);

        this.shopsInventoryRandom = new Slider("shops_inventory_random", "-sisr", 0, this.flags);
        this.shopsInventory.addSubOption(this.shopsInventoryRandom);

        this.shopsPriceRandomValue = new MinMaxSlider("shops_price_random_value", "-sprv", 0, 65535, this.flags);
        this.shopsPrice.addSubOption(this.shopsPriceRandomValue);

        this.shopsPriceRandomPercent = new MinMaxSlider("shops_price_random_percent", "-sprp", 0, 200, this.flags, true);
        this.shopsPrice.addSubOption(this.shopsPriceRandomPercent);
    }

    getFlags() {
        var flags = "";

        flags += this.shopsInventory.getFlag();
        flags += this.shopsPrice.getFlag();
        flags += this.shopsSellFraction.getFlag();
        flags += this.shopsDriedMeat.getFlag();
        flags += this.noPricelessItems.getFlag();
        flags += this.shopsNoBreakableRods.getFlag();
        flags += this.shopsNoElementalShields.getFlag();
        flags += this.shopsNoSuperBalls.getFlag();
        flags += this.shopsNoExpEggs.getFlag();
        flags += this.shopsNoIlluminas.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.shopsInventory.readFlag();
        this.shopsPrice.readFlag();
        this.shopsSellFraction.readFlag();
        this.shopsDriedMeat.readFlag();

        this.noPricelessItems.readFlag();
        this.shopsNoBreakableRods.readFlag();
        this.shopsNoElementalShields.readFlag();
        this.shopsNoSuperBalls.readFlag();
        this.shopsNoExpEggs.readFlag();
        this.shopsNoIlluminas.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.shopsPrice.value == " -sprv") {
            this.shopsPrice.helpMessage = "Each item's price set to random value within given range";
        } else if (this.shopsPrice.value == " -sprp") {
            this.shopsPrice.helpMessage = "Each item's price set to random percent of original within given range";
        } else {
            this.shopsPrice.helpMessage = "";
        }

        if (this.shopsSellFraction.value == " -ssf4") {
            this.shopsSellFraction.helpMessage = "Items sell for 1/4 their price";
        } else if (this.shopsSellFraction.value == " -ssf8") {
            this.shopsSellFraction.helpMessage = "Items sell for 1/8 their price";
        } else if (this.shopsSellFraction.value == " -ssf0") {
            this.shopsSellFraction.helpMessage = "Items sell for zero";
        } else {
            this.shopsSellFraction.helpMessage = "Items sell for 1/2 their price";
        }
    }
}
