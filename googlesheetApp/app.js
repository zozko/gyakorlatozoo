//* zozko.kis driven talalhato datakok tabla adatait dolgozza fel!

// const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbG3vOG5_B3U5RjMV5R2krOExBmADjdmq-5csxy5Ls4FI9lJBLq9SehNc0MlCCDNgzLIG5prRtHi1H/pubhtml";

// const URL = "https://docs.google.com/spreadsheets/d/1YgRN3FS21rw-ELYBmBbqeLVCJcdd6CPSYbP03khu43w/edit?usp=sharing";


/*
opensheet apival - muxik tartalmazza a sheet_id - t es az oldal nevet = A:
https://opensheet.vercel.app/spreadsheet_id/sheet_name
*/


const URL = "https://opensheet.vercel.app/"; // 1YgRN3FS21rw-ELYBmBbqeLVCJcdd6CPSYbP03khu43w/A";
const sheetID = '1YgRN3FS21rw-ELYBmBbqeLVCJcdd6CPSYbP03khu43w/';
let sheetName;
let ido = new Date();
let count = 0;
let ujraKezdes, timem;

const viccURL = "https://api.jokes.one/jod";

// const starter = document.querySelector('button').addEventListener('click', sheetLoader);

const startA = document.getElementsByClassName('tabla')[0];
const startB = document.getElementsByClassName('tabla')[1];
const vicc = document.getElementsByClassName('vicc')[0];
const kijelzo = document.getElementsByClassName('tarto')[0];


startA.addEventListener('click', () => {
    sheetName = 'A';
    sheetLoader();
});

startB.addEventListener('click', () => {
    sheetName = 'B';
    sheetLoader();
});

vicc.addEventListener('click', function vicckapcs() {
    timem = realTime();
    //TODO ora inditasa, orankent csak 1 viccet hivhatunk le!
    //console.log('fut\n', timem.h, timem.m);

    if (count === 0) {
        ujraKezdes = startTimer();
        count++;
        fetch(viccURL)
            .then(resp => resp.json())
            .then(data => {
                //console.log(data);
                logData(data);
            })
            .catch(e => {
                alert('HIBABA utkoztunk: ' + e);
            })
            //console.log('trueba', ujraKezdes.ora, ujraKezdes.perc);

    }
    if (count > 0 && timem.h >= ujraKezdes.perc) {
        count = 0;
        vicckapcs();
    } else {
        kijelzo.innerHTML = '';
        let idokijelzo = makeNode(kijelzo, 'span', `a kovetkezo vicc csak ${ujraKezdes.ora}:${ujraKezdes.perc} lesz elérheto. `, 'clock');
    }

    //console.log('vicckapcs pontos ido', timem.h, timem.m, 'kov:', ujraKezdes.ora, ujraKezdes.perc, count);
});





function sheetLoader() {
    fetch(URL + sheetID + sheetName)
        .then(resp => resp.json())
        .then(dt => {

            //console.log(dt);
            logData(dt);
        })
        .catch(err => {
            //console.log('ERROR E:', err);
        })
}


function logData(datak) {
    kijelzo.innerHTML = '';
    //console.log(datak);
    if (datak.length > 1) {
        datak.forEach(elem => {
            let aktualisELem = makeNode(kijelzo, 'p', `${elem.név}  e-mail: ${elem.email}`, 'info_holder');
            //console.log(aktualisELem);

        })
    } else {
        let ujraIdo = startTimer();
        let aktualisViccCime = makeNode(kijelzo, 'h2', `${datak.contents.jokes[0].joke.title}`);
        let aktualisVicc = makeNode(kijelzo, 'p', `${datak.contents.jokes[0].joke.text}`);
        let idokijelzo = makeNode(kijelzo, 'span', `a kovetkezo vicc ${ujraIdo.ora}:${ujraIdo.perc} érheto el. `, 'clock');
        // //console.log(aktualisVicc);
    }
}




function makeNode(parent, tag, content, attribute) {
    let ujtag = document.createElement(tag);
    ujtag.innerHTML = content;
    if (attribute) {
        ujtag.classList.add(attribute);
    }
    parent.append(ujtag);
    return ujtag
}



function startTimer() {
    let ujStart = new Date();
    let ora = ujStart.getHours() + 1;
    let perc = ujStart.getMinutes();
    //console.log(`timer: ${ora}:${perc}`);
    return { ora, perc };

}

function realTime() {
    let dt = new Date();
    //console.log(dt.toLocaleTimeString());
    let h = dt.getHours();
    let m = dt.getMinutes();
    //console.log(`real: ${h}:${m}`);
    return { h, m };
}