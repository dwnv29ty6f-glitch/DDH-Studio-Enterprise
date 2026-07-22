"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Navigation
================================================
*/

const Navigation = {

    aktuelleSeite: "dashboard",

    module: {

        dashboard: Dashboard,

        mitarbeiter: Mitarbeiter,

        kalender: Kalender,

        termine: Termine,

        aufgaben: Todos,

        speiseplaene: Speiseplaene,

        schichtplan: Schichtplan,

        bestellungen: Bestellungen,

        dokumente: Dokumente,

        druckcenter: Druck,

        einstellungen: Einstellungen

    },

    initialisieren() {

        const buttons =

            DOM.selectorAlle(

                ".navButton"

            );

        buttons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.oeffnen(

                            button.dataset.seite

                        );

                    }

                );

            }

        );

    },

    oeffnen(seite) {

        if(

            !this.module[seite]

        ){

            console.warn(

                "Modul nicht gefunden:",

                seite

            );

            return;

        }

        this.aktuelleSeite =

            seite;

        this.navigationAktualisieren();

        this.kopfAktualisieren();

        this.module[seite]

            .anzeigen();

    },
        navigationAktualisieren() {

        DOM.selectorAlle(

            ".navButton"

        ).forEach(button => {

            button.classList.remove(

                "aktiv"

            );

        });

        const aktiv = DOM.selector(

            '[data-seite="' +

            this.aktuelleSeite +

            '"]'

        );

        if (aktiv) {

            aktiv.classList.add(

                "aktiv"

            );

        }

    },

    kopfAktualisieren() {

        const titel = {

            dashboard: "Dashboard",

            mitarbeiter: "Mitarbeiter",

            kalender: "Kalender",

            termine: "Termine",

            aufgaben: "Aufgaben",

            speiseplaene: "Speisepläne",

            schichtplan: "Schichtplan",

            bestellungen: "Bestellungen",

            dokumente: "Dokumente",

            druckcenter: "Druckcenter",

            einstellungen: "Einstellungen"

        };

        DOM.text(

            "seitenTitel",

            titel[this.aktuelleSeite]

        );

        DOM.text(

            "seitenPfad",

            "DDH Studio Enterprise"

        );

    },
        aktuelleSeiteName() {

        return this.aktuelleSeite;

    },

    existiert(seite) {

        return Object.prototype.hasOwnProperty.call(

            this.module,

            seite

        );

    },

    neuLaden() {

        if (

            this.existiert(

                this.aktuelleSeite

            )

        ) {

            this.module[

                this.aktuelleSeite

            ].anzeigen();

        }

    }

};