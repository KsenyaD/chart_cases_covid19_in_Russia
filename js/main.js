async function request() {
    let response = await fetch('https://api.covid19api.com/dayone/country/russia/status/confirmed');
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа
        const json = (await response.json()).slice(50);
        const arrCases = json.map((value, item) => {
            return value.Cases
        });

        const arrDates = json.map((value, item) => {
            return value.Date.substr(0, 10)
        });

        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: arrDates,
                datasets: [{
                    label: 'Сovid19 cases in Russia',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: arrCases
                }]
            },
            // Configuration options go here
            options: {}
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

request();

