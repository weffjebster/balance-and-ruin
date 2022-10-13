class FlagsAuctionHouse {
    constructor(flags) {
        this.flags = flags;

        this.auctionRandomItems = new Toggle("auction_random_items", "-ari", this.flags);
        this.auctionNoChocoboAirship = new Toggle("auction_no_chocobo_airship", "-anca", this.flags);
        this.auctionDoorEsperHint = new Toggle("auction_door_esper_hint", "-adeh", this.flags);
    }

    getFlags() {
        var flags = "";

        flags += this.auctionRandomItems.getFlag();
        flags += this.auctionNoChocoboAirship.getFlag();
        flags += this.auctionDoorEsperHint.getFlag();

        this.updateHelp();
        return flags;
    }

    updateFields() {
        this.auctionRandomItems.readFlag();
        this.auctionNoChocoboAirship.readFlag();
        this.auctionDoorEsperHint.readFlag();

        this.updateHelp();
    }

    updateHelp() {
    }
}
