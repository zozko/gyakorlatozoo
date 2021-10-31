const menuk = document.getElementsByClassName('main_menu')[0];
const baseURL = 'https://opentdb.com/';
let gameQuestions;

//menu
let menuData = async function() {
    let menuTxt;
    await fetch(baseURL + 'api_category.php')
        .then(res => res.json())
        .then(data => {
            // console.log('menuloader', data);
            menuTxt = data.trivia_categories;
        }).catch(e => console.error('menuloader ERROR', e));
    return menuTxt;
}

menuData()
    .then(dt => {
        // console.log('adatok ', dt);
        for (let i = 0; i < dt.length; i++) {
            let menuPoint = document.createElement('button');
            let totalQ = getQuestNum(dt[i].id)
                .then(el => {
                    // console.log(el);
                    menuPoint.classList.add('menu_View');
                    menuPoint.textContent = `${dt[i].name} (${el})`;
                    menuk.append(menuPoint);
                    menuPoint.addEventListener('click', (e) => {
                        startGame(dt[i].id);
                    });
                })
        }
        // menuPoint.textContent = dt.name

    })
    .catch();



async function getQuestNum(num) {
    // console.log(num)
    let total;
    await fetch('https://opentdb.com/api_count.php?category=' + num)
        .then(resp => resp.json())
        .then(data => {
            total = data.category_question_count.total_question_count
        })
        .catch(e => console.log('get ID ERROR', e));
    // console.log('total Quest = ', total);
    return total;
}


function startGame(e) {
    console.log(e)
    fetch('https://opentdb.com/api.php?amount=10&category=' + e)
        .then(resp => resp.json())
        .then(gameData => {
            console.log(gameData);
            gameQuestions = gameData.results;
            console.table(gameQuestions);
        })
        .catch(e => console.log('gamedata ERROR ', q));
}