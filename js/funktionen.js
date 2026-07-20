"use strict";

// ===============================
// Datum formatieren
// ===============================

function datumText(tag, monat, jahr) {

    return tag + ". " + MONATE[monat] + " " + jahr;

}

// ===============================
// Tage im Monat
// ===============================

function tageImMonat(monat, jahr) {

    return new Date(jahr, monat + 1, 0).getDate();

}

// ===============================
// Erster Wochentag
// ===============================

function ersterWochentag(monat, jahr) {

    let tag = new Date(jahr, monat, 1).getDay();

    if (tag === 0) {
        tag = 7;
    }

    return tag;

}

// ===============================
// Schicht Kurztext
// ===============================

function schichtKurz(typ) {

    if (!SCHICHTEN[typ]) {
        return "";
    }

    return SCHICHTEN[typ].kurz;

}

// ===============================
// Schichtname
// ===============================

function schichtName(typ) {

    if (!SCHICHTEN[typ]) {
        return "";
    }

    return SCHICHTEN[typ].name;

}

// ===============================
// Schichtstunden
// ===============================

function schichtStunden(typ) {

    switch (typ) {

        case "frueh":
        case "spaet":
            return 8;

        case "nacht":
            return 10;

        default:
            return 0;

    }

}

// ===============================
// Schicht suchen
// ===============================

function schichtSuchen(name, tag) {

    return schichten.find(s =>

        s.name === name &&
        s.tag === tag &&
        s.monat === aktuellerMonat &&
        s.jahr === aktuellesJahr

    );

}

// ===============================
// Schicht löschen
// ===============================

function schichtLoeschen(name, tag) {

    schichten = schichten.filter(s => !(

        s.name === name &&
        s.tag === tag &&
        s.monat === aktuellerMonat &&
        s.jahr === aktuellesJahr

    ));

    speichern();

}
