class FlagsGraphics {
    constructor(flags) {
        this.flags = flags

        this.palettePreviews = [];
        this.portraitPreviews = [];
        this.spritePreviews = [];

        this.nameInputs = [];
        this.paletteSelects = [];
        this.portraitSelects = [];
        this.spriteSelects = [];
        this.spritePaletteSelects = [];

        this.originalNames = ["TERRA", "LOCKE", "CYAN", "SHADOW", "EDGAR", "SABIN", "CELES", "STRAGO", "RELM", "SETZER", "MOG", "GAU", "GOGO", "UMARO"];
        this.originalNameFlags = this.originalNames.join('.');

        this.originalPalettes = [0, 1, 2, 3, 4, 5, 6];
        this.originalPaletteFlags = this.originalPalettes.join('.');

        this.originalPortraits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this.originalPortraitFlags = this.originalPortraits.join('.');

        this.originalSprites = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21];
        this.originalSpriteFlags = this.originalSprites.join('.');

        this.originalSpritePalettes = [2, 1, 4, 4, 0, 0, 0, 3, 3, 4, 5, 3, 3, 5, 1, 0, 6, 1, 0, 3];
        this.originalSpritePaletteFlags = this.originalSpritePalettes.join('.');

        var nameCount = 14;
        for (var i = 0; i < nameCount; i++) {
            var input = document.getElementById("char_name" + i);
            this.nameInputs.push(input);
            this.flags.helpers.addUpdateFlagsEvent(input);

            ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
                this.nameInputs[i].addEventListener(event, function() {
                    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
                });
            }, this);
        }

        var palettePreviewCount = 7;
        for (var i = 0; i < palettePreviewCount; i++) {
            var select = document.getElementById("char_palette" + i);
            var canvas = document.getElementById("char_palette" + i + "_canvas");
            var palettePreview = new PalettePreview(i, select, canvas);
            this.palettePreviews.push(palettePreview);

            this.paletteSelects.push(select);
            this.flags.helpers.addUpdateFlagsEvent(select);

            select.addEventListener("change", function(palettePreview) {
                this.updatePalettePreview(palettePreview);
            }.bind(this, palettePreview));

            this.updatePalettePreview(palettePreview);
        }

        var portraitPreviewCount = 15;
        for (var i = 0; i < portraitPreviewCount; i++) {
            var select = document.getElementById("char_portrait" + i);
            var canvas = document.getElementById("char_portrait" + i + "_canvas");
            var portraitPreview = new PortraitPreview(i, select, canvas);
            this.portraitPreviews.push(portraitPreview);

            this.portraitSelects.push(select);
            this.flags.helpers.addUpdateFlagsEvent(select);

            select.addEventListener("change", function(portraitPreview) {
                this.updatePortraitPreview(portraitPreview);
            }.bind(this, portraitPreview));

            this.updatePortraitPreview(portraitPreview);
        }

        var spritePreviewCount = 20;
        for (var i = 0; i < spritePreviewCount; i++) {
            var spriteSelect = document.getElementById("char_sprite" + i);
            var spritePaletteSelect = document.getElementById("char_sprite_palette" + i);

            var canvas = document.getElementById("char_sprite" + i + "_canvas");
            var spritePreview = new SpritePreview(i, spriteSelect, spritePaletteSelect, canvas);
            this.spritePreviews.push(spritePreview);

            this.spriteSelects.push(spriteSelect);
            this.spritePaletteSelects.push(spritePaletteSelect);
            this.flags.helpers.addUpdateFlagsEvent(spriteSelect);
            this.flags.helpers.addUpdateFlagsEvent(spritePaletteSelect);

            spriteSelect.addEventListener("change", function(spritePreview) {
                this.updateSpritePreview(spritePreview);
            }.bind(this, spritePreview));
            spritePaletteSelect.addEventListener("change", function(spritePreview) {
                this.updateSpritePreview(spritePreview);
            }.bind(this, spritePreview));

            this.updateSpritePreview(spritePreview);
        }

        this.presetSelect = document.getElementById("graphics_preset");
        this.presetSelect.addEventListener("change", this.updateGraphicsPreset.bind(this));

        window.addEventListener("resize", function(event) {
            var newWidth = event.target.outerWidth;
            var newHeight = event.target.outerHeight;

            if (newWidth > 480) {
                this.resizePalettePreviews(384, 24);
            } else {
                this.resizePalettePreviews(256, 16);
            }

        }.bind(this));

        this.randomizePalettesButton = document.getElementById("randomizePalettes");
        this.randomizeSpritesButton = document.getElementById("randomizeSprites");
        this.randomizePortraitsButton = document.getElementById("randomizePortraits");
        this.randomizePalettesButton.addEventListener("click", this.randomizePalettes.bind(this));
        this.randomizeSpritesButton.addEventListener("click", this.randomizeSprites.bind(this));
        this.randomizePortraitsButton.addEventListener("click", this.randomizePortraits.bind(this));
    }

    async request(url, callback) {
        const response = await fetch(url);

        if (!response.ok) {
            return;
        }
        let result;
        try {
            result = await response.json();
        } catch (e) {
            return;
        }

        await callback(result);
    }

    updatePalettePreview(palettePreview) {
        let url = "/custom/palette/" + palettePreview.selected();
        this.request(url, this.updatePalettePreviewCallback.bind(this, palettePreview));
    }

    updatePalettePreviewCallback(palettePreview, data) {
        palettePreview.draw(data);
        for (var i = 0; i < this.spritePreviews.length; i++) {
            if (this.spritePreviews[i].selectedPalette() == palettePreview.id) {
                this.updateSpritePreview(this.spritePreviews[i]);
            }
        }
    }

    updateSpritePreview(spritePreview) {
        let palettePreview = this.palettePreviews[spritePreview.selectedPalette()];

        let url = "/custom/sprite/" + spritePreview.selectedSprite() + "/" + palettePreview.selected();
        this.request(url, spritePreview.draw.bind(spritePreview));
    }

    updatePortraitPreview(portraitPreview) {
        let url = "/custom/portrait/" + portraitPreview.selected();
        this.request(url, portraitPreview.draw.bind(portraitPreview));
    }

    resizePalettePreviews(newWidth, newHeight) {
        for (var i = 0; i < this.palettePreviews.length; i++) {
            if (this.palettePreviews[i].canvas.width != newWidth || this.palettePreviews[i].canvas.height != newHeight) {
                this.palettePreviews[i].canvas.width = newWidth;
                this.palettePreviews[i].canvas.height = newHeight;
                this.updatePalettePreview(this.palettePreviews[i]);
            }
        }
    }

    getFlags() {
        var flags = "";

        function getMultiInputFlags(inputs) {
            var flags = "";
            for (var index = 0; index < inputs.length; index++) {
                flags += inputs[index].value + '.';
            }
            return flags.slice(0, -1);
        }

        var nameFlags = getMultiInputFlags(this.nameInputs);
        if (nameFlags != this.originalNameFlags) {
            flags += " -name " + nameFlags;
        }

        var paletteFlags = getMultiInputFlags(this.paletteSelects);
        if (paletteFlags != this.originalPaletteFlags) {
            flags += " -cpal " + paletteFlags;
        }

        var portraitFlags = getMultiInputFlags(this.portraitSelects);
        if (portraitFlags != this.originalPortraitFlags) {
            flags += " -cpor " + portraitFlags;
        }

        var spriteFlags = getMultiInputFlags(this.spriteSelects);
        if (spriteFlags != this.originalSpriteFlags) {
            flags += " -cspr " + spriteFlags;
        }

        var spritePaletteFlags = getMultiInputFlags(this.spritePaletteSelects);
        if (spritePaletteFlags != this.originalSpritePaletteFlags) {
            flags += " -cspp " + spritePaletteFlags;
        }

        this.updateHelp();
        return flags;
    }

    updateFields() {
        var nameArray = this.flags.helpers.value("-name").split('.');
        if (nameArray.length == this.originalNames.length) {
            for (var i = 0; i < nameArray.length; i++) {
                var name = nameArray[i].replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
                this.nameInputs[i].value = name;
            }
        } else {
            for (var i = 0; i < this.nameInputs.length; i++) {
                this.nameInputs[i].value = this.originalNames[i];
            }
        }

        function getValueArray(flag, selects, defaults) {
            var valueArray = this.flags.helpers.value(flag).split('.');
            if (valueArray.length == defaults.length) {
                for (var i = 0; i < valueArray.length; i++) {
                    var value = parseInt(valueArray[i]);
                    if (isNaN(value) || value < 0) {
                        valueArray[i] = defaults[i];
                    }
                }
                return valueArray;
            }
            return defaults;
        };

        function updateSelectPreview(flag, selects, defaults, previews, callback) {
            var valueArray = getValueArray.call(this, flag, selects, defaults);
            for (var i = 0; i < valueArray.length; i++) {
                if (selects[i].value != valueArray[i]) {
                    selects[i].value = valueArray[i];
                    callback.call(this, previews[i]);
                }
            }
        };

        updateSelectPreview.call(this, "-cpal", this.paletteSelects, this.originalPalettes, this.palettePreviews, this.updatePalettePreview);
        updateSelectPreview.call(this, "-cpor", this.portraitSelects, this.originalPortraits, this.portraitPreviews, this.updatePortraitPreview);

        var spriteValues = getValueArray.call(this, "-cspr", this.spriteSelects, this.originalSprites);
        var spritePaletteValues = getValueArray.call(this, "-cspp", this.spritePaletteSelects, this.originalSpritePalettes);
        for (var i = 0; i < this.spritePreviews.length; i++) {
            var updateSpritePreview = false;
            if (this.spriteSelects[i].value != spriteValues[i]) {
                this.spriteSelects[i].value = spriteValues[i];
                updateSpritePreview = true;
            }
            if (this.spritePaletteSelects[i].value != spritePaletteValues[i]) {
                this.spritePaletteSelects[i].value = spritePaletteValues[i];
                updateSpritePreview = true;
            }

            if (updateSpritePreview) {
                this.updateSpritePreview.call(this, this.spritePreviews[i]);
            }
        }

        this.updateHelp();
    }

    updateHelp() {
    }

    updateGraphicsPreset() {
        // replace flags with only the graphics preset
        this.flags.helpers.setFlags(this.presetSelect.value.trim());

        // update the graphics fields based on the preset flags
        this.updateFields();

        // restore general flags and get updated graphics flags
        this.flags.updateFlags();
    }

    randomizePalettes() {
        var randOptions = nRandomUniqueOptions(this.paletteSelects[0], this.paletteSelects.length);
        for (var i = 0; i < this.paletteSelects.length; i++) {
            this.paletteSelects[i].selectedIndex = randOptions[i];
            this.updatePalettePreview(this.palettePreviews[i]);
        }

        for (var i = 0; i < this.spritePaletteSelects.length; i++) {
            var randIndex = Math.floor(Math.random() * this.spritePaletteSelects[i].length);
            this.spritePaletteSelects[i].selectedIndex = randIndex;
        }

        for (var i = 0; i < this.spriteSelects.length; i++) {
            this.updateSpritePreview(this.spritePreviews[i]);
        }

        this.flags.updateFlags();
    }

    randomizeSprites() {
        var randOptions = nRandomUniqueOptions(this.spriteSelects[0], this.spriteSelects.length);
        for (var i = 0; i < this.spriteSelects.length; i++) {
            this.spriteSelects[i].selectedIndex = randOptions[i];
            this.updateSpritePreview(this.spritePreviews[i]);
        }
        this.flags.updateFlags();
    }

    randomizePortraits() {
        var randOptions = nRandomUniqueOptions(this.portraitSelects[0], this.portraitSelects.length);
        for (var i = 0; i < this.portraitSelects.length; i++) {
            this.portraitSelects[i].selectedIndex = randOptions[i];
            this.updatePortraitPreview(this.portraitPreviews[i]);
        }
        this.flags.updateFlags();
    }
}
