async function renderCards() {
    const languages = await fetchData('https://adriankurek.pl/github/languages.json');
    const words = await fetchData('https://adriankurek.pl/github/words.json');
    const content = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];
    content.classList.add('wrapper');
    content.style.display = 'flex';
    content.style.flexFlow = 'row wrap';
    content.style.justifyContent = 'center';
    content.id = 'words';

    if (languages.length < 1 || words.length < 1) {
        content.innerHTML = 'There are no language cards available at the moment!';
        body.appendChild(content);
        return;
    }

    words.forEach(w => {
        let index = 0;
        const card = document.createElement('div');
        const flag = document.createElement('p');
        const word = document.createElement('p');
        
        card.classList += 'card';
        flag.innerHTML = languages[index].flag;
        word.innerHTML = w.polish;
        card.appendChild(flag);
        card.appendChild(word);
        card.style.backgroundColor = languages[index].color;

        card.onclick = () => {
            index = index >= 2 ? 0 : index + 1;
            flag.innerHTML = languages[index].flag;
            word.innerHTML = w[languages[index].name];
            card.style.backgroundColor = languages[index].color;
        };

        content.appendChild(card);
        body.appendChild(content);
    });
}

async function fetchData(url) {
    return await fetch(url).then(response => response.json());
}

renderCards();