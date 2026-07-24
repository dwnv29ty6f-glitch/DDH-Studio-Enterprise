const Personalakte = {

    oeffnen(mitarbeiter) {

        Dialog.oeffnen(

            "👤 Personalakte",

            `

<div class="personalakte">

    <h2>

        ${mitarbeiter.vorname} ${mitarbeiter.nachname}

    </h2>

    <p>

        ${mitarbeiter.position || "-"}

    </p>

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

        Personalakte V2 wird aufgebaut...

    </div>

</div>

`
        );

    }

};