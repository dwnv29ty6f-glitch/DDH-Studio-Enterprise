"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
Hilfsfunktionen
===========================================
*/

const Funktionen = {

    heute() {

        return new Date();

    },

    jahr() {

        return this.heute().getFullYear();

    },

    monat() {

        return this.heute().getMonth();

    },

    tag() {

        return this.heute().getDate();

    },

    tageImMonat(monat, jahr) {

        return new Date(

            jahr,

            monat + 1,

            0

        ).getDate();

    },

    ersterWochentag(monat, jahr) {

        let tag = new Date(

            jahr,

            monat,

            1

        ).getDay();

        if (tag === 0) {

            tag = 7;

        }

        return tag;

    },

    datum(monat, tag, jahr) {

        return tag + ". " +

            APP.monate[monat] +

            " " +

            jahr;

    },

    uuid() {

        if (crypto.randomUUID) {

            return crypto.randomUUID();

        }

        return Date.now().toString();

    }

};