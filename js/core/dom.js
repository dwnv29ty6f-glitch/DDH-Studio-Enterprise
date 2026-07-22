"use strict";

/*
================================================
DDH Studio Enterprise 10.0
DOM
================================================
*/

const DOM = {

    id(id) {

        return document.getElementById(id);

    },

    klasse(name) {

        return document.getElementsByClassName(name);

    },

    selector(selector) {

        return document.querySelector(selector);

    },

    selectorAlle(selector) {

        return document.querySelectorAll(selector);

    },

    erstellen(tag) {

        return document.createElement(tag);

    },

    text(id,text) {

        const element = this.id(id);

        if(element){

            element.textContent = text;

        }

    },

    html(id,html) {

        const element = this.id(id);

        if(element){

            element.innerHTML = html;

        }

    },

    anzeigen(id) {

        const element = this.id(id);

        if(element){

            element.style.display = "";

        }

    },

    ausblenden(id) {

        const element = this.id(id);

        if(element){

            element.style.display = "none";

        }

    },

    klasseHinzu(element,klasse){

        if(element){

            element.classList.add(klasse);

        }

    },

    klasseEntfernen(element,klasse){

        if(element){

            element.classList.remove(klasse);

        }

    }

};