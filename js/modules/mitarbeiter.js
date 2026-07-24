"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Mitarbeiterverwaltung
================================================
*/

const Mitarbeiter = {

    daten: [],

    anzeigen() {

        this.daten = Speicher.laden(

            CONFIG.speicher.mitarbeiter,

            []

        );

        DOM.html(

            "inhalt",

            this.html()

        );

        this.listeAktualisieren();

        this.events();

    },

    html() {

        return `

<div class="mitarbeiter">

    <div class="welcomeCard">

        <h1>

            👥 Mitarbeiter

        </h1>

        <p>

            Mitarbeiterverwaltung der DDH Service GmbH

        </p>

    </div>

    <div class="karte">

        <div class="toolbar">

            <input

                id="mitarbeiterSuche"

                type="text"

                placeholder="Mitarbeiter suchen...">

            <button

                id="btnMitarbeiterNeu"

                class="hauptButton">

                ➕ Mitarbeiter

            </button>

        </div>

    </div>

    <div

        id="mitarbeiterListe">

    </div>

</div>

`;

    },

    listeAktualisieren() {

        let html = "";

        if (

            this.daten.length === 0

        ) {

            html = `

<div class="karte">

    <h2>

        Keine Mitarbeiter vorhanden

    </h2>

    <p>

        Klicke auf „➕ Mitarbeiter“, um den ersten Mitarbeiter anzulegen.

    </p>

</div>

`;

        } else {

            this.daten.forEach(

                mitarbeiter => {

                    html += `

<div class="karte mitarbeiterKarte">

    <div class="mitarbeiterLinks">

        <div

            class="avatar"

            style="background:${mitarbeiter.farbe || "#0077C8"};">

            ${((mitarbeiter.vorname || "?").charAt(0)).toUpperCase()}

        </div>

        <div class="mitarbeiterInfos">

            <h2>

                ${mitarbeiter.vorname || ""}

                ${mitarbeiter.nachname || ""}

            </h2>

            <p>💼 ${mitarbeiter.position || "-"}</p>

            <p>🏢 ${mitarbeiter.bereich || "-"}</p>

            <p>🆔 ${mitarbeiter.personalnummer || "-"}</p>

            <p>⏰ ${mitarbeiter.vertragsstunden || 0} Std.</p>

            <p>✅ ${mitarbeiter.status || "Aktiv"}</p>
            
            <p>📞 ${mitarbeiter.telefon || "-"}</p>
            
            <p>📧 ${mitarbeiter.email || "-"}</p>
            
            <p>📅 Eintritt: ${mitarbeiter.eintritt || "-"}</p>
            
            <p>📄 ${mitarbeiter.vertragsart || "-"}</p>

        </div>

    </div>

    <div class="mitarbeiterRechts">

        <button

            class="sekundenButton bearbeiten"

            data-id="${mitarbeiter.id}">

            ✏️

        </button>

        <button

            class="sekundenButton loeschen"

            data-id="${mitarbeiter.id}">

            🗑

        </button>

    </div>

</div>

`;

                }

            );

        }

        DOM.html(

            "mitarbeiterListe",

            html

        );

    },
        events() {

        const neu = DOM.id(

            "btnMitarbeiterNeu"

        );

        if (neu) {

            neu.onclick = () => {

                this.neu();

            };

        }

        const suche = DOM.id(

            "mitarbeiterSuche"

        );

        if (suche) {

            suche.oninput = () => {

                this.suchen(

                    suche.value

                );

            };

        }

        document

            .querySelectorAll(

                ".bearbeiten"

            )

            .forEach(button => {

                button.onclick = () => {

                    this.bearbeiten(

                        button.dataset.id

                    );

                };

            });

        document

            .querySelectorAll(

                ".loeschen"

            )

            .forEach(button => {

                button.onclick = () => {

                    this.loeschen(

                        button.dataset.id

                    );

                };

            });

    },

    suchen(text) {

        text = text.toLowerCase();

        document

            .querySelectorAll(

                ".mitarbeiterKarte"

            )

            .forEach(karte => {

                const sichtbar =

                    karte.innerText

                    .toLowerCase()

                    .includes(text);

                karte.style.display =

                    sichtbar

                    ? ""

                    : "none";

            });

    },

    neu() {

        Dialog.oeffnen(

            "Neuer Mitarbeiter",

            `

<div class="dialogGrid">

    <h3 class="dialogGridVoll">

        👤 Stammdaten

    </h3>
    
    <div class="dialogGridVoll profilBereich">

  <div
    id="profilAvatar"
    class="profilAvatar">

    👤

</div>

   <button
    id="btnProfilbild"
    type="button"
    class="sekundenButton">

    📷 Profilbild auswählen

</button>

<input
    id="dlgProfilbild"
    type="file"
    accept="image/*"
    style="display:none">

</div>

    <div class="dialogLabel">

        <label>Vorname</label>

       <input
    id="dlgVorname"
    type="text"
    oninput="Mitarbeiter.avatarAktualisieren()">

    </div>

    <div class="dialogLabel">

        <label>Nachname</label>

       <input
    id="dlgNachname"
    type="text"
    oninput="Mitarbeiter.avatarAktualisieren()">

    </div>

    <div class="dialogLabel">

        <label>Bereich</label>

        <input id="dlgBereich" type="text" value="Küche">

    </div>

    <div class="dialogLabel">

        <label>Position</label>

        <input id="dlgPosition" type="text" value="Mitarbeiter">

    </div>
    
    <h3 class="dialogGridVoll">

    📄 Beschäftigung

</h3>

    <div class="dialogLabel">

        <label>Personalnummer</label>

        <input id="dlgPersonalnummer" type="text">

    </div>

    <div class="dialogLabel">

        <label>Vertragsstunden</label>

        <input id="dlgVertragsstunden" type="number" value="39">

    </div>
<div class="dialogLabel">

    <label>Status</label>

    <select id="dlgStatus">

        <option value="Aktiv" selected>

            🟢 Aktiv

        </option>

        <option value="Urlaub">

            🟡 Urlaub

        </option>

        <option value="Krank">

            🟠 Krank

        </option>

        <option value="Ausgeschieden">

            🔴 Ausgeschieden

        </option>

    </select>

</div>

<h3 class="dialogGridVoll">

    📞 Kontakt

</h3>

<div class="dialogLabel">

    <label>Telefon</label>

    <input
        id="dlgTelefon"
        type="tel"
        placeholder="040 1234567">

</div>

<div class="dialogLabel">

    <label>E-Mail</label>

    <input
        id="dlgEmail"
        type="email"
        placeholder="max.mustermann@ddh.de">

</div>

<div class="dialogLabel">

    <label>Eintrittsdatum</label>

    <input
        id="dlgEintritt"
        type="date">

</div>

<div class="dialogLabel">

    <label>Vertragsart</label>

    <select id="dlgVertragsart">

        <option value="Vollzeit" selected>

            Vollzeit

        </option>

        <option value="Teilzeit">

            Teilzeit

        </option>

        <option value="Minijob">

            Minijob

        </option>

        <option value="Befristet">

            Befristet

        </option>

        <option value="Ausbildung">

            Ausbildung

        </option>

        <option value="Praktikum">

            Praktikum

        </option>

    </select>

</div>
</div>

`

        );

        Dialog.abbrechen();
        
        const profilButton =

    DOM.id("btnProfilbild");

const profilDatei =

    DOM.id("dlgProfilbild");

if (profilButton && profilDatei) {

    profilButton.onclick = () => {

        profilDatei.click();

    };

}

profilDatei.onchange = () => {

    const datei =

        profilDatei.files[0];

    if (!datei) {

        return;

    }

    const reader =

        new FileReader();

    reader.onload = e => {

        const avatar =

            DOM.id("profilAvatar");

        avatar.innerHTML =

            `<img
                src="${e.target.result}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:50%;
                ">`;

    };

    reader.readAsDataURL(datei);

};

        Dialog.speichern(() => {

            this.daten.push({

                id: Date.now().toString(),

                vorname: DOM.id("dlgVorname").value,

                nachname: DOM.id("dlgNachname").value,

                name:

                    DOM.id("dlgVorname").value +

                    " " +

                    DOM.id("dlgNachname").value,

                bereich: DOM.id("dlgBereich").value,

                position: DOM.id("dlgPosition").value,

                personalnummer: DOM.id("dlgPersonalnummer").value,

                vertragsstunden: Number(

                    DOM.id("dlgVertragsstunden").value

                ),

                status:

    DOM.id(

        "dlgStatus"

    ).value,

telefon:

    DOM.id(

        "dlgTelefon"

    ).value,
    
    email:

    DOM.id(

        "dlgEmail"

    ).value,
    
    eintritt:

    DOM.id(

        "dlgEintritt"

    ).value,
    
    vertragsart:

    DOM.id(

        "dlgVertragsart"

    ).value,
    
                farbe: "#0077C8"

            });

            Speicher.speichern(

                CONFIG.speicher.mitarbeiter,

                this.daten

            );

            Dialog.schliessen();

            this.anzeigen();

        });

    },
    
    avatarAktualisieren() {

    const vorname =

        DOM.id("dlgVorname")?.value || "";

    const nachname =

        DOM.id("dlgNachname")?.value || "";

    let initialen = "";

    if (vorname.length > 0) {

        initialen += vorname.charAt(0).toUpperCase();

    }

    if (nachname.length > 0) {

        initialen += nachname.charAt(0).toUpperCase();

    }

    const avatar = DOM.id("profilAvatar");

    if (avatar) {

        avatar.textContent =

            initialen || "👤";

    }

},
        bearbeiten(id) {

    const mitarbeiter = this.daten.find(

        m => m.id === id

    );

    if (!mitarbeiter) {

        return;

    }

    Dialog.oeffnen(

        "Mitarbeiter bearbeiten",

        `

<div class="dialogGrid">

    <div class="dialogLabel">

        <label>Vorname</label>

       <input
    id="dlgVorname"
    type="text"
    value="${mitarbeiter.vorname || ""}"
    oninput="Mitarbeiter.avatarAktualisieren()">

    </div>

    <div class="dialogLabel">

        <label>Nachname</label>

       <label>Nachname</label>

<input
    id="dlgNachname"
    type="text"
    value="${mitarbeiter.nachname || ""}"
    oninput="Mitarbeiter.avatarAktualisieren()">

    </div>

    <div class="dialogLabel">

        <label>Bereich</label>

        <input
            id="dlgBereich"
            type="text"
            value="${mitarbeiter.bereich || ""}">

    </div>

    <div class="dialogLabel">

        <label>Position</label>

        <input
            id="dlgPosition"
            type="text"
            value="${mitarbeiter.position || ""}">

    </div>

    <div class="dialogLabel">

        <label>Personalnummer</label>

        <input
            id="dlgPersonalnummer"
            type="text"
            value="${mitarbeiter.personalnummer || ""}">

    </div>

    <div class="dialogLabel">

        <label>Vertragsstunden</label>

        <input
            id="dlgVertragsstunden"
            type="number"
            value="${mitarbeiter.vertragsstunden || 39}">

    </div>
<div class="dialogLabel">

    <label>Status</label>

    <select id="dlgStatus">

        <option value="Aktiv" ${mitarbeiter.status === "Aktiv" ? "selected" : ""}>

            🟢 Aktiv

        </option>

        <option value="Urlaub" ${mitarbeiter.status === "Urlaub" ? "selected" : ""}>

            🟡 Urlaub

        </option>

        <option value="Krank" ${mitarbeiter.status === "Krank" ? "selected" : ""}>

            🟠 Krank

        </option>

        <option value="Ausgeschieden" ${mitarbeiter.status === "Ausgeschieden" ? "selected" : ""}>

            🔴 Ausgeschieden

        </option>

    </select>

</div>

<div class="dialogLabel">

    <label>Telefon</label>

    <input
        id="dlgTelefon"
        type="tel"
        value="${mitarbeiter.telefon || ""}">

</div>

<div class="dialogLabel">

    <label>E-Mail</label>

    <input
        id="dlgEmail"
        type="email"
        value="${mitarbeiter.email || ""}">

</div>

<div class="dialogLabel">

    <label>Eintrittsdatum</label>

    <input
        id="dlgEintritt"
        type="date"
        value="${mitarbeiter.eintritt || ""}">

</div>

<div class="dialogLabel">

    <label>Vertragsart</label>

    <select id="dlgVertragsart">

        <option value="Vollzeit" ${mitarbeiter.vertragsart === "Vollzeit" ? "selected" : ""}>

            Vollzeit

        </option>

        <option value="Teilzeit" ${mitarbeiter.vertragsart === "Teilzeit" ? "selected" : ""}>

            Teilzeit

        </option>

        <option value="Minijob" ${mitarbeiter.vertragsart === "Minijob" ? "selected" : ""}>

            Minijob

        </option>

        <option value="Befristet" ${mitarbeiter.vertragsart === "Befristet" ? "selected" : ""}>

            Befristet

        </option>

        <option value="Ausbildung" ${mitarbeiter.vertragsart === "Ausbildung" ? "selected" : ""}>

            Ausbildung

        </option>

        <option value="Praktikum" ${mitarbeiter.vertragsart === "Praktikum" ? "selected" : ""}>

            Praktikum

        </option>

    </select>

</div>
</div>

`

    );

    Dialog.abbrechen();

    Dialog.speichern(() => {

        mitarbeiter.vorname =

            DOM.id("dlgVorname").value;

        mitarbeiter.nachname =

            DOM.id("dlgNachname").value;

        mitarbeiter.name =

            mitarbeiter.vorname +

            " " +

            mitarbeiter.nachname;

        mitarbeiter.bereich =

            DOM.id("dlgBereich").value;

        mitarbeiter.position =

            DOM.id("dlgPosition").value;

        mitarbeiter.personalnummer =

            DOM.id("dlgPersonalnummer").value;

        mitarbeiter.vertragsstunden = Number(

            DOM.id("dlgVertragsstunden").value

        );
mitarbeiter.status =

    DOM.id("dlgStatus").value;
    
    mitarbeiter.telefon =

    DOM.id("dlgTelefon").value;
    
    mitarbeiter.email =

    DOM.id("dlgEmail").value;
    
    mitarbeiter.eintritt =

    DOM.id("dlgEintritt").value;

mitarbeiter.vertragsart =

    DOM.id("dlgVertragsart").value;
    
        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        Dialog.schliessen();

        this.anzeigen();

    });

},

    loeschen(id) {

        if (

            !confirm(

                "Mitarbeiter wirklich löschen?"

            )

        ) {

            return;

        }

        this.daten = this.daten.filter(

            m => m.id !== id

        );

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            this.daten

        );

        this.anzeigen();

    }

};
