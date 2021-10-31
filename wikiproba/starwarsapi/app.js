const container = document.getElementsByClassName('main_container')[0];
const resultContainer = document.getElementsByClassName('result_container')[0];
const baseURL = 'https://swapi.dev/api/?format=json';
let infoSpan;

let loader = document.createElement('p');
loader.textContent = 'loading data...';
container.append(loader);


let loadBasics = async function() {

    let loaded = await fetch(baseURL)
        .then(file => file.json())
        .then(data => {
            // console.log(data);
            return data;
        });
    return loaded;
}




loadBasics().then(resp => {

    // console.log('object', resp);
    container.removeChild(loader);
    // console.log(resp.people);
    for (let key in resp) {
        let naviBtn = document.createElement('button');
        naviBtn.textContent = key;
        container.append(naviBtn);

        naviBtn.addEventListener('click', () => {
            loadSelectedData(resp[key]);
        })
    }


});


//load button Selected Data
function loadSelectedData(url) {
    console.log('url: ', url);

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.results) {
                showResults(data.results);
            }
            if (data.previous) {
                buttonPrev(data);
            } else {
                buttonPrev(null)
            }
            if (data.next) {
                buttonNext(data);
            } else {
                buttonNext(null);
            }
        })

}


function showResults(resultArr) {
    console.log(resultArr);

    //ez a kod torli a letezo diveket
    if (resultContainer.hasChildNodes()) {
        // console.log(resultContainer.children);
        let existDivArr = [...resultContainer.children];
        console.log(existDivArr);
        for (let i = 0; i < existDivArr.length; i++) {
            console.log(existDivArr[i]);
            resultContainer.removeChild(existDivArr[i]);
        }
    }
    resultArr.forEach(elem => {
        if (elem.name) {
            printResult(elem.name, elem);
        }
        if (elem.title) {
            printResult(elem.title, elem);
        }

    })
}


function printResult(info, elemArr) {
    let resultText = document.createElement('div');
    resultText.classList.add('text_style');
    // if (elemArr.url) {
    resultText.innerHTML = `${info}`; //` <span class='link'>more info</span>`;
    // }
    resultContainer.append(resultText);

    // resultText.addEventListener('click', () => {
    //     loadSelectedData(elemArr.url);
    // });
}

function buttonNext(info) {
    console.log('gomb', info);
    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'NEXT';
    nextBtn.classList.add('nextBtn');
    if (info === null) {
        nextBtn.setAttribute('disabled', true);
    }
    resultContainer.append(nextBtn);

    nextBtn.addEventListener('click', () => {
        loadSelectedData(info.next)
    })
}

function buttonPrev(info) {
    console.log('gomb', info);
    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'PREVIOUS';
    nextBtn.classList.add('prevBtn');
    if (info === null) {
        nextBtn.setAttribute('disabled', true);
    }
    resultContainer.append(nextBtn);
    nextBtn.addEventListener('click', () => {
        loadSelectedData(info.previous)
    })
}