class Toggle {
    constructor(id, flag, flags) {
        this.id = id;
        this.flag = flag;
        this.flags = flags;

        this.toggle = document.getElementById(this.id);
        this.field = document.getElementById(this.id + "_switch_field");
        this.help = document.getElementById(this.id + "_help");

        this.flags.helpers.addUpdateFlagsEvent(this.toggle);
    }

    get checked() {
        return this.toggle.checked;
    }

    set checked(check) {
        this.toggle.checked = check;
    }

    getFlag() {
        if (this.checked) {
            return " " + this.flag;
        }
        return "";
    }

    readFlag() {
        this.checked = this.flags.helpers.exists(this.flag);
    }
}
