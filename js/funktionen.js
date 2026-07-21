"use strict";

// ==========================================
// DDH Studio Enterprise 10.0
// Allgemeine Funktionen
// ==========================================

// Aktuelles Datum
function heute(){

    return new Date();

}

// Datum formatieren
function datumFormatieren(datum){

    return datum.toLocaleDateString(
        "de-DE"
    );

}

// Uhrzeit formatieren
function uhrzeitFormatieren(datum){

    return datum.toLocaleTimeString(
        "de-DE",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

}

// Zufällige ID erzeugen
function neueID(){

    return Date.now().toString(36) +
    Math.random().toString(36).substring(2,8);

}

// Meldung anzeigen
function info(text){

    alert(text);

}

// Fehler anzeigen
function fehler(text){

    alert("Fehler:\n\n" + text);

}

// Bestätigung
function bestaetigen(text){

    return confirm(text);

}