class FlagsColiseum {
    constructor(flags) {
        this.flags = flags;

        this.coliseumOpponents = new Select("coliseum_opponents", this.flags);
        this.coliseumRewards = new Select("coliseum_rewards", this.flags);
        this.coliseumRewardsVisible = new Select("coliseum_rewards_visible", this.flags);
        this.coliseumRewardsMenu = new Toggle("coliseum_rewards_menu", "-crm", this.flags);
        this.coliseumNoExpEggs = new Toggle("coliseum_no_exp_eggs", "-cnee", this.flags);
        this.coliseumNoIlluminas = new Toggle("coliseum_no_illuminas", "-cnil", this.flags);

        this.coliseumRewardsVisibleRandom = new MinMaxSlider("coliseum_rewards_visible_random", "-crvr", 255, 255, this.flags);
        this.coliseumRewardsVisible.addSubOption(this.coliseumRewardsVisibleRandom);
    }

    getFlags() {
        var flags = "";

        flags += this.coliseumOpponents.getFlag();
        flags += this.coliseumRewards.getFlag();
        flags += this.coliseumRewardsVisible.getFlag();
        flags += this.coliseumRewardsMenu.getFlag();
        flags += this.coliseumNoExpEggs.getFlag();
        flags += this.coliseumNoIlluminas.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.coliseumOpponents.readFlag();
        this.coliseumRewards.readFlag();
        this.coliseumRewardsVisible.readFlag();
        this.coliseumRewardsMenu.readFlag();
        this.coliseumNoExpEggs.readFlag();
        this.coliseumNoIlluminas.readFlag();

        this.updateHelp();
    }

    updateHelp() {
        if (this.coliseumRewardsVisible.value == " -crvr") {
            this.coliseumRewardsVisible.helpMessage = "Random number of rewards within given range visible before beginning the match. Remaining rewards will display as question marks";
        } else {
            this.coliseumRewardsVisible.helpMessage = "";
        }
    }
}
