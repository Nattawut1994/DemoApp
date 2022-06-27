import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screen/home/Home';
import FormScreen from './screen/form/Form';
import OnBoardingScreen from './screen/onboarding/OnBoarding';
import { FONT_FAMILY } from './constant';
import colors from './common/colors';

const Stack = createNativeStackNavigator();

const App = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('ALREADY_LAUNCH').then(value => {
      if (value === null) {
        AsyncStorage.setItem('ALREADY_LAUNCH', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen
            options={{
              title: 'สมาชิก',
              headerTitleStyle: styles.title,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: 'เพิ่มสมาชิก',
              headerTitleStyle: styles.title,
            }}
            name="Form"
            component={FormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: 'สมาชิก',
              headerTitleStyle: styles.title,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={({ route }) => ({
              title: route.params.type !== 'EDIT' ? 'เพิ่มสมาชิก' : 'แก้ไขสมาชิก',
              headerTitleStyle: styles.title,
            })}
            name="Form"
            component={FormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
    color: colors.COLORS.PRIMARY_TEXT_DARK
  }
});

export default App
