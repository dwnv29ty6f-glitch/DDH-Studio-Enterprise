// =====================================
// DDH Studio Enterprise 5.0
// app.js
// Teil 1
// Variablen & Initialisierung
// =====================================

// -------------------------
// Monate
// -------------------------

const monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

// -------------------------
// Kalender
// -------------------------

const tage =
document.getElementById("tage");

const monatTitel =
document.getElementById("monatTitel");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

const datumTitel =
document.getElementById("ausgewaehltesDatum");

// -------------------------
// Termine
// -------------------------

const uhrzeit =
document.getElementById("uhrzeit");

const kategorie =
document.getElementById("kategorie");

const termin =
document.getElementById("termin");

const speichernTermin =
document.getElementById("speichernTermin");

const terminListe =
document.getElementById("terminListe");

// -------------------------
// Projekte & To-dos
// -------------------------

const todoProjekt =
document.getElementById("todoProjekt");

const todoText =
document.getElementById("todoText");

const todoPrioritaet =
document.getElementById("todoPrioritaet");

const todoSpeichern =
document.getElementById("todoSpeichern");

const todoListe =
document.getElementById("todoListe");

// -------------------------
// Dashboard
// -------------------------

const heuteTermine =
document.getElementById("heuteTermine");

const offeneTodos =
document.getElementById("offeneTodos");

const hohePrioritaet =
document.getElementById("hohePrioritaet");

const erledigteTodos =
document.getElementById("erledigteTodos");

const dashboardTodos =
document.getElementById("dashboardTodos");

// -------------------------
// Datum
// -------------------------

const heute =
new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag =
heute.getDate();

// -------------------------
// LocalStorage
// -------------------------

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || [];

let todos =
JSON.parse(
localStorage.getItem("ddhTodos")
) || [];

// -------------------------
// Hilfsfunktion
// -------------------------

function speichern(){

    localStorage.setItem(
        "ddhTermine",
        JSON.stringify(termine)
    );

    localStorage.setItem(
        "ddhTodos",
        JSON.stringify(todos)
    );

}
// =====================================
// Teil 2
// Kalender
// =====================================

function kalenderZeichnen(){

    tage.innerHTML = "";

    monatTitel.textContent =
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

    let ersterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    if(ersterTag === 0){

        ersterTag = 7;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat + 1,
        0
    ).getDate();

    // Leere Felder

    for(let i = 1; i < ersterTag; i++){

        const leer =
        document.createElement("div");

        leer.className = "tag leer";

        tage.appendChild(leer);

    }

    // Tage

    for(let tag = 1; tag <= tageImMonat; tag++){

        const feld =
        document.createElement("div");

        feld.className = "tag";

        if(tag === ausgewaehlterTag){

            feld.classList.add("aktiv");

        }

        const nummer =
        document.createElement("div");

        nummer.className =
        "tagNummer";

        nummer.textContent = tag;

        feld.appendChild(nummer);

        // Hat Termine?

        const hatTermin =
        termine.some(t =>

            t.jahr === aktuellesJahr &&
            t.monat === aktuellerMonat &&
            t.tag === tag

        );

        if(hatTermin){

            feld.style.border =
            "3px solid #2f80ed";

        }

        feld.onclick = ()=>{

            ausgewaehlterTag = tag;

            datumTitel.textContent =
            tag +
            ". " +
            monate[aktuellerMonat] +
            " " +
            aktuellesJahr;

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        tage.appendChild(feld);

    }

}

// ========================
// Monat zurück
// ========================

btnZurueck.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat < 0){

        aktuellerMonat = 11;

        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// ========================
// Monat vor
// ========================

btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat > 11){

        aktuellerMonat = 0;

        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 3
// Termine
// =====================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    const liste = termine.filter(termin =>

        termin.jahr === aktuellesJahr &&
        termin.monat === aktuellerMonat &&
        termin.tag === ausgewaehlterTag

    );

    if(liste.length === 0){

        terminListe.innerHTML =
        "<p>Keine Termine vorhanden.</p>";

        return;

    }

    liste.forEach((eintrag,index)=>{

        const box =
        document.createElement("div");

        box.className = "termin";

        switch(eintrag.kategorie){

            case "Arbeit":
                box.style.borderLeft =
                "6px solid #ff922b";
                break;

            case "Privat":
                box.style.borderLeft =
                "6px solid #4dabf7";
                break;

            case "Familie":
                box.style.borderLeft =
                "6px solid #845ef7";
                break;

            case "Schule":
                box.style.borderLeft =
                "6px solid #51cf66";
                break;

            case "Urlaub":
                box.style.borderLeft =
                "6px solid #15aabf";
                break;

            case "Geburtstag":
                box.style.borderLeft =
                "6px solid #f06595";
                break;

            default:
                box.style.borderLeft =
                "6px solid #868e96";

        }

        const text =
        document.createElement("div");

        text.innerHTML =
        "<strong>" +
        eintrag.uhrzeit +
        "</strong><br>" +
        "[" +
        eintrag.kategorie +
        "] " +
        eintrag.text;

        box.appendChild(text);

        const buttons =
        document.createElement("div");

        buttons.className =
        "terminButtons";

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            termin.value =
            eintrag.text;

            kategorie.value =
            eintrag.kategorie;

            const original =
            termine.indexOf(eintrag);

            if(original > -1){

                termine.splice(original,1);

            }

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            const original =
            termine.indexOf(eintrag);

            if(original > -1){

                termine.splice(original,1);

            }

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(bearbeiten);

        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        terminListe.appendChild(box);

    });

}

// =====================================
// Termin speichern
// =====================================

speichernTermin.onclick = ()=>{

    if(termin.value.trim() === ""){

        return;

    }

    termine.push({

        jahr:aktuellesJahr,

        monat:aktuellerMonat,

        tag:ausgewaehlterTag,

        uhrzeit:uhrzeit.value,

        text:termin.value,

        kategorie:kategorie.value

    });

    speichern();

    termin.value = "";

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 4
// Projekte & To-do-Liste
// =====================================

function todosAnzeigen(){

    todoListe.innerHTML = "";

    const projekt =
    todoProjekt.value;

    const liste = todos.filter(todo =>

        todo.projekt === projekt

    );

    if(liste.length === 0){

        todoListe.innerHTML =
        "<p>Keine Aufgaben vorhanden.</p>";

        return;

    }

    liste.forEach((todo)=>{

        const box =
        document.createElement("div");

        box.className =
        "todo " + todo.prioritaet;

        if(todo.erledigt){

            box.classList.add("erledigt");

        }

        // Text

        const text =
        document.createElement("div");

        text.className =
        "todoText";

        text.textContent =
        todo.text;

        box.appendChild(text);

        // Info

        const info =
        document.createElement("div");

        info.className =
        "todoInfo";

        info.textContent =
        "📁 " +
        todo.projekt +
        " • " +
        todo.prioritaet;

        box.appendChild(info);

        // Buttons

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        // Fertig

        const fertig =
        document.createElement("button");

        fertig.textContent = "✔";

        fertig.onclick = ()=>{

            todo.erledigt =
            !todo.erledigt;

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            todoText.value =
            todo.text;

            todoPrioritaet.value =
            todo.prioritaet;

            todoProjekt.value =
            todo.projekt;

            const original =
            todos.indexOf(todo);

            if(original > -1){

                todos.splice(original,1);

            }

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            const original =
            todos.indexOf(todo);

            if(original > -1){

                todos.splice(original,1);

            }

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(fertig);

        buttons.appendChild(bearbeiten);

        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        todoListe.appendChild(box);

    });

}

// =====================================
// Aufgabe speichern
// =====================================

todoSpeichern.onclick = ()=>{

    if(todoText.value.trim() === ""){

        return;

    }

    todos.push({

        projekt:todoProjekt.value,

        text:todoText.value,

        prioritaet:todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    todoText.value = "";

    todosAnzeigen();

    dashboardAktualisieren();

};

// Projekt wechseln

todoProjekt.onchange = ()=>{

    todosAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 5
// Dashboard
// =====================================

function dashboardAktualisieren(){

    // ------------------------
    // Termine heute
    // ------------------------

    const termineHeute =
    termine.filter(termin =>

        termin.jahr === aktuellesJahr &&
        termin.monat === aktuellerMonat &&
        termin.tag === ausgewaehlterTag

    );

    heuteTermine.textContent =
    termineHeute.length;

    // ------------------------
    // Offene Aufgaben
    // ------------------------

    const offene =
    todos.filter(todo =>

        !todo.erledigt

    );

    offeneTodos.textContent =
    offene.length;

    // ------------------------
    // Hohe Priorität
    // ------------------------

    const hoch =
    todos.filter(todo =>

        todo.prioritaet === "hoch" &&
        !todo.erledigt

    );

    hohePrioritaet.textContent =
    hoch.length;

    // ------------------------
    // Erledigt
    // ------------------------

    const erledigt =
    todos.filter(todo =>

        todo.erledigt

    );

    erledigteTodos.textContent =
    erledigt.length;

    // ------------------------
    // Dashboard-Aufgaben
    // ------------------------

    dashboardTodos.innerHTML = "";

    const projekt =
    todoProjekt.value;

    const naechste =
    todos.filter(todo =>

        todo.projekt === projekt &&
        !todo.erledigt

    );

    if(naechste.length === 0){

        dashboardTodos.innerHTML =
        "<div class='dashboardTodo'>Keine offenen Aufgaben.</div>";

        return;

    }

    naechste
    .slice(0,5)
    .forEach(todo=>{

        const eintrag =
        document.createElement("div");

        eintrag.className =
        "dashboardTodo";

        let icon = "🟢";

        if(todo.prioritaet==="mittel"){

            icon="🟠";

        }

        if(todo.prioritaet==="hoch"){

            icon="🔴";

        }

        eintrag.innerHTML =
        "<span>" +
        icon +
        " " +
        todo.text +
        "</span>";

        dashboardTodos.appendChild(
            eintrag
        );

    });

}
// =====================================
// Teil 6
// Start & Initialisierung
// =====================================

// Datum anzeigen

datumTitel.textContent =
ausgewaehlterTag +
". " +
monate[aktuellerMonat] +
" " +
aktuellesJahr;

// Aktuelle Uhrzeit einsetzen

const jetzt =
new Date();

uhrzeit.value =
String(jetzt.getHours())
.padStart(2,"0")
+
":"
+
String(jetzt.getMinutes())
.padStart(2,"0");

// Alles laden

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

dashboardAktualisieren();

// ==========================
// Enter speichert Termin
// ==========================

termin.addEventListener(
"keydown",
(event)=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

}
);

// ==========================
// Enter speichert To-do
// ==========================

todoText.addEventListener(
"keydown",
(event)=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

}
);

// ==========================
// Dashboard automatisch
// aktualisieren
// ==========================

setInterval(()=>{

    dashboardAktualisieren();

},30000);

// ==========================
// Fenster aktualisiert
// Dashboard
// ==========================

window.addEventListener(
"focus",
()=>{

    dashboardAktualisieren();

}
);

// =====================================
// DDH Studio Enterprise 5.0
// Ende
// =====================================