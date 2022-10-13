// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.oldValue = "";
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
};

function minMaxFilter(field) {
    setInputFilter(field.input, function(value) {
        if (field.min < 0) {
            if (!/^-?\d*$/.test(value)) {
                return false;
            }
            return value === '-' || (parseInt(value, 10) >= field.min && parseInt(value, 10) <= field.max);
        }
        return /^\d*$/.test(value) && (parseInt(value, 10) >= field.min && parseInt(value, 10) <= field.max);
    });
}

function decimalMinMaxFilter(field) {
    setInputFilter(field.input, function(value) {
        return /\d+(\.\d*)?/.test(value) && (parseFloat(value) >= field.min && parseFloat(value) <= field.max && (parseFloat(value) * 1000) % (field.step * 1000) == 0);
    });
}
