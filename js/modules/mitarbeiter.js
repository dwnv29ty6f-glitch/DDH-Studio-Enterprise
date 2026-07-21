"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Mitarbeiterverwaltung
========================================== */

let mitarbeiter = [];

/* ==========================================
   Mitarbeiter laden
========================================== */

function mitarbeiterLaden() {

    const daten = localStorage.getItem("ddh_mitarbeiter");

    if (daten) {

        mitarbeiter = JSON.parse(daten);

    } else {

        mitarbeiter = [];

    }

}

/* ==========================================
   Mitarbeiter speichern
========================================== */

function mitarbeiterSpeichern() {

    localStorage.setItem(
        "ddh_mitarbeiter",
        JSON.stringify(mitarbeiter)
    );

}

/* ==========================================
   Neue Personalnummer
========================================== */

function neuePersonalnummer() {

    if (mitarbeiter.length === 0) {

        return 1000;

    }

    return Math.max(
        ...mitarbeiter.map(m => m.personalnummer)
    ) + 1;

}
/* ==========================================
   Mitarbeiter hinzufügen
========================================== */

function mitarbeiterHinzufuegen(daten) {

    const neuerMitarbeiter = {

        id: crypto.randomUUID(),

        personalnummer: neuePersonalnummer(),

        vorname: daten.vorname || "",

        nachname: daten.nachname || "",

        position: daten.position || "",

        abteilung: daten.abteilung || "",

        telefon: daten.telefon || "",

        email: daten.email || "",

        wochenstunden: daten.wochenstunden || 39,

        urlaub: daten.urlaub || 30,

        kranktage: 0,

        eintritt: daten.eintritt || "",

        notizen: daten.notizen || ""

    };

    mitarbeiter.push(neuerMitarbeiter);

    mitarbeiterSpeichern();

    return neuerMitarbeiter;

}

/* ==========================================
   Mitarbeiter finden
========================================== */

function mitarbeiterNachId(id) {

    return mitarbeiter.find(m => m.id === id);

}

/* ==========================================
   Mitarbeiter löschen
========================================== */

function mitarbeiterLoeschen(id) {

    mitarbeiter = mitarbeiter.filter(

        m => m.id !== id

    );

    mitarbeiterSpeichern();

}
/* ==========================================
   Mitarbeiter bearbeiten
========================================== */

function mitarbeiterBearbeiten(id, daten) {

    const person = mitarbeiterNachId(id);

    if (!person) {

        return;

    }

    Object.assign(person, daten);

    mitarbeiterSpeichern();

}

/* ==========================================
   Mitarbeiter suchen
========================================== */

function mitarbeiterSuchen(suchtext) {

    const text = suchtext.toLowerCase();

    return mitarbeiter.filter(person =>

        person.personalnummer.toString().includes(text) ||

        person.vorname.toLowerCase().includes(text) ||

        person.nachname.toLowerCase().includes(text) ||

        person.position.toLowerCase().includes(text) ||

        person.abteilung.toLowerCase().includes(text)

    );

}

/* ==========================================
   Alle Mitarbeiter zurückgeben
========================================== */

function alleMitarbeiter() {

    return mitarbeiter;

}
/* ==========================================
   Mitarbeiter als Karten anzeigen
========================================== */

function mitarbeiterAnzeigen() {

    const container = document.getElementById("mitarbeiterListe");

    if (!container) {

        return;

    }

    container.innerHTML = "";

    if (mitarbeiter.length === 0) {

        container.innerHTML = `
            <div class="karte">
                Keine Mitarbeiter vorhanden.
            </div>
        `;

        return;

    }

    mitarbeiter.forEach(person => {

        const karte = document.createElement("div");

        karte.className = "karte mitarbeiterKarte";

        karte.innerHTML = `

            <h3>${person.vorname} ${person.nachname}</h3>

            <p><strong>PN:</strong> ${person.personalnummer}</p>

            <p><strong>Position:</strong> ${person.position}</p>

            <p><strong>Abteilung:</strong> ${person.abteilung}</p>

            <p><strong>Wochenstunden:</strong> ${person.wochenstunden}</p>

            <div class="kartenButtons">

                <button class="btnBearbeiten"
                    onclick="mitarbeiterDialog('${person.id}')">

                    Bearbeiten

                </button>

                <button class="btnLoeschen"
                    onclick="mitarbeiterLoeschenDialog('${person.id}')">

                    Löschen

                </button>

            </div>

        `;

        container.appendChild(karte);

    });

}
/* ==========================================
   Mitarbeiterseite anzeigen
========================================== */

function mitarbeiterZeichnen() {

    DOM.seitenTitel.textContent = "Mitarbeiter";

    DOM.inhalt.innerHTML = `

    <div class="mitarbeiterSeite">

        <div class="karte">

            <div class="toolbar">

                <input
                    id="sucheMitarbeiter"
                    type="text"
                    placeholder="Mitarbeiter suchen...">

                <button
                    id="btnNeuerMitarbeiter"
                    class="hauptButton">

                    ➕ Neuer Mitarbeiter

                </button>

            </div>

        </div>

        <div
            id="mitarbeiterListe"
            class="mitarbeiterListe">

        </div>

    </div>

    `;

    mitarbeiterAnzeigen();

    document
        .getElementById("sucheMitarbeiter")
        .addEventListener(
            "input",
            mitarbeiterSucheAktualisieren
        );

    document
        .getElementById("btnNeuerMitarbeiter")
        .addEventListener(
            "click",
            ()=>{

                mitarbeiterDialog();

            }
        );

}
/* ==========================================
   Mitarbeiterdialog
========================================== */

function mitarbeiterDialog(id = null) {

    let person = null;

    if (id) {

        person = mitarbeiterNachId(id);

    }

    Dialog.anzeigen(

        id ? "Mitarbeiter bearbeiten" : "Neuer Mitarbeiter",

        `

        <label>Vorname</label>
        <input id="dlgVorname" value="${person ? person.vorname : ""}">

        <label>Nachname</label>
        <input id="dlgNachname" value="${person ? person.nachname : ""}">

        <label>Abteilung</label>
        <input id="dlgAbteilung" value="${person ? person.abteilung : ""}">

        <label>Position</label>
        <input id="dlgPosition" value="${person ? person.position : ""}">

        <label>Telefon</label>
        <input id="dlgTelefon" value="${person ? person.telefon : ""}">

        <label>E-Mail</label>
        <input id="dlgEmail" value="${person ? person.email : ""}">

        <label>Wochenstunden</label>
        <input id="dlgWochenstunden"
               type="number"
               value="${person ? person.wochenstunden : 39}">

        <label>Urlaubstage</label>
        <input id="dlgUrlaub"
               type="number"
               value="${person ? person.urlaub : 30}">

        `,

        `

        <button
            class="sekundenButton"
            onclick="Dialog.schliessen()">

            Abbrechen

        </button>

        <button
            class="hauptButton"
            onclick="mitarbeiterDialogSpeichern('${id ?? ""}')">

            Speichern

        </button>

        `

    );

}
/* ==========================================
   Dialog speichern
========================================== */

function mitarbeiterDialogSpeichern(id = "") {

    const daten = {

        vorname: document.getElementById("dlgVorname").value.trim(),

        nachname: document.getElementById("dlgNachname").value.trim(),

        abteilung: document.getElementById("dlgAbteilung").value.trim(),

        position: document.getElementById("dlgPosition").value.trim(),

        telefon: document.getElementById("dlgTelefon").value.trim(),

        email: document.getElementById("dlgEmail").value.trim(),

        wochenstunden: Number(
            document.getElementById("dlgWochenstunden").value
        ),

        urlaub: Number(
            document.getElementById("dlgUrlaub").value
        )

    };

    if(daten.vorname === "" || daten.nachname === ""){

        Dialog.hinweis(
            "Bitte Vor- und Nachnamen eingeben."
        );

        return;

    }

    if(id){

        mitarbeiterBearbeiten(id,daten);

    }else{

        mitarbeiterHinzufuegen(daten);

    }

    Dialog.schliessen();

    mitarbeiterAnzeigen();

}

/* ==========================================
   Löschdialog
========================================== */

function mitarbeiterLoeschenDialog(id){

    const person = mitarbeiterNachId(id);

    if(!person){

        return;

    }

    Dialog.anzeigen(

        "Mitarbeiter löschen",

        `

        <p>

            Soll

            <strong>

            ${person.vorname} ${person.nachname}

            </strong>

            wirklich gelöscht werden?

        </p>

        `,

        `

        <button
            class="sekundenButton"
            onclick="Dialog.schliessen()">

            Abbrechen

        </button>

        <button
            class="hauptButton"
            onclick="mitarbeiterLoeschenBestaetigen('${id}')">

            Löschen

        </button>

        `

    );

}

function mitarbeiterLoeschenBestaetigen(id){

    mitarbeiterLoeschen(id);

    Dialog.schliessen();

    mitarbeiterAnzeigen();

}

/* ==========================================
   Suche
========================================== */

function mitarbeiterSucheAktualisieren(event){

    const treffer =
        mitarbeiterSuchen(event.target.value);

    const container =
        document.getElementById("mitarbeiterListe");

    container.innerHTML = "";

    if(treffer.length===0){

        container.innerHTML =

        "<div class='karte'>Keine Mitarbeiter gefunden.</div>";

        return;

    }

    treffer.forEach(person=>{

        const karte =
            document.createElement("div");

        karte.className =
            "karte mitarbeiterKarte";

        karte.innerHTML = `

            <h3>

                ${person.vorname} ${person.nachname}

            </h3>

            <p>

                ${person.position}

            </p>

            <p>

                ${person.abteilung}

            </p>

        `;

        container.appendChild(karte);

    });

}