const button = document.getElementById("neu");
const projekte = document.getElementById("projekte");

button.addEventListener("click", () => {

    const name = prompt("Projektname:");

    if (!name) return;

    const projekt = document.createElement("div");

    projekt.style.background = "#3b3d42";
    projekt.style.padding = "12px";
    projekt.style.marginTop = "10px";
    projekt.style.borderRadius = "8px";
    projekt.style.cursor = "pointer";

    projekt.textContent = name;

    projekte.appendChild(projekt);

});
