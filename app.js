// =====================================
// DDH Studio Enterprise 4.0
// Block 1
// Variablen & Daten
// =====================================

// Monate
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

// Kalender
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

// Termine
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

// To-dos
const todoText =
document.getElementById("todoText");

const todoPrioritaet =
document.getElementById("todoPrioritaet");

const todoSpeichern =
document.getElementById("todoSpeichern");

const todoListe =
document.getElementById("todoListe");

// Datum

const heute = new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag =
heute.getDate();

// Daten

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || [];

let todos =
JSON.parse(
localStorage.getItem("ddhTodos")
) || [];
// =====================================
// Block 2
// Kalender zeichnen
// =====================================

function kalenderZeichnen() {

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

    if (ersterTag === 0) {
        ersterTag = 7;
    }

    const tageImMonat =
        new Date(
            aktuellesJahr,
            aktuellerMonat + 1,
            0
        ).getDate();

    // Leere Felder
    for (let i = 1; i < ersterTag; i++) {

        const leer =
            document.createElement("div");

        leer.className = "tag leer";

        tage.appendChild(leer);

    }

    // Tage erzeugen
    for (let tag = 1; tag <= tageImMonat; tag++) {

        const feld =
            document.createElement("div");

        feld.className = "tag";

        if (tag === ausgewaehlterTag) {

            feld.classList.add("aktiv");

        }

        const nummer =
            document.createElement("div");

        nummer.className = "tagNummer";

        nummer.textContent = tag;

        feld.appendChild(nummer);

        feld.onclick = () => {

            ausgewaehlterTag = tag;

            kalenderZeichnen();

            datumTitel.textContent =
                tag +
                ". " +
                monate[aktuellerMonat] +
                " " +
                aktuellesJahr;

            termineAnzeigen();

        };

        tage.appendChild(feld);

    }

}

// Monat zurück

btnZurueck.onclick = () => {

    aktuellerMonat--;

    if (aktuellerMonat < 0) {

        aktuellerMonat = 11;
        aktuellesJahr--;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

};

// Monat vor

btnWeiter.onclick = () => {

    aktuellerMonat++;

    if (aktuellerMonat > 11) {

        aktuellerMonat = 0;
        aktuellesJahr++;

    }

    ausgewaehlterTag = 1;

    kalenderZeichnen();

    termineAnzeigen();

};
// =====================================
// Block 3
// Termine
// =====================================

function termineAnzeigen() {

    terminListe.innerHTML = "";

    const liste = termine.filter(e =>

        e.jahr === aktuellesJahr &&
        e.monat === aktuellerMonat &&
        e.tag === ausgewaehlterTag

    );

    liste.forEach((eintrag) => {

        const box =
            document.createElement("div");

        box.className = "termin";

        switch (eintrag.kategorie) {

            case "Arbeit":
                box.style.borderLeft =
                    "6px solid #ff922b";
                break;

            case "Privat":
                box.style.borderLeft =
                    "6px solid #4dabf7";
                break;

            case "Schule":
                box.style.borderLeft =
                    "6px solid #51cf66";
                break;

            case "Familie":
                box.style.borderLeft =
                    "6px solid #845ef7";
                break;

            default:
                box.style.borderLeft =
                    "6px solid #868e96";

        }

        const text =
            document.createElement("div");

        text.innerHTML =
            "<b>" +
            eintrag.uhrzeit +
            "</b><br>" +
            "[" +
            eintrag.kategorie +
            "] " +
            eintrag.text;

        box.appendChild(text);

        terminListe.appendChild(box);

    });

}

speichernTermin.onclick = () => {

    if (termin.value.trim() === "") {

        return;

    }

    termine.push({

        jahr: aktuellesJahr,
        monat: aktuellerMonat,
        tag: ausgewaehlterTag,

        uhrzeit: uhrzeit.value,

        text: termin.value,

        kategorie: kategorie.value

    });

    localStorage.setItem(

        "ddhTermine",

        JSON.stringify(termine)

    );

    termin.value = "";

    termineAnzeigen();

    kalenderZeichnen();

};
// =====================================
// Block 4
// To-do-Liste + Start
// =====================================

function todosAnzeigen(){

    todoListe.innerHTML = "";

    todos.forEach((todo,index)=>{

        const box =
        document.createElement("div");

        box.className =
        "todo " + todo.prioritaet;

        if(todo.erledigt){

            box.classList.add("erledigt");

        }

        const text =
        document.createElement("div");

        text.className =
        "todoText";

        text.textContent =
        todo.text;

        box.appendChild(text);

        const info =
        document.createElement("div");

        info.className =
        "todoInfo";

        info.textContent =
        "Priorität: " +
        todo.prioritaet;

        box.appendChild(info);

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        // Erledigt

        const fertig =
        document.createElement("button");

        fertig.textContent = "✔";

        fertig.onclick = ()=>{

            todo.erledigt =
            !todo.erledigt;

            localStorage.setItem(
                "ddhTodos",
                JSON.stringify(todos)
            );

            todosAnzeigen();

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

            todos.splice(index,1);

            localStorage.setItem(
                "ddhTodos",
                JSON.stringify(todos)
            );

            todosAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            todos.splice(index,1);

            localStorage.setItem(
                "ddhTodos",
                JSON.stringify(todos)
            );

            todosAnzeigen();

        };

        buttons.appendChild(fertig);
        buttons.appendChild(bearbeiten);
        buttons.appendChild(loeschen);

        box.appendChild(buttons);

        todoListe.appendChild(box);

    });

}

todoSpeichern.onclick = ()=>{

    if(todoText.value.trim()===""){

        return;

    }

    todos.push({

        text:todoText.value,

        prioritaet:todoPrioritaet.value,

        erledigt:false

    });

    localStorage.setItem(

        "ddhTodos",

        JSON.stringify(todos)

    );

    todoText.value="";

    todosAnzeigen();

};

// Start

datumTitel.textContent =
ausgewaehlterTag +
". " +
monate[aktuellerMonat] +
" " +
aktuellesJahr;

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

const jetzt = new Date();

uhrzeit.value =
String(jetzt.getHours()).padStart(2,"0")
+
":"
+
String(jetzt.getMinutes()).padStart(2,"0");