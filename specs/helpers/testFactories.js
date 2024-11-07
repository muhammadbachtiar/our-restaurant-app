import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithRestaurant = async (detailRestaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    detailRestaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
