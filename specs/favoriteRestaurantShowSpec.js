/* eslint-disable no-new */
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestauranSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestauranSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurant have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurants.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });

    describe('When favorite restaurant exist', () => {
      it('should show the restaurants', (done) => {
        document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.post-item').length).toEqual(2);
          done();
        });
        const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb, false);
        favoriteRestaurants.getAllRestaurants.and.returnValues([
          {
            id: 11,
            name: 'A',
          },
          {
            id: 22,
            name: 'B',
          },
        ]);
        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });
      });
    });
  });
});
