import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEmpty } from 'lodash';
import React from 'react';
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from 'sentry-expo';
import { ApiContext, AppDispatch } from '../../../../../common/app/context';
import DefaultButton from '../../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../../common/components/containers/PaddedView';
import DefaultInput from '../../../../../common/components/inputs/DefaultInput';
import HR from '../../../../../common/components/views/HR';
import { track, useSegmentScreen } from '../../../../../common/store/api/track';
import { getCourier } from '../../../../../common/store/courier/selectors';
import { showToast } from '../../../../../common/store/ui/actions';
import { colors, halfPadding, padding, screens, texts } from '../../../../../common/styles';
import { formatCurrency, formatDistance } from '../../../../../common/utils/formatters';
import { t } from '../../../../../strings';
import { CourierProfileParamList } from '../types';
import FleetRule from './FleetRule';
import FleetSummary from './FleetSummary';
import GainSimulator from './GainSimulator';

type ScreenNavigationProp = StackNavigationProp<CourierProfileParamList, 'CreateFleet'>;
type ScreenRouteProp = RouteProp<CourierProfileParamList, 'CreateFleet'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ navigation, route }: Props) {
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // uncomment when platformParams.matching.minActiveCouriersInFleet gets published
  // const platformParams = usePlatformParamsContext();
  // redux store
  const courier = useSelector(getCourier)!;
  // screen state
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [distanceThreshold, setDistanceThreshold] = React.useState(5000);
  const [minimumFee, setMinimumFee] = React.useState(1000);
  const [additionalPerKmAfterThreshold, setAdditionalPerKmAfterThreshold] = React.useState(200);
  const [maxDistance, setMaxDistance] = React.useState(30000);
  const [maxDistanceToOrigin, setMaxDistanceToOrigin] = React.useState(15000);
  const [isLoading, setLoading] = React.useState(false);
  const canSubmit = !isEmpty(name) && !isEmpty(description);
  // refs
  const nameRef = React.useRef<TextInput>(null);
  const descriptionRef = React.useRef<TextInput>(null);
  // side effects
  // tracking
  useSegmentScreen('CreateFleet');
  // initial focus
  React.useEffect(() => {
    nameRef.current?.focus();
  }, []);
  // handlers
  const createFleetHandler = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const fleet = await api.fleet().createFleet({
        name,
        description,
        distanceThreshold,
        minimumFee,
        additionalPerKmAfterThreshold,
        maxDistance,
        maxDistanceToOrigin,
        situation: 'approved',
        createdBy: courier.id,
        participantsOnline: 0,
      });
      api.search().clearCache();
      track('courier created fleet');
      dispatch(showToast(t('Frota criada com sucesso!')));
      navigation.replace('FleetDetail', { fleetId: fleet.id });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Sentry.Native.captureException(error);
      dispatch(showToast(t('N??o foi poss??vel criar a frota.'), 'error'));
    }
  };
  // helper
  // uncomment when platformParams.matching.minActiveCouriersInFleet gets published
  // const participants =
  //   (platformParams?.matching.minActiveCouriersInFleet ?? 0) > 1
  //     ? 'participantes ativos'
  //     : 'participante ativo';
  // UI
  // uncomment when platformParams.matching.minActiveCouriersInFleet gets published
  // if (!platformParams) {
  //   return (
  //     <View style={screens.centered}>
  //       <ActivityIndicator size="large" color={colors.green500} />
  //     </View>
  //   );
  // }
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }} keyboardShouldPersistTaps="handled">
      <View style={{ ...screens.config }}>
        <PaddedView>
          <Text style={{ ...texts.x2l }}>{t('Criar nova frota')}</Text>
          {/* uncomment when platformParams.matching.minActiveCouriersInFleet gets published */}
          {/* <View style={{ marginBottom: halfPadding, marginTop: padding }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name="info" size={14} />
              <Text style={{ ...texts.md, marginLeft: halfPadding }}>{t('Importante')}</Text>
            </View>
            <Text style={{ ...texts.md, marginTop: 4 }}>{`${t('Apenas frotas com ')}${
              platformParams.matching.minActiveCouriersInFleet + ' ' + participants
            }${t(' naquele momento ir??o receber pedidos')}`}</Text>
          </View> */}
          <Text style={{ ...texts.sm, color: colors.grey700, marginVertical: halfPadding }}>
            {t('Preencha as informa????es da sua frota')}
          </Text>
          <DefaultInput
            ref={nameRef}
            style={{ marginBottom: 4 }}
            title={t('Nome')}
            placeholder={t('Nome da frota em at?? 36 caracteres')}
            value={name}
            returnKeyType="next"
            blurOnSubmit={false}
            maxLength={36}
            onChangeText={setName}
            onSubmitEditing={() => descriptionRef.current?.focus()}
          />
          <Text style={{ ...texts.xs, color: colors.grey700, marginBottom: padding }}>
            {name.length}/36 {t('caracteres')}
          </Text>
          <DefaultInput
            ref={descriptionRef}
            style={{ marginBottom: 4, height: 126 }}
            title={t('Descri????o')}
            placeholder={t('Descreva sua frota em at?? 140 caracteres')}
            value={description}
            maxLength={140}
            numberOfLines={3}
            returnKeyType="next"
            blurOnSubmit
            onChangeText={setDescription}
          />
          <Text style={{ ...texts.xs, color: colors.grey700, marginBottom: padding }}>
            {description.length}/140 {t('caracteres')}
          </Text>
          <View>
            <FleetRule
              title={t('Pagamento M??nimo')}
              onIncrease={() => setMinimumFee(minimumFee + 100)}
              onDecrease={() => setMinimumFee(minimumFee - 100)}
              value={formatCurrency(minimumFee)}
              description={t(
                'Defina o valor que os/as entregadores/as dessa frota receber??o ao percorrer a Dist??ncia Inicial M??nima.'
              )}
            />
            <FleetRule
              title={t('Dist??ncia Inicial M??nima')}
              onIncrease={() => setDistanceThreshold(distanceThreshold + 1000)}
              onDecrease={() => setDistanceThreshold(distanceThreshold - 1000)}
              value={formatDistance(distanceThreshold)}
              description={t(
                'Defina em Km a dist??ncia para o Pagamento M??nimo. Abaixo dessa dist??ncia, os/as entregadores/as dessa frota receber??o o Pagamento M??nimo. Acima dessa dist??ncia, os/as entregadores/as receber??o um Valor Adicional por Km Rodado.'
              )}
            />
            <FleetRule
              title={t('Valor Adicional por Km Rodado')}
              onIncrease={() =>
                setAdditionalPerKmAfterThreshold(additionalPerKmAfterThreshold + 10)
              }
              onDecrease={() =>
                setAdditionalPerKmAfterThreshold(additionalPerKmAfterThreshold - 10)
              }
              value={formatCurrency(additionalPerKmAfterThreshold)}
              description={t(
                'Defina o valor adicional que os/as entregadores/as dessa frota receber??o por Km ao percorrer uma dist??ncia acima da Dist??ncia Inicial M??nima.'
              )}
            />
            <FleetRule
              title={t('Dist??ncia M??xima para Entrega')}
              onIncrease={() => setMaxDistance(maxDistance + 1000)}
              onDecrease={() => setMaxDistance(maxDistance - 1000)}
              value={formatDistance(maxDistance)}
              description={t(
                'Defina em Km a dist??ncia m??xima que os/as entregadores/as dessa frota poder??o percorrer para fazer uma entrega. Pedidos recebidos com dist??ncia m??xima acima da definida n??o ser??o exibidos.'
              )}
            />
            <FleetRule
              title={t('Dist??ncia M??xima at?? a Origem')}
              onIncrease={() => setMaxDistanceToOrigin(maxDistanceToOrigin + 1000)}
              onDecrease={() => setMaxDistanceToOrigin(maxDistanceToOrigin - 1000)}
              value={formatDistance(maxDistanceToOrigin)}
              description={t(
                'Defina em Km a dist??ncia m??xima da posi????o atual at?? a origem do pedido que essa frota poder?? percorrer. Pedidos recebidos com origem acima da definida n??o ser??o exibidos.'
              )}
            />
          </View>
        </PaddedView>
        <FleetSummary
          minimumFee={minimumFee}
          distanceThreshold={distanceThreshold}
          maxDistance={maxDistance}
          maxDistanceToOrigin={maxDistanceToOrigin}
          additionalPerKmAfterThreshold={additionalPerKmAfterThreshold}
        />
        <View>
          <HR height={padding / 2} />
          <GainSimulator
            fee={minimumFee}
            distance={distanceThreshold}
            additional={additionalPerKmAfterThreshold}
          />
          <PaddedView>
            <DefaultButton
              style={{ marginTop: padding * 2 }}
              title={t('Confirmar cria????o da frota')}
              onPress={createFleetHandler}
              disabled={!canSubmit || isLoading}
              activityIndicator={isLoading}
            />
          </PaddedView>
        </View>
      </View>
    </ScrollView>
  );
}
