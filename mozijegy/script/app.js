const baseURL = 'https://kodbazis.hu/api/movies';
const menu = document.getElementsByClassName('menu_wrapper')[0];
let cinemaData = [];
let roomNum = 0;
let movieTitle = '';

async function loadData() {
    await fetch(baseURL)
        .then(res => res.json())
        .then(data => {

            cinemaData = [...data];
            console.log(cinemaData);
            makeMenu();
        })
}

loadData();


function makeMenu() {
    let menuLabel = document.createElement('label');
    menuLabel.setAttribute('for', 'terem');
    menuLabel.innerHTML = '<span>terem: </span>';
    menu.append(menuLabel);

    let selectTag = document.createElement('select');
    selectTag.setAttribute('id', 'terem');
    menu.append(selectTag);

    cinemaData.forEach(elem => {
        let selector = document.createElement('option');
        selector.setAttribute('value', elem.id);
        selector.textContent = elem.id;
        selectTag.append(selector);

    })

    selectTag.addEventListener('change', (e) => {
        roomNum = e.target.value;
        console.log('a terem szama', roomNum);

        if (movieTitle != '') {
            menu.removeChild(movieTitle);
        }

        movieTitle = document.createElement('h2');
        movieTitle.classList.add('film');
        movieTitle.textContent = cinemaData[roomNum - 1].name;
        menu.append(movieTitle);



    })

}