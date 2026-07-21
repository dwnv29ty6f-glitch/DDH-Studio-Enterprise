"use strict";

/* ==========================================
   DDH Studio Enterprise 10.0
   Dialogsystem
========================================== */

const Dialog = {

    overlay: null,

    titel: null,

    inhalt: null,

    fuss: null,

    initialisieren() {

        this.overlay =
            document.getElementById(
                "dialogOverlay"
            );

        this.titel =
            document.getElementById(
                "dialogTitel"
            );

        this.inhalt =
            document.getElementById(
                "dialogInhalt"
            );

        this.fuss =
            document.getElementById(
                "dialogFuss"
            );

        const schliessen =
            document.getElementById(
                "dialogSchliessen"
            );

        if(schliessen){

            schliessen.onclick =
                ()=>this.schliessen();

        }

    },

    anzeigen(titel,inhalt,buttons=""){

        this.titel.textContent =
            titel;

        this.inhalt.innerHTML =
            inhalt;

        this.fuss.innerHTML =
            buttons;

        this.overlay.style.display =
            "flex";

    },

    schliessen(){

        this.overlay.style.display =
            "none";

    },

    hinweis(text){

        this.anzeigen(

            "Hinweis",

            `<p>${text}</p>`,

            `
            <button
                class="hauptButton"
                onclick="Dialog.schliessen()">

                OK

            </button>
            `

        );

    }

};