import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createReviewRestaurant } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';

const Detail = {
  async render() {
    return `
        <div class="restaurant__detail">
         <div tabindex="0" class="post" id="restauarantList"></div>
        </div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetailContainer = document.querySelector('#restauarantList');
    restaurantDetailContainer.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

    if (restaurant === undefined) {
      restaurantDetailContainer.innerHTML = '<h3 class="favorite__kosong">Opps anda sedang offline, tidak dapat menampilkan data</h3>';
    } else {
      restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant)
      + createReviewRestaurant(restaurant);
      const detailRestaurant = restaurant.restaurant;
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        detailRestaurant,
      });
    }

    const skipToContent = document.querySelector('.skip-link');
    skipToContent.addEventListener('click', (event) => {
      event.preventDefault();
      this._onClickSkipContent();
    });

    skipToContent.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._onClickSkipContent();
      }
    });
  },
  _onClickSkipContent() {
    document.querySelector('#restauarantList').focus();
    document.querySelector('.skip-link').blur();
  },

};

export default Detail;
