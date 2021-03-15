import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ApiContext } from '../../../../common/app/context';
import PaddedView from '../../../../common/components/containers/PaddedView';
import useLastKnownLocation from '../../../../common/hooks/useLastKnownLocation';
import { IconMotocycle } from '../../../../common/icons/icon-motocycle';
import HomeCard from '../../../../common/screens/home/cards/HomeCard';
import HomeOngoingDeliveries from '../../../../common/screens/home/cards/HomeOngoingDeliveries';
import HomeShareCard from '../../../../common/screens/home/cards/HomeShareCard';
import { getOrders } from '../../../../common/store/order/selectors';
import { colors, padding, screens } from '../../../../common/styles';
import { t } from '../../../../strings';
import { OrderItemModal } from '../../common/order-summary/OrderItemModal';
import { LoggedNavigatorParamList } from '../../types';
import { MainNavigatorParamList } from '../types';
import { HomeControls } from './controls/HomeControls';

type ScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainNavigatorParamList, 'Home'>,
  StackNavigationProp<LoggedNavigatorParamList>
>;
type Props = {
  navigation: ScreenNavigationProp;
};

export default function ({ navigation }: Props) {
  // context
  const api = React.useContext(ApiContext);
  // redux store
  const ongoingOrders = useSelector(getOrders);
  // state
  const { coords, permissionResponse } = useLastKnownLocation();
  const [availableCouriers, setAvailableCouriers] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  // side effects
  // request location permission
  React.useEffect(() => {
    if (permissionResponse?.status === Location.PermissionStatus.DENIED) {
      navigation.navigate('PermissionDenied', {
        title: t('Precisamos acessar sua localização'),
        subtitle: t(
          'Para que possamos determinar o trajeto com precisão, precisamos que você dê acesso ao AppJusto para usar sua localização.'
        ),
      });
    }
  }, [permissionResponse]);
  // fetch total couriers
  const fetchTotalCouriersNearby = async () => {
    if (!coords) return;
    const { total } = await api.courier().fetchTotalCouriersNearby(coords);
    setAvailableCouriers(total);
  };
  React.useEffect(() => {
    navigation.addListener('focus', fetchTotalCouriersNearby);
    return () => navigation.removeListener('focus', fetchTotalCouriersNearby);
  });
  React.useEffect(() => {
    fetchTotalCouriersNearby();
  }, [coords]);
  // UI
  return (
    <SafeAreaView style={[screens.default]}>
      {/* <StatusBar /> */}
      <ScrollView>
        <HomeControls
          onStartOrderPress={(type) => {
            if (type === 'p2p') {
              navigation.navigate('P2POrderNavigator', { screen: 'CreateOrderP2P' });
            } else {
              navigation.navigate('FoodOrderNavigator', { screen: 'FoodOrderHome' });
            }
          }}
        />
        <PaddedView>
          <HomeOngoingDeliveries
            orders={ongoingOrders}
            onSelect={(order, openChat) =>
              navigation.navigate('OngoingOrderNavigator', {
                screen: 'OngoingOrder',
                params: {
                  orderId: order.id,
                  newMessage: openChat,
                },
              })
            }
          />
          <View>
            <HomeCard
              icon={<IconMotocycle circleColor={colors.grey50} width={64} height={64} />}
              title={`${availableCouriers} ${t('entregadores disponíveis')}`}
              subtitle={t(`num raio de 15km`)}
            />
          </View>
          <View style={{ marginTop: padding }}>
            <HomeShareCard
              title="Divulgue o AppJusto"
              subtitle="Compartilhe esse movimento por uma economia mais justa."
            />
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <OrderItemModal modalVisible={modalVisible} />
            <Text>SHOW MODAL</Text>
          </TouchableOpacity>
        </PaddedView>
      </ScrollView>
    </SafeAreaView>
  );
}
