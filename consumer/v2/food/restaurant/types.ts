import { Fare, Place } from '@appjusto/types';
import { FleetDetailParamList } from '../../../../common/screens/fleet/FleetDetail';
import { PixParamList } from '../../common/PayWithPix';
import { ProfileAddCardParamList } from '../../main/profile/ProfileAddCard';
import { ProfilePaymentMethodsParamList } from '../../main/profile/ProfilePaymentMethods';
import { ProfileParamList } from '../../main/profile/types';

export type RestaurantNavigatorParamList = {
  RestaurantDetail: undefined;
  RestaurantHeaderMessage: undefined;
  AboutRestaurant: undefined;
  ItemDetail: {
    productId: string;
    itemId?: string;
  };
  FoodOrderCheckout?: {
    destination?: Place;
    paymentMethodId?: string;
    returningFare?: Fare;
  };
  OrderDestination: {
    returnScreen: 'FoodOrderCheckout';
    returnParam: string;
    value?: Place | null;
  };
  AboutCharges: undefined;
  AvailableFleets: {
    orderId: string;
    selectedFare: Fare;
    returnScreen: 'FoodOrderCheckout' | 'CreateOrderP2P';
  };
} & PixParamList &
  FleetDetailParamList &
  ProfilePaymentMethodsParamList &
  ProfileAddCardParamList &
  ProfileParamList;
