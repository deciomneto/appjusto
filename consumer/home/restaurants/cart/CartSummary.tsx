import { StackNavigationProp } from '@react-navigation/stack';
import { Fare } from 'appjusto-types';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ApiContext, AppDispatch } from '../../../../common/app/context';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import { HorizontalSelectItem } from '../../../../common/components/buttons/HorizontalSelect';
import PaddedView from '../../../../common/components/containers/PaddedView';
import GrayLine from '../../../../common/components/views/GrayLine';
import HR from '../../../../common/components/views/HR';
import useObserveOrder from '../../../../common/store/api/order/hooks/useObserveOrder';
import { getAvailableFleets } from '../../../../common/store/fleet/selectors';
import { getOrderQuotes } from '../../../../common/store/order/actions';
import { getUIBusy } from '../../../../common/store/ui/selectors';
import { colors, halfPadding, padding, screens, texts } from '../../../../common/styles';
import { formatCurrency } from '../../../../common/utils/formatters';
import { t } from '../../../../strings';
import ChargesBox from '../../components/ChargesBox';
import PlaceSummary from '../../orders/p2p-order/PlaceSummary';
import AddInfo from '../components/AddInfo';
import SingleHeader from '../SingleHeader';
import { RestaurantsNavigatorParamList } from '../types';

type ScreenNavigationProp = StackNavigationProp<RestaurantsNavigatorParamList, 'CartSummary'>;

const platformFeeOptions: HorizontalSelectItem[] = [
  { id: '1', title: formatCurrency(100), data: 100 },
  { id: '3', title: formatCurrency(300), data: 300 },
  { id: '5', title: formatCurrency(500), data: 500 },
  { id: '8', title: formatCurrency(800), data: 800 },
  { id: '10', title: formatCurrency(1000), data: 1000 },
];

export default function () {
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // app state
  const { order } = useObserveOrder('uVL0MUCzNtCUy6mMvV1F');
  // const { origin, destination } = order!;
  // const { distance, duration } = order!.route;
  const busy = useSelector(getUIBusy);
  const availableFleets = useSelector(getAvailableFleets) ?? [];
  //state
  const [info, setInfo] = React.useState<string>('');
  const [quotes, setQuotes] = React.useState<Fare[]>([]);
  const [selectedFare, setSelectedFare] = React.useState<Fare>(quotes[0]);
  const [platformFee, setPlatformFee] = React.useState(platformFeeOptions[0]);
  console.log(order);

  //side effects
  // update quotes
  useEffect(() => {
    getOrderQuotesHandler();
  }, []);

  // handlers
  const getOrderQuotesHandler = useCallback(async () => {
    (async () => {
      setQuotes([]);
      // try {
      setQuotes((await dispatch(getOrderQuotes(api)('uVL0MUCzNtCUy6mMvV1F'))) ?? undefined);
      // } catch (error) {}
    })();
  }, [order]);

  // UI
  if (!order) {
    return (
      <View style={screens.centered}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }
  return (
    <ScrollView style={{ ...screens.default }}>
      {/* destination */}
      <PaddedView>
        <PlaceSummary
          title={t('Entregar em')}
          place={t('Rua Teodoro Sampaio, 198')} // expects a different type
          editStepHandler={() => null}
        />
      </PaddedView>
      <HR height={padding} />
      {/* restaurant and items ordered */}
      <SingleHeader title="Nome do restaurante" />
      <View style={{ marginBottom: padding }}>
        <TouchableOpacity onPress={() => null}>
          <Text style={{ ...texts.default, color: colors.darkGreen, padding }}>
            {t('Adicionar mais itens')}
          </Text>
          <GrayLine />
        </TouchableOpacity>
      </View>
      <AddInfo value={info} onAddInfo={setInfo} />
      <HR height={padding} />
      {/* details */}
      <ChargesBox
        selectedFare={selectedFare!}
        platformFee={platformFee}
        platformFeeOptions={platformFeeOptions}
        onContribution={setPlatformFee}
      />
      <HR height={padding} />
      <View
        style={{
          marginTop: halfPadding,
          paddingRight: padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SingleHeader title="Valor total a pagar" />
        <Text style={{ ...texts.mediumToBig }}>
          {formatCurrency((selectedFare?.total ?? 0) + platformFee.data)}
        </Text>
      </View>
      <Text
        style={{
          ...texts.small,
          color: colors.darkGrey,
          marginVertical: padding,
          paddingHorizontal: padding,
        }}
      >
        {t(
          'Você poderá deixar uma Caixinha de gorjeta para o entregador quando o seu pedido for entregue.'
        )}
      </Text>
      <HR height={padding} />
      <PaddedView>
        <DefaultButton
          title={t('Finalizar cadastro e adicionar pagamento')}
          onPress={() => null}
          secondary
        />
        <DefaultButton
          style={{ marginTop: padding }}
          title={t('Confirmar pedido')}
          onPress={() => null}
        />
      </PaddedView>
    </ScrollView>
  );
}