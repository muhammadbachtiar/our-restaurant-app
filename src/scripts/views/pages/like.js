import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestauranSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestauranSearchView();

const Like = {
  async render() {
    return view.getTemplate();
    // return `
    // <div class="content_container">
    //       <section class="content">
    //         <div class="favorite_list">
    //         </div>
    //       </section>
    // </div>
    // `;
  },

  async afterRender() {
    // const EmptyContainer = document.querySelector('.favorite_list');
    // EmptyContainer.innerHTML = '
    // <div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    // EmptyContainer.innerHTML = view.getTemplate();

    // if (restaurants.length > 0) {
    //   EmptyContainer.innerHTML = `<h2 class="detail_title"> Daftar Restaurant Favorite</h2>
    //                               <div tabindex="0" class="posts" id="restauarantList"></div>`;
    //   const RestaurantContainer = document.querySelector('#restauarantList');
    //   restaurants.forEach((restaurant) => {
    //     RestaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    //   });
    // } else {
    //   EmptyContainer.innerHTML = '
    // <h3 class="favorite__kosong"> DAFTAR RESTAURANT FAVORITE KOSONG</h3>';
    // }

    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

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
    document.querySelector('#restaurants').focus();
    document.querySelector('.skip-link').blur();
  },
};

export default Like;
