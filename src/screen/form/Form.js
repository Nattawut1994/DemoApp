import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput/CustomInput';
import {
  ACTION_ADD_MEMBER_REQUEST,
  ACTION_EDIT_MEMBER_REQUEST,
} from '../../saga/actionType';
import { FONT_FAMILY_LIGHT, FONT_FAMILY_REGULAR, PASSPORT_REGEX, PHONE_REGEX } from '../../constant';
import colors from '../../common/colors';

const Form = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({ type, payload });
  const memberReducer = useSelector(({ memberReducer }) => memberReducer);
  const { item, type } = route.params;

  const onSubmit = data => {
    return type === 'ADD' ? createUser(data) : updateUser(data);
  };

  const createUser = data => {
    let obj = {
      id: memberReducer.members.length,
      firstname: data.firstname,
      idcard: data.idcard,
      lastname: data.lastname,
      phone: data.phone,
    };
    let array = [];
    array.push(obj);
    let mrgData = memberReducer.members.concat(array);
    action(ACTION_ADD_MEMBER_REQUEST, mrgData);
    navigation.goBack();
  };

  const updateUser = data => {
    const newArr = memberReducer.members.map(obj => {
      if (obj.id === item.id) {
        return {
          ...obj,
          firstname: data.firstname,
          idcard: data.idcard,
          lastname: data.lastname,
          phone: data.phone,
        };
      }
      return obj;
    });
    action(ACTION_EDIT_MEMBER_REQUEST, newArr);
    navigation.goBack();
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('กรุณากรอกชื่อ'),
    lastname: Yup.string().required('กรุณากรอกนามสกุล'),
    idcard: Yup.string()
      .required('กรุณากรอกเลขบัตรประชาชน')
      .matches(PASSPORT_REGEX, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง')
      .min(13, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง')
      .max(13, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง'),
    phone: Yup.string()
      .required('กรุณากรอกเบอร์โทรศัพท์')
      .matches(PHONE_REGEX, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
      .max(10, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'),
  });

  useEffect(() => {
    if (type === 'EDIT') {
      setValue('firstname', item.firstname)
      setValue('lastname', item.lastname)
      setValue('idcard', item.idcard)
      setValue('phone', item.phone)
    }
  }, [])


  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          inputTitle="ชื่อ"
          name="firstname"
          placeholder={'ชื่อ'}
          control={control}
        />
        <CustomInput
          inputTitle="นามสกุล"
          name="lastname"
          placeholder={'นามสกุล'}
          control={control}
        />
        <CustomInput
          inputTitle="เลขบัตรประชาชน"
          name="idcard"
          placeholder={'เลขบัตรประชาชน'}
          control={control}
        />
        <CustomInput
          inputTitle="เบอร์โทรศัพท์"
          name="phone"
          placeholder={'เบอร์โทรศัพท์'}
          control={control}
        />
      </View>
      <View>
        <Button
          title="ยืนยัน"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: colors.COLORS.PRIMARY,
            borderRadius: 5,
          }}
          titleStyle={styles.btnTitle}
          containerStyle={{ paddingTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.COLORS.BACKGROUND,
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_REGULAR,
    color: colors.COLORS.TEXT_WHITE
  }
});

export default Form;
