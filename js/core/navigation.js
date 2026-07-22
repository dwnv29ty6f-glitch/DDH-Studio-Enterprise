"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Navigation
================================================
*/

const Navigation = {

    aktuelleSeite: "dashboard",

    initialisieren() {

        const buttons =

            document.querySelectorAll(

                ".navButton"

            );

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    this.oeffnen(

                        button.dataset.seite

                    );

                }

            );

        });

    },

    oeffnen(seite) {

        this.aktuelleSeite =

            seite;

        this.navigationAktualisieren();

        this.kopfAktualisieren();

        switch(seite){

            case "dashboard":

                Dashboard.anzeigen();

                break;

            case "mitarbeiter":

                Mitarbeiter.anzeigen();

                break;

            case "kalender":

                Kalender.anzeigen();

                break;

            case "termine":

                Termine.anzeigen();

                break;

            case "aufgaben":

                Todos.anzeigen();

                break;

            case "speiseplaene":

                Speiseplaene.anzeigen();

                break;

            case "schichtplan":

                Schichtplan.anzeigen();

                break;

            case "bestellungen":

                Bestellungen.anzeigen();

                break;

            case "dokumente":

                Dokumente.anzeigen();

                break;

            case "druckcenter":

                Druck.anzeigen();

                break;

            case "einstellungen":

                Einstellungen.anzeigen();

                break;

        }

    },
        navigationAktualisieren() {

        const buttons =

            document.querySelectorAll(

                ".navButton"

            );

        buttons.forEach(button => {

            button.classList.remove(

                "aktiv"

            );

        });

        const aktiv =

            document.querySelector(

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

        const seitenTitel =

            document.getElementById(

                "seitenTitel"

            );

        if (seitenTitel) {

            seitenTitel.textContent =

                titel[this.aktuelleSeite] ||

                "DDH Studio Enterprise";

        }

        const seitenPfad =

            document.getElementById(

                "seitenPfad"

            );

        if (seitenPfad) {

            seitenPfad.textContent =

                "DDH Studio Enterprise";

        }

    },
        existiert(seite) {

        switch (seite) {

            case "dashboard":
            case "mitarbeiter":
            case "kalender":
            case "termine":
            case "aufgaben":
            case "speiseplaene":
            case "schichtplan":
            case "bestellungen":
            case "dokumente":
            case "druckcenter":
            case "einstellungen":

                return true;

            default:

                return false;

        }

    },

    neuLaden() {

        if (

            this.existiert(

                this.aktuelleSeite

            )

        ) {

            this.oeffnen(

                this.aktuelleSeite

            );

        }

    }

};