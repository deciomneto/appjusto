import { Fare, Place } from '@appjusto/types';
import * as cpfutils from '@fnando/cpf';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { ApiContext, AppDispatch } from '../../../common/app/context';
import useLastKnownLocation from '../../../common/location/useLastKnownLocation';
import { useObserveOrder } from '../../../common/store/api/order/hooks/useObserveOrder';
import { useQuotes } from '../../../common/store/api/order/hooks/useQuotes';
import { useProfileSummary } from '../../../common/store/api/profile/useProfileSummary';
import { track, useSegmentScreen } from '../../../common/store/api/track';
import { getConsumer } from '../../../common/store/consumer/selectors';
import { isConsumerProfileComplete } from '../../../common/store/consumer/validators';
import { showToast } from '../../../common/store/ui/actions';
import { screens } from '../../../common/styles';
import { t } from '../../../strings';
import { LoggedNavigatorParamList } from '../types';
import { P2POrderHeader } from './P2POrderHeader';
import P2POrderPager from './P2POrderPager';
import { P2POrderNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<P2POrderNavigatorParamList, 'CreateOrderP2P'>,
  StackNavigationProp<LoggedNavigatorParamList>
>;
type ScreenRouteProp = RouteProp<P2POrderNavigatorParamList, 'CreateOrderP2P'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ navigation, route }: Props) {
  // params
  const { params } = route;
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // redux store
  const consumer = useSelector(getConsumer)!;
  // state
  const { shouldVerifyPhone } = useProfileSummary();
  const { coords } = useLastKnownLocation();
  const [orderId, setOrderId] = React.useState<string>();
  const order = useObserveOrder(orderId)!;
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = React.useState(
    consumer.paymentChannel?.mostRecentPaymentMethodId
  );
  const [isLoading, setLoading] = React.useState(false);
  const [cpf, setCpf] = React.useState(consumer.cpf ?? '');
  const [wantsCpf, setWantsCpf] = React.useState(false);
  const { quotes, getOrderQuotes } = useQuotes(order?.id);
  const [selectedFare, setSelectedFare] = React.useState<Fare>();
  const canSubmit =
    selectedPaymentMethodId !== undefined &&
    selectedFare !== undefined &&
    !isLoading &&
    isEmpty(order?.route?.issue);
  // side effects
  // whenever quotes are updated
  // select first fare and subscribe to involved fleets updates
  React.useEffect(() => {
    if (!quotes || isEmpty(quotes)) return;
    setSelectedFare(quotes[0]);
  }, [quotes]);
  // getting the selected fare in the AvailableFleets screen;
  React.useEffect(() => {
    if (params?.returningFare) setSelectedFare(params.returningFare);
  }, [params?.returningFare]);
  // whenever route changes when interacting with other screens
  React.useEffect(() => {
    // console.log('CreateOrderP2P useEffect; params: ', params);
    if (params?.orderId) {
      setOrderId(params.orderId);
      navigation.setParams({
        orderId: undefined,
      });
    }
    if (params?.origin) {
      if (!order) {
        (async () => {
          try {
            setLoading(true);
            const newOrder = await api.order().createOrderP2P(consumer!, params.origin!);
            setLoading(false);
            setOrderId(newOrder.id);
          } catch (error: any) {
            // console.log(error);
            Sentry.Native.captureException(error);
            dispatch(showToast(error.toString(), 'error'));
          }
        })();
      } else if (orderId) {
        api.order().updateOrder(orderId, { origin: params.origin });
      }
      navigation.setParams({
        origin: undefined,
      });
    }
    if (order && orderId && params?.destination) {
      if (params.destination.address.description !== order.destination?.address.description) {
        api.order().updateOrder(orderId, { destination: params.destination });
      }
      navigation.setParams({
        destination: undefined,
      });
    }
    if (params?.paymentMethodId) {
      setSelectedPaymentMethodId(params?.paymentMethodId);
      navigation.setParams({
        paymentMethodId: undefined,
      });
    }
  }, [api, consumer, dispatch, navigation, order, orderId, params]);
  // if the order status becomes 'expired'
  React.useEffect(() => {
    if (!order) return;
    if (order.status === 'expired') navigation.navigate('MainNavigator', { screen: 'Home' });
  }, [order, navigation]);
  // tracking
  useSegmentScreen('CreateOrderP2P');
  // handlers
  // navigate to 'AddressComplete' to enter address
  const navigateToAddressComplete = React.useCallback(
    (returnParam: string, value?: Place) => {
      navigation.navigate('AddressComplete', {
        returnScreen: 'CreateOrderP2P',
        returnParam,
        value,
      });
    },
    [navigation]
  );
  // navigate to ProfileAddCard or ProfilePaymentMethods to add or select payment method
  const navigateToFillPaymentInfo = React.useCallback(() => {
    track('adding payment info');
    // if user has no payment method, go direct to 'AddCard' screen
    if (!isConsumerProfileComplete(consumer)) {
      const returnScreen = !selectedPaymentMethodId ? 'ProfileAddCard' : 'CreateOrderP2P';
      navigation.navigate('CommonProfileEdit', {
        returnScreen,
        returnNextScreen: 'CreateOrderP2P',
      });
    } else if (!selectedPaymentMethodId) {
      navigation.navigate('ProfileAddCard', { returnScreen: 'CreateOrderP2P' });
    } else {
      navigation.navigate('ProfilePaymentMethods', { returnScreen: 'CreateOrderP2P' });
    }
  }, [consumer, navigation, selectedPaymentMethodId]);
  // confirm order
  const placeOrderHandler = async (fleetId: string) => {
    track('placing order');
    if (!orderId) return;
    if (!selectedPaymentMethodId) return;
    if (!order.destination?.address) {
      dispatch(
        showToast(
          t(
            'Tivemos um problema... Por favor, refa??a o pedido e certifique-se que o endere??o de entrega est?? correto'
          ),
          'error'
        )
      );
    }
    if (shouldVerifyPhone) {
      navigation.navigate('PhoneVerificationScreen', {
        phone: consumer.phone!,
        countryCode: consumer.countryCode,
        returnScreen: 'CreateOrderP2P',
      });
      return;
    }
    if (wantsCpf) {
      if (!cpf) {
        dispatch(
          showToast(
            t(
              'Preencha o campo com o CPF para que ele seja adicionado na nota. Se n??o quer adicionar o CPF, desmarque a op????o'
            )
          )
        );
        return;
      }
    } else if (!cpfutils.isValid(cpf)) {
      dispatch(
        showToast(
          t('CPF preenchido incorretamente. Por favor confira o n??mero do seu documento'),
          'error'
        )
      );
      return;
    }
    try {
      setLoading(true);
      await api.order().placeOrder(
        orderId,
        fleetId,
        {
          payableWith: 'credit_card',
          paymentMethodId: selectedPaymentMethodId,
        },
        wantsCpf,
        coords
      );

      setLoading(false);
      navigation.replace('OngoingOrderNavigator', {
        screen: 'OngoingOrderConfirming',
        params: { orderId },
      });
    } catch (error: any) {
      console.warn(error.toString());
      dispatch(showToast(error.toString(), 'error'));
    }
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <P2POrderHeader order={order} />
      <P2POrderPager
        order={order}
        isLoading={isLoading}
        selectedPaymentMethodId={selectedPaymentMethodId}
        navigateToAddressComplete={navigateToAddressComplete}
        navigateToFillPaymentInfo={navigateToFillPaymentInfo}
        navigateFleetDetail={(fleetId: string) => {
          navigation.navigate('FleetDetail', { fleetId });
        }}
        navigateToTransportableItems={() => {
          navigation.navigate('TransportableItems');
        }}
        onSubmit={() => placeOrderHandler(selectedFare?.fleet?.id!)}
        navigateToPixPayment={(total, fleetId) => {
          navigation.navigate('PayWithPix', { orderId: orderId!, total, fleetId });
        }}
        navigateToAboutCharges={() => {
          navigation.navigate('AboutCharges');
        }}
        wantsCpf={wantsCpf}
        onSwitchValueChange={() => setWantsCpf(!wantsCpf)}
        cpf={cpf}
        setCpf={(text) => setCpf(text)}
        canSubmit={canSubmit}
        quotes={quotes}
        selectedFare={selectedFare}
        onFareSelect={(fare) => setSelectedFare(fare)}
        navigateToAvailableFleets={() =>
          navigation.navigate('AvailableFleets', {
            orderId: order.id,
            selectedFare: selectedFare!,
            returnScreen: 'CreateOrderP2P',
          })
        }
        onRetry={getOrderQuotes}
        total={selectedFare?.total ?? 0}
      />
    </View>
  );
}
