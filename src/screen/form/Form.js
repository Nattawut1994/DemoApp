import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  ACTION_ADD_MEMBER_REQUEST,
  ACTION_EDIT_MEMBER_REQUEST,
} from '../../actionType';
import {PASSPORT_REGEX, PHONE_REGEX} from '../../constant';

const Form = ({route, navigation}) => {
  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({type, payload});
  const memberReducer = useSelector(({memberReducer}) => memberReducer);

  const {item, type} = route.params;

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
      .matches(PASSPORT_REGEX, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง'),
    phone: Yup.string()
      .required('กรุณากรอกเบอร์โทรศัพท์')
      .matches(PHONE_REGEX, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
      .max(10, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});
  console.log(errors);

  return (
    <View style={styles.container}>
      <CustomInput
        inputTitle="ชื่อ"
        name="firstname"
        placeholder={item?.firstname ? item.firstname : 'ชื่อ'}
        control={control}
      />
      <CustomInput
        inputTitle="นามสกุล"
        name="lastname"
        placeholder={item?.lastname ? item.lastname : 'นามสกุล'}
        control={control}
      />
      <CustomInput
        inputTitle="เลขบัตรประชาชน"
        name="idcard"
        placeholder={item?.idcard ? item.idcard : 'เลขบัตรประชาชน'}
        control={control}
      />
      <CustomInput
        inputTitle="เบอร์โทรศัพท์"
        name="phone"
        placeholder={item?.phone ? item.phone : 'เบอร์โทรศัพท์'}
        control={control}
      />
      <CustomButton title="ยืนยัน" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Form;
