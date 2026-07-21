"use strict";

document.addEventListener("DOMContentLoaded", ()=>{

    kalenderZeichnen();

    termineAnzeigen();

    todosAnzeigen();

    mitarbeiterAnzeigen();

    schichtplanZeichnen();

    dashboardAktualisieren();

    const letzteSeite =
    localStorage.getItem("ddhSeite");

    if(letzteSeite){

        seiteAnzeigen(letzteSeite);

    }else{

        seiteAnzeigen("dashboard");

    }

    console.log(
        "DDH Studio Enterprise gestartet."
    );

});