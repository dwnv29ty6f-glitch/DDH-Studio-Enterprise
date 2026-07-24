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

            type="date">

    </div>

    <div class="dialogLabel">

        <label>Geschlecht</label>

        <select id="paGeschlecht">

            <option>Männlich</option>

            <option>Weiblich</option>

            <option>Divers</option>

        </select>

    </div>

    <div class="dialogLabel">

        <label>Nationalität</label>

        <input

            id="paNationalitaet"

            type="text">

    </div>

    <div class="dialogLabel">

        <label>Familienstand</label>

        <select id="paFamilienstand">

            <option>Ledig</option>

            <option>Verheiratet</option>

            <option>Geschieden</option>

            <option>Verwitwet</option>

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

   profilSpeichern() {

    alert("Profil speichern funktioniert!");

},

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

            <option value="Vollzeit" ${this.mitarbeiter.vertragsart==="Vollzeit"?"selected":""}>Vollzeit</option>

            <option value="Teilzeit" ${this.mitarbeiter.vertragsart==="Teilzeit"?"selected":""}>Teilzeit</option>

            <option value="Minijob" ${this.mitarbeiter.vertragsart==="Minijob"?"selected":""}>Minijob</option>

            <option value="Befristet" ${this.mitarbeiter.vertragsart==="Befristet"?"selected":""}>Befristet</option>

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

            <option value="Aktiv" ${this.mitarbeiter.status==="Aktiv"?"selected":""}>🟢 Aktiv</option>

            <option value="Urlaub" ${this.mitarbeiter.status==="Urlaub"?"selected":""}>🟡 Urlaub</option>

            <option value="Krank" ${this.mitarbeiter.status==="Krank"?"selected":""}>🟠 Krank</option>

            <option value="Ausgeschieden" ${this.mitarbeiter.status==="Ausgeschieden"?"selected":""}>🔴 Ausgeschieden</option>

        </select>

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
            Number(DOM.id("paStunden").value);

        this.mitarbeiter.status =
            DOM.id("paStatus").value;

        Speicher.speichern(
            CONFIG.speicher.mitarbeiter,
            Mitarbeiter.daten
        );

        this.oeffnen(this.mitarbeiter);

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

        <label>E-Mail</label>

        <input
            id="paEmail"
            type="email"
            value="${this.mitarbeiter.email || ""}">

    </div>

    <div class="dialogLabel">

        <label>Adresse</label>

        <input
            id="paAdresse"
            type="text"
            value="${this.mitarbeiter.adresse || ""}">

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

        this.mitarbeiter.email =
            DOM.id("paEmail").value;

        this.mitarbeiter.adresse =
            DOM.id("paAdresse").value;

        Speicher.speichern(
            CONFIG.speicher.mitarbeiter,
            Mitarbeiter.daten
        );

        this.oeffnen(this.mitarbeiter);

    },
    
        tabDokumente() {

        DOM.html(

            "personalContent",

            `

<div class="personalForm">

    <div class="personalCard">

        <h3>📁 Dokumente</h3>

        <p>Noch keine Dokumente vorhanden.</p>

        <button
            class="hauptButton">

            📤 Dokument hochladen

        </button>

    </div>

    <div class="personalCard">

        <h3>📄 Dokumentenarten</h3>

        <ul class="personalListe">

            <li>Arbeitsvertrag</li>

            <li>Hygienebelehrung</li>

            <li>Gesundheitszeugnis</li>

            <li>Zeugnisse</li>

            <li>Zertifikate</li>

        </ul>

    </div>

</div>

`

        );

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