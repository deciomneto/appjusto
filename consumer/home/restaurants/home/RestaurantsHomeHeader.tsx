import { Cuisine, WithId } from 'appjusto-types';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { halfPadding } from '../../../../common/styles';
import { t } from '../../../../strings';
import CuisineSelector from '../components/CuisineSelector';
import DoubleHeader from '../components/DoubleHeader';
import LocationBar from '../components/LocationBar';
import RestaurantSearchBar from './RestaurantSearchButton';

type Props = {
  isLoading: boolean;
  onLocationPress: () => void;
  onSearchPress: () => void;
  onCuisineSelect: (cuisine: WithId<Cuisine>) => void;
};

export default function ({ isLoading, onLocationPress, onSearchPress, onCuisineSelect }: Props) {
  // if (isLoading) {
  //   return (
  //     <View style={screens.centered}>
  //       <ActivityIndicator size="large" color={colors.green} />
  //     </View>
  //   );
  // }
  return (
    <View>
      <TouchableWithoutFeedback onPress={onLocationPress}>
        <View style={{ paddingTop: 12, paddingHorizontal: 12 }}>
          <LocationBar />
        </View>
      </TouchableWithoutFeedback>
      {/* search */}
      <DoubleHeader
        title={t('Buscar')}
        subtitle={t('Então vai direto no seu prato ou restaurante preferido')}
      />
      <View style={{ marginTop: 24, paddingHorizontal: 12, marginBottom: halfPadding }}>
        <TouchableWithoutFeedback onPress={onSearchPress}>
          <View>
            <RestaurantSearchBar />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* by cuisine */}
      <CuisineSelector onSelect={(cuisine) => onCuisineSelect(cuisine)} />
    </View>
  );
}
