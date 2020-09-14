import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';

import * as icons from '../../../assets/icons';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import FeedbackView from '../../../common/components/views/FeedbackView';
import { borders, colors } from '../../../common/styles';
import { t } from '../../../strings';
import { ApprovedParamList } from '../types';

type ScreenNavigationProp = StackNavigationProp<ApprovedParamList, 'MatchingFeedback'>;
type ScreenRouteProp = RouteProp<ApprovedParamList, 'MatchingFeedback'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};
export default ({ navigation, route }: Props) => {
  // handlers
  const popToTop = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  // UI
  return (
    <FeedbackView
      header={t('Esse pedido já foi aceito por outro entregador :(')}
      icon={icons.coneYellow}
    >
      <DefaultButton
        title={t('Voltar para o início')}
        onPress={popToTop}
        style={{ ...borders.default, borderColor: colors.black, backgroundColor: 'white' }}
      />
    </FeedbackView>
  );
};