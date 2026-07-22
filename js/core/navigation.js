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
            DOM.selectorAlle(".navButton");

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

        this.aktuelleSeite = seite;

        DOM.selectorAlle(

            ".seite"

        ).forEach(element => {

            element.classList.remove(

                "aktiv"

            );

        });

        DOM.selectorAlle(

            ".navButton"

        ).forEach(button => {

            button.classList.remove(

                "aktiv"

            );

        });

        const button =
            DOM.selector(

                '[data-seite="' +
                seite +
                '"]'

            );

        if(button){

            button.classList.add(

                "aktiv"

            );

        }

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

        const titel =
            DOM.id(

                "seitenTitel"

            );

        if(titel){

            titel.textContent =

                this.titel(

                    seite

                );

        }

        const pfad =
            DOM.id(

                "seitenPfad"

            );

        if(pfad){

            pfad.textContent =

                "DDH Studio Enterprise";

        }

    },

    titel(seite){

        const namen = {

            dashboard:
                "Dashboard",

            mitarbeiter:
                "Mitarbeiter",

            kalender:
                "Kalender",

            termine:
                "Termine",

            aufgaben:
                "Aufgaben",

            speiseplaene:
                "Speisepläne",

            schichtplan:
                "Schichtplan",

            bestellungen:
                "Bestellungen",

            dokumente:
                "Dokumente",

            druckcenter:
                "Druckcenter",

            einstellungen:
                "Einstellungen"

        };

        return namen[seite]

            ||

            "DDH Studio Enterprise";

    }

};