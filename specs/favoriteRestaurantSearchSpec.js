import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestauranSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestauranSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restoran x');

      expect((presenter.latestQuery)).toEqual('restoran x');
    });

    it('should ask the model to search for liked restaurant', () => {
      searchRestaurants('restoran x');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restoran x');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.post-item').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran x').and.returnValues([
        { id: 111, name: 'restoran xixixi' },
        { id: 222, name: 'restoran xeracel' },
        { id: 333, name: 'restoran xhanuted' },
      ]);

      searchRestaurants('restoran x');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantName = document.querySelectorAll('.restaurant__title');
        expect(restaurantName.item(0).textContent).toEqual('restoran xixixi');
        expect(restaurantName.item(1).textContent).toEqual('restoran xeracel');
        expect(restaurantName.item(2).textContent).toEqual('restoran xhanuted');
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran x').and.returnValues([
        { id: 111, name: 'restoran xixixi' },
        { id: 222, name: 'restoran xeracel' },
        { id: 333, name: 'restoran xhanuted' },
      ]);

      searchRestaurants('restoran x');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantName = document.querySelectorAll('.restaurant__title');
        expect(restaurantName.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restoran x').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restoran x');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });
      favoriteRestaurants.searchRestaurants.withArgs('restoran x').and.returnValues([]);

      searchRestaurants('restoran x');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.post-item').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchRestaurants.withArgs('restoran x').and.returnValues([]);

      searchRestaurants('restoran x');
    });
  });
});
