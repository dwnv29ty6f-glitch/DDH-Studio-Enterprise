"use strict";

/*
===========================================
DDH Studio Enterprise 10.0
DOM-Verwaltung
===========================================
*/

const DOM = {

    id(name) {

        return document.getElementById(name);

    },

    klasse(name) {

        return document.querySelector("." + name);

    },

    klassen(name) {

        return document.querySelectorAll("." + name);

    },

    erstellen(element) {

        return document.createElement(element);

    },

    text(element, wert) {

        if (element) {

            element.textContent = wert;

        }

    },

    html(element, wert) {

        if (element) {

            element.innerHTML = wert;

        }

    }

};