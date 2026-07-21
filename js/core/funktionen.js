"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Allgemeine Funktionen
========================================== */

// ==========================================
// ID erzeugen
// ==========================================

function neueID(){

    return crypto.randomUUID();

}

// ==========================================
// Datum
// ==========================================

function heute(){

    return new Date();

}

// ==========================================
// Datum formatieren
// ==========================================

function datumFormatieren(datum){

    if(!datum){

        return "";

    }

    return new Date(datum)
    .toLocaleDateString(
        APP.sprache
    );

}

// ==========================================
// Uhrzeit formatieren
// ==========================================

function uhrzeitFormatieren(datum){

    if(!datum){

        return "";

    }

    return new Date(datum)
    .toLocaleTimeString(
        APP.sprache,
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

}

// ==========================================
// Element suchen
// ==========================================

function $(id){

    return document.getElementById(id);

}

// ==========================================
// Element erzeugen
// ==========================================

function element(tag,klasse=""){

    const e =
    document.createElement(tag);

    if(klasse){

        e.className = klasse;

    }

    return e;

}

// ==========================================
// Meldungen
// ==========================================

function info(text){

    alert(text);

}

function fehler(text){

    alert("Fehler:\n\n" + text);

}

// ==========================================
// Bestätigung
// ==========================================

function bestaetigen(text){

    return confirm(text);

}