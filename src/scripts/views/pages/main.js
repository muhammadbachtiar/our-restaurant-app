import RestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const main = {
  async render() {
    return `
        <div class="hero">
          <div class="hero__inner">
            <img src="./images/Logo/logo-1.png" alt="Logo Our Restaurant">
            <h2 class="hero__title">Selamat datang di Our Restaurant</h2>
            <p class="hero__tagline">Tempat dimana kumpulan informasi restaurant terbaik berada dari seluruh penjuru Nusantara. Temukan restoran pilihan anda di Our Restaurant sekarang</p>
          </div>
        </div>
        <div tabindex="0" id="isimainpage" class="content_container">
          <section class="content">
            <div class="list">
                <h2 class="list_title"> Daftar Restaurant Pilihan Kami</h2>
                <p class="list_description">Jadikan pengalaman makan anda tidak terlupakan dengan memilih rekomendasi restauran yang Our Restaurant berikan</p>
                <div class="posts" id="restauarantList"></div>
            </div>
          </section>
        </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantContainer = document.querySelector('#restauarantList');
    restaurants.forEach((restauran) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restauran);
    });

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
    document.querySelector('#isimainpage').focus();
    document.querySelector('.skip-link').blur();
  },
};

export default main;
