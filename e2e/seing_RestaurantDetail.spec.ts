const assertDetail = require('assert');

Feature('Seeing Restaurant Detail');

Scenario('seeing one restaurant detail', ({ I }) => {
    I.amOnPage('/');

    I.waitForElement(".restaurant__title a", 10);
    I.scrollTo('.restaurant__title a');
    I.seeElement('.restaurant__title a');

    I.retry(2).click(locate('.restaurant__title a').first());
    I.waitForElement(".restaurant__poster", 10);
    I.seeElement('.restaurant__poster');
});

Scenario('seeing one restaurant detail with the rign restaurant name', async ({ I }) => {
    I.amOnPage('/');

    I.waitForElement(".restaurant__title a", 10);
    I.scrollTo('.restaurant__title a');
    I.seeElement('.restaurant__title a');

    const firstRestaurant = locate('.restaurant__title a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant) ;
    I.retry(2).click(locate('.restaurant__title a').first());
    
    I.waitForElement(".restaurant__poster", 10);
    I.seeElement('.restaurant__poster');
    I.seeElement('.restaurant__title');
    const detailRestaurantTitle = await I.grabTextFrom('.restaurant__title');
    
    assertDetail.strictEqual(firstRestaurantName, detailRestaurantTitle);
});