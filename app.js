//beolvassuk a letezo tagokat
const displayWrapper = document.querySelector('div');
const URL = "list.json";
let members = [];
localStorage.clear();
localStorage.setItem('proba', 'wazze');

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
        };

        members.push(signedMemeber);
        addMemeber(signedMemeber);
        inputFiled.value = '';
    } else {
        // console.log('NO - OK');
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
            // localStorage.setItem('cislo' + JSON.stringify(index), JSON.stringify(element)); //`${element.name},${element.online}, ${element.id}`);
        })
        showOnWeb(members);
        // localStorage.clear();
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
        actual(newMember, elem, index);
        displayWrapper.append(newMember);
        toggler(newMember, elem, index);
        spanToggler(span, index);

    })
}

function toggler(targetElem, elemObj, index) {
    console.log(targetElem, elemObj);
    targetElem.addEventListener('click', (e) => {
        if (elemObj.online) {
            elemObj.online = false;
        } else {
            elemObj.online = true;
        }

        console.log(elemObj.online);
        actual(targetElem, elemObj, index);
        // e.stopPropagate();

    });
}

function actual(tag, elemObj, index) {
    console.log('actualizalom az elemet', elemObj, 'es indexet ', index);
    tag.classList = null;
    if (elemObj.online) {
        tag.classList.add('online');
        localStorage.setItem('cislo' + JSON.stringify(index), JSON.stringify(elemObj)); //`${elemObj.name},${elemObj.online},${elemObj.id}`);
    } else {
        tag.classList.add('offline');
        localStorage.setItem('cislo' + JSON.stringify(index), JSON.stringify(elemObj));
        //`${elemObj.name},${elemObj.online},${elemObj.id}`);
    }
    console.log(members);
}


function spanToggler(tag, arrIndex) {
    // console.log('index', arrIndex);
    tag.addEventListener('click', (e) => {

        console.log('a torles indexe', arrIndex);
        let parentElem = tag.parentElement;

        parentElem.remove();

        members.splice(arrIndex, 1);

        // let indexToRemove = arrIndex.toString();
        // console.log(indexToRemove);
        localStorage.removeItem('cislo' + JSON.stringify(arrIndex));
        // localStorage.removeItem('proba');

    });

}


function getID() {
    let idS = []
    if (members.length === 0) { return 1 }
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
    toggler(newMember, memberObj, members.length - 1);
    actual(newMember, memberObj, members.length - 1);
    spanToggler(span, members[members.length]);
    // localStorage.setItem(members.length - 1, `${memberObj.name},${memberObj.online}, ${memberObj.id}`);
}