export const dom = {
    contentSection: document.querySelector('.section-content'),
    randomBtn: document.getElementById('random-meal'),
    categoriesBtn: document.getElementById('show-categories'),
    areasBtn: document.getElementById('show-areas'),
    headerFooterButtons: document.querySelectorAll('.header__item')
}

export const cards = {
    cardCategory: `<div class="card">
        <figure class="card__photo">
            <img src="{%image%}" alt="card image" class="card__img">
        </figure>
        <h3 class="heading-3">{%name%}</h3>
        <p class="card__description">{%description%}</p>
        <button class="btn btn-card" id="{%name%}">View more</button>
    </div>`,

    cardMeal: `<div class="card">
        <figure class="card__photo">
            <img src="{%image%}" alt="card image" class="card__img">
        </figure>
        <h3 class="heading-3">{%name%}</h3>
        
        <div class="card__box-container">
            <div class="card__box">
                <svg class="card__icon">
                    <use xlink:href="img/card-icons.svg#icon-dropbox"></use>
                </svg>
                <div class="card__box-title">Category:</div>
                <div class="card__text-box">{%category%}</div>
            </div>

            <div class="card__box">
                <svg class="card__icon">
                    <use xlink:href="img/card-icons.svg#icon-earth"></use>
                </svg>
                <div class="card__box-title">Area:</div>
                <div class="card__text-box">{%area%}</div>
            </div>

            <div class="card__box">
                <svg class="card__icon">
                    <use xlink:href="img/card-icons.svg#icon-stopwatch"></use>
                </svg>
                <div class="card__box-title">Time:</div>
                <div class="card__text-box">{%time%} minutes</div>
            </div>

            <div class="card__box">
                <svg class="card__icon">
                    <use xlink:href="img/card-icons.svg#icon-spoon-knife"></use>
                </svg>
                <div class="card__box-title">Servings:</div>
                <div class="card__text-box">{%servings%} persons</div>
            </div>
            
        </div>

        <button class="btn btn-card btn-card-meal" id="{%id%}">View more</button>
    </div>`,

    pagesElementL: `<div class="card__pages">
        <div class="card__page" id="{%page%}">{%page%}</div>
    </div>`,

    cardContainerClass: 'section-content__cards'
}

export const mealDetails = {
    mealContent: `<div class="meal">
    <h4 class="heading-4">{%name%}</h4>
    
    <figure class="meal__photo">
        <img src="{%image%}" alt="meal-image" class="meal__img">
    </figure>
    
    <div class="meal__box-container">
        <div class="meal__box">
            <svg class="meal__icon">
                <use xlink:href="img/card-icons.svg#icon-dropbox"></use>
            </svg>
            <div class="meal__box-title">Category:</div>
            <div class="meal__text-box">{%category%}</div>
        </div>
    
        <div class="meal__box">
            <svg class="meal__icon">
                <use xlink:href="img/card-icons.svg#icon-earth"></use>
            </svg>
            <div class="meal__box-title">Area:</div>
            <div class="meal__text-box">{%area%}</div>
        </div>
    
        <div class="meal__box">
            <svg class="meal__icon">
                <use xlink:href="img/card-icons.svg#icon-stopwatch"></use>
            </svg>
            <div class="meal__box-title">Time:</div>
            <div class="meal__text-box">{%time%} minutes</div>
        </div>
    
        <div class="meal__box">
            <svg class="meal__icon">
                <use xlink:href="img/card-icons.svg#icon-spoon-knife"></use>
            </svg>
            <div class="meal__box-title">Servings:</div>
            <div class="meal__text-box">{%servings%} persons</div>
        </div>
    
    </div>
    
    
    <div class="meal__ingredients">
        <div class="meal__ingredients-text">Ingredients:</div>
        <div class="meal__list">{%ingredients-list%}</div>
    </div>
    
    
    <div class="meal__instructions">
        <div class="meal__instructions-text">Preparing instrctions:</div>
        <p class="meal__text">{%instructions%}</p>
    </div>
    
    </div>`,

    ingredientModel: `<li class="meal__item">{%ingredient%}</li>`
}