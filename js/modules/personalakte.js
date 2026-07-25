const Personalakte = {

    mitarbeiter: null,

    oeffnen(mitarbeiter) {

        this.mitarbeiter = mitarbeiter;

        Dialog.oeffnen(

            "👤 Personalakte",

            `

<div class="personalakte">

    <div class="personalHeader">

        <div class="personalAvatar">

            ${
                mitarbeiter.profilbild

                ? `<img
                        src="${mitarbeiter.profilbild}"
                        class="personalAvatarBild">`

                : "👤"
            }

        </div>

        <div class="personalHeaderInfo">

            <h1>

                ${mitarbeiter.vorname || ""}

                ${mitarbeiter.nachname || ""}

            </h1>

            <div class="personalUntertitel">

                ${mitarbeiter.position || "-"}

                •

                ${mitarbeiter.bereich || "-"}

            </div>

            <div class="personalBadges">

                <span class="personalBadge status">

                    ${mitarbeiter.status || "Aktiv"}

                </span>

                <span class="personalBadge">

                    📄 ${mitarbeiter.vertragsart || "-"}

                </span>

                <span class="personalBadge">

                    ⏰ ${mitarbeiter.vertragsstunden || 0} Std.

                </span>

                <span class="personalBadge">

                    🆔 ${mitarbeiter.personalnummer || "-"}

                </span>

            </div>

        </div>

    </div>

    <div class="profilTabs">

        <button

            class="profilTab aktiv"

            data-tab="profil">

            👤 Profil

        </button>

        <button

            class="profilTab"

            data-tab="beschaeftigung">

            💼 Beschäftigung

        </button>

        <button

            class="profilTab"

            data-tab="kontakt">

            📞 Kontakt

        </button>

        <button

            class="profilTab"

            data-tab="dokumente">

            📁 Dokumente

        </button>

        <button

            class="profilTab"

            data-tab="qualifikation">

            🎓 Qualifikationen

        </button>

        <button

            class="profilTab"

            data-tab="urlaub">

            📅 Urlaub

        </button>

        <button

            class="profilTab"

            data-tab="notizen">

            📝 Notizen

        </button>

    </div>

    <div id="personalContent">

    </div>

</div>

`

        );

        this.events();

        this.tab("profil");
        
        Dialog.abbrechen();

Dialog.speichern(() => {

    Personalakte.profilSpeichern();

});
        
            },
        
        events() {

        document

            .querySelectorAll(".profilTab")

            .forEach(button => {

                button.onclick = () => {

                    this.tab(

                        button.dataset.tab

                    );

                };

            });

    },

    tab(name) {

        document

            .querySelectorAll(".profilTab")

            .forEach(tab =>

                tab.classList.remove("aktiv")

            );

        document

            .querySelector(

                `[data-tab="${name}"]`

            )

            ?.classList.add("aktiv");

        switch (name) {

            case "profil":

                this.tabProfil();

                break;

            case "beschaeftigung":

                this.tabBeschaeftigung();

                break;

            case "kontakt":

                this.tabKontakt();

                break;

            case "dokumente":

                this.tabDokumente();

                break;

            case "qualifikation":

                this.tabQualifikation();

                break;

            case "urlaub":

                this.tabUrlaub();

                break;

            case "notizen":

                this.tabNotizen();

                break;

        }

    },
        tabProfil() {

        DOM.html(

            "personalContent",

            `

<div class="personalDashboard">

    <div class="personalCard">

        <div class="personalIcon">📅</div>

        <div class="personalTitel">

            Urlaub

        </div>

        <div class="personalWert">

            28 / 30

        </div>

    </div>

    <div class="personalCard">

        <div class="personalIcon">🏥</div>

        <div class="personalTitel">

            Kranktage

        </div>

        <div class="personalWert">

            3

        </div>

    </div>

    <div class="personalCard">

        <div class="personalIcon">⏰</div>

        <div class="personalTitel">

            Wochenstunden

        </div>

        <div class="personalWert">

            ${this.mitarbeiter.vertragsstunden || 0}

        </div>

    </div>

    <div class="personalCard">

        <div class="personalIcon">📁</div>

        <div class="personalTitel">

            Dokumente

        </div>

        <div class="personalWert">

            0

        </div>

    </div>

</div>

<div class="personalForm">

    <div class="dialogLabel">

        <label>Vorname</label>

        <input
            id="paVorname"
            type="text"
            value="${this.mitarbeiter.vorname || ""}">

    </div>

    <div class="dialogLabel">

        <label>Nachname</label>

        <input
            id="paNachname"
            type="text"
            value="${this.mitarbeiter.nachname || ""}">

    </div>

    <div class="dialogLabel">

        <label>Geburtsdatum</label>

        <input
            id="paGeburt"
            type="date"
            value="${this.mitarbeiter.geburt || ""}">

    </div>

    <div class="dialogLabel">

        <label>Geschlecht</label>

        <select id="paGeschlecht">

            <option
                value="Männlich"
                ${this.mitarbeiter.geschlecht==="Männlich"?"selected":""}>

                Männlich

            </option>

            <option
                value="Weiblich"
                ${this.mitarbeiter.geschlecht==="Weiblich"?"selected":""}>

                Weiblich

            </option>

            <option
                value="Divers"
                ${this.mitarbeiter.geschlecht==="Divers"?"selected":""}>

                Divers

            </option>

        </select>

    </div>

    <div class="dialogLabel">

        <label>Nationalität</label>

        <input
            id="paNationalitaet"
            type="text"
            value="${this.mitarbeiter.nationalitaet || ""}">

    </div>

    <div class="dialogLabel">

        <label>Familienstand</label>

        <select id="paFamilienstand">

            <option
                value="Ledig"
                ${this.mitarbeiter.familienstand==="Ledig"?"selected":""}>

                Ledig

            </option>

            <option
                value="Verheiratet"
                ${this.mitarbeiter.familienstand==="Verheiratet"?"selected":""}>

                Verheiratet

            </option>

            <option
                value="Geschieden"
                ${this.mitarbeiter.familienstand==="Geschieden"?"selected":""}>

                Geschieden

            </option>

            <option
                value="Verwitwet"
                ${this.mitarbeiter.familienstand==="Verwitwet"?"selected":""}>

                Verwitwet

            </option>

        </select>

    </div>

</div>
<div style="margin-top:24px;text-align:right;">

    <button

        class="hauptButton"

        onclick="Personalakte.profilSpeichern()">

        💾 Profil speichern

    </button>

</div>

`

        );

    },

    profilSpeichern() {

    this.mitarbeiter.vorname =
        DOM.id("paVorname").value;

    this.mitarbeiter.nachname =
        DOM.id("paNachname").value;

    this.mitarbeiter.geburt =
        DOM.id("paGeburt").value;

    this.mitarbeiter.geschlecht =
        DOM.id("paGeschlecht").value;

    this.mitarbeiter.nationalitaet =
        DOM.id("paNationalitaet").value;

    this.mitarbeiter.familienstand =
        DOM.id("paFamilienstand").value;

    Speicher.speichern(

        CONFIG.speicher.mitarbeiter,

        Mitarbeiter.daten

    );

    this.oeffnen(

        this.mitarbeiter

    );

},
    
        tabBeschaeftigung() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="dialogLabel">

        <label>Bereich</label>

        <input
            id="paBereich"
            type="text"
            value="${this.mitarbeiter.bereich || ""}">

    </div>

    <div class="dialogLabel">

        <label>Position</label>

        <input
            id="paPosition"
            type="text"
            value="${this.mitarbeiter.position || ""}">

    </div>

    <div class="dialogLabel">

        <label>Personalnummer</label>

        <input
            id="paPersonalnummer"
            type="text"
            value="${this.mitarbeiter.personalnummer || ""}">

    </div>

    <div class="dialogLabel">

        <label>Vertragsart</label>

        <select id="paVertragsart">

            <option value="Vollzeit" ${this.mitarbeiter.vertragsart==="Vollzeit"?"selected":""}>
                Vollzeit
            </option>

            <option value="Teilzeit" ${this.mitarbeiter.vertragsart==="Teilzeit"?"selected":""}>
                Teilzeit
            </option>

            <option value="Minijob" ${this.mitarbeiter.vertragsart==="Minijob"?"selected":""}>
                Minijob
            </option>

            <option value="Befristet" ${this.mitarbeiter.vertragsart==="Befristet"?"selected":""}>
                Befristet
            </option>

            <option value="Ausbildung" ${this.mitarbeiter.vertragsart==="Ausbildung"?"selected":""}>
                Ausbildung
            </option>

            <option value="Praktikum" ${this.mitarbeiter.vertragsart==="Praktikum"?"selected":""}>
                Praktikum
            </option>

        </select>

    </div>

    <div class="dialogLabel">

        <label>Wochenstunden</label>

        <input
            id="paStunden"
            type="number"
            value="${this.mitarbeiter.vertragsstunden || 0}">

    </div>

    <div class="dialogLabel">

        <label>Status</label>

        <select id="paStatus">

            <option value="Aktiv" ${this.mitarbeiter.status==="Aktiv"?"selected":""}>
                🟢 Aktiv
            </option>

            <option value="Urlaub" ${this.mitarbeiter.status==="Urlaub"?"selected":""}>
                🟡 Urlaub
            </option>

            <option value="Krank" ${this.mitarbeiter.status==="Krank"?"selected":""}>
                🟠 Krank
            </option>

            <option value="Ausgeschieden" ${this.mitarbeiter.status==="Ausgeschieden"?"selected":""}>
                🔴 Ausgeschieden
            </option>

        </select>

    </div>

    <div class="dialogLabel">

        <label>Eintrittsdatum</label>

        <input
            id="paEintritt"
            type="date"
            value="${this.mitarbeiter.eintritt || ""}">

    </div>

    <div class="dialogLabel">

        <label>Vertragsbeginn</label>

        <input
            id="paVertragsbeginn"
            type="date"
            value="${this.mitarbeiter.vertragsbeginn || ""}">

    </div>

    <div class="dialogLabel">

        <label>Vertragsende</label>

        <input
            id="paVertragsende"
            type="date"
            value="${this.mitarbeiter.vertragsende || ""}">

    </div>

    <div class="dialogLabel">

        <label>Vorgesetzter</label>

        <input
            id="paVorgesetzter"
            type="text"
            value="${this.mitarbeiter.vorgesetzter || ""}">

    </div>

</div>

<div style="margin-top:24px;text-align:right;">

    <button
        class="hauptButton"
        onclick="Personalakte.beschaeftigungSpeichern()">

        💾 Beschäftigung speichern

    </button>

</div>

`

        );

    },

    beschaeftigungSpeichern() {

    this.mitarbeiter.bereich =
        DOM.id("paBereich").value;

    this.mitarbeiter.position =
        DOM.id("paPosition").value;

    this.mitarbeiter.personalnummer =
        DOM.id("paPersonalnummer").value;

    this.mitarbeiter.vertragsart =
        DOM.id("paVertragsart").value;

    this.mitarbeiter.vertragsstunden =
        Number(
            DOM.id("paStunden").value
        );

    this.mitarbeiter.status =
        DOM.id("paStatus").value;

    this.mitarbeiter.eintritt =
        DOM.id("paEintritt").value;

    this.mitarbeiter.vertragsbeginn =
        DOM.id("paVertragsbeginn").value;

    this.mitarbeiter.vertragsende =
        DOM.id("paVertragsende").value;

    this.mitarbeiter.vorgesetzter =
        DOM.id("paVorgesetzter").value;

    Speicher.speichern(

        CONFIG.speicher.mitarbeiter,

        Mitarbeiter.daten

    );

    this.oeffnen(

        this.mitarbeiter

    );

},

    tabKontakt() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="dialogLabel">

        <label>Telefon</label>

        <input
            id="paTelefon"
            type="tel"
            value="${this.mitarbeiter.telefon || ""}">

    </div>

    <div class="dialogLabel">

        <label>Mobiltelefon</label>

        <input
            id="paMobil"
            type="tel"
            value="${this.mitarbeiter.mobil || ""}">

    </div>

    <div class="dialogLabel">

        <label>E-Mail</label>

        <input
            id="paEmail"
            type="email"
            value="${this.mitarbeiter.email || ""}">

    </div>

    <div class="dialogLabel">

        <label>Dienst-E-Mail</label>

        <input
            id="paDienstEmail"
            type="email"
            value="${this.mitarbeiter.dienstEmail || ""}">

    </div>

    <div class="dialogLabel">

        <label>Straße</label>

        <input
            id="paStrasse"
            type="text"
            value="${this.mitarbeiter.strasse || ""}">

    </div>

    <div class="dialogLabel">

        <label>Hausnummer</label>

        <input
            id="paHausnummer"
            type="text"
            value="${this.mitarbeiter.hausnummer || ""}">

    </div>

    <div class="dialogLabel">

        <label>PLZ</label>

        <input
            id="paPlz"
            type="text"
            value="${this.mitarbeiter.plz || ""}">

    </div>

    <div class="dialogLabel">

        <label>Ort</label>

        <input
            id="paOrt"
            type="text"
            value="${this.mitarbeiter.ort || ""}">

    </div>

    <div class="dialogLabel">

        <label>Notfallkontakt</label>

        <input
            id="paNotfallKontakt"
            type="text"
            value="${this.mitarbeiter.notfallKontakt || ""}">

    </div>

    <div class="dialogLabel">

        <label>Notfalltelefon</label>

        <input
            id="paNotfallTelefon"
            type="tel"
            value="${this.mitarbeiter.notfallTelefon || ""}">

    </div>

</div>

<div style="margin-top:24px;text-align:right;">

    <button
        class="hauptButton"
        onclick="Personalakte.kontaktSpeichern()">

        💾 Kontakt speichern

    </button>

</div>

`

        );

    },

    kontaktSpeichern() {

    this.mitarbeiter.telefon =
        DOM.id("paTelefon").value;

    this.mitarbeiter.mobil =
        DOM.id("paMobil").value;

    this.mitarbeiter.email =
        DOM.id("paEmail").value;

    this.mitarbeiter.dienstEmail =
        DOM.id("paDienstEmail").value;

    this.mitarbeiter.strasse =
        DOM.id("paStrasse").value;

    this.mitarbeiter.hausnummer =
        DOM.id("paHausnummer").value;

    this.mitarbeiter.plz =
        DOM.id("paPlz").value;

    this.mitarbeiter.ort =
        DOM.id("paOrt").value;

    this.mitarbeiter.notfallKontakt =
        DOM.id("paNotfallKontakt").value;

    this.mitarbeiter.notfallTelefon =
        DOM.id("paNotfallTelefon").value;

    Speicher.speichern(

        CONFIG.speicher.mitarbeiter,

        Mitarbeiter.daten

    );

    this.oeffnen(

        this.mitarbeiter

    );

},
    
        tabDokumente() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="personalCard">

        <h3>📁 Personaldokumente</h3>

        <p>

            Hier können Dokumente des Mitarbeiters gespeichert werden.

        </p>

        <button
            class="hauptButton"
            id="btnDokumentHochladen">

            📤 Dokument hochladen

        </button>

        <input
            id="paDokument"
            type="file"
            style="display:none"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">

    </div>

    <div class="personalCard">

        <h3>📂 Dokumentenübersicht</h3>

        <div id="dokumentListe">

            <p>

                Noch keine Dokumente vorhanden.

            </p>

        </div>

    </div>

</div>

`

        );
        
        const button = DOM.id("btnDokumentHochladen");

const datei = DOM.id("paDokument");

if (button && datei) {

    button.onclick = () => {

        datei.click();

    };

    datei.onchange = () => {

        const dokument = datei.files[0];

        if (!dokument) {

            return;

        }

        if (!this.mitarbeiter.dokumente) {

            this.mitarbeiter.dokumente = [];

        }

        this.mitarbeiter.dokumente.push({

            name: dokument.name,

            groesse: dokument.size,

            typ: dokument.type,

            datum: new Date().toLocaleDateString("de-DE")

        });

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            Mitarbeiter.daten

        );

        this.tabDokumente();

    };

}

this.dokumentListeAktualisieren();

    },

    tabQualifikation() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="personalCard">

        <h3>🎓 Qualifikationen</h3>

        <table class="personalTabelle">

            <thead>

                <tr>

                    <th>Qualifikation</th>

                    <th>Gültig bis</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>Erste Hilfe</td>

                    <td>-</td>

                </tr>

                <tr>

                    <td>HACCP</td>

                    <td>-</td>

                </tr>

                <tr>

                    <td>Brandschutzhelfer</td>

                    <td>-</td>

                </tr>

                <tr>

                    <td>Allergen-Schulung</td>

                    <td>-</td>

                </tr>

            </tbody>

        </table>

    </div>

    <div style="margin-top:24px;text-align:right;">

        <button
            class="hauptButton">

            ➕ Qualifikation hinzufügen

        </button>

    </div>

</div>

`

        );

    },
    
        tabUrlaub() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="personalCard">

        <h3>📅 Urlaub & Abwesenheiten</h3>

        <p><strong>Urlaubsanspruch:</strong> 30 Tage</p>

        <p><strong>Genommen:</strong> 2 Tage</p>

        <p><strong>Resturlaub:</strong> 28 Tage</p>

        <hr>

        <p><strong>Kranktage:</strong> 3</p>

        <p><strong>Sonderurlaub:</strong> 0</p>

    </div>

    <div style="margin-top:24px;text-align:right;">

        <button
            class="hauptButton">

            ➕ Urlaub eintragen

        </button>

    </div>

</div>

`

        );

    },

    tabNotizen() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="dialogLabel">

        <label>Notizen</label>

        <textarea

            id="paNotizen"

            rows="12"

            placeholder="Interne Notizen zum Mitarbeiter...">${this.mitarbeiter.notizen || ""}</textarea>

    </div>

</div>

<div style="margin-top:24px;text-align:right;">

    <button

        class="hauptButton"

        onclick="Personalakte.notizenSpeichern()">

        💾 Notizen speichern

    </button>

</div>

`

        );

    },

    notizenSpeichern() {

        this.mitarbeiter.notizen =

            DOM.id("paNotizen").value;

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            Mitarbeiter.daten

        );

        this.oeffnen(

            this.mitarbeiter

        );

    }

};