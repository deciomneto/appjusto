import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { halfPadding, texts } from '../../styles';
import Pill from '../views/Pill';

interface Props extends ViewProps {
  title: string;
  textTransform?: 'none' | 'capitalize';
}

export default function ({ title, style, textTransform = 'none' }: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: halfPadding,
          // maxWidth: '90%',
        },
        style,
      ]}
    >
      <Pill />
      <Text
        style={{
          ...texts.md,
          ...texts.bold,
          marginLeft: 12,
          textTransform,
          flexWrap: 'wrap',
        }}
      >
        {title}
      </Text>
    </View>
  );
}
