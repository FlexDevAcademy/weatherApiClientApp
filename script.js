var tilesWrapper = $('#tiles')

async function getData() {
    // pamiętaj o zmianie numeru localhosta zgodnie z utworzonym projektem
    const response = await fetch("https://localhost:7194/WeatherForecast")
    return await response.json()
}

async function onclickHandler() {
    tilesWrapper.empty()

    var data = await getData()
    data.map(item => tilesWrapper.append(getTile(item.date, item.summary, item.temperatureC)))
    // for (let i = 0; i < data.length; i++) {
    //     tilesWrapper.append(getTile(data[i].date, data[i].summary, data[i].temperatureC))
    // }
    $('p').removeClass('d-none')
}

var dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
}

function getTile(date, summary, temperature) {
    // więcej into nt. internacjonalizacji daty: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    var dateFormatted = new Intl.DateTimeFormat('pl-PL', dateOptions).format(new Date(date))

    return `<div class="card flex-row flex-md-column align-items-center justify-content-around m-2 p-3">
                <h6>${dateFormatted}</h6>
                <img class="d-none d-sm-block" width="80" height="80" src="./icons/${summary}.svg" title="${summary}" />
                <h4>${temperature}&deg;</h4>
            </div>`
}
