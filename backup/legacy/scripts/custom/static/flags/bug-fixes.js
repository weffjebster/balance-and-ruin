class FlagsBugFixes {
    constructor(flags) {
        this.flags = flags;

        this.sketchBugFix = new Toggle("sketch_bug_fix", "-fs", this.flags);
        this.evadeBugFix = new Toggle("evade_bug_fix", "-fe", this.flags);
        this.vanishDoomBugFix = new Toggle("vanish_doom_bug_fix", "-fvd", this.flags);
        this.retortBugFix = new Toggle("retort_bug_fix", "-fr", this.flags);
        this.jumpBugFix = new Toggle("jump_bug_fix", "-fj", this.flags);
        this.bossSkipFix = new Toggle("boss_skip_fix", "-fbs", this.flags);
        this.enemyDamageCounterFix = new Toggle("enemy_damage_counter_fix", "-fedc", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.sketchBugFix.getFlag();
        flags += this.evadeBugFix.getFlag();
        flags += this.vanishDoomBugFix.getFlag();
        flags += this.retortBugFix.getFlag();
        flags += this.jumpBugFix.getFlag();
        flags += this.bossSkipFix.getFlag();
        flags += this.enemyDamageCounterFix.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.sketchBugFix.readFlag();
        this.evadeBugFix.readFlag();
        this.vanishDoomBugFix.readFlag();
        this.retortBugFix.readFlag();
        this.jumpBugFix.readFlag();
        this.bossSkipFix.readFlag();
        this.enemyDamageCounterFix.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
