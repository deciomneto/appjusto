import React, { useState, ReactElement } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import fonts from '../../assets/fonts';
import icons from '../../assets/icons';

export interface Props {
  children: () => ReactElement;
}

export default function ({ children }: Props):ReactElement {
  const preloadAssets = async (): Promise<void> => {
    await Font.loadAsync(fonts);
    await Asset.loadAsync(icons);
  }
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  if (!assetsLoaded) {
    return (
      <AppLoading
        startAsync={preloadAssets}
        onFinish={() => {
          setAssetsLoaded(true);
        }}
      />
    );
  }

  return children();
}