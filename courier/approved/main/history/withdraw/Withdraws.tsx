import { Feather, Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { ApiContext, AppDispatch } from '../../../../../common/app/context';
import DefaultButton from '../../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../../common/components/containers/PaddedView';
import { useTotalWithdrawsThisMonth } from '../../../../../common/store/api/courier/account/useTotalWithdrawsThisMonth';
import { getCourier } from '../../../../../common/store/courier/selectors';
import { showToast } from '../../../../../common/store/ui/actions';
import {
  borders,
  colors,
  halfPadding,
  padding,
  screens,
  texts,
} from '../../../../../common/styles';
import { formatDate } from '../../../../../common/utils/formatters';
import { t } from '../../../../../strings';
import { convertBalance } from '../MarketplaceAccountInfo';
import { DeliveriesNavigatorParamList } from '../types';

type ScreenNavigationProp = StackNavigationProp<DeliveriesNavigatorParamList, 'Withdraws'>;
type ScreenRoute = RouteProp<DeliveriesNavigatorParamList, 'Withdraws'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRoute;
};

export const Withdraws = ({ navigation, route }: Props) => {
  // params
  const { info } = route.params;
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // redux
  const courier = useSelector(getCourier)!;
  // state
  const [withdrawing, setWithdrawing] = React.useState(false);
  // helpers
  const availableForWithdraw = info ? convertBalance(info.balance_available_for_withdraw) : 0;
  const minimum = 5;
  const withdrawsThisMonth = useTotalWithdrawsThisMonth(courier.id);
  const lastDayofThisMonth = dayjs().endOf('month').format('DD/MM/YYYY');
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const firstDayNextMonth = formatDate(firstDay);
  // handler
  const withdrawHandler = async () => {
    if (!availableForWithdraw) return;
    setWithdrawing(true);
    try {
      const result = await api.courier().requestWithdraw(courier.id, availableForWithdraw);
      // console.log(result);
      setWithdrawing(false);
      navigation.replace('RequestWithdrawFeedback', {
        header: t('Requisi????o realizada com sucesso!'),
        description: t('O valor ser?? transferido para sua conta em at?? 1 dia ??til.'),
      });
    } catch (error) {
      console.log(error);
      Sentry.Native.captureException(error);
      dispatch(showToast('N??o foi poss??vel realizar a requisi????o. Tente novamente.', 'error'));
      setWithdrawing(false);
    }
  };
  //UI
  return (
    <ScrollView
      style={{ ...screens.config }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <PaddedView style={{ flex: 1 }}>
        <Text style={{ ...texts.sm }}>
          {t(
            'O AppJusto n??o fica com nada do valor do seu trabalho. Todas os pagamentos s??o processados com seguran??a pela operadora financeira Iugu.'
          )}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: padding,
            marginTop: 24,
          }}
        >
          <Feather name="info" size={14} />
          <Text style={{ ...texts.md, marginLeft: halfPadding }}>{t('Como funciona')}</Text>
        </View>
        <Text style={{ ...texts.sm, paddingBottom: halfPadding }}>
          {t(
            'Voc?? tem direito a 4 saques gr??tis a cada 30 dias. O valor m??nimo para transfer??ncia ?? de R$5,00. Recomendamos que fa??a 1 saque por semana. Dessa forma, durante o per??odo de 30 dias, voc?? consegue sacar sem taxas adicionais. Caso precise de mais saques dentro desse mesmo per??odo, ser?? cobrada uma taxa de R$2,00 por saque adicional. Para solicitar saques adicionais, entre em contato com nosso suporte.'
          )}
        </Text>
        <PaddedView
          style={{
            marginTop: padding,
            ...borders.default,
            borderColor: colors.white,
            backgroundColor: colors.white,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.black} />
              <Text
                style={{
                  ...texts.sm,
                  marginLeft: halfPadding,
                  paddingBottom: 2,
                }}
              >
                {t('Dispon??vel para saque')}
              </Text>
            </View>
            {info === undefined ? (
              <ActivityIndicator
                style={{ marginVertical: 6 }}
                size="large"
                color={colors.green500}
              />
            ) : (
              <Text style={{ ...texts.x4l }}>{info.balance_available_for_withdraw}</Text>
            )}
            {withdrawsThisMonth === undefined ? (
              <ActivityIndicator
                style={{ marginVertical: 6 }}
                size="small"
                color={colors.green500}
              />
            ) : withdrawsThisMonth < 4 ? (
              <Text
                style={{
                  ...texts.xs,
                  color: colors.grey700,
                  paddingTop: halfPadding,
                  textAlign: 'center',
                }}
              >
                {t('Voc?? possui')} {4 - withdrawsThisMonth} {t('saques gr??tis at??')}{' '}
                {lastDayofThisMonth}
              </Text>
            ) : (
              <Text
                style={{
                  ...texts.xs,
                  color: colors.red,
                  paddingTop: halfPadding,
                  textAlign: 'center',
                }}
              >
                {t('Voc?? n??o possui mais saques gr??tis dispon??veis. Espere at?? o dia ')}
                {firstDayNextMonth}{' '}
                {t(
                  'para renovar seus 4 saques gr??tis, ou entre em contato com nosso suporte e solicite um saque adicional.'
                )}
              </Text>
            )}
          </View>
        </PaddedView>
        <View style={{ flex: 1 }} />
        <DefaultButton
          style={{ marginTop: padding }}
          title={t('Confirmar transfer??ncia')}
          activityIndicator={withdrawing}
          disabled={
            availableForWithdraw < minimum ||
            withdrawing ||
            withdrawsThisMonth === undefined ||
            withdrawsThisMonth >= 4
          }
          onPress={withdrawHandler}
        />
      </PaddedView>
    </ScrollView>
  );
};
