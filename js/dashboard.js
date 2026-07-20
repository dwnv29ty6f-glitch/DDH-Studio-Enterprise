"use strict";

// ==========================================
// Dashboard aktualisieren
// ==========================================

function dashboardAktualisieren(){

    const termineHeute =
    termine.filter(t=>

        t.tag===ausgewaehlterTag &&
        t.monat===aktuellerMonat &&
        t.jahr===aktuellesJahr

    );

    dom.heuteTermine.textContent =
    termineHeute.length;

    const offene =
    todos.filter(t=>!t.erledigt);

    const erledigte =
    todos.filter(t=>t.erledigt);

    const hohe =
    todos.filter(t=>

        !t.erledigt &&
        t.prioritaet==="hoch"

    );

    dom.offeneTodos.textContent =
    offene.length;

    dom.erledigteTodos.textContent =
    erledigte.length;

    dom.hohePrioritaet.textContent =
    hohe.length;
        // ==========================================
    // Nächste Aufgaben
    // ==========================================

    dom.dashboardTodos.innerHTML = "";

    if(offene.length===0){

        dom.dashboardTodos.innerHTML =
        "<p>Keine offenen Aufgaben.</p>";

    }else{

        offene
        .slice(0,5)
        .forEach(todo=>{

            const box =
            document.createElement("div");

            box.className =
            "dashboardTodo";

            box.innerHTML =

                "<strong>" +
                todo.text +
                "</strong><br>" +

                "📁 " +
                todo.projekt +
                " • " +
                todo.prioritaet;

            dom.dashboardTodos.appendChild(box);

        });

    }
        // ==========================================
    // Mitarbeiter im Dienst
    // ==========================================

    dom.dashboardSchichten.innerHTML = "";

    const heuteSchichten =
    schichten.filter(s=>

        s.tag===ausgewaehlterTag &&
        s.monat===aktuellerMonat &&
        s.jahr===aktuellesJahr

    );

    if(heuteSchichten.length===0){

        dom.dashboardSchichten.innerHTML =
        "<p>Keine Schichten vorhanden.</p>";

        return;

    }

    heuteSchichten.forEach(eintrag=>{

        const box =
        document.createElement("div");

        box.className =
        "dashboardTodo";

        box.innerHTML =

            "<strong>" +
            eintrag.name +
            "</strong><br>" +

            schichtName(
                eintrag.typ
            );

        dom.dashboardSchichten.appendChild(box);

    });
    }