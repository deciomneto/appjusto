import { Order, WithId } from '@appjusto/types';
import React from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import * as icons from '../../../assets/icons';
import { borders, colors, halfPadding } from '../../../common/styles';
import { getNavigationLinkTo, NavigationApp } from './navigation';

interface Props {
  order: WithId<Order>;
}

export const RouteIcons = ({ order }: Props) => {
  const routeHandler = (app: NavigationApp) => {
    const dispatchingState = order?.dispatchingState;
    let location = undefined;
    if (dispatchingState === 'going-pickup') {
      location = order.origin?.location;
    } else if (dispatchingState === 'arrived-pickup' || dispatchingState === 'going-destination') {
      location = order.destination?.location;
    }
    Linking.openURL(getNavigationLinkTo(app, location));
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        top: halfPadding,
        right: halfPadding,
      }}
    >
      <TouchableOpacity onPress={() => routeHandler('google-maps')}>
        <View
          style={{
            height: 64,
            width: 64,
            ...borders.default,
            borderRadius: 32,
            borderColor: colors.black,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey500,
          }}
        >
          <Image source={icons.googleMaps} height={29} width={29} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => routeHandler('waze')}>
        <View
          style={{
            height: 64,
            width: 64,
            ...borders.default,
            borderRadius: 32,
            borderColor: colors.black,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 24,
            backgroundColor: colors.grey500,
          }}
        >
          <Image source={icons.waze} height={32} width={29} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
