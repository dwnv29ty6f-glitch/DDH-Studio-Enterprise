"use strict";

// ==========================================
// Aufgaben anzeigen
// ==========================================

function todosAnzeigen(){

    dom.todoListe.innerHTML = "";

    const projekt =
    dom.todoProjekt.value;

    const liste =
    todos.filter(todo=>

        todo.projekt===projekt

    );

    if(liste.length===0){

        dom.todoListe.innerHTML =
        "<p>Keine Aufgaben vorhanden.</p>";

        return;

    }
        liste.forEach(todo=>{

        const box =
        document.createElement("div");

        box.className =
        "todo " + todo.prioritaet;

        if(todo.erledigt){

            box.classList.add("erledigt");

        }

        const titel =
        document.createElement("div");

        titel.className = "todoText";
        titel.textContent = todo.text;

        box.appendChild(titel);

        const info =
        document.createElement("div");

        info.className = "todoInfo";

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
                const fertig =
        document.createElement("button");

        fertig.textContent = "✔";

        fertig.onclick = ()=>{

            todo.erledigt = !todo.erledigt;

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        const bearbeiten =
        document.createElement("button");

        bearbeiten.textContent = "✏️";

        bearbeiten.onclick = ()=>{

            dom.todoText.value = todo.text;

            dom.todoPrioritaet.value =
            todo.prioritaet;

            dom.todoProjekt.value =
            todo.projekt;

            todos =
            todos.filter(t=>t!==todo);

            speichern();

            todosAnzeigen();

            dashboardAktualisieren();

        };

        const loeschen =
        document.createElement("button");

        loeschen.textContent = "🗑️";

        loeschen.onclick = ()=>{

            if(!confirm(
                "Aufgabe wirklich löschen?"
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

        dom.todoListe.appendChild(box);

    });
    }

// ==========================================
// Aufgabe speichern
// ==========================================

dom.todoSpeichern.onclick = ()=>{

    const text =
    dom.todoText.value.trim();

    if(text===""){
        return;
    }

    todos.push({

        projekt:
        dom.todoProjekt.value,

        text:
        text,

        prioritaet:
        dom.todoPrioritaet.value,

        erledigt:false

    });

    speichern();

    dom.todoText.value = "";

    todosAnzeigen();

    dashboardAktualisieren();

};
// ==========================================
// Projekt wechseln
// ==========================================

dom.todoProjekt.onchange = ()=>{

    todosAnzeigen();

};

// ==========================================
// Enter = Aufgabe speichern
// ==========================================

dom.todoText.addEventListener("keydown",event=>{

    if(event.key==="Enter"){

        dom.todoSpeichern.click();

    }

});