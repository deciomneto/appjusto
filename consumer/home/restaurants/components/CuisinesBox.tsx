import { Cuisine } from 'appjusto-types';
import React from 'react';
import { View } from 'react-native';
import RoundedText from '../../../../common/components/texts/RoundedText';
import { useCuisineImageURI } from '../../../../common/store/api/platform/hooks/useCuisineImageURI';
import { halfPadding } from '../../../../common/styles';
import { t } from '../../../../strings';
import { ListItemImage } from './ListItemImage';

type Props = {
  cuisine: Cuisine;
};

export default function ({ cuisine }: Props) {
  const { data: imageURI } = useCuisineImageURI(cuisine.imagePath);
  return (
    <View style={{ height: 96, width: 96, borderRadius: 8, marginRight: halfPadding }}>
      <ListItemImage uri={imageURI} size={96} />
      <View style={{ position: 'absolute', left: 4, bottom: 4 }}>
        <RoundedText>{t(cuisine.name)}</RoundedText>
      </View>
    </View>
  );
}
