import { ReviewTag, ReviewType } from '@appjusto/types';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import PaddedView from '../../../../common/components/containers/PaddedView';
import { borders, colors, halfPadding, padding, texts } from '../../../../common/styles';
import { t } from '../../../../strings';
import { MultiTagSelector } from './MultiTagSelector';

type Props = {
  title: string;
  iconUnicode: number;
  review: ReviewType | undefined;
  tags: ReviewTag[] | undefined;
  selectedTags: ReviewTag[];
  disabled?: boolean;
  onReviewChange: (type: ReviewType) => void;
  onTagsChange: (tags: ReviewTag[]) => void;
};

export const ThumbSelector = ({
  title,
  iconUnicode,
  review,
  tags,
  selectedTags,
  disabled,
  onReviewChange,
  onTagsChange,
}: Props) => {
  return (
    <PaddedView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...texts.xl }}>{String.fromCodePoint(iconUnicode)}</Text>
          <Text style={{ ...texts.xl, marginLeft: halfPadding }}>{t(title)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (!disabled) onReviewChange('positive');
            }}
          >
            <View
              style={{
                height: 64,
                width: 64,
                ...borders.default,
                borderRadius: 32,
                borderColor: colors.green500,
                backgroundColor: review === 'positive' ? colors.green500 : colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="thumbs-up" size={24} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!disabled) onReviewChange('negative');
            }}
          >
            <View
              style={{
                height: 64,
                width: 64,
                ...borders.default,
                borderRadius: 32,
                borderColor: colors.green500,
                marginLeft: padding,
                backgroundColor: review === 'negative' ? colors.red : colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="thumbs-down" size={24} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {review ? (
        <View style={{ marginTop: padding }}>
          <MultiTagSelector
            tags={tags}
            disabled={disabled}
            selectedTags={selectedTags}
            onChange={onTagsChange}
          />
        </View>
      ) : null}
    </PaddedView>
  );
};
