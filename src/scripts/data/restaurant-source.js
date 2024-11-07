import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      return response.json();
    } catch (err) {
      return undefined;
    }
  }
}

export default RestaurantDbSource;
