//beolvassuk a letezo tagokat
const displayWrapper = document.querySelector('div');
const URL = "list.json";
let members = [];

let inputButton = document.querySelector('button');

inputButton.addEventListener('click', () => {
    let inputFiled = document.getElementById('name');
    let inputedName = inputFiled.value;

    console.log(inputedName, typeof(inputedName), parseInt(inputedName));

    if (inputedName.length !== 0 && isNaN(inputedName)) {
        console.log('OK');
        let signedMemeberAddID = getID();

        let signedMemeber = {
            name: inputedName,
            online: true,
            id: signedMemeberAddID
        }
        members.push(signedMemeber);
        addMemeber(signedMemeber);
        inputFiled.value = '';
    } else {
        console.log('NO - OK');
        inputFiled.value = '';
        alert('enter valid name');
    }
});

// const newMemeber = document.createElement('p');

function readMembers() {
    fetch(URL).then(file => file.json()).then(data => {
        // console.log(data);
        data.forEach((element, index) => {
            members.splice(index, 1, element);
        })
        showOnWeb(members);

    })
}

readMembers();


function showOnWeb(membersArr) {
    membersArr.forEach((elem, index) => {
        // console.log(elem.name);
        const newMember = document.createElement('p');
        const span = document.createElement('span');
        newMember.textContent = elem.name;
        span.innerHTML = '&#x2715';
        newMember.append(span);
        actual(newMember, elem);
        displayWrapper.append(newMember);
        toggler(newMember, elem);
        spanToggler(span, index);

    })
}

function toggler(targetElem, elemObj) {
    console.log(targetElem, elemObj);
    targetElem.addEventListener('click', (e) => {
        if (elemObj.online) {
            elemObj.online = false;
        } else {
            elemObj.online = true;
        }

        console.log(elemObj.online);
        actual(targetElem, elemObj);


    });
}

function actual(tag, elemObj) {
    console.log(elemObj);
    tag.classList = null;
    if (elemObj.online) {
        tag.classList.add('online');
    } else {
        tag.classList.add('offline');
    }
    console.log(members);
}


function spanToggler(tag, arrIndex) {
    // console.log('index', arrIndex);
    tag.addEventListener('click', (e) => {

        let parentElem = tag.parentElement;

        parentElem.remove();

        members.splice(arrIndex, 1);

    });
}


function getID() {
    let idS = []
    for (let i = 0; i < members.length; i++) {
        let existID = members[i].id;
        console.log('letezo ID:', existID);
        idS.push(existID);
        console.log(idS);
    }
    return Math.max(...idS) + 1;
}

function addMemeber(memberObj) {
    const newMember = document.createElement('p');
    const span = document.createElement('span');
    newMember.textContent = memberObj.name;
    span.innerHTML = '&#x2715';
    newMember.append(span);
    displayWrapper.append(newMember);
    toggler(newMember, memberObj);
    spanToggler(span, members[members.length]);
    actual(newMember, memberObj);
}