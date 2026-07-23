"use strict";

/*
================================================
DDH Studio Enterprise
Dialog
================================================
*/

const Dialog = {

    oeffnen(titel, inhalt) {

    

    DOM.text(

        "dialogTitel",

        titel

    );

    DOM.html(

        "dialogInhalt",

        inhalt

    );

    DOM.anzeigen(

        "dialogOverlay"

    );

},

    schliessen() {

        DOM.ausblenden(

            "dialogOverlay"

        );

    },

    abbrechen() {

        const button = DOM.id(

            "dialogAbbrechen"

        );

        if (button) {

            button.onclick = () => {

                this.schliessen();

            };

        }

    },

    speichern(callback) {

    const button = DOM.id(

        "dialogSpeichern"

    );

    if (!button) {

        return;

    }

    button.onclick = () => {

        callback();

    };

}

};

window.addEventListener(

    "load",

    () => {

        const x = DOM.id(

            "dialogSchliessen"

        );

        if (x) {

            x.onclick = () => {

                Dialog.schliessen();

            };

        }

    }

);