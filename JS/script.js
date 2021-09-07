let rate = {S_RATE : 95, SS_RATE : 5, SSS_RATE : 0.5};

let SSS_pity = 100, SSS_pull = 0, SS_pity = 10, SS_pull = 0, HISTORY = 0;
let SSS_total = 0, SS_total = 0;

let btnSingle = document.getElementById("single");
let btnMulti = document.getElementById("multi");

btnSingle.addEventListener('click', singlePull);
btnMulti.addEventListener('click', multiPull);

function singlePull() {
    addHistory(single, generatePull());
}

function multiPull() {

    let pulls = [];
    for (let i = 0;  i < 10; i++) {
        pulls.push(generatePull());
    }

    addHistory(multi, pulls);
}

function generatePull() {
    SSS_pull++;
    SS_pull++;

    if (SS_pull === SS_pity) {SS_pull = 0; SS_total++; return "ss"}

    else if (SSS_pull === SSS_pity) {SSS_pull = 0; SSS_total++; return "sss"}

    else {
        let randomizer = Math.random() * 100;
        if (randomizer < 1.5) {SSS_pull = 0; SSS_total++; return "sss"}
        else if (randomizer < 5 && randomizer > 1.5) {SS_pull = 0; SS_total++; return "ss"}
        else if (randomizer < 100 && randomizer > 5) return "s";
        else console.log("??? : " + randomizer);
    }
}

function addHistory(pullType, pull) {
    if (pullType === single) {
        HISTORY++;
        let h = document.getElementById("history");
        let ne = document.createElement("div");
        ne.setAttribute("class", ("wish rate-" + pull));
        ne.innerHTML = HISTORY
        h.appendChild(ne);
    } else {
        for (let i = 0; i < 10; i++) {
            HISTORY++;
            let h = document.getElementById("history");
            let ne = document.createElement("div");
            ne.setAttribute("class", ("wish rate-" + pull[i]));
            ne.innerHTML = HISTORY
            h.appendChild(ne);
        }
    }

    document.getElementById("total").innerHTML = "Total " + HISTORY;

    document.getElementById("ss-pull").innerHTML = "Pulled " + SS_total;
    document.getElementById("ss-pity").innerHTML = "Current Pity " + SS_pull;

    document.getElementById("sss-pull").innerHTML = "Pulled " + SSS_total;
    document.getElementById("sss-pity").innerHTML = "Current Pity " + SSS_pull;
}