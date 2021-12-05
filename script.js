const renderNasaData = (podData) => {
    let returnHTML = '';
    if (podData.media_type == "image") {
        var insertImg = `<div class="pod-img"><img src="${podData.hdurl}"></div>`
        var insertVid = '';
    } else if (podData.media_type == "video") {
        var insertImg = '';
        var insertVid = `<div class="video-container"><iframe src="${podData.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></div>
        </iframe>`
    }
    returnHTML = `
    <h1>${podData.title}</h1>
    <div class="expl">${podData.explanation}</div>
    ${insertImg}${insertVid}
    <h6 class="cr">copyright ©${podData.copyright}</h6>
    `
    return returnHTML;
}

const toURL = async () => {
    function getDate (){
        var sdate = document.getElementById('date-picker').value;
        return sdate;
    }

    let getDates = getDate();
    const nasaSearchDay = await fetch("https://api.nasa.gov/planetary/apod?api_key=wcLbAjpFpPdEH6ahDsGM9fjtyMyiRDbDz253tzEA&date=" + getDates);
    const nasaSArr = await nasaSearchDay.json();
    document.getElementById("pod").innerHTML = '';
    document.getElementById("pod").insertAdjacentHTML("beforeend", renderNasaData(nasaSArr));
}

async function loadEvent() {
    const nasaDay = await fetch("https://api.nasa.gov/planetary/apod?api_key=wcLbAjpFpPdEH6ahDsGM9fjtyMyiRDbDz253tzEA");
    const nasaArr = await nasaDay.json();
    document.getElementById("pod").insertAdjacentHTML("beforeend", renderNasaData(nasaArr));
    document.getElementById("sbtn").addEventListener("click", toURL);
}
window.addEventListener("load", loadEvent);