import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';
import CardFlip from 'react-native-card-flip';
import {useFocusEffect} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// import {credentialsList} from 'src/SharedData';
import {Colors} from 'src/SharedStyles';

const HEADER_HEIGHT = 200;

const ListScreen = ({navigation}): JSX.Element => {
  const statusBarHeight = getStatusBarHeight();

  const cardRef = useRef({});
  const cardFlipIndexes = useRef({});

  useFocusEffect(() => {
    Object.entries(cardFlipIndexes)
      .filter(cardFlipIndex => cardFlipIndex[1] === 1)
      .map(cardFlipIndex => cardFlipIndex[0])
      .forEach(id => {
        setTimeout(() => {
          console.log('useFocusEffect id', id);
          cardRef.current[id].flip();
        }, 500);
      });
  });

  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      1,
    ),
  );

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT + statusBarHeight],
    extrapolate: 'clamp',
  });

  const headerContentTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 5],
    extrapolate: 'clamp',
  });

  renderList = ({item}) => {
    console.log('renderList item.id', item.id);
    return (
      <CardFlip
        ref={ref => {
          cardRef.current[item.id] = ref;
        }}
        style={styles.cardContainer}
        onFlip={index => {
          cardFlipIndexes.current[item.id] = index;
        }}
        onFlipEnd={index => {
          console.log('onFlipEnd called index=', index);
          if (index === 1) {
            navigation.navigate('Detail', {id: item.id});
          }
        }}>
        <TouchableScale
          onPress={() => {
            cardRef.current[item.id].flip();
          }}>
          <Image
            style={styles.listImage}
            resizeMode="contain"
            source={require('assets/NZPassportFront.png')}
          />
        </TouchableScale>
        <TouchableScale>
          <SharedElement id="1234">
            <Image
              style={styles.listImage}
              resizeMode="contain"
              source={require('assets/NZPassportBack.png')}
            />
          </SharedElement>
        </TouchableScale>
      </CardFlip>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{translateY: headerTranslate}],
          },
        ]}
        onLayout={event => {
          let {height} = event.nativeEvent.layout;
          setClampedScroll(
            Animated.diffClamp(
              Animated.add(
                scrollAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                }),
                offsetAnim,
              ),
              0,
              height,
            ),
          );
        }}>
        <Animated.View
          style={{
            transform: [{translateY: headerContentTranslate}],
          }}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Image source={require('assets/QR_Icon.png')} />
            <Text style={styles.buttonText}>SCAN</Text>
          </TouchableOpacity>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Your wallet</Text>
            <TouchableOpacity>
              <Image source={require('assets/Search_Icon.png')} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
      <View style={{paddingTop: 200}}>
        <TouchableScale
          onPress={() => {
            navigation.navigate('Detail', {id: '1234'});
          }}>
          <SharedElement id="1234">
            <Image
              style={styles.listImage}
              resizeMode="contain"
              source={require('assets/NZPassportBack.png')}
            />
          </SharedElement>
        </TouchableScale>
      </View>
      {/* <Animated.FlatList
        contentContainerStyle={styles.flatListContentContainer}
        contentInset={{top: HEADER_HEIGHT}}
        contentOffset={{y: -HEADER_HEIGHT}}
        bounces={true}
        scrollEventThrottle={16}
        style={styles.flatList}
        data={credentialsList}
        renderItem={renderList}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollAnim},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: Colors.primaryHighlight,
    position: 'absolute',
    paddingHorizontal: 20,
    paddingBottom: 20,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10000,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    color: Colors.primaryHighlight,
    fontSize: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.primaryHighlight,
    fontSize: 12,
  },
  buttonContainer: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.primaryHighlight,
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    width: '100%',
    height: 250,
    //width: 200,
    //height: 150,
  },
  listImage: {
    width: '100%',
    //height: 150,
  },
  flatList: {flexGrow: 1, width: '100%'},
  flatListContentContainer: {paddingBottom: 50},
});

export default ListScreen;
