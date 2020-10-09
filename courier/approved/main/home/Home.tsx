import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useEffect, useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { ApiContext, AppDispatch } from '../../../../common/app/context';
import PaddedView from '../../../../common/components/containers/PaddedView';
import useNotificationToken from '../../../../common/hooks/useNotificationToken';
import HomeOngoingDeliveries from '../../../../common/screens/home/cards/HomeOngoingDeliveries';
import { getCourier } from '../../../../common/store/courier/selectors';
import { updateProfile } from '../../../../common/store/user/actions';
import { padding } from '../../../../common/styles';
import { ApprovedParamList } from '../../types';
import { MainParamList } from '../types';
import HomeControls from './HomeControls';
import HomeDeliveriesSummary from './HomeDeliveriesSummary';
import ModalChooser from './ModalChooser';
import { HomeParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList, 'Home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainParamList, 'HomeNavigator'>,
    StackNavigationProp<ApprovedParamList, 'MainNavigator'>
  >
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function ({ navigation }: Props) {
  // context
  const api = useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();

  // app state
  const courier = useSelector(getCourier)!;

  // state
  const [notificationToken, shouldDeleteToken, shouldUpdateToken] = useNotificationToken(
    courier!.notificationToken
  );

  // side effects
  // notification permission
  useEffect(() => {
    if (shouldDeleteToken || shouldUpdateToken) {
      const token = shouldUpdateToken ? notificationToken : null;
      dispatch(updateProfile(api)(courier.id, { notificationToken: token }));
    }
  }, [courier, notificationToken, shouldDeleteToken, shouldUpdateToken]);

  // UI
  const paddingTop = Constants.statusBarHeight;
  return (
    <ScrollView contentContainerStyle={{ paddingTop }}>
      <HomeControls navigation={navigation} />
      <HomeOngoingDeliveries
        onSelect={(order, openChat) =>
          navigation.navigate('OngoingNavigator', {
            screen: 'OngoingDelivery',
            params: { orderId: order.id, newMessage: openChat },
          })
        }
      />
      <PaddedView half>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveriesNavigator', { screen: 'DeliveryHistory' })}
        >
          <HomeDeliveriesSummary />
        </TouchableOpacity>
      </PaddedView>
      <PaddedView vertical={false} style={{ marginBottom: padding }} half>
        <ModalChooser />
      </PaddedView>
    </ScrollView>
  );
}
