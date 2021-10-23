const btn = document.querySelector('button');
const numInput = document.getElementById('numInput');
const picsWrapper = document.getElementById('pics');
const url = 'https://randomuser.me/api/?results=';
let userArray = [];

const wrapper = document.getElementsByClassName('user_wrapper')[0];



btn.addEventListener('click', function() {
    let inputNumber = parseInt(numInput.value);
    console.log(inputNumber, typeof(inputNumber));
    if (isNaN(inputNumber) || inputNumber > 100 || inputNumber < 1) {
        alert(`${inputNumber} is not valid`);
        numInput.value = '';
    } else {
        loadData(inputNumber);
        btn.setAttribute('disabled', true);
        btn.removeEventListener('click', arguments.callee); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee
    }
});




function loadData(numOfUser) {
    console.log(`loading ${numOfUser} users...`);
    fetch(url + numOfUser)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            userArray = data.results;
            displayData();
        })
        .catch(e => alert(e));
}


function displayData() {

    show();
    //display new buttons
    let newInputButton = document.createElement('div');
    let optArr = ['first name', 'last name', 'gender', 'age', 'country'];
    let newInLabel = document.createElement('label');
    newInLabel.setAttribute('for', 'choose');
    newInLabel.textContent = 'sort by: ';
    newInputButton.append(newInLabel);
    let selectTag = document.createElement('select');
    selectTag.setAttribute('name', 'opts');
    selectTag.setAttribute('id', 'choose');
    newInputButton.append(selectTag);
    wrapper.append(newInputButton);

    for (let elems of optArr) {
        let optTag = document.createElement('option');
        optTag.setAttribute('value', elems);
        optTag.textContent = elems;
        selectTag.append(optTag);
    }

    let sortBtn = document.createElement('button');
    sortBtn.textContent = 'SORT';
    sortBtn.classList.add('sorter');
    newInputButton.append(sortBtn);
    sortBtn.addEventListener('click', sorting);
    let ruler = document.createElement('hr');
    wrapper.append(ruler);
}

function show() {
    console.log(userArray);
    userArray.forEach(elem => {
        let infoHolder = document.createElement('div');
        infoHolder.innerHTML = `<p> name: ${elem.name.title} ${elem.name.first}, ${elem.name.last} from ${elem.location.country} (age: ${elem.dob.age});</p>`;
        infoHolder.style.cursor = 'pointer';
        wrapper.append(infoHolder);
        infoHolder.addEventListener('click', () => {
            let pictURL = elem.picture.large;
            let foto = document.createElement('img');
            foto.classList.add('fotoframe');
            console.log(pictURL);
            foto.setAttribute('src', pictURL);
            picsWrapper.append(foto);
        });
    });
    let ruler = document.createElement('hr');
    wrapper.append(ruler);

}
//a userArr-val dolgozunk, aztan kiirjuk a sorrendezett elemeket
function sorting() {
    let chooseOpt = document.getElementById('choose');
    // alert(`sortingolok... ${chooseOpt.value}`);
    if (chooseOpt.value === 'first name') {
        let info = document.createElement('h1');
        info.textContent = `sorting by first name`;
        wrapper.append(info);
        sortBy('name', 'first');
        show();

    }

    if (chooseOpt.value === 'last name') {
        let info = document.createElement('h1');
        info.textContent = `sorting by last name`;
        wrapper.append(info);
        sortBy('name', 'last');
        show();

    }

    if (chooseOpt.value === 'gender') {
        let info = document.createElement('h1');
        info.textContent = `sorting by gender`;
        wrapper.append(info);
        sortBy('gender', null);
        show();
    }

    if (chooseOpt.value === 'age') {
        let info = document.createElement('h1');
        info.textContent = `sorting by age`;
        wrapper.append(info);
        sortBy('dob', 'age');
        show();

    }

    if (chooseOpt.value === 'country') {
        let info = document.createElement('h1');
        info.textContent = `sorting by country`;
        wrapper.append(info);
        sortBy('location', 'country');
        show();
    }

}


function sortBy(firstAr, secondAr) {

    if (secondAr === null || secondAr === undefined) {
        for (let i = 0; i < userArray.length; i++) {
            for (let j = 0; j < userArray.length - 1 - i; j++) {
                if (userArray[j][firstAr] > userArray[j + 1][firstAr]) {
                    let csere = userArray[j];
                    userArray[j] = userArray[j + 1];
                    userArray[j + 1] = csere;
                }
            }

        }
    } else {
        for (let i = 0; i < userArray.length; i++) {
            for (let j = 0; j < userArray.length - 1 - i; j++) {
                if (userArray[j][firstAr][secondAr] > userArray[j + 1][firstAr][secondAr]) {
                    let csere = userArray[j];
                    userArray[j] = userArray[j + 1];
                    userArray[j + 1] = csere;
                }
            }

        }
    }
}