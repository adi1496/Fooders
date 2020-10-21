import {dom} from './../views/base.js';
import {searchView} from './../views/searchView.js';
// https://www.themealdb.com/api/json/v1/1/list.php?c=list
// let url1 = 'https://www.themealdb.com/api/json/v1/1/categories.php';
// let url2 = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
// let url3 = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
// let url4 = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
// let url5 = 'https://www.themealdb.com/api/json/v1/1/random.php';

const fetchFunction = async (url) => {
    const response = await fetch(url);

    const json = await response.json();
    // console.log(json);
    return json;
}

const paginate = (json, page) => {
    page = parseInt(page);
    let pages = Math.floor(json.length / 15);
    if(json.length % 15 > 0) pages++;

    if(page > pages) return {
        startElement: 15 * (pages - 1),
        endElement: json.length - 1,
        pages: pages,
        page
    }

    if(page === pages) return {
        startElement: 15 * (pages - 1),
        endElement: json.length - 1,
        pages: pages,
        page
    }

    return {
        startElement: 15 * (page - 1),
        endElement: 15 * (page) - 1,
        pages: pages,
        page
    }
}

export const searchAPI = async(searchType, query, page) => {
    let url;
    switch(searchType) {
        case 'categories': {
            url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
            let json = await fetchFunction(url);
            json = json.categories;
            const pageObj = paginate(json, page);
            
            searchView(json, searchType, pageObj);
            break;
        }

        case 'one-category': {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
            let json = await fetchFunction(url);
            json = json.meals;
            const pageObj = paginate(json, page);

            searchView(json, searchType, pageObj);
            break;
        }

        case 'id-meal': {
            let json = await searchById(query);
            json = json[0];

            searchView(json, searchType);
            break;
        }

        case 'random-meal': {
            url ='https://www.themealdb.com/api/json/v1/1/random.php';
            let json = await fetchFunction(url);
            json = json.meals[0];

            searchView(json, 'id-meal');
        }
    }

}

export const searchById = async (id) => {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const json = await fetchFunction(url);
    
    return json.meals;
}