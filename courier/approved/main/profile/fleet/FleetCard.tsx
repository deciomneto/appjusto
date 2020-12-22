import { Fleet } from 'appjusto-types';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import DefaultButton from '../../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../../common/components/containers/PaddedView';
import RoundedText from '../../../../../common/components/texts/RoundedText';
import { getUIBusy } from '../../../../../common/store/ui/selectors';
import { borders, colors, padding, texts } from '../../../../../common/styles';
import { formatCurrency, formatDistance } from '../../../../../common/utils/formatters';
import { t } from '../../../../../strings';

type Props = {
  fleet: Fleet;
  selected: boolean;
  onSelect: () => void;
  onConfirm: () => void;
};

export default function ({ fleet, selected, onSelect, onConfirm }: Props) {
  // app state
  const busy = useSelector(getUIBusy);

  // UI
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <PaddedView
        style={[
          {
            ...borders.default,
            backgroundColor: colors.white,
          },
          selected
            ? {
                borderWidth: 2,
                borderColor: colors.green,
              }
            : null,
        ]}
      >
        <View>
          <Text style={{ ...texts.default }}>{fleet.name}</Text>
          <Text style={{ ...texts.small, marginTop: 4, color: colors.darkGreen }}>
            {fleet.participantsOnline} {t('participantes online')}
          </Text>
          <Text
            style={{
              ...texts.small,
              marginTop: 12,
              // height: 54,
              color: colors.darkGrey,
              marginBottom: 20,
            }}
          >
            {fleet.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ ...texts.small }}>{t('Pagamento Mínimo')}</Text>
            <RoundedText>{formatCurrency(fleet.minimumFee)}</RoundedText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ ...texts.small }}>{t('Distância Inicial Mínima')}</Text>
            <RoundedText>{formatDistance(fleet.distanceThreshold)}</RoundedText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ ...texts.small }}>{t('Valor Adicional por Km rodado')}</Text>
            <RoundedText>{formatCurrency(fleet.additionalPerKmAfterThreshold)}</RoundedText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ ...texts.small, color: colors.darkGrey }}>
              {t('Distância Máxima para Entrega')}
            </Text>
            <RoundedText color={colors.darkGrey} backgroundColor={colors.lightGrey} noBorder>
              {formatDistance(fleet.maxDistance)}
            </RoundedText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ ...texts.small, color: colors.darkGrey }}>
              {t('Distância Máxima até a Origem')}
            </Text>
            <RoundedText color={colors.darkGrey} backgroundColor={colors.lightGrey} noBorder>
              {formatDistance(fleet.maxDistanceToOrigin)}
            </RoundedText>
          </View>
        </View>
        <DefaultButton
          style={{ marginTop: padding }}
          title={t('Ingressar nessa frota')}
          onPress={onConfirm}
          disabled={!selected}
          activityIndicator={busy && selected}
          secondary={!selected}
        />
      </PaddedView>
    </TouchableWithoutFeedback>
  );
}
