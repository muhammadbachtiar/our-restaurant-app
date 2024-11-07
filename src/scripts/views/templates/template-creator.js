import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (resto) => `
    <div id="kontenutama" class="restaurant__header">
        <div class="restaurant__image">
          <picture>
            <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_SMALL_URL + resto.restaurant.pictureId}">
            <img 
            class="restaurant__poster" 
            src="${CONFIG.BASE_IMAGE_URL + resto.restaurant.pictureId}" 
            alt="poster${resto.title}" 
            />
          </picture>
        </div>
        <div class="restaurant__info"> 
            <h2 class="restaurant__title">${resto.restaurant.name}</h2>
            <p class="restaurant__description">${resto.restaurant.description}</p>
            <p class="restaurant__address">📍${resto.restaurant.address} Kota ${resto.restaurant.city} </p>
        </div>
    </div>
    <div class="restaurant__menu">
        <div class"menu__child">
        <h3 class="menu__title">Minuman</h3>
        ${resto.restaurant.menus.drinks.map((drink) => `<li class="menu__list"> ${drink.name}</li>`)}
        </div>
        <div class"menu__child">
        <h3 class="menu__title">Makanan</h3>
        ${resto.restaurant.menus.foods.map((food) => `<li class="menu__list"> ${food.name}</li>`)}
        </div>
    </div>
`;

const createReviewRestaurant = (resto) => `
<h3 class="review__title"> Penilaian Restoran </h3>
${resto.restaurant.customerReviews.map((customerreview) => `
    <div class="review__detail">
        <h4 class="review__name">${customerreview.name}</h4>
        <p class="review__comment">${customerreview.review}</p>
    </div>
    `).join('')}
`;

const createRestaurantItemTemplate = (resto) => `
    <article class="post-item">
        <picture>
          <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_SMALL_URL + resto.pictureId}">
          <img class="post-item__thumbnail lazyload"
          data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}"
          alt="Suasana restoran ${resto.name || '-'} yang berada di ${resto.city}" 
          />
        </picture>
        <h3 class="restaurant__title post-item__title"><a href="/#/detail/${resto.id}" class="post-item__title__anchor">${resto.name || '-'}</a></h3>
        <div class="post-item__footer"> 
          <div class="city">
            <span >${resto.city || '-'}</span>
          </div>
          <div class="post-item__date">
           <a href="#" class="post-item__rating_anchor" >Ratings <span class="post-item__date__author">${resto.rating || '-'}</span> </a>
          </div>
        </div>
        <div class="post-item__content">
          <p class="post-item__description">${resto.description || '-'}</p>
        </div>
    </article>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="masukan restoran ke daftar favorite" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="keluarkan restoran dari daftar favorite" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createReviewRestaurant,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
