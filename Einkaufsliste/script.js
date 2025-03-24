const artikelInput = document.getElementById("artikel");
const anzahlInput = document.getElementById("anzahl");
const preisInput = document.getElementById("preis");
const addButton = document.getElementById("add-button");
const einkaufsliste = document.getElementById("einkaufsliste");
const gesamtpreisAnzeige = document.getElementById("gesamtpreis");
const leerenButton = document.getElementById("leeren-button");

let gesamtpreis = 0;

function validateInput() {
    let isValid = true;

    if (artikelInput.value.trim() === "") {
        artikelInput.classList.add("error");
        isValid = false;
    } else {
        artikelInput.classList.remove("error");
    }

    if (anzahlInput.value.trim() === "" || isNaN(anzahlInput.value)) {
        anzahlInput.classList.add("error");
        isValid = false;
    } else {
        anzahlInput.classList.remove("error");
    }

    if (preisInput.value.trim() === "" || isNaN(preisInput.value)) {
        preisInput.classList.add("error");
        isValid = false;
    } else {
        preisInput.classList.remove("error");
    }

    return isValid;
}

function artikelHinzufuegen() {
    if (!validateInput()) {
        return;
    }

    const artikel = artikelInput.value.trim();
    const anzahl = parseFloat(anzahlInput.value);
    const preis = parseFloat(preisInput.value);
    const gesamtArtikelPreis = anzahl * preis;

    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" checked>
        ${anzahl} x ${artikel}: ${preis.toFixed(2)} € (Gesamt: ${gesamtArtikelPreis.toFixed(2)} €)
        <button class="entfernen-button">Entfernen</button>
    `;

    einkaufsliste.appendChild(li);

    gesamtpreis += gesamtArtikelPreis;
    gesamtpreisAnzeige.textContent = gesamtpreis.toFixed(2);

    artikelInput.value = "";
    anzahlInput.value = "";
    preisInput.value = "";

    const checkbox = li.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", gesamtpreisAktualisieren);

    const entfernenButton = li.querySelector(".entfernen-button");
    entfernenButton.addEventListener("click", () => {
        if (checkbox.checked) {
            gesamtpreis -= gesamtArtikelPreis;
            gesamtpreisAnzeige.textContent = gesamtpreis.toFixed(2);
        }
        li.remove();
    });
}

function gesamtpreisAktualisieren() {
    gesamtpreis = 0;
    const listItems = einkaufsliste.querySelectorAll("li");

    listItems.forEach(item => {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const preisText = item.textContent.match(/Gesamt: (\d+\.\d+) €/);
            if (preisText && preisText[1]) {
                gesamtpreis += parseFloat(preisText[1]);
            }
        }
    });

    gesamtpreisAnzeige.textContent = gesamtpreis.toFixed(2);
}

addButton.addEventListener("click", artikelHinzufuegen);

leerenButton.addEventListener("click", () => {
    einkaufsliste.innerHTML = "";
    gesamtpreis = 0;
    gesamtpreisAnzeige.textContent = "0.00";
});

// Initialen Gesamtpreis anzeigen
gesamtpreisAktualisieren();