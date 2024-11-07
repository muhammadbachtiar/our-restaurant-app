import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestauranSearchView {
  getTemplate() {
    return `
      <div class="content_container">
        <h2 class="detail_title"> Daftar Restaurant Favorite</h2>
        <section class="content">
          <label for="query">Cari restoran favorite anda:</label><br>
          <input id="query" type="text" placeholder="Masukan nama restoran...">
          <div class="favorite_list">
            <div tabindex="0" id="restaurants" class="restaurants posts">
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </section>
      </div> 
      `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<h3 class="restaurant-item__not__found">DAFTAR RESTAURANT FAVORITE KOSONG</h3>';
  }
}

export default FavoriteRestauranSearchView;
