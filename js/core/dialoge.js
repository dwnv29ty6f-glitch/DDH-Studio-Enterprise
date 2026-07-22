"use strict";

/*
================================================
DDH Studio Enterprise
Dialog
================================================
*/

const Dialog = {

    oeffnen(titel, inhalt) {

        DOM.text("dialogTitel", titel);

        DOM.html("dialogInhalt", inhalt);

        DOM.anzeigen("dialogOverlay");

    },

    schliessen() {

        DOM.ausblenden("dialogOverlay");

    }

};

window.onload = () => {

    const x = DOM.id("dialogSchliessen");

    if (x) {

        x.onclick = () => Dialog.schliessen();

    }

    const abbrechen = DOM.id("dialogAbbrechen");

    if (abbrechen) {

        abbrechen.onclick = () => Dialog.schliessen();

    }

};