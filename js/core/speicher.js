"use strict";

/*
================================================
DDH Studio Enterprise 10.0
Speicher
================================================
*/

const Speicher = {

    laden(schluessel,standard=[]){

        try{

            const daten =
                localStorage.getItem(
                    schluessel
                );

            if(daten===null){

                return standard;

            }

            return JSON.parse(daten);

        }

        catch(fehler){

            console.error(fehler);

            return standard;

        }

    },

    speichern(schluessel,daten){

        try{

            localStorage.setItem(

                schluessel,

                JSON.stringify(daten)

            );

            return true;

        }

        catch(fehler){

            console.error(fehler);

            return false;

        }

    },

    loeschen(schluessel){

        localStorage.removeItem(

            schluessel

        );

    },

    allesLoeschen(){

        localStorage.clear();

    },

    existiert(schluessel){

        return localStorage.getItem(

            schluessel

        )!==null;

    }

};