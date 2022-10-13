class FlagsNaturalMagic {
    constructor(flags) {
        this.flags = flags;

        this.naturalMagic1 = new SelectValue("natural_magic1", "-nm1", "", this.flags);
        this.randomizeNaturalLevels1 = new Toggle("randomize_natural_levels1", "-rnl1", this.flags);
        this.randomizeNaturalSpells1 = new Toggle("randomize_natural_spells1", "-rns1", this.flags);

        this.naturalMagic2 = new SelectValue("natural_magic2", "-nm2", "", this.flags);
        this.randomizeNaturalLevels2 = new Toggle("randomize_natural_levels2", "-rnl2", this.flags);
        this.randomizeNaturalSpells2 = new Toggle("randomize_natural_spells2", "-rns2", this.flags);

        this.naturalMagicMenuIndicator = new Toggle("natural_magic_menu_indicator", "-nmmi", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.naturalMagic1.getFlag();
        flags += this.randomizeNaturalLevels1.getFlag();
        flags += this.randomizeNaturalSpells1.getFlag();

        flags += this.naturalMagic2.getFlag();
        flags += this.randomizeNaturalLevels2.getFlag();
        flags += this.randomizeNaturalSpells2.getFlag();

        flags += this.naturalMagicMenuIndicator.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.naturalMagic1.readFlag();
        this.randomizeNaturalLevels1.readFlag();
        this.randomizeNaturalSpells1.readFlag();

        this.naturalMagic2.readFlag();
        this.randomizeNaturalLevels2.readFlag();
        this.randomizeNaturalSpells2.readFlag();

        this.naturalMagicMenuIndicator.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
