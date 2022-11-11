let rom_select = document.getElementById("rom_select");
let rom_select_help = document.getElementById("rom_select_help");
let rom_file = document.getElementById("rom_file");
let rom_file_name = document.getElementById("rom_file_name");
let rom_error = document.getElementById("rom_error");

let rom_selected = document.getElementById("rom_selected");
let rom_name = document.getElementById("rom_name");
let clear_rom = document.getElementById("clear_rom");

function updateSelectedROM() {
    if (localStorage.getItem("rom_name") !== null && localStorage.getItem("rom_data") !== null) {
        rom_selected.style.display = null;
        rom_select.style.display = "none";
        rom_name.value = localStorage.getItem("rom_name");

        rom_select_help.style.display = null;
        rom_error.innerHTML = "";
        rom_error.style.display = "none";
        rom_file_name.textContent = "";
    } else {
        rom_selected.style.display = "none";
        rom_select.style.display = null;
    }
}
updateSelectedROM();

rom_file.addEventListener("change", async(evnt) => {
    let file = rom_file.files[0];
    rom_file_name.textContent = file.name;

    let reader = new FileReader();
    reader.onload = async function() {
        let rom_data = new Uint8Array(reader.result);
        rom_data = await removeHeader(rom_data);

        let result = await validROM(rom_data);
        if (!result.success) {
            rom_select_help.style.display = "none";
            rom_error.innerHTML = result.message;
            rom_error.style.display = null;
            return;
        }

        let data_string = "";
        let data_length = rom_data.byteLength;
        for (let i = 0; i < data_length; i++) {
            data_string += String.fromCharCode(rom_data[i]);
        }
        data_string = btoa(data_string);

        try {
            localStorage.setItem("rom_data", data_string);
            localStorage.setItem("rom_name", file.name);
        } catch(e) {
            rom_select_help.style.display = "none";
            rom_error.innerHTML = "Error storing ROM in local storage";
            rom_error.style.display = null;
            return;
        }

        updateSelectedROM();
    }
    reader.readAsArrayBuffer(file);
});

clear_rom.addEventListener("click", async(evnt) => {
    localStorage.removeItem("rom_data");
    localStorage.removeItem("rom_name");

    updateSelectedROM();
});
