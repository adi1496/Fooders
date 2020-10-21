//only for bundle
// import '@babel/polyfill';
import {searchAPI} from './models/searchModel.js';
import {dom} from './views/base.js';

const search = (searchType, query, page) => {
    searchAPI(searchType, query, page);
}

search('categories', '', 1);


dom.categoriesBtn.addEventListener('click', event => {
    search('categories', '', 1);
});

dom.randomBtn.addEventListener('click', event => {
    search('random-meal', '', 1);
});

dom.headerFooterButtons.forEach( el => {
    el.addEventListener('click', event => {
        const query = event.target.textContent.trim();
        console.log(query);
        search('one-category', query, 1);
    });
})

export const activateCardBtns = (buttons) => {
    buttons.forEach( el => {
        el.addEventListener('click', event => {
            const query = event.target.id;
            search('one-category', query, 1);
        })
    });
}

export const activatePageBtns = (buttons, query, searchType) => {
    buttons.forEach( el => {
        el.addEventListener('click', event => {
            search(searchType, query, event.target.id);
        })
    })
}

export const activateMealBtns = (buttons) => {
    buttons.forEach( el => {
        el.addEventListener('click', event => {
            const query = event.target.id;
            search('id-meal', query, 1);
        })
    });
}
