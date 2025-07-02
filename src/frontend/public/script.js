const BACKEND_URL = 'http://192.168.2.36:8080'; // À modifier si notre ip change!

let tempGraph, humGraph;

// Init graphiques
function initCharts() {
    // Graphique température
    const tempCtx = document.getElementById('tempGraph').getContext('2d');
    tempGraph = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Température (°C)',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Graphique humidité
    const humCtx = document.getElementById('humGraph').getContext('2d');
    humGraph = new Chart(humCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Humidité (%)',
                data: [],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Gestion des erreurs
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Récup  données de température
async function fetchTemperatureData() {
    try {
        // Valeur actuelle
        const currentResponse = await fetch(`${BACKEND_URL}/capteurs/temp`);
        if (currentResponse.ok) {
            const currentTemp = await currentResponse.text();
            document.getElementById('currentTemp').textContent = currentTemp + '°C';
        }

        // Moyenne 30 valeurs
        const avgResponse = await fetch(`${BACKEND_URL}/capteurs/temp/30/moy`);
        if (avgResponse.ok) {
            const avgTemp = await avgResponse.text();
            document.getElementById('avgTemp').textContent = avgTemp + '°C';
        }

        // Historique 30 valeurs
        const historyResponse = await fetch(`${BACKEND_URL}/capteurs/temp/30`);
        if (historyResponse.ok) {
            const history = await historyResponse.json();
            updateTemperatureTable(history);
            updateTemperatureChart(history);
        }

    } catch (error) {
        showError('Erreur lors de la récupération des données de température: ' + error.message);
    }
}

// Récup données d'humidité
async function fetchHumidityData() {
    try {
        // Valeur actuelle
        const currentResponse = await fetch(`${BACKEND_URL}/capteurs/hum`);
        if (currentResponse.ok) {
            const currentHum = await currentResponse.text();
            document.getElementById('currentHum').textContent = currentHum;
        }

        // Moy 30 valeurs
        const avgResponse = await fetch(`${BACKEND_URL}/capteurs/hum/30/moy`);
        if (avgResponse.ok) {
            const avgHum = await avgResponse.text();
            document.getElementById('avgHum').textContent = avgHum;
        }

        // Historique 30 valeurs
        const historyResponse = await fetch(`${BACKEND_URL}/capteurs/hum/30`);
        if (historyResponse.ok) {
            const history = await historyResponse.json();
            updateHumidityTable(history);
            updateHumidityChart(history);
        }

    } catch (error) {
        showError('Erreur lors de la récupération des données d\'humidité: ' + error.message);
    }
}

// Update du tableau de température
function updateTemperatureTable(history) {
    const tbody = document.querySelector('#tempTable tbody');
    tbody.innerHTML = '';
    
    history.forEach(([timestamp, value]) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = timestamp;
        row.insertCell(1).textContent = value.toFixed(1);
    });
}

// Update du tableau d'humidité
function updateHumidityTable(history) {
    const tbody = document.querySelector('#humTable tbody');
    tbody.innerHTML = '';
    
    history.forEach(([timestamp, value]) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = timestamp;
        row.insertCell(1).textContent = value.toFixed(1);
    });
}

// Update du graphique de température
function updateTemperatureChart(history) {
    const labels = history.map(([timestamp]) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    });
    const data = history.map(([, value]) => value);
    
    tempGraph.data.labels = labels;
    tempGraph.data.datasets[0].data = data;
    tempGraph.update();
}

// Update du graphique d'humidité
function updateHumidityChart(history) {
    const labels = history.map(([timestamp]) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    });
    const data = history.map(([, value]) => value);
    
    humGraph.data.labels = labels;
    humGraph.data.datasets[0].data = data;
    humGraph.update();
}


function refreshData() {
    fetchTemperatureData();
    fetchHumidityData();
}


document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    refreshData();
    
    
    setInterval(refreshData, 3000);
});