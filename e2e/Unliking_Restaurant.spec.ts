Feature('Unliking Restaurant');

Before(({ I }) => {
    I.amOnPage('/');

    I.waitForElement(".restaurant__title a", 10);
    I.scrollTo('.restaurant__title a');
    I.seeElement('.restaurant__title a');
    I.retry(2).click(locate('.restaurant__title a').first());

    I.waitForElement("#likeButton", 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
})

Scenario('Unliking one restaurant', ({ I }) => {
    I.amOnPage('/#/like');
    I.scrollTo('.restaurant__title a');
    I.seeElement('.post-item');
    I.see('Melting Pot', '.restaurant__title a');
    
    I.click(locate('.restaurant__title a'));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.see('DAFTAR RESTAURANT FAVORITE KOSONG', '.restaurant-item__not__found');

  });