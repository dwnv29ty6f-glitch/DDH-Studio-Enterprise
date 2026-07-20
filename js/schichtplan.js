"use strict";

// ==========================================
// Schichtplan zeichnen
// ==========================================

function schichtplanZeichnen(){

    dom.schichtHeader.innerHTML =
    "<th>Mitarbeiter</th>";

    dom.schichtBody.innerHTML = "";

    dom.schichtMonat.textContent =

        MONATE[aktuellerMonat] +

        " " +

        aktuellesJahr;

    const tage =
    tageImMonat(

        aktuellerMonat,

        aktuellesJahr

    );

    // Kopfzeile

    for(let tag=1; tag<=tage; tag++){

        const th =
        document.createElement("th");

        th.textContent = tag;

        dom.schichtHeader.appendChild(th);

    }
        // Mitarbeiter

    mitarbeiter.forEach(person=>{

        const tr =
        document.createElement("tr");

        const tdName =
        document.createElement("td");

        const stunden =
        schichten

        .filter(s=>

            s.name===person.name &&

            s.monat===aktuellerMonat &&

            s.jahr===aktuellesJahr

        )

        .reduce(

            (summe,s)=>

            summe +

            schichtStunden(s.typ),

            0

        );

        let info;

        if(stunden>SOLLSTUNDEN){

            info =
            "+" +
            (stunden-SOLLSTUNDEN) +
            " Std.";

        }else{

            info =
            "-" +
            (SOLLSTUNDEN-stunden) +
            " Std.";

        }

        tdName.innerHTML =

        "<strong>" +

        person.name +

        "</strong><br>" +

        "🕒 " +

        stunden +

        " / " +

        SOLLSTUNDEN +

        " Std.<br>" +

        info;

        tr.appendChild(tdName);
                // Schichtzellen

        for(let tag=1; tag<=tage; tag++){

            const td =
            document.createElement("td");

            td.className =
            "schichtZelle";

            const eintrag =
            schichtSuchen(
                person.name,
                tag
            );

            if(eintrag){

                const box =
                document.createElement("div");

                box.className =
                "schicht " +
                eintrag.typ;

                box.textContent =
                schichtKurz(
                    eintrag.typ
                );

                td.appendChild(box);

            }
                        // Bereits markiert?

            if(
                markierterMitarbeiter===person.name &&
                markierteTage.includes(tag)
            ){

                td.classList.add("markiert");

            }

            td.addEventListener("click",()=>{

                // Anderer Mitarbeiter

                if(
                    markierterMitarbeiter!==person.name
                ){

                    markierterMitarbeiter =
                    person.name;

                    markierteTage = [];

                    document
                    .querySelectorAll(
                        ".schichtZelle.markiert"
                    )
                    .forEach(z=>{

                        z.classList.remove(
                            "markiert"
                        );

                    });

                }
                                // Bereits markiert?

                if(
                    markierteTage.includes(tag)
                ){

                    schichtBearbeiten(
                        person.name,
                        tag
                    );

                    return;

                }

                // Tag markieren

                markierteTage.push(tag);

                td.classList.add("markiert");

            });

            tr.appendChild(td);

        }

        dom.schichtBody.appendChild(tr);

    });
    }

// ==========================================
// Monat zurück
// ==========================================

if(dom.schichtVorher){

    dom.schichtVorher.onclick = ()=>{

        aktuellerMonat--;

        if(aktuellerMonat < 0){

            aktuellerMonat = 11;
            aktuellesJahr--;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}

// ==========================================
// Monat weiter
// ==========================================

if(dom.schichtWeiter){

    dom.schichtWeiter.onclick = ()=>{

        aktuellerMonat++;

        if(aktuellerMonat > 11){

            aktuellerMonat = 0;
            aktuellesJahr++;

        }

        kalenderZeichnen();

        termineAnzeigen();

        schichtplanZeichnen();

        dashboardAktualisieren();

    };

}
// ==========================================
// Schichten bearbeiten
// ==========================================

function schichtBearbeiten(name, tag){

    const dialog =
    document.getElementById("schichtDialog");

    const titel =
    document.getElementById("schichtDialogTitel");

    const loeschen =
    document.getElementById("schichtLoeschen");

    const abbrechen =
    document.getElementById("schichtAbbrechen");

    titel.textContent =
    name + " • Tage: " +
    markierteTage.join(", ");

    dialog.classList.add("aktiv");

    function auswahlZuruecksetzen(){

        markierteTage = [];
        markierterMitarbeiter = "";

        document
        .querySelectorAll(".schichtZelle.markiert")
        .forEach(z=>{

            z.classList.remove("markiert");

        });

    }

    function schliessen(){

        dialog.classList.remove("aktiv");

        auswahlZuruecksetzen();

    }
        // ==========================================
    // Schicht auswählen
    // ==========================================

    document
    .querySelectorAll(".schichtAuswahl")
    .forEach(button=>{

        button.onclick = ()=>{

            const typ =
            button.dataset.schicht;

            markierteTage.forEach(tag=>{

                const vorhanden =
                schichtSuchen(name, tag);

                if(vorhanden){

                    vorhanden.typ = typ;

                }else{

                    schichten.push({

                        name: name,
                        tag: tag,
                        monat: aktuellerMonat,
                        jahr: aktuellesJahr,
                        typ: typ

                    });

                }

            });

            speichern();

            schichtplanZeichnen();

            dashboardAktualisieren();

            schliessen();

        };

    });
        // ==========================================
    // Schichten löschen
    // ==========================================

    loeschen.onclick = ()=>{

        markierteTage.forEach(tag=>{

            schichtLoeschen(
                name,
                tag
            );

        });

        speichern();

        schichtplanZeichnen();

        dashboardAktualisieren();

        schliessen();

    };

    // ==========================================
    // Abbrechen
    // ==========================================

    abbrechen.onclick = ()=>{

        schliessen();

    };
        // ==========================================
    // Klick außerhalb des Dialogs
    // ==========================================

    dialog.onclick = event=>{

        if(event.target===dialog){

            schliessen();

        }

    };

}
// ==========================================
// Schicht bearbeiten Button
// ==========================================

const btnSchichtBearbeiten =
document.getElementById(
    "schichtBearbeitenButton"
);

if(btnSchichtBearbeiten){

    btnSchichtBearbeiten.onclick = ()=>{

        if(markierterMitarbeiter===""){

            alert(
                "Bitte zuerst einen Mitarbeiter auswählen."
            );

            return;

        }

        if(markierteTage.length===0){

            alert(
                "Bitte zuerst Tage markieren."
            );

            return;

        }

        schichtBearbeiten(

            markierterMitarbeiter,

            markierteTage[0]

        );

    };

}
// ==========================================
// Auswahl zurücksetzen
// ==========================================

function schichtAuswahlZuruecksetzen(){

    markierteTage = [];

    markierterMitarbeiter = "";

    document
    .querySelectorAll(".schichtZelle.markiert")
    .forEach(z=>{

        z.classList.remove("markiert");

    });

}