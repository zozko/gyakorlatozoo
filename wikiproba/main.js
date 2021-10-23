const startSearching = document.querySelector('.search_for');
let URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=1&srsearch=';
let searchText = document.getElementById('search');
const resultBox = document.getElementsByClassName('results')[0];

startSearching.addEventListener('click', () => {
    // console.log('keresem ', searchText.value);
    let concatinatedString = '';

    if (searchText.value.length === 0) {
        alert('empty search filed');
    } else {
        if (searchText.value.includes(' ')) {
            searchTextArr = searchText.value.split(' ');
            console.log(searchTextArr);
            for (let i = 0; i < searchTextArr.length; i++) {
                if (i < searchTextArr.length - 1) {
                    concatinatedString += searchTextArr[i] + '%20';
                } else {
                    concatinatedString += searchTextArr[i];
                }
            }

        } else {
            concatinatedString = searchText.value;
        }
        console.log('ezt keresem', concatinatedString);
        fetch(URL + concatinatedString)
            .then(respons => respons.json())
            .then(data => {
                console.log(data);
                data.query.search.forEach(elem => {
                    let responsHolder = document.createElement('div');
                    responsHolder.classList.add('respond_style');
                    resultBox.classList.add('result_padding');
                    resultBox.append(responsHolder);

                    let respondTitle = document.createElement('h1');
                    respondTitle.textContent = elem.title;
                    responsHolder.append(respondTitle);

                    let responsText = document.createElement('p');
                    responsText.innerHTML = elem.snippet;
                    responsHolder.append(responsText);

                })
            }).catch(e => alert(e));
        searchText.value = '';
    }
})