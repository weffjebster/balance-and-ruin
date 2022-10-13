class FlagsChallenges {
    constructor(flags) {
        this.flags = flags;

        this.noMoogleCharms = new Toggle("no_moogle_charms", "-nmc", this.flags);
        this.noExpEggs = new Toggle("no_exp_eggs", "-nee", this.flags);
        this.noIlluminas = new Toggle("no_illuminas", "-nil", this.flags);
        this.noUltima = new Toggle("no_ultima", "-nu", this.flags);
        this.noFreePaladinShields = new Toggle("no_free_paladin_shields", "-nfps", this.flags);
        this.noFreeCharactersEspers = new Toggle("no_free_characters_espers", "-nfce", this.flags);
        this.permadeath = new Toggle("permadeath", "-pd", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.noMoogleCharms.getFlag();
        flags += this.noExpEggs.getFlag();
        flags += this.noIlluminas.getFlag();
        flags += this.noFreePaladinShields.getFlag();
        flags += this.noUltima.getFlag();
        flags += this.noFreeCharactersEspers.getFlag();
        flags += this.permadeath.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.noMoogleCharms.readFlag();
        this.noExpEggs.readFlag();
        this.noIlluminas.readFlag();
        this.noFreePaladinShields.readFlag();
        this.noUltima.readFlag();
        this.noFreeCharactersEspers.readFlag();
        this.permadeath.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
