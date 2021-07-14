import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ApiContext } from '../../../common/app/context';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import FeedbackView from '../../../common/components/views/FeedbackView';
import { IconConeYellow } from '../../../common/icons/icon-cone-yellow';
import { useObserveOrder } from '../../../common/store/api/order/hooks/useObserveOrder';
import { colors, padding, screens } from '../../../common/styles';
import { t } from '../../../strings';
import { OngoingOrderNavigatorParamList } from '../ongoing/types';
import { LoggedNavigatorParamList } from '../types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OngoingOrderNavigatorParamList, 'OngoingOrderDeclined'>,
  StackNavigationProp<LoggedNavigatorParamList>
>;
type ScreenRouteProp = RouteProp<OngoingOrderNavigatorParamList, 'OngoingOrderDeclined'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const OngoingOrderDeclined = ({ navigation, route }: Props) => {
  // params
  const { orderId, paymentMethodId } = route.params;
  // context
  const api = React.useContext(ApiContext);
  // screen state
  const order = useObserveOrder(orderId);
  const [isLoading, setLoading] = React.useState(false);
  // side effects
  // when adding new payment method
  React.useEffect(() => {
    if (paymentMethodId) {
      (async () => {
        setLoading(true);
        try {
          api.order().updateOrderCallable(orderId, { payableWith: 'credit_card', paymentMethodId });
          setLoading(false);
          navigation.navigate('OngoingOrder', { orderId });
        } catch (error) {
          setLoading(false);
        }
      })();
    }
  }, [api, orderId, paymentMethodId, navigation]);
  // handlers
  const reviewOrderHandler = React.useCallback(
    (paymentMethodId?: string) => {
      if (!order) return;
      if (order.type === 'p2p') {
        navigation.replace('P2POrderNavigator', {
          screen: 'CreateOrderP2P',
          // orderId: order.id,
          params: { paymentMethodId },
        });
      } else {
        navigation.replace('FoodOrderNavigator', {
          screen: 'RestaurantNavigator',
          params: {
            restaurantId: order.business!.id,
            orderId: order.id,
            screen: 'FoodOrderCheckout',
            params: { paymentMethodId },
          },
        });
      }
    },
    [navigation, order]
  );
  // effects
  React.useEffect(() => {
    if (paymentMethodId) {
      navigation.setParams({
        paymentMethodId: undefined,
      });
      setLoading(true);
      setTimeout(() => reviewOrderHandler(paymentMethodId), 1000);
    }
  }, [navigation, order, paymentMethodId, reviewOrderHandler]);
  // UI
  if (!order || isLoading) {
    return (
      <View style={screens.centered}>
        <ActivityIndicator size="large" color={colors.green500} />
      </View>
    );
  }
  // handlers
  const changePaymentHandler = () => {
    navigation.navigate('ProfilePaymentMethods', {
      returnScreen: 'OngoingOrderDeclined',
    });
  };
  // UI
  return (
    <ScrollView style={{ ...screens.default }} contentContainerStyle={{ flexGrow: 1 }}>
      <FeedbackView
        header={t('Problemas no pagamento')}
        description={t(
          'Não conseguimos efetuar a cobrança na forma de pagamento escolhida. Por favor, altere a forma de pagamento e tente novamente.'
        )}
        icon={<IconConeYellow />}
        background={colors.white}
      >
        <DefaultButton title={t('Alterar forma de pagamento')} onPress={changePaymentHandler} />
        {order.type === 'food' && order.dispatchingStatus !== 'declined' ? (
          <View style={{ paddingVertical: padding }}>
            <DefaultButton
              title={t('Revisar pedido')}
              secondary
              onPress={() => reviewOrderHandler()}
            />
          </View>
        ) : null}
      </FeedbackView>
    </ScrollView>
  );
};
