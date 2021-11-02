const menuk = document.getElementsByClassName('main_menu')[0];
const selection = document.getElementById('diffy');
const quizeHolder = document.getElementsByClassName('quiz')[0];
const baseURL = 'https://opentdb.com/';
let gameQuestions;
let level = '';
let playersScore = 0;
let questionNum = 0;



selection.addEventListener('change', function(el) {
    level = el.target.value;
    console.log('NEHEZSEG: ', level);

    switch (level) {
        case 'any':
            selection.style.backgroundColor = '#008000';
            break;
        case 'easy':
            selection.style.backgroundColor = '#ffff00';
            break;
        case 'medium':
            selection.style.backgroundColor = '#ffa500';
            break;
        case 'hard':
            selection.style.backgroundColor = '#ff0000';
            break;
    }
});



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
            // let level = menuChoise.value;
            // console.log('LEVEL: ', level);
            let totalQ = getQuestNum(dt[i].id)
                .then(el => {
                    // console.log(el);
                    menuPoint.classList.add('menu_View');
                    menuPoint.textContent = `${dt[i].name} (${el})`;
                    menuk.append(menuPoint);
                    menuPoint.addEventListener('click', function start(e) {
                        startGame(dt[i].id).then(
                                data => {
                                    console.log(data, 'kerdesek', gameQuestions);
                                    turnOffMenuButtons();
                                    //felso sav feltoltese
                                    showInfoBlock()

                                    //kerdes kiirsa


                                })
                            .catch(e => 'kerdesek ERROR', e);
                        this.classList.add('clicked');
                    })



                })
        }
    })
    .catch();



async function getQuestNum(num) {
    // console.log('a kategoria szama ', num);
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


async function startGame(e) {
    // console.log('LEVEL a kerdesek lehivasanal: ', level);
    if (level === 'any') {
        await fetch('https://opentdb.com/api.php?amount=10&category=' + e)
            .then(resp => resp.json())
            .then(gameData => {
                console.log(gameData);

                gameQuestions = gameData.results;
                console.table(gameQuestions);
            })
            .catch(e => console.log('gamedata ERROR ', q));
    } else {
        await fetch('https://opentdb.com/api.php?amount=10&category=' + e + '&difficulty=' + level)
            .then(resp => resp.json())
            .then(gameData => {
                console.log(gameData);

                gameQuestions = gameData.results;
                console.table(gameQuestions);

            })
            .catch(e => console.log('gamedata ERROR ', q));
    }
}



function turnOffMenuButtons() {

    menuk.style.display = 'none';
    selection.setAttribute('disabled', true);

}

function showInfoBlock() {
    console.info('INFOABLAK KESZITESE...');
    let infoBlock = document.createElement('div');
    infoBlock.classList.add('info_display');
    quizeHolder.append(infoBlock);
    let category = document.createElement('span');
    category.classList.add('info_span');
    category.textContent = `category: ${gameQuestions[questionNum].category}`;
    infoBlock.append(category);

    let difficulty = document.createElement('span');
    difficulty.classList.add('info_span');
    difficulty.textContent = `difficulty: ${gameQuestions[questionNum].difficulty}`;
    infoBlock.append(difficulty);

    let question = document.createElement('h1');
    question.classList.add('question_Text');
    question.textContent = `question: ${gameQuestions[questionNum].question}`;
    infoBlock.append(question);

    showAnswersBox();
}


function showAnswersBox() {
    let answersBox = document.createElement('div');
    answersBox.classList.add('answe_holder');
    quizeHolder.append(answersBox);

    let answ1 = document.createElement('button');
    answ1.classList.add('answerBtn');
    answ1.innerHTML = gameQuestions[questionNum].correct_answer;
    answersBox.append(answ1);

    answ1.addEventListener('click',
        showInfoBlock);

    for (let i = 0; i < gameQuestions[questionNum].incorrect_answers.length; i++) {
        let answBtn = document.createElement('button');
        answBtn.classList.add('answerBtn');
        answBtn.innerHTML = gameQuestions[questionNum].incorrect_answers[i];
        answersBox.append(answBtn);

        answBtn.addEventListener('click',
            showInfoBlock);
    }

    questionNum++;
}