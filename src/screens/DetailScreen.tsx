import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import CardFlip from 'react-native-card-flip';
import TouchableScale from 'react-native-touchable-scale';
import {useFocusEffect} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from 'src/SharedStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Styles from 'src/SharedStyles';
// import MyTest from 'src/components/MyTest';

const DetailScreen = ({route, navigation}): JSX.Element => {
  const statusBarHeight = getStatusBarHeight();

  const [menuVisible, setMenuVisible] = useState(false);

  const cardFlipRef = useRef();
  useFocusEffect(() => {
    console.log('DetailScreen useFocusEffect');
    setTimeout(() => {
      cardFlipRef.current.flip();
    }, 500);
  });
  const {item} = route.params;
  console.log('DetailScreen item', item);

  const goBack = () => {
    cardFlipRef.current.flip();
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {height: statusBarHeight}]} />
      <ScrollView>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={goBack}>
            <Image source={require('assets/BackIcon.png')} />
          </TouchableOpacity>
        </View>
        <CardFlip ref={cardFlipRef} style={styles.card}>
          <SharedElement id={item.id}>
            <Image
              style={styles.detailImage}
              source={require('assets/NZPassportFront.png')}
            />
          </SharedElement>
          <TouchableScale onPress={toggleMenu}>
            <Image
              style={styles.detailImage}
              source={require('assets/NZPassportBack.png')}
            />
          </TouchableScale>
        </CardFlip>
        <Text style={Styles.titleText}>DetailScreen</Text>
        <Text style={Styles.paragraphText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          dignissimos, sit earum illo quos repudiandae quasi consequuntur porro.
          Laudantium quos nulla corrupti temporibus? Debitis incidunt earum non
          cupiditate delectus deserunt?
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryHighlight,
  },
  backButton: {
    paddingTop: 48,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    height: 250,
  },
  detailImage: {
    width: '100%',
    height: 250,
  },
});

export default DetailScreen;
