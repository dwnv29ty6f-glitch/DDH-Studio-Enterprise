"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   DOM
========================================== */

const DOM = {

    inhalt: null,

    seitenTitel: null,

    sidebar: null,

    dialogOverlay: null,

    dialogTitel: null,

    dialogInhalt: null,

    dialogFuss: null,

    toastContainer: null,

    ladeOverlay: null,

    initialisieren(){

        this.inhalt =
            document.getElementById("inhalt");

        this.seitenTitel =
            document.getElementById("seitenTitel");

        this.sidebar =
            document.getElementById("sidebar");

        this.dialogOverlay =
            document.getElementById("dialogOverlay");

        this.dialogTitel =
            document.getElementById("dialogTitel");

        this.dialogInhalt =
            document.getElementById("dialogInhalt");

        this.dialogFuss =
            document.getElementById("dialogFuss");

        this.toastContainer =
            document.getElementById("toastContainer");

        this.ladeOverlay =
            document.getElementById("ladeOverlay");

    }

};