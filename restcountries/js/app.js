const baseURL = 'https://restcountries.com/v3.1/all';
const searchDiv = document.getElementsByClassName('search_wrapper')[0];
const contentDiv = document.getElementsByClassName('content_wrapper')[0];
const togglerDiv = document.getElementsByClassName('toggler_wrapper')[0];
let countryBox;

let pagesArr = [];


function loadData() {
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);

            //lebontjuk a bejovo adatokat 10 allamot tartalmazo tombokre
            let muloTmb = [];
            let counter = 0;
            data.forEach(el => {
                muloTmb.push(el);
                counter++;
                if (counter >= 10) {
                    pagesArr.push(muloTmb);
                    counter = 0;
                    muloTmb = [];
                }

            });
            pageTogglerCreator();
            showPage(null);
        })
}


function serachAreaCreator() {
    searchDiv.innerHTML = '';
    let inputfield = createNode(searchDiv, 'input', '');
    inputfield.setAttribute('type', 'text');
    inputfield.classList.add('inputFld');
    inputfield.setAttribute('placeholder', 'type country name');

    let inputBtn = createNode(searchDiv, 'button', 'search');
    inputBtn.classList.add('searchBtn');

    inputBtn.addEventListener('click', () => {
        console.log(inputfield.value);
        let inputData = inputfield.value;
        //code hogy mit csinaljon kereseskor....
        inputfield.value = '';
        loadEnteredCountry(inputData);
        // console.log('a keresett orszag', singleCountry);

    })
}

function pageTogglerCreator() {
    // console.log('mennyi gombot keszitek? ', pagesArr.length);
    for (let i = 0; i < pagesArr.length; i++) {
        let pageBtn = createNode(togglerDiv, 'button', i + 1);
        pageBtn.classList.add('toggler');
        pageBtn.addEventListener('click', (e) => {

            showPage(e);
        });

    }

}

//ez kesziti z osszes elemet a DOM-ba
function createNode(parentNode, nodeType, nodeContent) {
    let nodeTag = document.createElement(nodeType);
    nodeTag.innerHTML = nodeContent;
    parentNode.append(nodeTag);
    return nodeTag;
}




function showPage(event) {
    let pages = 0;
    let workArr;
    console.log('kapom ', event);
    // console.log('bejovo:', typeof(event), event, workArr);
    // console.log(pagesArr[pages]);
    try {
        if (event != null && event.target.textContent !== undefined) {
            pages = event.target.textContent - 1;
            workArr = [...pagesArr[pages]];
            console.log('orszagok ...', workArr);
        } else {
            workArr = [...pagesArr[pages]];
        }
    } catch (error) {
        if (event.status === 404) {
            alert('not found');
        }
        console.log('igy ez csak egy orszag', event);
        workArr = event;


    }



    // console.log('oldalszama  ', event.target.textContent);
    console.log('ezt az oldalt fogom kitenni: ', workArr);

    if (contentDiv) {
        // console.log('countrybox exist with: ', contentDiv);
        contentDiv.innerHTML = '';
    }

    for (let i = 0; i < workArr.length; i++) {
        //az orszagokat elkulonito box
        countryBox = createNode(contentDiv, 'section', '');
        countryBox.classList.add('country_wrapper');

        let countryFlag = createNode(countryBox, 'img', '');
        countryFlag.classList.add('flag_holder');
        countryFlag.setAttribute('src', workArr[i].flags.png);

        countryFlag.addEventListener('click', () => {
            window.open(workArr[i].maps.googleMaps, '_balnk');
        })



        let countryName = createNode(countryBox, 'p', `<h2>${workArr[i].name.official} <span>(${workArr[i].name.common})</span></h2>`);
        let countryCapital = createNode(countryBox, 'p', workArr[i].capital[0]);
        let countryPopulation = createNode(countryBox, 'p', `population:${workArr[i].population}`);
        countryPopulation.classList.add('display_p');
        let currenciesObj = Object.values(workArr[i].currencies);
        // console.log('a penz OBJ : ', currenciesObj[0]);

        // console.log(currencyMark);
        let currency = createNode(countryBox, 'p', `currencies: <span>${currenciesObj[0].name}</span>  symbol: <span>${currenciesObj[0].symbol}</span>`);
        currency.classList.add('display_p');



    }


}

function loadEnteredCountry(country) {
    console.log('a keresett orszag betoltendo...', country);
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(resp => resp.json())
        .then(data => {
            console.log('keresett orszag adatai: ', data);
            showPage(data);
        })
        // .catch(error => {
        //     console.error('load country...' + error);
        // })
}



loadData();
serachAreaCreator();