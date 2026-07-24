const Personalakte = {

    oeffnen(mitarbeiter) {

        Dialog.oeffnen(

            "👤 Personalakte",

            `

<div class="personalakte">

   <div class="personalHeader">

    <div class="personalAvatar">

        ${mitarbeiter.profilbild
            ? `<img
                src="${mitarbeiter.profilbild}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:50%;
                ">`
            : "👤"
        }

    </div>

    <div class="personalInfo">

        <h2>

            ${mitarbeiter.vorname} ${mitarbeiter.nachname}

        </h2>

        <p>

            ${mitarbeiter.position || "-"} • ${mitarbeiter.bereich || "-"}

        </p>

        <div class="personalBadges">

            <span class="personalBadge">

                ${mitarbeiter.status || "Aktiv"}

            </span>

            <span class="personalBadge">

                📄 ${mitarbeiter.vertragsart || "-"}

            </span>

            <span class="personalBadge">

                ⏰ ${mitarbeiter.vertragsstunden || 0} Std.

            </span>

        </div>

    </div>

</div>

    <div class="profilTabs">

        <button class="profilTab aktiv">

            👤 Profil

        </button>

        <button class="profilTab">

            💼 Beschäftigung

        </button>

        <button class="profilTab">

            📞 Kontakt

        </button>

        <button class="profilTab">

            📁 Dokumente

        </button>

        <button class="profilTab">

            📝 Notizen

        </button>

    </div>

   <div id="personalakteInhalt">

    <div class="personalakteDashboard">

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

                Stunden

            </div>

            <div class="personalWert">

                ${mitarbeiter.vertragsstunden || 0}

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

        <div class="personalCard">

            <div class="personalIcon">🎓</div>

            <div class="personalTitel">

                Qualifikationen

            </div>

            <div class="personalWert">

                0

            </div>

        </div>

        <div class="personalCard">

            <div class="personalIcon">💰</div>

            <div class="personalTitel">

                Überstunden

            </div>

            <div class="personalWert">

                +0

            </div>

        </div>

    </div>

</div>

</div>

`
        );

    }

};