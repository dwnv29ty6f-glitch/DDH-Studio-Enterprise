// =====================================
// DDH Studio Enterprise 4.1
// Teil 1
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

// ======================
// To-do
// ======================

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

// ======================
// Datum
// ======================

const heute =
new Date();

let aktuellerMonat =
heute.getMonth();

let aktuellesJahr =
heute.getFullYear();

let ausgewaehlterTag =
heute.getDate();

// ======================
// Daten
// ======================

let termine =
JSON.parse(
localStorage.getItem("ddhTermine")
) || [];

let todos =
JSON.parse(
localStorage.getItem("ddhTodos")
) || [];

// =====================================
// Kalender
// =====================================

function kalenderZeichnen(){

    tage.innerHTML="";

    monatTitel.textContent=
    monate[aktuellerMonat] +
    " " +
    aktuellesJahr;

    let ersterTag=
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    if(ersterTag===0){

        ersterTag=7;

    }

    const tageImMonat=
    new Date(
        aktuellesJahr,
        aktuellerMonat+1,
        0
    ).getDate();

    for(let i=1;i<ersterTag;i++){

        const leer=
        document.createElement("div");

        leer.className="tag leer";

        tage.appendChild(leer);

    }

    for(let tag=1;tag<=tageImMonat;tag++){

        const feld=
        document.createElement("div");

        feld.className="tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add("aktiv");

        }

        const nummer=
        document.createElement("div");

        nummer.className="tagNummer";

        nummer.textContent=tag;

        feld.appendChild(nummer);

        feld.onclick=()=>{

            ausgewaehlterTag=tag;

            kalenderZeichnen();

            datumTitel.textContent=
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

btnZurueck.onclick=()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;

        aktuellesJahr--;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

};

// Monat weiter

btnWeiter.onclick=()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;

        aktuellesJahr++;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

};
// =====================================
// DDH Studio Enterprise 4.1
// Teil 2
// Termine + Projekte + To-dos
// =====================================

// --------------------
// Termine
// --------------------

function termineAnzeigen(){

    terminListe.innerHTML="";

    const liste=termine.filter(e=>

        e.jahr===aktuellesJahr &&
        e.monat===aktuellerMonat &&
        e.tag===ausgewaehlterTag

    );

    liste.forEach(e=>{

        const box=document.createElement("div");

        box.className="termin";

        const info=document.createElement("div");

        info.innerHTML=
        "<strong>"+e.uhrzeit+"</strong><br>"+
        "["+e.kategorie+"] "+e.text;

        box.appendChild(info);

        terminListe.appendChild(box);

    });

}

speichernTermin.onclick=()=>{

    if(termin.value.trim()==="") return;

    termine.push({

        jahr:aktuellesJahr,
        monat:aktuellerMonat,
        tag:ausgewaehlterTag,

        uhrzeit:uhrzeit.value,

        text:termin.value,

        kategorie:kategorie.value

    });

    localStorage.setItem(
        "ddhTermine",
        JSON.stringify(termine)
    );

    termin.value="";

    termineAnzeigen();

};

// --------------------
// To-dos
// --------------------

function todosAnzeigen(){

    todoListe.innerHTML="";

    const projekt=
    todoProjekt.value;

    const liste=todos.filter(todo=>

        todo.projekt===projekt

    );

    liste.forEach((todo,index)=>{

        const box=
        document.createElement("div");

        box.className=
        "todo "+todo.prioritaet;

        if(todo.erledigt){

            box.classList.add("erledigt");

        }

        const text=
        document.createElement("div");

        text.className="todoText";

        text.textContent=todo.text;

        box.appendChild(text);

        const info=
        document.createElement("div");

        info.className="todoInfo";

        info.textContent=
        "📁 "+
        todo.projekt+
        " • "+
        todo.prioritaet;

        box.appendChild(info);

        const buttons=
        document.createElement("div");

        buttons.className=
        "todoButtons";

        const fertig=
        document.createElement("button");

        fertig.textContent="✔";

        fertig.onclick=()=>{

            todo.erledigt=!todo.erledigt;

            localStorage.setItem(
                "ddhTodos",
                JSON.stringify(todos)
            );

            todosAnzeigen();

        };

        const bearbeiten=
        document.createElement("button");

        bearbeiten.textContent="✏️";

        bearbeiten.onclick=()=>{

            todoText.value=
            todo.text;

            todoPrioritaet.value=
            todo.prioritaet;

            todoProjekt.value=
            todo.projekt;

            todos.splice(
                todos.indexOf(todo),
                1
            );

            localStorage.setItem(
                "ddhTodos",
                JSON.stringify(todos)
            );

            todosAnzeigen();

        };

        const loeschen=
        document.createElement("button");

        loeschen.textContent="🗑️";

        loeschen.onclick=()=>{

            todos.splice(
                todos.indexOf(todo),
                1
            );

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

todoSpeichern.onclick=()=>{

    if(todoText.value.trim()==="") return;

    todos.push({

        projekt:todoProjekt.value,

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

todoProjekt.onchange=()=>{

    todosAnzeigen();

};

// --------------------
// Start
// --------------------

datumTitel.textContent=
ausgewaehlterTag+
". "+
monate[aktuellerMonat]+
" "+
aktuellesJahr;

kalenderZeichnen();

termineAnzeigen();

todosAnzeigen();

const jetzt=new Date();

uhrzeit.value=
String(jetzt.getHours()).padStart(2,"0")+
":"+
String(jetzt.getMinutes()).padStart(2,"0");