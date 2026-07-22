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

        DOM.selectorAlle(".seite")
            .forEach(element => {

                element.classList.remove(
                    "aktiv"
                );

            });

        const aktuelleSeite =
            DOM.id(
                "seite-" + seite
            );

        if (aktuelleSeite) {

            aktuelleSeite.classList.add(
                "aktiv"
            );

        }

        DOM.selectorAlle(".navButton")
            .forEach(button => {

                button.classList.remove(
                    "aktiv"
                );

            });

        const aktiverButton =
            DOM.selector(
                '[data-seite="' +
                seite +
                '"]'
            );

        if (aktiverButton) {

            aktiverButton.classList.add(
                "aktiv"
            );

        }

        const titel =
            DOM.id("seitenTitel");

        if (titel) {

            titel.textContent =
                this.name(seite);

        }

        const pfad =
            DOM.id("seitenPfad");

        if (pfad) {

            pfad.textContent =
                "DDH Studio Enterprise";

        }

    },

    name(seite) {

        const namen = {

            dashboard:
                "Dashboard",

            mitarbeiter:
                "Mitarbeiter",

            schichtplan:
                "Schichtplan",

            dienstplan:
                "Dienstplan",

            kalender:
                "Kalender",

            aufgaben:
                "Aufgaben",

            rezepte:
                "Rezepte",

            speiseplaene:
                "Speisepläne",

            lager:
                "Lager",

            bestellungen:
                "Bestellungen",

            lieferanten:
                "Lieferanten",

            haccp:
                "HACCP",

            reinigung:
                "Reinigung",

            druckcenter:
                "Druckcenter",

            einstellungen:
                "Einstellungen"

        };

        return namen[seite] || "DDH Studio";

    }

};