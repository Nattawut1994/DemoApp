import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React from 'react';
import {Text, Card, Icon} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../../components/CustomButton/CustomButton';
import {ACTION_REMOVE_MEMBER_REQUEST} from '../../actionType';

const users = [
  {
    id: 0,
    firstname: 'prayut',
    lastname: 'kuay',
    idcard: '1234567891231',
    phone: '0919999999',
  },
  {
    id: 1,
    firstname: 'triptech',
    lastname: 'kailek',
    idcard: '1234567891232',
    phone: '0919999999',
  },
  {
    id: 2,
    firstname: 'nattawut',
    lastname: 'yaimak',
    idcard: '1234567891233',
    phone: '0919999999',
  },
  {
    id: 3,
    firstname: 'nattawut',
    lastname: 'yaimak',
    idcard: '1234567891233',
    phone: '0919999999',
  },
];

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({type, payload});
  const memberReducer = useSelector(({memberReducer}) => memberReducer);

  const onRemove = itemId => {
    let members = memberReducer.members;
    const newArray = members.filter(item => {
      return item.id !== itemId;
    });

    action(ACTION_REMOVE_MEMBER_REQUEST, newArray);
  };

  const renderItem = item => (
    <Card
      containerStyle={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 0,
        elevation: 4,
      }}>
      <Card.Title
        style={{
          fontSize: 24,
          textAlign: 'left'
        }}>{`${item.firstname} ${item.lastname}`}</Card.Title>
      <Card.Divider />
      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 16}}>ID: {item.idcard}</Text>
        <Text style={{fontSize: 16}}>เบอร์: {item.phone}</Text>
      </View>
      {/* <Card.Divider /> */}
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button
            title="delete"
            onPress={() =>
              Alert.alert(
                'ลบสมาชิก',
                `ต้องการลบ ${item.firstname} ${item.lastname}`,
                [
                  {
                    text: 'ไม่',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'ใช่', onPress: () => onRemove(item.id)},
                ],
              )
            }
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="edit"
            onPress={() => navigation.navigate('Form', {item, type: 'EDIT'})}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 10}}
        data={memberReducer.members}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก</Text>}
      />
      <View style={{padding: 14}}>
        <CustomButton
          title="เพิ่ม"
          onPress={() => navigation.navigate('Form', {item: null, type: 'ADD'})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
