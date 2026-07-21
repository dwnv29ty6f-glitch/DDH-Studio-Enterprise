"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Dialoge
========================================== */

function dialogOeffnen(titel,inhalt){

    let dialog =
    document.getElementById("ddhDialog");

    if(!dialog){

        dialog =
        document.createElement("div");

        dialog.id = "ddhDialog";

        dialog.innerHTML = `

        <div class="dialogFenster">

            <div class="dialogKopf">

                <h2 id="dialogTitel"></h2>

                <button id="dialogSchliessen">
                    ✕
                </button>

            </div>

            <div id="dialogInhalt">

            </div>

        </div>

        `;

        document.body.appendChild(dialog);

        document
        .getElementById("dialogSchliessen")
        .addEventListener(
            "click",
            dialogSchliessen
        );

    }

    document.getElementById(
        "dialogTitel"
    ).textContent = titel;

    document.getElementById(
        "dialogInhalt"
    ).innerHTML = inhalt;

    dialog.style.display = "flex";

}