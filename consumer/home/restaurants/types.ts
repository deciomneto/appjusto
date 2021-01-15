import { Address } from 'appjusto-types';

export type RestaurantsNavigatorParamList = {
  RestaurantsHome?: {
    address: Address;
  };
  AddressComplete?: {
    value: string;
    returnScreen: 'RestaurantsHome';
    returnParam: string;
  };
  RestaurantNavigator: {
    restaurantId: string;
  };
  RestaurantSearch: undefined;
  OrderBy: undefined;
};