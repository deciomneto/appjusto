import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CheckField from '../../../../common/components/buttons/CheckField';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../common/components/containers/PaddedView';
import SingleHeader from '../../../../common/components/texts/SingleHeader';
import HR from '../../../../common/components/views/HR';
import { colors, halfPadding, padding, screens, texts } from '../../../../common/styles';
import { t } from '../../../../strings';
import { PaymentNavigatorParamList } from './types';

type ScreenNavigationProp = StackNavigationProp<PaymentNavigatorParamList, 'AntecipatePayment'>;
type ScreenRoute = RouteProp<PaymentNavigatorParamList, 'AntecipatePayment'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRoute;
};

export const AntecipatePayment = ({ navigation, route }) => {
  // screen state
  const [agreed, setAgreed] = React.useState(false);
  return (
    <ScrollView style={{ ...screens.default }}>
      <PaddedView>
        <Text style={{ ...texts.xl }}>{t('Taxa de adiantamento')}</Text>
        <Text style={{ ...texts.md, color: colors.grey700, marginTop: padding }}>
          <Text style={{ color: colors.red }}>{t('Atenção: ')}</Text>
          {t(
            'para realizar o adiantamento será cobrada uma taxa de 2,5% sobre o valor ainda não compensado.'
          )}
        </Text>
      </PaddedView>
      <HR height={padding} color={colors.grey90} />
      <View style={{ paddingTop: halfPadding }}>
        <SingleHeader title={t('Entenda os valores')} />
        <Text
          style={{ ...texts.xs, color: colors.grey700, paddingHorizontal: padding, paddingTop: 12 }}
        >
          {t('Veja os descontos do seu adiantamento')}
        </Text>
        <PaddedView>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ ...texts.sm }}>{t('Disponível para saque')}</Text>
            <Text style={{ ...texts.sm }}>{t('R$ 1.529,00')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 2,
            }}
          >
            <Text style={{ ...texts.sm }}>{t('Valor para adiantamento')}</Text>
            <Text style={{ ...texts.sm }}>{t('R$ 329,00')}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ ...texts.sm, color: colors.grey700 }}>
              {t('Taxa de adiantamento (2,5%')}
            </Text>
            <Text style={{ ...texts.sm, color: colors.red }}>{t('-R$ 8,23')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 2,
            }}
          >
            <Text style={{ ...texts.sm, color: colors.grey700 }}>
              {t('Tarifa de transferência')}
            </Text>
            <Text style={{ ...texts.sm, color: colors.red }}>{t('-R$ 2,00')}</Text>
          </View>
        </PaddedView>
      </View>
      <HR height={padding} color={colors.grey90} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: padding,
          paddingVertical: halfPadding,
        }}
      >
        <SingleHeader title={t('Total com descontos')} />
        <Text style={{ ...texts.xl }}>{t('R$ 1847,77')}</Text>
      </View>
      <HR height={padding} color={colors.grey90} />
      <View style={{ paddingTop: halfPadding }}>
        <SingleHeader title={t('Dados bancários')} />
        <Text
          style={{ ...texts.xs, color: colors.grey700, paddingHorizontal: padding, paddingTop: 12 }}
        >
          {t('Confirme seus dados bancários para transferência')}
        </Text>
        <PaddedView>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ ...texts.sm }}>{t('CNPJ')}</Text>
            <Text style={{ ...texts.sm }}>{t('000.000.000/000-00')}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ ...texts.sm }}>{t('Banco')}</Text>
            <Text style={{ ...texts.sm }}>{t('Nome do Banco')}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ ...texts.sm }}>{t('Agência')}</Text>
            <Text style={{ ...texts.sm }}>{t('0000')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 12,
            }}
          >
            <Text style={{ ...texts.sm }}>{t('Conta')}</Text>
            <Text style={{ ...texts.sm }}>{t('00000-0')}</Text>
          </View>
          <HR />
          {/* TODO: this should navigate to ProfileBank and return */}
          <TouchableOpacity style={{ paddingTop: 12 }} onPress={() => null}>
            <Text style={{ ...texts.sm, color: colors.green600 }}>
              {t('Alterar dados bancários')}
            </Text>
          </TouchableOpacity>
        </PaddedView>
        <HR height={padding} color={colors.grey90} />
        <PaddedView>
          <CheckField
            text={t('Estou ciente do valor descontado')}
            onPress={() => setAgreed(!agreed)}
            checked={agreed}
          />
          <DefaultButton
            title={t('Solicitar transferência com adiantamento')}
            style={{ marginTop: 24 }}
            onPress={() => null}
            disabled={!agreed}
          />
        </PaddedView>
      </View>
    </ScrollView>
  );
};
