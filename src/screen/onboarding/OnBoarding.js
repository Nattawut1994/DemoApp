import { View } from 'react-native'
import React from 'react'
import { Button } from "@rneui/themed";
import { FONT_FAMILY } from '../../constant';
import colors from '../../common/colors';

const OnBoarding = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.COLORS.BACKGROUND }}>
      <Button
        title="Get Started"
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: colors.COLORS.PRIMARY,
          borderRadius: 5,
        }}
        titleStyle={{  fontSize: 23, fontFamily: FONT_FAMILY }}
        containerStyle={{
          height: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.replace('Home')}
      />
    </View>
  )
}

export default OnBoarding