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