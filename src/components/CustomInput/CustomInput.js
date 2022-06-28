import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { FONT_FAMILY_LIGHT, FONT_FAMILY_REGULAR } from '../../constant';
import colors from '../../common/colors';

const CustomInput = ({ control, inputTitle, name, placeholder, secureTextEntry }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={{ width: '100%', paddingBottom: 4 }}>
            <Text style={styles.inputTitle}>
              {inputTitle}
            </Text>
          </View>

          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : colors.COLORS.SECONDARY },
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.inputContent}
              secureTextEntry={secureTextEntry}
            />
          </View>

          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch', fontFamily: FONT_FAMILY_LIGHT }}>
              {error.message || 'Error'}
            </Text>
          )}
          <View style={{ marginBottom: 15 }} />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.COLORS.BACKGROUND,
    width: '100%',
    borderColor: colors.COLORS.SECONDARY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  inputTitle: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: FONT_FAMILY_REGULAR,
    color: colors.COLORS.PRIMARY_TEXT_DARK,
  },
  inputContent: {
    height: 40,
    fontSize: 14,
    fontFamily: FONT_FAMILY_LIGHT,
    color: colors.COLORS.PRIMARY_TEXT
  }
});

export default CustomInput;
