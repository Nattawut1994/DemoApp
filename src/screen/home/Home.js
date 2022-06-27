import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import { Text, Card } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@rneui/themed";

import { ACTION_REMOVE_MEMBER_REQUEST } from '../../saga/actionType';
import { FONT_FAMILY } from '../../constant';
import colors from '../../common/colors';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const action = (type, payload) => dispatch({ type, payload });
  const memberReducer = useSelector(({ memberReducer }) => memberReducer);

  const onRemove = itemId => {
    let members = memberReducer.members;
    const newArray = members.filter(item => {
      return item.id !== itemId;
    });

    action(ACTION_REMOVE_MEMBER_REQUEST, newArray);
  };

  const renderItem = item => (
    <Card containerStyle={styles.cardTitle}>
      <Card.Title
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 22,
          textAlign: 'left',
          fontWeight: 'normal'
        }}>{`${item.firstname} ${item.lastname}`}</Card.Title>
      <Card.Divider />
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.cardContent, {color: colors.COLORS.PRIMARY_TEXT_DARK}]}>ID: </Text>
          <Text style={styles.cardContent}>{item.idcard}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.cardContent, {color: colors.COLORS.PRIMARY_TEXT_DARK}]}>เบอร์: </Text>
          <Text style={styles.cardContent}>{item.phone}</Text>
        </View>
      </View>
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button
            title="ลบ"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: colors.COLORS.SECONDARY,
              borderRadius: 5,
            }}
            titleStyle={styles.btnTitle}
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
                  { text: 'ใช่', onPress: () => onRemove(item.id) },
                ],
              )
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="แก้ไข"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: colors.COLORS.PRIMARY,
              borderRadius: 5
            }}
            titleStyle={styles.btnTitle}
            onPress={() => navigation.navigate('Form', { item, type: 'EDIT' })}
          />
        </View>
      </View>
    </Card>
  );

  const renderListEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: FONT_FAMILY, color: colors.COLORS.PRIMARY_TEXT_LIGHT }}>คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          data={memberReducer.members}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderListEmpty}
        />
      </View>

      <Button
        title="เพิ่ม"
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: colors.COLORS.PRIMARY,
          borderRadius: 5,
        }}
        titleStyle={styles.btnTitle}
        containerStyle={{ padding: 20 }}
        onPress={() => navigation.navigate('Form', { item: null, type: 'ADD' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COLORS.BACKGROUND,
  },
  cardTitle: {
    flex: 1,
    backgroundColor: colors.COLORS.BACKGROUND,
    borderRadius: 4,
    borderWidth: 0,
    elevation: 3,
  },
  cardContent: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: colors.COLORS.PRIMARY_TEXT_L
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: colors.COLORS.TEXT_WHITE
  }
});

export default Home;
