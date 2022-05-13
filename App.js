import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_SCREEN, ONBOARDING_SCREEN, WELCOME_SCREEN } from './src/navigation/constant';
import Auth from './src/screens/Auth';
import Welcome from './src/screens/Welcome';
import Onboarding from './src/screens/Onboarding'
import { Provider } from 'react-redux';
import { navigationRef } from './src/navigation/RootNavigation';
import configureStore from './src/store/configureStore';
const { store, persistor } = configureStore();
const RootStack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator>
            <RootStack.Screen name={HOME_SCREEN} component={Auth} options={{ headerShown: false }} />
            <RootStack.Screen name={ONBOARDING_SCREEN} component={Onboarding} options={{ title: "Welcome page" }} />
            <RootStack.Screen name={WELCOME_SCREEN} component={Welcome} options={{ title: "Welcome page" }} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}