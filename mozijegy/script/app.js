const baseURL = 'https://kodbazis.hu/api/movies';
const menu = document.getElementsByClassName('menu_wrapper')[0];
const infoBox = document.getElementsByClassName('info_wrapper')[0];
const roombox = document.getElementsByClassName('seats')[0];
const room = document.getElementsByClassName('room')[0];
let cinemaData = [];
let roomNum = 0;
let movieTitle = '';
let abc = 'abcdefghijklmnopqrstuvwxyz';


let rows, columns, freeSeatsInRoom;


async function loadData() {
    await fetch(baseURL)
        .then(res => res.json())
        .then(data => {

            cinemaData = [...data];
            console.log(cinemaData);
            makeMenu();
            filmTitle(1);
        })
}

loadData();


function makeMenu() {

    let menuLabel = makeNode(menu, 'label', '<span>terem: </span>');
    menuLabel.setAttribute('for', 'terem');

    let selectTag = makeNode(menu, 'select', null);
    selectTag.setAttribute('id', 'terem');

    cinemaData.forEach(elem => {

        let selector = makeNode(selectTag, 'option', `${elem.id} - ${elem.name}`);
        selector.setAttribute('value', elem.id);


    })

    selectTag.addEventListener('change', (e) => {
        roomNum = e.target.value;

        // console.log('a terem szama', roomNum);

        if (movieTitle != '') {
            menu.removeChild(movieTitle);
        }
        filmTitle(roomNum);
        let actualElem = cinemaData[roomNum - 1];
        if (infoBox) {
            infoBox.innerHTML = '';
        }
        filmInfok(actualElem);
        // console.log('elem amelyikkel dolgozunk:', actualElem);
        if (room) {
            room.innerHTML = '';
        }
        showSeats(actualElem);
    })

}

function filmTitle(room) {

    movieTitle = makeNode(menu, 'h2', cinemaData[room - 1].name);
    movieTitle.classList.add('film');

}


function filmInfok(film) {
    let ticketPrice = makeNode(infoBox, 'p', `jegy ára: ${film.price}.-HUF/db`);
    ticketPrice.classList.add('info_box');

    rows = film.numberOfRows;
    columns = film.numberOfSeats;
    let occipied = film.bookedSeats.length;
    seatsInRoom = rows * columns;
    freeSeatsInRoom = seatsInRoom - occipied;


    let freeSeats = makeNode(infoBox, 'p', `szabad székek száma: ${freeSeatsInRoom}`);
    freeSeats.classList.add('info_box');
}


function showSeats(film) {
    let chair = abc.split('');
    // console.log(chair);
    let chairMark = makeNode(room, 'span', '#');
    chairMark.classList.add('seat_mark');
    chairMark.classList.add('hide');
    for (let i = 0; i < columns; i++) {
        let chairMark = makeNode(room, 'span', chair[i]);
        chairMark.classList.add('seat_mark');
    }
    let ruler = makeNode(room, 'br', '');

    for (let i = 0; i < rows; i++) {
        let chairMark = makeNode(room, 'span', i + 1);
        chairMark.classList.add('seat_mark');
        for (let j = 0; j < columns; j++) {
            let paintSeat = makeNode(room, 'span', 'x');
            paintSeat.classList.add('seat_style');
        }
        let ruler = makeNode(room, 'br', '');
    }

}




function makeNode(parentNode, newTag, content) {
    let newElem = document.createElement(newTag);
    newElem.innerHTML = content;
    parentNode.append(newElem);

    return newElem;
}