import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FleetDetail from '../../../../common/screens/fleet/FleetDetail';
import { defaultScreenOptions } from '../../../../common/screens/options';
import { t } from '../../../../strings';
import ProfileAddCard from '../../../profile/payment/ProfileAddCard';
import ProfilePaymentMethods from '../../../profile/payment/ProfilePaymentMethods';
import AddressComplete from '../../orders/AddressComplete';
import AboutRestaurant from './AboutRestaurant';
import RestaurantDetail from './detail/RestaurantDetail';
import ItemDetail from './item/ItemDetail';
import { OrderCheckout } from './OrderCheckout';
import { RestaurantNavigatorParamList } from './types';

const Stack = createStackNavigator<RestaurantNavigatorParamList>();

export default function () {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions} initialRouteName="RestaurantDetail">
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{ title: t('Saber mais') }}
      />
      <Stack.Screen
        name="AboutRestaurant"
        component={AboutRestaurant}
        options={{ title: t('Saber mais') }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={{ title: t('Detalhes do item') }}
      />
      <Stack.Screen
        name="OrderCheckout"
        component={OrderCheckout}
        options={{ title: t('Sua sacola') }}
      />
      <Stack.Screen
        name="ProfileAddCard"
        component={ProfileAddCard}
        options={{ title: t('Adicionar cartão') }}
      />
      <Stack.Screen
        name="ProfilePaymentMethods"
        component={ProfilePaymentMethods}
        options={{ title: t('Formas de pagamento') }}
      />
      <Stack.Screen
        name="OrderDestination"
        component={AddressComplete}
        options={{ title: t('Endereço de entrega') }}
      />
      <Stack.Screen
        name="FleetDetail"
        component={FleetDetail}
        options={{ title: t('Endereço de entrega') }}
      />
    </Stack.Navigator>
  );
}
