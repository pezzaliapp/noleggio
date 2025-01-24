document.getElementById('notifyBtn').addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('Notifica abilitata!', {
                body: 'Ora riceverai notifiche importanti.',
                icon: './icons/icons_crm-192x192.png'
            });
        }
    });
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('darkMode'))) {
        document.body.classList.add('dark-mode');
    }
});

function calcola() {
    const importo = parseFloat(document.getElementById('importo').value) || 0;
    const durata = parseInt(document.getElementById('durata').value);
    const coefficiente = { 12: 0.084, 24: 0.047, 36: 0.033, 48: 0.026, 60: 0.022 };
    const rataMensile = importo * coefficiente[durata];
    const speseContratto = importo < 5000 ? 75 : 150;

    document.getElementById('rataMensile').textContent = `${rataMensile.toFixed(2)} €`;
    document.getElementById('speseContratto').textContent = `${speseContratto} €`;
}
