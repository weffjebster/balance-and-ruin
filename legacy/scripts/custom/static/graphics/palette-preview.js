class PalettePreview {
    constructor(id, select, canvas) {
        this.id = id;
        this.select = select;

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.drawn = false;
    }

    draw(rgb_data) {
        var width = 16;
        var height = 1;
        var scale = this.canvas.height / height;

        var scaled_rgb_data = scale_rgb(rgb_data, scale, width, height);
        draw_rgb(scaled_rgb_data, [-1, -1, -1], this.context, width * scale, height * scale);
        this.drawn = true;
    }

    selected() {
        return this.select.value;
    }
}
