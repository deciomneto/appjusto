import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import BackButton from '../common/BackButton';
import AuthContainer from '../app/AuthContainer';
import ProfileStack from '../profile/ProfileStack';
import UnloggedStack from '../unlogged/UnloggedNavigator';
import ConsumerHistory from './history/ConsumerHistory';
import HomeStack from './home/HomeStack';
import { home, orders, user } from '../../assets/icons';
import { colors } from '../common/styles';
import { t } from '../../strings';

const HistoryStack = createStackNavigator();
function History() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="ConsumerHistory"
        component={ConsumerHistory}
        options={({ navigation }) => ({
          title: t('Histórico de pedidos'),
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
    </HistoryStack.Navigator>
  );
}

const LoggedNavigator = createBottomTabNavigator();
function Logged() {
  return (
    <LoggedNavigator.Navigator
      tabBarOptions={{
        activeTintColor: colors.black,
        inactiveTintColor: colors.black,
        activeBackgroundColor: colors.green,
        inactiveBackgroundColor: colors.white,
      }}
    >
      <LoggedNavigator.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Início', tabBarIcon: () => <Image source={home} /> }}
      />
      <LoggedNavigator.Screen
        name="ConsumerHistory"
        component={History}
        options={{ tabBarIcon: () => <Image source={orders} /> }}
      />
      <LoggedNavigator.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Sua conta', tabBarIcon: () => <Image source={user} /> }}
      />
    </LoggedNavigator.Navigator>
  );
}

export default function () {
  return <AuthContainer Logged={Logged} Unlogged={UnloggedStack} />;
}
