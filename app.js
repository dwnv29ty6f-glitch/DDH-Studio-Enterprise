// =====================================
// DDH Studio Enterprise 6.0
// app.js
// Teil 1
// Variablen & Navigation
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
// Navigation
// -------------------------

const navButtons =
document.querySelectorAll(".navButton");

const seiten =
document.querySelectorAll(".seite");

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
// To-dos
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
// Daten
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
// Speichern
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

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        leer.className =
        "tag leer";

        tage.appendChild(leer);

    }

    // Tage erzeugen

    for(let tag=1;tag<=tageImMonat;tag++){

        const feld =
        document.createElement("div");

        feld.className =
        "tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add("aktiv");

        }

        // Termin vorhanden?

        const hatTermin =
        termine.some(e=>

            e.jahr===aktuellesJahr &&
            e.monat===aktuellerMonat &&
            e.tag===tag

        );

        if(hatTermin){

            feld.style.border =
            "3px solid #2f80ed";

        }

        const nummer =
        document.createElement("div");

        nummer.className =
        "tagNummer";

        nummer.textContent =
        tag;

        feld.appendChild(nummer);

        feld.onclick = ()=>{

            ausgewaehlterTag =
            tag;

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

// =======================
// Monat zurück
// =======================

btnZurueck.onclick = ()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;

        aktuellesJahr--;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};

// =======================
// Monat weiter
// =======================

btnWeiter.onclick = ()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;

        aktuellesJahr++;

    }

    ausgewaehlterTag=1;

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

    const liste = termine.filter(e =>

        e.jahr === aktuellesJahr &&
        e.monat === aktuellerMonat &&
        e.tag === ausgewaehlterTag

    );

    if(liste.length === 0){

        terminListe.innerHTML =
        "<p>Keine Termine vorhanden.</p>";

        return;

    }

    liste.forEach((eintrag)=>{

        const box =
        document.createElement("div");

        box.className =
        "termin";

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

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick = ()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            termin.value =
            eintrag.text;

            kategorie.value =
            eintrag.kategorie;

            const index =
            termine.indexOf(eintrag);

            if(index > -1){

                termine.splice(index,1);

            }

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick = ()=>{

            const index =
            termine.indexOf(eintrag);

            if(index > -1){

                termine.splice(index,1);

            }

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(
            bearbeiten
        );

        buttons.appendChild(
            loeschen
        );

        box.appendChild(
            buttons
        );

        terminListe.appendChild(
            box
        );

    });

}

// =====================================
// Termin speichern
// =====================================

speichernTermin.onclick = ()=>{

    if(termin.value.trim()===""){

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

    termin.value="";

    kalenderZeichnen();

    termineAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 4
// Aufgaben / To-dos
// =====================================

function todosAnzeigen(){

    todoListe.innerHTML = "";

    const projekt =
    todoProjekt.value;

    const liste =
    todos.filter(todo=>

        todo.projekt===projekt

    );

    if(liste.length===0){

        todoListe.innerHTML =
        "<p>Keine Aufgaben vorhanden.</p>";

        return;

    }

    liste.forEach((todo)=>{

        const box =
        document.createElement("div");

        box.className =
        "todo " +
        todo.prioritaet;

        if(todo.erledigt){

            box.classList.add(
                "erledigt"
            );

        }

        // --------------------
        // Text
        // --------------------

        const text =
        document.createElement("div");

        text.className =
        "todoText";

        text.textContent =
        todo.text;

        box.appendChild(text);

        // --------------------
        // Informationen
        // --------------------

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

        // --------------------
        // Buttons
        // --------------------

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        // Erledigt

        const fertig =
        document.createElement("button");

        fertig.textContent =
        "✔";

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

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick = ()=>{

            todoText.value =
            todo.text;

            todoPrioritaet.value =
            todo.prioritaet;

            todoProjekt.value =
            todo.projekt;

            const index =
            todos.indexOf(todo);

            if(index>-1){

                todos.splice(
                    index,
                    1
                );

            }

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick = ()=>{

            const index =
            todos.indexOf(todo);

            if(index>-1){

                todos.splice(
                    index,
                    1
                );

            }

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        buttons.appendChild(
            fertig
        );

        buttons.appendChild(
            bearbeiten
        );

        buttons.appendChild(
            loeschen
        );

        box.appendChild(
            buttons
        );

        todoListe.appendChild(
            box
        );

    });

}

// =====================================
// Aufgabe speichern
// =====================================

todoSpeichern.onclick = ()=>{

    if(todoText.value.trim()===""){

        return;

    }

    todos.push({

        projekt:
        todoProjekt.value,

        text:
        todoText.value,

        prioritaet:
        todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    todoText.value = "";

    todosAnzeigen();

    dashboardAktualisieren();

};

// =====================================
// Projekt wechseln
// =====================================

todoProjekt.onchange = ()=>{

    todosAnzeigen();

    dashboardAktualisieren();

};
// =====================================
// Teil 5
// Dashboard
// =====================================

function dashboardAktualisieren(){

    // -------------------------
    // Termine
    // -------------------------

    const termineHeute =
    termine.filter(t=>

        t.jahr===aktuellesJahr &&
        t.monat===aktuellerMonat &&
        t.tag===ausgewaehlterTag

    );

    heuteTermine.textContent =
    termineHeute.length;

    // -------------------------
    // Offene Aufgaben
    // -------------------------

    const offene =
    todos.filter(todo=>

        !todo.erledigt

    );

    offeneTodos.textContent =
    offene.length;

    // -------------------------
    // Hohe Priorität
    // -------------------------

    const hohe =
    todos.filter(todo=>

        todo.prioritaet==="hoch" &&
        !todo.erledigt

    );

    hohePrioritaet.textContent =
    hohe.length;

    // -------------------------
    // Erledigt
    // -------------------------

    const erledigt =
    todos.filter(todo=>

        todo.erledigt

    );

    erledigteTodos.textContent =
    erledigt.length;

    // -------------------------
    // Dashboard Aufgaben
    // -------------------------

    dashboardTodos.innerHTML = "";

    const projekt =
    todoProjekt.value;

    const liste =
    todos.filter(todo=>

        todo.projekt===projekt &&
        !todo.erledigt

    );

    if(liste.length===0){

        dashboardTodos.innerHTML =
        "<div class='dashboardTodo'>Keine offenen Aufgaben</div>";

        return;

    }

    liste
    .slice(0,5)
    .forEach(todo=>{

        const box =
        document.createElement("div");

        box.className =
        "dashboardTodo";

        let icon = "🟢";

        if(todo.prioritaet==="mittel"){

            icon="🟠";

        }

        if(todo.prioritaet==="hoch"){

            icon="🔴";

        }

        box.innerHTML =
        "<span>" +
        icon +
        " " +
        todo.text +
        "</span>";

        dashboardTodos.appendChild(
            box
        );

    });

}

// =====================================
// Dokumente
// =====================================

let dokumente =
JSON.parse(
localStorage.getItem(
"ddhDokumente"
)
) || [];

// =====================================
// Kunden
// =====================================

let kunden =
JSON.parse(
localStorage.getItem(
"ddhKunden"
)
) || [];

// =====================================
// Projekte
// =====================================

let projekte =
JSON.parse(
localStorage.getItem(
"ddhProjekte"
)
) || [];
// =====================================
// Teil 6
// Navigation + Start
// =====================================

// -------------------------
// Navigation
// -------------------------

navButtons.forEach(button=>{

    button.onclick=()=>{

        navButtons.forEach(btn=>{

            btn.classList.remove(
                "aktiv"
            );

        });

        seiten.forEach(seite=>{

            seite.classList.remove(
                "aktiv"
            );

        });

        button.classList.add(
            "aktiv"
        );

        const name =
        button.dataset.seite;

        const ziel =
        document.getElementById(
            "seite-" + name
        );

        if(ziel){

            ziel.classList.add(
                "aktiv"
            );

        }

    };

});

// =====================================
// Start
// =====================================

datumTitel.textContent =
ausgewaehlterTag +
". " +
monate[aktuellerMonat] +
" " +
aktuellesJahr;

// Uhrzeit

const jetzt =
new Date();

uhrzeit.value =
String(
    jetzt.getHours()
).padStart(2,"0")
+
":"
+
String(
    jetzt.getMinutes()
).padStart(2,"0");

// Daten laden

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

dashboardAktualisieren();

// =====================================
// Enter = Speichern
// =====================================

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

});

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

});

// =====================================
// Dashboard automatisch
// =====================================

setInterval(()=>{

    dashboardAktualisieren();

},30000);

// =====================================
//