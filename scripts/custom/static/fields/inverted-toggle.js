class InvertedToggle extends Toggle {
    getFlag() {
        if (!this.checked) {
            return " " + this.flag;
        }
        return "";
    }

    readFlag() {
        this.checked = !this.flags.helpers.exists(this.flag);
    }
}
