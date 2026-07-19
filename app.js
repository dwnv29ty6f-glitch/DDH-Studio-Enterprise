// =====================================
// DDH Studio Enterprise 8.0
// app.js
// Teil 1
// Grunddaten
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
// Heutiges Datum
// -------------------------

const heute = new Date();

let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();
let ausgewaehlterTag = heute.getDate();

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

const datumTitel =
document.getElementById("ausgewaehltesDatum");

const btnZurueck =
document.getElementById("vorherigerMonat");

const btnWeiter =
document.getElementById("naechsterMonat");

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
// Aufgaben
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

const dashboardSchichten =
document.getElementById("dashboardSchichten");

// -------------------------
// Schichtplan
// -------------------------

const mitarbeiterName =
document.getElementById("mitarbeiterName");

const mitarbeiterSpeichern =
document.getElementById("mitarbeiterSpeichern");

const mitarbeiterListe =
document.getElementById("mitarbeiterListe");

const schichtHeader =
document.getElementById("schichtHeader");

const schichtplanBody =
document.getElementById("schichtplanBody");

// -------------------------
// Daten laden
// -------------------------

let termine =
JSON.parse(localStorage.getItem("ddhTermine")) || [];

let todos =
JSON.parse(localStorage.getItem("ddhTodos")) || [];

let mitarbeiter =
JSON.parse(localStorage.getItem("ddhMitarbeiter")) || [];

let schichten =
JSON.parse(localStorage.getItem("ddhSchichten")) || [];

let dokumente =
JSON.parse(localStorage.getItem("ddhDokumente")) || [];

let kunden =
JSON.parse(localStorage.getItem("ddhKunden")) || [];

let projekte =
JSON.parse(localStorage.getItem("ddhProjekte")) || [];
// =====================================
// DDH Studio Enterprise 8.0
// Teil 2
// Speichern & Navigation
// =====================================

// -------------------------
// Daten speichern
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

    localStorage.setItem(
        "ddhMitarbeiter",
        JSON.stringify(mitarbeiter)
    );

    localStorage.setItem(
        "ddhSchichten",
        JSON.stringify(schichten)
    );

    localStorage.setItem(
        "ddhDokumente",
        JSON.stringify(dokumente)
    );

    localStorage.setItem(
        "ddhKunden",
        JSON.stringify(kunden)
    );

    localStorage.setItem(
        "ddhProjekte",
        JSON.stringify(projekte)
    );

}

// -------------------------
// Datum formatieren
// -------------------------

function datumText(tag,monat,jahr){

    return (

        tag +

        ". " +

        monate[monat] +

        " " +

        jahr

    );

}

// -------------------------
// Seite anzeigen
// -------------------------

function seiteAnzeigen(name){

    seiten.forEach(seite=>{

        seite.classList.remove(
            "aktiv"
        );

    });

    navButtons.forEach(button=>{

        button.classList.remove(
            "aktiv"
        );

    });

    const ziel = document.getElementById(
        "seite-" + name
    );

    if(ziel){

        ziel.classList.add(
            "aktiv"
        );

    }

    const button =
    document.querySelector(

        '.navButton[data-seite="' +

        name +

        '"]'

    );

    if(button){

        button.classList.add(
            "aktiv"
        );

    }

    localStorage.setItem(
        "ddhSeite",
        name
    );

}

// -------------------------
// Navigation starten
// -------------------------

navButtons.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            seiteAnzeigen(
                button.dataset.seite
            );

        }
    );

});
// =====================================
// DDH Studio Enterprise 8.0
// Teil 3
// Kalender
// =====================================

function kalenderZeichnen(){

    tage.innerHTML = "";

    monatTitel.textContent =

        monate[aktuellerMonat] +

        " " +

        aktuellesJahr;

    datumTitel.textContent =

        datumText(

            ausgewaehlterTag,

            aktuellerMonat,

            aktuellesJahr

        );

    let ersterTag =
    new Date(
        aktuellesJahr,
        aktuellerMonat,
        1
    ).getDay();

    if(ersterTag===0){

        ersterTag=7;

    }

    const tageImMonat =
    new Date(
        aktuellesJahr,
        aktuellerMonat+1,
        0
    ).getDate();

    for(let i=1;i<ersterTag;i++){

        const leer =
        document.createElement("div");

        leer.className =
        "tag leer";

        tage.appendChild(leer);

    }

    for(let tag=1;tag<=tageImMonat;tag++){

        const feld =
        document.createElement("div");

        feld.className =
        "tag";

        if(tag===ausgewaehlterTag){

            feld.classList.add(
                "aktiv"
            );

        }

        const nummer =
        document.createElement("div");

        nummer.className =
        "tagNummer";

        nummer.textContent =
        tag;

        feld.appendChild(
            nummer
        );

        const anzahl =
        termine.filter(t=>

            t.tag===tag &&

            t.monat===aktuellerMonat &&

            t.jahr===aktuellesJahr

        ).length;

        if(anzahl>0){

            const badge =
            document.createElement("small");

            badge.textContent =
            anzahl + " Termin";

            if(anzahl>1){

                badge.textContent += "e";

            }

            feld.appendChild(
                badge
            );

        }

        feld.onclick=()=>{

            ausgewaehlterTag =
            tag;

            kalenderZeichnen();

            termineAnzeigen();

        };

        tage.appendChild(
            feld
        );

    }

}

// =====================================
// Monat wechseln
// =====================================

btnZurueck.onclick=()=>{

    aktuellerMonat--;

    if(aktuellerMonat<0){

        aktuellerMonat=11;

        aktuellesJahr--;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

    schichtplanZeichnen();

};

btnWeiter.onclick=()=>{

    aktuellerMonat++;

    if(aktuellerMonat>11){

        aktuellerMonat=0;

        aktuellesJahr++;

    }

    ausgewaehlterTag=1;

    kalenderZeichnen();

    termineAnzeigen();

    schichtplanZeichnen();

};
// =====================================
// DDH Studio Enterprise 8.0
// Teil 4
// Termine
// =====================================

function termineAnzeigen(){

    terminListe.innerHTML = "";

    const liste = termine.filter(t =>

        t.jahr === aktuellesJahr &&
        t.monat === aktuellerMonat &&
        t.tag === ausgewaehlterTag

    );

    if(liste.length===0){

        terminListe.innerHTML =
        "<p>Keine Termine vorhanden.</p>";

        return;

    }

    liste.sort((a,b)=>
        a.uhrzeit.localeCompare(b.uhrzeit)
    );

    liste.forEach(eintrag=>{

        const box =
        document.createElement("div");

        box.className =
        "termin";

        box.innerHTML =

        "<strong>" +

        (eintrag.uhrzeit || "--:--") +

        "</strong><br>" +

        "[" +

        eintrag.kategorie +

        "] " +

        eintrag.text;

        const buttons =
        document.createElement("div");

        buttons.className =
        "terminButtons";

        // Bearbeiten

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent =
        "✏️";

        bearbeiten.onclick=()=>{

            uhrzeit.value =
            eintrag.uhrzeit;

            kategorie.value =
            eintrag.kategorie;

            termin.value =
            eintrag.text;

            termine =
            termine.filter(t=>t!==eintrag);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            if(!confirm(
                "Termin löschen?"
            )){

                return;

            }

            termine =
            termine.filter(t=>t!==eintrag);

            speichern();

            kalenderZeichnen();

            termineAnzeigen();

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

speichernTermin.onclick=()=>{

    if(
        termin.value.trim()===""
    ){

        return;

    }

    termine.push({

        jahr:
        aktuellesJahr,

        monat:
        aktuellerMonat,

        tag:
        ausgewaehlterTag,

        uhrzeit:
        uhrzeit.value,

        kategorie:
        kategorie.value,

        text:
        termin.value.trim()

    });

    speichern();

    termin.value="";

    kalenderZeichnen();

    termineAnzeigen();

};

// Enter = Termin speichern

termin.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        speichernTermin.click();

    }

});
// =====================================
// DDH Studio Enterprise 8.0
// Teil 5
// Aufgaben
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

    liste.forEach(todo=>{

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

        "📁 " +

        todo.projekt +

        " • " +

        todo.prioritaet;

        box.appendChild(info);

        const buttons =
        document.createElement("div");

        buttons.className =
        "todoButtons";

        // Erledigt

        const fertig =
        document.createElement("button");

        fertig.textContent =
        "✔";

        fertig.onclick=()=>{

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

        bearbeiten.onclick=()=>{

            todoText.value =
            todo.text;

            todoPrioritaet.value =
            todo.prioritaet;

            todoProjekt.value =
            todo.projekt;

            todos =
            todos.filter(t=>t!==todo);

            speichern();

            todosAnzeigen();

        };

        // Löschen

        const loeschen =
        document.createElement("button");

        loeschen.textContent =
        "🗑️";

        loeschen.onclick=()=>{

            if(!confirm(
                "Aufgabe löschen?"
            )){

                return;

            }

            todos =
            todos.filter(t=>t!==todo);

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

todoSpeichern.onclick=()=>{

    if(
        todoText.value.trim()===""
    ){

        return;

    }

    todos.push({

        projekt:
        todoProjekt.value,

        text:
        todoText.value.trim(),

        prioritaet:
        todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    todoText.value="";

    todosAnzeigen();

    dashboardAktualisieren();

};

// Projekt wechseln

todoProjekt.onchange=()=>{

    todosAnzeigen();

};

// Enter = Aufgabe speichern

todoText.addEventListener(
"keydown",
event=>{

    if(event.key==="Enter"){

        todoSpeichern.click();

    }

});
// =====================================
// DDH Studio Enterprise 8.0
// Teil 6
// Dashboard
// =====================================

function dashboardAktualisieren(){

    // -------------------------
    // Termine heute
    // -------------------------

    const heuteListe = termine.filter(t=>

        t.tag===ausgewaehlterTag &&
        t.monat===aktuellerMonat &&
        t.jahr===aktuellesJahr

    );

    heuteTermine.textContent =
    heuteListe.length;

    // -------------------------
    // Aufgaben
    // -------------------------

    const offen =
    todos.filter(t=>!t.erledigt);

    const erledigt =
    todos.filter(t=>t.erledigt);

    const hoch =
    todos.filter(t=>

        !t.erledigt &&
        t.prioritaet==="hoch"

    );

    offeneTodos.textContent =
    offen.length;

    erledigteTodos.textContent =
    erledigt.length;

    hohePrioritaet.textContent =
    hoch.length;

    // -------------------------
    // Nächste Aufgaben
    // -------------------------

    dashboardTodos.innerHTML="";

    if(offen.length===0){

        dashboardTodos.innerHTML=

        "<p>Keine offenen Aufgaben.</p>";

    }else{

        offen.slice(0,5).forEach(todo=>{

            const box=
            document.createElement("div");

            box.className=
            "dashboardTodo";

            box.innerHTML=

            "<strong>"+

            todo.text+

            "</strong><br>"+

            "📁 "+todo.projekt+

            " • "+

            todo.prioritaet;

            dashboardTodos.appendChild(
                box
            );

        });

    }

    // -------------------------
    // Mitarbeiter im Dienst
    // -------------------------

    dashboardSchichten.innerHTML="";

    const heuteSchichten=

    schichten.filter(s=>

        s.tag===ausgewaehlterTag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(heuteSchichten.length===0){

        dashboardSchichten.innerHTML=

        "<p>Keine Schichten vorhanden.</p>";

    }else{

        heuteSchichten.forEach(s=>{

            const box=
            document.createElement("div");

            box.className=
            "dashboardTodo";

            box.innerHTML=

            "<strong>"+

            s.name+

            "</strong><br>"+

            "Schicht: "+

            s.typ;

            dashboardSchichten.appendChild(
                box
            );

        });

    }

}
// =====================================
// DDH Studio Enterprise 8.0
// Teil 7
// Mitarbeiter & Schichtplan
// =====================================

// -------------------------
// Mitarbeiter anzeigen
// -------------------------

function mitarbeiterAnzeigen(){

    mitarbeiterListe.innerHTML="";

    if(mitarbeiter.length===0){

        mitarbeiterListe.innerHTML=
        "<p>Noch keine Mitarbeiter vorhanden.</p>";

        return;

    }

    mitarbeiter.forEach(person=>{

        const box=
        document.createElement("div");

        box.className="mitarbeiter";

        box.textContent=person.name;

        mitarbeiterListe.appendChild(box);

    });

}

// -------------------------
// Mitarbeiter speichern
// -------------------------

mitarbeiterSpeichern.onclick=()=>{

    const name=
    mitarbeiterName.value.trim();

    if(name===""){

        return;

    }

    if(

        mitarbeiter.some(m=>

            m.name===name

        )

    ){

        alert("Mitarbeiter existiert bereits.");

        return;

    }

    mitarbeiter.push({

        name:name

    });

    speichern();

    mitarbeiterName.value="";

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

};

// -------------------------
// Enter = Mitarbeiter
// -------------------------

mitarbeiterName.addEventListener(

"keydown",

event=>{

    if(event.key==="Enter"){

        mitarbeiterSpeichern.click();

    }

});

// -------------------------
// Schichtplan zeichnen
// -------------------------

function schichtplanZeichnen(){

    schichtHeader.innerHTML=

    "<th>Mitarbeiter</th>";

    schichtplanBody.innerHTML="";

    document.getElementById(

        "schichtMonat"

    ).textContent=

    monate[aktuellerMonat]

    +" "+

    aktuellesJahr;

    const tageImMonat=

    new Date(

        aktuellesJahr,

        aktuellerMonat+1,

        0

    ).getDate();

    // Tage erzeugen

    for(

        let tag=1;

        tag<=tageImMonat;

        tag++

    ){

        const th=

        document.createElement("th");

        th.textContent=tag;

        schichtHeader.appendChild(th);

    }

    // Mitarbeiter

    mitarbeiter.forEach(person=>{

        const tr=

        document.createElement("tr");

        const name=

        document.createElement("td");

        name.textContent=

        person.name;

        tr.appendChild(name);

        for(

            let tag=1;

            tag<=tageImMonat;

            tag++

        ){

            const td=

            document.createElement("td");

            const eintrag=

            schichten.find(s=>

                s.name===person.name &&

                s.tag===tag &&

                s.monat===aktuellerMonat &&

                s.jahr===aktuellesJahr

            );

            if(eintrag){

                const box=

                document.createElement("div");

                box.className=

                "schicht "+

                eintrag.typ;

                switch(eintrag.typ){

                    case "frueh":

                        box.textContent="F";

                        break;

                    case "spaet":

                        box.textContent="S";

                        break;

                    case "nacht":

                        box.textContent="N";

                        break;

                    case "frei":

                        box.textContent="-";

                        break;

                    case "urlaub":

                        box.textContent="U";

                        break;

                    case "krank":

                        box.textContent="K";

                        break;

                }

                td.appendChild(box);

            }

            td.onclick=()=>{

                schichtBearbeiten(

                    person.name,

                    tag

                );

            };

            tr.appendChild(td);

        }

        schichtplanBody.appendChild(tr);

    });

}
// =====================================
// DDH Studio Enterprise 8.0
// Teil 8
// Schichten bearbeiten
// =====================================

function schichtBearbeiten(name,tag){

    const eingabe = prompt(

`Schicht auswählen

F = Früh
S = Spät
N = Nacht
R = Frei
U = Urlaub
K = Krank
L = Löschen`

    );

    if(eingabe===null){

        return;

    }

    const wert =
    eingabe.toUpperCase();

    // -------------------------
    // Schicht löschen
    // -------------------------

    if(wert==="L"){

        schichten = schichten.filter(s=>

            !(

                s.name===name &&

                s.tag===tag &&

                s.monat===aktuellerMonat &&

                s.jahr===aktuellesJahr

            )

        );

        speichern();

        schichtplanZeichnen();

        dashboardAktualisieren();

        return;

    }

    let typ="";

    switch(wert){

        case "F":
            typ="frueh";
            break;

        case "S":
            typ="spaet";
            break;

        case "N":
            typ="nacht";
            break;

        case "R":
            typ="frei";
            break;

        case "U":
            typ="urlaub";
            break;

        case "K":
            typ="krank";
            break;

        default:

            alert("Ungültige Eingabe");

            return;

    }

    const vorhanden =
    schichten.find(s=>

        s.name===name &&

        s.tag===tag &&

        s.monat===aktuellerMonat &&

        s.jahr===aktuellesJahr

    );

    if(vorhanden){

        vorhanden.typ=typ;

    }else{

        schichten.push({

            name:name,

            tag:tag,

            monat:aktuellerMonat,

            jahr:aktuellesJahr,

            typ:typ

        });

    }

    speichern();

    schichtplanZeichnen();

    dashboardAktualisieren();

}

// =====================================
// Monat wechseln (Schichtplan)
// =====================================

const schichtVorherigerMonat =
document.getElementById(
    "schichtVorherigerMonat"
);

const schichtNaechsterMonat =
document.getElementById(
    "schichtNaechsterMonat"
);

if(schichtVorherigerMonat){

    schichtVorherigerMonat.onclick=()=>{

        aktuellerMonat--;

        if(aktuellerMonat<0){

            aktuellerMonat=11;

            aktuellesJahr--;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}

if(schichtNaechsterMonat){

    schichtNaechsterMonat.onclick=()=>{

        aktuellerMonat++;

        if(aktuellerMonat>11){

            aktuellerMonat=0;

            aktuellesJahr++;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}
// =====================================
// DDH Studio Enterprise 8.0
// Teil 9
// Start
// =====================================

// Datum anzeigen

datumTitel.textContent =
datumText(
    ausgewaehlterTag,
    aktuellerMonat,
    aktuellesJahr
);

// Aktuelle Uhrzeit

const jetzt = new Date();

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

mitarbeiterAnzeigen();

schichtplanZeichnen();

dashboardAktualisieren();

// Letzte Seite öffnen

const letzteSeite =
localStorage.getItem(
    "ddhSeite"
);

if(letzteSeite){

    seiteAnzeigen(
        letzteSeite
    );

}else{

    seiteAnzeigen(
        "dashboard"
    );

}

// =====================================
// Ende
// =====================================