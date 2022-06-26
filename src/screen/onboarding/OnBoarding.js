import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'

const OnBoarding = ({ navigation }) => {
  return (
    <View>
      <CustomButton title='Get Started' onPress={() => navigation.replace('Home')} />
    </View>
  )
}

export default OnBoarding