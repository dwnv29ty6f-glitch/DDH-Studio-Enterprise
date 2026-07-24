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

        this.mitarbeiter.vorname =

            DOM.id("paVorname").value;

        this.mitarbeiter.nachname =

            DOM.id("paNachname").value;

        Speicher.speichern(

            CONFIG.speicher.mitarbeiter,

            Mitarbeiter.daten

        );

        Dialog.schliessen();

        Mitarbeiter.anzeigen();

    },