const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/like');
})

Scenario('showing empty liked restaurants', ({ I }) => {
    I.seeElement('#query');
    I.see('DAFTAR RESTAURANT FAVORITE KOSONG', '.restaurant-item__not__found');

});

Scenario('liking one restaurant', ({ I }) => {
    I.see('DAFTAR RESTAURANT FAVORITE KOSONG', '.restaurant-item__not__found');
    I.amOnPage('/');

    I.waitForElement(".restaurant__title a", 10);
    I.scrollTo('.restaurant__title a');
    I.seeElement('.restaurant__title a');
    I.retry(2).click(locate('.restaurant__title a').first());

    I.waitForElement("#likeButton", 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.post-item');
  });

  Scenario('liking one restaurant with the right name',async ({ I }) => {
    I.see('DAFTAR RESTAURANT FAVORITE KOSONG', '.restaurant-item__not__found');
    I.amOnPage('/');
    
    I.waitForElement(".restaurant__title a", 10);
    I.scrollTo('.restaurant__title a');
    I.seeElement('.restaurant__title a');
    
    const firstRestaurant = locate('.restaurant__title a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant) ;
    I.retry(2).click(firstRestaurant);

    I.waitForElement("#likeButton", 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.post-item');
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

    assert.strictEqual(firstRestaurantName, likedRestaurantTitle);
  });
