import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import FeedbackView from '../../../common/components/views/FeedbackView';
import { IconMotocycle } from '../../../common/icons/icon-motocycle';
import useObserveOrder from '../../../common/store/api/order/hooks/useObserveOrder';
import { isOrderOngoing } from '../../../common/store/order/selectors';
import { borders, colors, padding, screens } from '../../../common/styles';
import { t } from '../../../strings';
import { LoggedParamList } from '../../types';
import { OrderNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OrderNavigatorParamList, 'OrderConfirming'>,
  BottomTabNavigationProp<LoggedParamList>
>;
type ScreenRouteProp = RouteProp<OrderNavigatorParamList, 'OrderConfirming'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default ({ navigation, route }: Props) => {
  // params
  const { orderId } = route.params;
  // screen state
  const { order } = useObserveOrder(orderId);

  // side effects
  React.useEffect(() => {
    if (!order) return;
    if (order.status === 'canceled') {
      navigation.popToTop();
    } else if (isOrderOngoing(order)) {
      navigation.replace('OngoingOrder', {
        orderId,
      });
    } else if (order.dispatchingState === 'no-match') {
      navigation.navigate('OrderNoMatch', { orderId });
    }
  }, [order]);

  // UI
  if (!order) {
    // showing the indicator until the order is loaded
    return (
      <View style={screens.centered}>
        <ActivityIndicator size="large" color={colors.green500} />
      </View>
    );
  }
  const description =
    order.type === 'food'
      ? t('Aguarde enquanto o restaurante confirma seu pedido...')
      : t('A cobrança só será efetuada caso um entregador aceitar o seu pedido.');
  return (
    <FeedbackView
      header={t('Pedido em andamento')}
      description={description}
      icon={<IconMotocycle />}
    >
      <DefaultButton
        title={t('Cancelar pedido')}
        onPress={() => navigation.navigate('ConfirmCancelOrder', { orderId })}
        style={{
          ...borders.default,
          marginBottom: padding,
          borderColor: colors.black,
          backgroundColor: 'white',
        }}
      />
      <DefaultButton title={t('Voltar para o início')} onPress={() => navigation.popToTop()} />
    </FeedbackView>
  );
};