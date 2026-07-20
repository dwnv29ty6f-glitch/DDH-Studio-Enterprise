"use strict";

// ==========================================
// Druckfunktion
// ==========================================

function druckSeite(titel, html){

    const fenster = window.open("", "_blank");

    if(!fenster){

        alert(
            "Der Browser blockiert das Druckfenster."
        );

        return false;

    }

    fenster.document.open();

    fenster.document.write(`

<!DOCTYPE html>

<html lang="de">

<head>

<meta charset="UTF-8">

<title>${titel}</title>

<style>

body{

font-family:Arial,sans-serif;
padding:20px;
background:#fff;
color:#000;

}

h1,h2{

text-align:center;

}

table{

width:100%;
border-collapse:collapse;
margin-top:20px;

}

th,
td{

border:1px solid #000;
padding:6px;
text-align:center;

}

th{

background:#e8e8e8;

}

.name{

text-align:left;
font-weight:bold;

}

.info{

font-size:12px;

}

</style>

</head>

<body>

${html}

</body>

</html>

`);

    fenster.document.close();

    fenster.onload = ()=>{

        fenster.focus();

        fenster.print();

    };

    return true;

}
// ==========================================
// Dienstplan drucken
// ==========================================

const btnDienstplan =
document.getElementById("druckDienstplan");

if(btnDienstplan){

    btnDienstplan.onclick = ()=>{

        const tage =
        tageImMonat(
            aktuellerMonat,
            aktuellesJahr
        );

        let html = `

<h1>DDH Studio Enterprise</h1>

<h2>${MONATE[aktuellerMonat]} ${aktuellesJahr}</h2>

<table>

<tr>

<th>Mitarbeiter</th>

`;

        for(let tag=1; tag<=tage; tag++){

            html += `<th>${tag}</th>`;

        }

        html += "</tr>";
                mitarbeiter.forEach(person=>{

            let stunden = 0;

            schichten.forEach(s=>{

                if(

                    s.name===person.name &&

                    s.monat===aktuellerMonat &&

                    s.jahr===aktuellesJahr

                ){

                    stunden +=
                    schichtStunden(s.typ);

                }

            });

            const differenz =
            stunden - SOLLSTUNDEN;

            html += `

<tr>

<td class="name">

${person.name}<br>

<span class="info">

${stunden}/${SOLLSTUNDEN} Std.

(${differenz>=0?"+":""}${differenz})

</span>

</td>

`;

            for(let tag=1; tag<=tage; tag++){

                const eintrag =
                schichtSuchen(
                    person.name,
                    tag
                );

                html += "<td>";

                html += eintrag
                    ? schichtKurz(eintrag.typ)
                    : "-";

                html += "</td>";

            }

            html += "</tr>";

        });
                html += `

</table>

`;

        druckSeite(

            "Dienstplan",

            html

        );

    };

}
// ==========================================
// Arbeitszeitnachweis drucken
// ==========================================

const btnArbeitszeit =
document.getElementById("druckArbeitszeit");

if(btnArbeitszeit){

    btnArbeitszeit.onclick = ()=>{

        if(mitarbeiter.length===0){

            alert("Keine Mitarbeiter vorhanden.");

            return;

        }

        let name = prompt(

            "Für welchen Mitarbeiter?\n\n" +

            mitarbeiter
            .map(m=>m.name)
            .join("\n")

        );

        if(name===null){

            return;

        }

        name = name.trim();

        const person =
        mitarbeiter.find(m=>

            m.name.toLowerCase()===

            name.toLowerCase()

        );

        if(!person){

            alert("Mitarbeiter nicht gefunden.");

            return;

        }

        let html = `

<h1>Arbeitszeitnachweis</h1>

<h2>${person.name}</h2>

<p>

${MONATE[aktuellerMonat]}
${aktuellesJahr}

</p>

<table>

<tr>

<th>Tag</th>

<th>Schicht</th>

<th>Stunden</th>

</tr>

`;

        let stunden = 0;

        const tage =
        tageImMonat(

            aktuellerMonat,

            aktuellesJahr

        );
                for(let tag=1; tag<=tage; tag++){

            const eintrag =
            schichtSuchen(
                person.name,
                tag
            );

            let typ = "-";
            let std = 0;

            if(eintrag){

                typ =
                schichtName(
                    eintrag.typ
                );

                std =
                schichtStunden(
                    eintrag.typ
                );

            }

            stunden += std;

            html += `

<tr>

<td>${tag}</td>

<td>${typ}</td>

<td>${std}</td>

</tr>

`;

        }
                const differenz =
        stunden - SOLLSTUNDEN;

        html += `

</table>

<h3>

Gearbeitete Stunden:
${stunden}

</h3>

<p>

Sollstunden:
${SOLLSTUNDEN}

</p>

<p>

Differenz:
${differenz>=0?"+":""}${differenz} Std.

</p>

<div style="margin-top:80px;display:flex;justify-content:space-between;">

<div style="width:220px;border-top:1px solid #000;text-align:center;">

Mitarbeiter

</div>

<div style="width:220px;border-top:1px solid #000;text-align:center;">

Arbeitgeber

</div>

</div>

`;
        druckSeite(

            "Arbeitszeitnachweis",

            html

        );

    };

}