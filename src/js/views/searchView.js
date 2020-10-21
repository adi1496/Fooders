import {dom, cards, mealDetails} from './base.js';
import {activateCardBtns, activatePageBtns, activateMealBtns} from './../index.js';
import {searchById} from './../models/searchModel.js';

const createPagesElement = (containerCards, pageObj) => {
    const cardPages = document.createElement('div');
    cardPages.classList.add('card__pages');
    for(let i = 1; i <= pageObj.pages; i++) {
        const cardPage = document.createElement('div');
        cardPage.classList.add('card__page');
        cardPage.id = i;
        cardPage.textContent = i;
        if(pageObj.page === i) cardPage.classList.add('card__page--active');
        cardPages.insertAdjacentElement('beforeend', cardPage);
    }

    containerCards.insertAdjacentElement('beforeend', cardPages);

    return containerCards;
}

const getDataForMealDetails = meal => {
    let count = 0;
    let ingredients = [];
    for(let i = 1; i <= 20 ;i++) {
        if(meal[`strIngredient${i}`] === '') return {
            preparingTime: 5 * count,
            servings: 2,
            area: meal['strArea'],
            category: meal['strCategory'],
            ingredients
        }
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        ingredients.push(`${ingredient}--${measure}`);
        count++;
    }

    return {
        preparingTime: 5 * count,
        servings: 2,
        area: meal['strArea'],
        category: meal['strCategory'],
        ingredients
    }
}

const getDataFromMeal = (...meal) => {
    meal = meal[0];
    meal = meal[0];
    
    let count = 0;
    for(let i = 1; i <= 20 ;i++) {
        if(meal[`strIngredient${i}`] === '') return {
            preparingTime: 5 * count,
            servings: 2,
            area: meal['strArea'],
            category: meal['strCategory']
        }
        count++;
    }

    return {
        preparingTime: 5 * count,
        servings: 2,
        area: meal['strArea'],
        category: meal['strCategory']
    }
}

const mealCards = async (element) => {
    const meal = await searchById(element['idMeal']);
    const dataMeal = getDataFromMeal(meal);
    let outCard = cards.cardMeal.replace('{%image%}', element['strMealThumb']);
    outCard = outCard.replace('{%name%}', element['strMeal']);
    outCard = outCard.replace('{%category%}', dataMeal.category);
    outCard = outCard.replace('{%area%}', dataMeal.area);
    outCard = outCard.replace('{%time%}', dataMeal.preparingTime);
    outCard = outCard.replace('{%servings%}', dataMeal.servings);
    outCard = outCard.replace('{%id%}', element['idMeal']);

    return outCard;
}

const categoryCards = (element) => {
    let outputCard  = cards.cardCategory.replace('{%image%}', element['strCategoryThumb']);
    outputCard = outputCard.replace(/{%name%}/g, element['strCategory']);
    outputCard = outputCard.replace('{%description%}', element['strCategoryDescription']);
    
    return outputCard;
}


const createElements = async (json, start, end, type) => {
    let cardElements = [];
    if(type === 'category') {
        for(let i = start; i <= end; i++){
            cardElements.push(categoryCards(json[i]));
        }
    }else if(type === 'meal'){
        for(let i = start; i <= end; i++){
            cardElements.push(await mealCards(json[i]));
        }
    }

    return cardElements;
}

const createMealDetails = json => {
    const data = getDataForMealDetails(json);

    const ingredientsList = data.ingredients.map( el => {
        return mealDetails.ingredientModel.replace('{%ingredient%}', el);
    });

    console.log(data.ingredients, ingredientsList);

    let outMeal = mealDetails.mealContent.replace('{%name%}', json['strMeal']);
    outMeal = outMeal.replace('{%image%}', json['strMealThumb']);
    outMeal = outMeal.replace('{%category%}', data.category);
    outMeal = outMeal.replace('{%area%}', data.area);
    outMeal = outMeal.replace('{%time%}', data.preparingTime);
    outMeal = outMeal.replace('{%servings%}', data.servings);
    outMeal = outMeal.replace('{%ingredients-list%}', ingredientsList);
    outMeal = outMeal.replace('{%instructions%}', json['strInstructions']);

    return outMeal;
}

export const searchView = async (json, searchType, pageObj) => {
    dom.contentSection.innerHTML = '';
    switch(searchType) {
        case 'categories': {
            let cardElements = await createElements(json, pageObj.startElement, pageObj.endElement, 'category');
            let containerCards = document.createElement('div');
            containerCards.classList.add(cards.cardContainerClass);
            cardElements.forEach( el => {
                containerCards.insertAdjacentHTML('beforeend', el);
            });
            containerCards = createPagesElement(containerCards, pageObj);

            dom.contentSection.insertAdjacentElement('afterbegin', containerCards);
            activateCardBtns(document.querySelectorAll('.btn-card'));

            break;
        }

        case 'one-category': {
            let cardElements = await createElements(json, pageObj.startElement, pageObj.endElement, 'meal');
            // console.log(cardElements);
            let containerCards = document.createElement('div');
            containerCards.classList.add(cards.cardContainerClass);
            cardElements.forEach( el => {
                containerCards.insertAdjacentHTML('beforeend', el);
            });
            containerCards = createPagesElement(containerCards, pageObj);
            dom.contentSection.insertAdjacentElement('afterbegin', containerCards);

            activatePageBtns(document.querySelectorAll('.card__page'), document.querySelector('.card__text-box').textContent, 'one-category');

            activateMealBtns(document.querySelectorAll('.btn-card-meal'));

            break;
        }

        case 'id-meal': {
            let element = createMealDetails(json);
            dom.contentSection.insertAdjacentHTML('beforeend', element);
        }
    }
}