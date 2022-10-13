let csrf_field = document.getElementById("csrf_token");

class SeedField {
    constructor(button_id, error_id) {
        this.button = document.getElementById(button_id);
        this.error = document.getElementById(error_id);

        this.form = this.button.form;
    }

    clearErrors() {
        this.error.innerHTML = "";
        this.error.style.display = "none";
    }

    displayError(message) {
        this.error.innerHTML += message;
        this.error.style.display = null;
    }

    reset() {
        try {
            grecaptcha.reset();
        } catch (e) {
        }
        this.enableButton();
    }

    disableButton() {
        this.button.disabled = true;
        this.button.classList.add("is-loading");
    }

    enableButton() {
        this.button.disabled = false;
        this.button.classList.remove("is-loading");
    }

    formValues() {
        return Object.values(this.form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {});
    }
}

async function fetchSeed(original_rom, seed_field, fetch_url) {
    let form_values = seed_field.formValues();
    if (localStorage.getItem("rom_name") != null) {
        form_values["rom_file"] = localStorage.getItem("rom_name");
    }

    let result = await postResult(fetch_url, csrf_field.value, form_values, seed_field.displayError.bind(seed_field));
    if (result === null || !result.success) {
        return;
    }

    let patch_file, log_file;
    let zip = await JSZip.loadAsync(result.data, {base64 : true});
    for (let key in zip.files) {
        let entry = zip.files[key];
        if (entry.name.endsWith(".patch")) {
            patch_file = entry;
        } else if (entry.name.endsWith(".txt")) {
            log_file = entry;
        }
        delete zip.files[key];
    }

    let base_name = "ff6wc_" + log_file.name.substring(0, log_file.name.lastIndexOf('.'));
    log_file.name = base_name + ".txt";
    zip.files[log_file.name] = log_file;

    let patch = await patch_file.async("uint8array");
    let rom = await XDelta3Decoder.decode(patch, original_rom);
    let rom_ext = localStorage.getItem("rom_name").substring(localStorage.getItem("rom_name").lastIndexOf('.'));
    let zip_file = await zip.file(base_name + rom_ext, rom, {binary: true, compression: "STORE", date: log_file.date})
                            .generateAsync({type: "blob", compression: "STORE"});
    await saveAs(zip_file, base_name + ".zip");
}

async function readAndFetch(seed_field, fetch_url) {
    seed_field.clearErrors();
    seed_field.disableButton();

    if (localStorage.getItem("rom_name") == null || localStorage.getItem("rom_data") == null) {
        seed_field.displayError("Please select a v1.0 US ROM file");
        seed_field.enableButton();
        return;
    }

    let byte_data = atob(localStorage.getItem("rom_data"));
    let rom_data = new Uint8Array(byte_data.length);
    for (let i = 0; i < byte_data.length; i++) {
        rom_data[i] = byte_data.charCodeAt(i);
    }

    let result = await validROM(rom_data);
    if (!result.success) {
        seed_field.displayError(result.message);
        seed_field.enableButton();
        return;
    }

    await fetchSeed(rom_data, seed_field, fetch_url);
    seed_field.reset();
}

function addGenerateCustomListener(button_id, error_id) {
    let seed_field = new SeedField(button_id, error_id);
    seed_field.button.addEventListener("click", async(evnt) => {
        evnt.preventDefault();

        readAndFetch(seed_field, "/custom/generate");
    });
}

function addGeneratePresetListener(preset_name, button_id, error_id) {
    let preset_name_input = document.getElementById("preset_name");
    let seed_field = new SeedField(button_id, error_id);
    seed_field.button.addEventListener("click", async(evnt) => {
        evnt.preventDefault();

        preset_name_input.value = preset_name;

        readAndFetch(seed_field, "/generate-preset");
    });
}

function addDownloadListener(seed_id, button_id, error_id) {
    let seed_id_input = document.getElementById("seed_id");
    let seed_field = new SeedField(button_id, error_id);
    seed_field.button.addEventListener("click", async(evnt) => {
        evnt.preventDefault();

        seed_id_input.value = seed_id;

        readAndFetch(seed_field, "/download-seed");
    });
}
