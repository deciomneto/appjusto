import { Card, Order } from 'appjusto-types';
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

import * as icons from '../../../../assets/icons';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import RoundedText from '../../../../common/components/texts/RoundedText';
import HR from '../../../../common/components/views/HR';
import PaddedView from '../../../../common/components/views/PaddedView';
import ShowIf from '../../../../common/components/views/ShowIf';
import { texts, colors, screens, padding, borders } from '../../../../common/styles';
import {
  formatDistance,
  formatDuration,
  formatCurrency,
} from '../../../../common/utils/formatters';
import { t } from '../../../../strings';
import OrderMap from './OrderMap';
import PlaceSummary from './PlaceSummary';

type Props = {
  order: Order;
  card: Card | null;
  waiting: boolean;
  editStepHandler: (index: number) => void;
  confirmOrder: (fleetId: string, platformFee: number) => void;
  navigateToFillPaymentInfo: () => void;
};

export default function ({
  order,
  card,
  waiting,
  editStepHandler,
  confirmOrder,
  navigateToFillPaymentInfo,
}: Props) {
  // context
  const { height } = Dimensions.get('window');
  const { origin, destination, distance, duration } = order;

  // state
  const [selectedFare, setSelectedFare] = useState(order.fare ?? order.quotes?.[0]);

  // effects

  // UI
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* show map if it was hidden on previous pages */}
      <ShowIf test={height < 700}>
        {() => (
          <View style={{ height: 160 }}>
            <OrderMap order={order} />
          </View>
        )}
      </ShowIf>
      <View style={{ flex: 1 }}>
        {/* origin, destination, distance, duration */}
        <PaddedView>
          <PlaceSummary
            title={t('Retirada')}
            place={origin}
            editStepHandler={() => editStepHandler(0)}
          />
          <PlaceSummary
            title={t('Entrega')}
            place={destination}
            editStepHandler={() => editStepHandler(1)}
          />

          <RoundedText>
            {`${formatDistance(distance)} \u25CF ${formatDuration(duration)}`}
          </RoundedText>
        </PaddedView>

        <HR height={padding} />

        {/* choose fare */}
        <PaddedView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...texts.medium, ...texts.bold }}>{t('Escolha a frota')}</Text>
            <Text style={{ ...texts.small }}>
              {order.quotes?.length ?? 0} {t('frotas ativas no momento')}
            </Text>
          </View>
          <Text style={{ ...texts.small, color: colors.darkGrey }}>
            {t(
              'Você pode escolher a frota que quiser para sua entrega. Frotas podem ter preços e características diferentes.'
            )}
          </Text>
          <FlatList
            data={order.quotes}
            keyExtractor={(item) => item.fleet.id}
            renderItem={({ item }) => {
              return (
                <View style={{ width: 156, ...borders.default }}>
                  <View style={{ backgroundColor: colors.lightGreen }}>
                    <Text style={[texts.default]}>{item.fleet.name}</Text>
                  </View>
                  <View>
                    <Text>{formatCurrency(item.total)}</Text>
                  </View>
                </View>
              );
            }}
            horizontal
          />
        </PaddedView>

        <HR height={padding} />

        {/* details */}
        <PaddedView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...texts.medium, ...texts.bold }}>{t('Valor total a pagar')}</Text>
            <Text style={{ ...texts.mediumToBig }}>{formatCurrency(selectedFare?.total ?? 0)}</Text>
          </View>
        </PaddedView>
      </View>

      <View style={{ ...screens.lightGrey, paddingVertical: 24 }}>
        <View>
          <Text style={{ ...texts.default }}>{t('Entenda os valores')}</Text>
          <Text style={{ ...texts.small, color: colors.darkGrey }}>
            {t('Somos transparentes do início ao fim da entrega')}
          </Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}
        >
          <Text style={{ ...texts.default, lineHeight: 21 }}>{t('Entregador')}</Text>
          <Text style={{ ...texts.default, lineHeight: 21 }}>
            {formatCurrency(selectedFare?.courierFee ?? 0)}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...texts.default, lineHeight: 21, color: colors.darkGrey }}>
            {t('Impostos')}
          </Text>
          <Text style={{ ...texts.default, lineHeight: 21, color: colors.darkGrey }}>
            {formatCurrency(selectedFare?.taxes ?? 0)}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...texts.default, lineHeight: 21, color: colors.darkGrey }}>
            {t('Tarifa financeira')}
          </Text>
          <Text style={{ ...texts.default, lineHeight: 21, color: colors.darkGrey }}>
            {formatCurrency(selectedFare?.financialFee ?? 0)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <Text style={{ ...texts.default, lineHeight: 21 }}>{t('AppJusto')}</Text>
          <Text style={{ ...texts.default, lineHeight: 21 }}>
            {formatCurrency(selectedFare?.platformFee ?? 0)}
          </Text>
        </View>
        <Text style={{ ...texts.small, lineHeight: 19, color: colors.darkGrey }}>
          O AppJusto cobra menos para ser mais justo com todos. Você pode aumentar a sua
          contribuição se desejar.
        </Text>
      </View>

      <ShowIf test={!!card}>
        {() => (
          <TouchableOpacity onPress={() => navigateToFillPaymentInfo()}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{t('Forma de pagamento')}</Text>
                <Image style={{ width: 32, height: 32 }} source={icons.edit} />
              </View>
              <Text>{t(`Cartão de crédito: **** ${card!.lastFourDigits}`)}</Text>
            </View>
          </TouchableOpacity>
        )}
      </ShowIf>

      <ShowIf test={!card}>
        {() => (
          <DefaultButton
            style={{ width: '100%' }}
            title={t('Incluir forma de pagamento')}
            onPress={navigateToFillPaymentInfo}
          />
        )}
      </ShowIf>

      <DefaultButton
        title={t('Fazer pedido')}
        onPress={() => confirmOrder(selectedFare?.fleet?.id!, 100)}
        disabled={!card || waiting}
        activityIndicator={waiting}
      />
    </ScrollView>
  );
}