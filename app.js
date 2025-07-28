// Calcolo Noleggio
function calcola() {
    let importoInput = document.getElementById("importo").value;
    let importo = parseEuropeanFloat(importoInput);
    if (importo === 0 || isNaN(importo)) {
        alert("Per favore, inserisci un importo valido.");
        return;
    }
    let durata = parseInt(document.getElementById("durata").value);
    let rataMensile = 0;
    let speseContratto = 0;

    if (importo < 5001) { speseContratto = 75; }
    else if (importo < 10001) { speseContratto = 100; }
    else if (importo < 25001) { speseContratto = 150; }
    else if (importo < 50001) { speseContratto = 225; }
    else { speseContratto = 300; }

    const coefficienti = {
    5000:   { 12: 0.081123, 18: 0.058239, 24: 0.045554, 36: 0.032359, 48: 0.025445, 60: 0.021358 },
    15000:  { 12: 0.081433, 18: 0.058341, 24: 0.045535, 36: 0.032207, 48: 0.025213, 60: 0.021074 },
    25000:  { 12: 0.081280, 18: 0.058195, 24: 0.045392, 36: 0.032065, 48: 0.025068, 60: 0.020926 },
    50000:  { 12: 0.080770, 18: 0.057710, 24: 0.044915, 36: 0.031592, 48: 0.024588, 60: 0.020437 },
    100000: { 12: 0.080744, 18: 0.057686, 24: 0.044891, 36: 0.031568, 48: 0.024564, 60: 0.020413 }
};

    for (let maxImporto in coefficienti) {
        if (importo <= maxImporto) {
            rataMensile = importo * coefficienti[maxImporto][durata];
            break;
        }
    }

    document.getElementById("rataMensile").textContent = formatNumber(rataMensile) + " €";
    document.getElementById("speseContratto").textContent = formatNumber(speseContratto) + " €";

    let costoGiornaliero = rataMensile / 22;
    let costoOrario = costoGiornaliero / 8;

    document.getElementById("costoGiornaliero").textContent = formatNumber(costoGiornaliero) + " €";
    document.getElementById("costoOrario").textContent = formatNumber(costoOrario) + " €";
}

// Funzione per convertire un numero europeo in float
function parseEuropeanFloat(value) {
    if (!value) return 0;
    value = value.replace(/€/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}

// Funzione per formattare un numero
function formatNumber(value) {
    return value.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Modalità Scura
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('darkMode'))) {
        document.body.classList.add('dark-mode');
    }
});

// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registrato con successo!'))
        .catch(err => console.error('Errore nella registrazione del Service Worker:', err));
}
