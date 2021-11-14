const baseURL = 'https://kodbazis.hu/api/movies';
const menu = document.getElementsByClassName('menu_wrapper')[0];
const infoBox = document.getElementsByClassName('info_wrapper')[0];
const roombox = document.getElementsByClassName('seats')[0];
const room = document.getElementsByClassName('room')[0];
let cinemaData = [];
let roomNum = 0;
let movieTitle = '';
let abc = 'abcdefghijklmnopqrstuvwxyz';
let booked;
let fizetendo = 0;


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
    if (infoBox) {
        infoBox.innerHTML = '';
    }
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
    fizetendo = 0;
    let chair = abc.split('');
    booked = film.bookedSeats;
    console.log('foglalt szekek', booked);

    paintIt();
    //szamok

    function paintIt() {
        let chairMark = makeNode(room, 'span', '#');
        chairMark.classList.add('seat_mark');
        chairMark.classList.add('hide');

        for (let i = 0; i < columns; i++) {
            let chairMark = makeNode(room, 'span', i + 1);
            chairMark.classList.add('seat_mark');
        }
        let ruler = makeNode(room, 'br', '');

        //sorok
        for (let i = 0; i < rows; i++) {
            let chairMark = makeNode(room, 'span', chair[i]);
            chairMark.classList.add('seat_mark');
            //a szekek kirajzolasa
            for (let j = 0; j < columns; j++) {

                let actualseat = {
                    row: chair[i].toUpperCase(),
                    number: j + 1
                };
                // console.info(actualseat);
                let paintSeat = makeNode(room, 'span', 'x');
                //foglaltsag ellenorzese
                for (let k = 0; k < booked.length; k++) {
                    if (booked[k].row === actualseat.row && booked[k].number === actualseat.number) {
                        // console.log('foglalt szek ellenorzes ', actualseat.row, actualseat.number);
                        paintSeat.classList.add('booked');
                    }
                }
                paintSeat.classList.add('seat_style');

                paintSeat.addEventListener('click', function foglalo(event) {
                    if (event.target.classList.contains('booked')) {
                        // this.classList.removeEvenet('click', foglalo());
                        console.log('ez a szek foglalt!');
                    } else {
                        booked.push(actualseat);
                        console.log('lefoglalva ', actualseat);
                        if (room) {
                            room.innerHTML = '';
                        }
                        paintIt();
                        jegyar(film);

                    }
                });


            }
            let ruler = makeNode(room, 'br', '');
        }
    }

}




function makeNode(parentNode, newTag, content) {
    let newElem = document.createElement(newTag);
    newElem.innerHTML = content;
    parentNode.append(newElem);

    return newElem;
}


function jegyar(film) {
    filmInfok(film);
    fizetendo += film.price;
    let jegyekSzama = fizetendo / film.price;
    let kasszaBox = makeNode(infoBox, 'p', `fizetendo osszeg: ${fizetendo}.-HUF \nkiadadno jegyek szama:  ${jegyekSzama}`);
    kasszaBox.classList.add('kassza_sav');
}