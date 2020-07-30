import React, { useState } from 'react';
import { View, Platform, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';

import DefaultInput from '../../common/DefaultInput';
import DefaultButton from '../../common/DefaultButton';

import CheckField from '../../common/CheckField';
import { t } from '../../../strings';
import { colors, texts } from '../../common/styles';
import { checkboxActive, checkboxInactive } from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const ConsumerRegistration = () => {
  // context
  const navigation = useNavigation();

  // state
  const [acceptedTerms, setAcceptTerms] = useState(false);
  const [acceptedMarketing, setAcceptMarketing] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.lightGrey }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerBigText}>
        <Text style={{ ...texts.big }}>
          {t('Assim que sua conta for criada você já poderá fazer pedidos.')}
        </Text>
      </View>
      <View style={styles.containerMediumText}>
        <Text style={{ ...texts.default, color: colors.darkGrey }}>
          {t('E fique tranquilo: todos os seus dados estarão protegidos conosco.')}
        </Text>
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
        <DefaultInput title={t('Nome')} placeholder={t('Qual o seu nome?')} />
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
        <DefaultInput title={t('Sobrenome')} placeholder={t('Qual o seu sobrenome?')} />
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
        <DefaultInput title={t('Celular')} placeholder={t('Qual o seu número?')} />
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
        <DefaultInput title={t('E-mail')} placeholder={t('Qual o seu email?')} />
      </View>
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <CheckField
          marginTop={12}
          source={acceptedTerms ? checkboxActive : checkboxInactive}
          onPress={() => setAcceptTerms(!acceptedTerms)}
          text={t('Aceito os termos de uso e a política de privacidade')}
        />
        <CheckField
          marginTop={12}
          source={acceptedMarketing ? checkboxActive : checkboxInactive}
          onPress={() => setAcceptMarketing(!acceptedMarketing)}
          text={t('Aceito receber comunicações e ofertas')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          disabled
          title={t('Ler termos de uso')}
          onPress={() => navigation.navigate('Terms')}
        />
        <DefaultButton wide title={t('Cadastrar')} onPress={() => navigation.replace('Logged')} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerBigText: {
    width: '90%',
    height: 58,
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 16,
  },
  containerMediumText: {
    width: '85%',
    height: 40,
    alignItems: 'flex-start',
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  checkContainer: {
    width: '100%',
    marginHorizontal: 16,
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 32,
    height: 48,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default ConsumerRegistration;