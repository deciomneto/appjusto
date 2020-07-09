import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DefaultInput from '../../common/DefaultInput';

import * as fonts from '../../../assets/fonts';
import { t } from '../../../strings';
import { colors } from '../../common/styles';
import { checkboxActive, checkboxInactive } from '../../../assets/icons';

const ConsumerRegister = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerBigText}>
        <Text style={styles.bigText}>{t('soon')}</Text>
      </View>
      <View style={styles.containerMediumText}>
        <Text style={styles.mediumText}>
          {t(
            'E fique tranquilo: todos os seus dados estarão protegidos conosco.'
          )}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <DefaultInput title={t('Nome')} placeholder={t('Qual o seu nome?')} />
      </View>
      <View style={styles.inputContainer}>
        <DefaultInput
          title={t('Sobrenome')}
          placeholder={t('Qual o seu sobrenome?')}
        />
      </View>
      <View style={styles.inputContainer}>
        <DefaultInput
          title={t('Celular')}
          placeholder={t('Qual o seu número?')}
        />
      </View>
      <View style={styles.inputContainer}>
        <DefaultInput
          title={t('E-mail')}
          placeholder={t('Qual o seu email?')}
        />
      </View>
      <View style={styles.checkContainer}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <Image
            source={isChecked ? { checkboxActive } : { checkboxInactive }}
            style={styles.image}
          />
        </TouchableOpacity>

        <Text style={styles.checkText}>
          {t('Aceito os termos de uso e a política de privacidade')}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  containerBigText: {
    width: '90%',
    height: 58,
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 16,
  },
  bigText: {
    fontSize: 24,
    lineHeight: 29,
    color: '#000',
    fontFamily: fonts.BarlowMedium,
  },
  containerMediumText: {
    width: '85%',
    height: 40,
    alignItems: 'flex-start',
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 32,
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 1,
  },
  mediumText: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.darkGrey,
    fontFamily: fonts.BarlowMedium,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  checkContainer: {
    width: '100%',
    marginHorizontal: 16,
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
  },
  checkText: {
    fontFamily: fonts.BarlowMedium,
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 8,
  },
  image: {
    height: 24,
    width: 24,
  },
});

export default ConsumerRegister;
