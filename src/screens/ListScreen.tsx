import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from 'src/SharedStyles';
import {SharedElement} from 'react-navigation-shared-element';
import {credentialsList} from 'src/SharedData';

const HEADER_HEIGHT = 200;

const ListScreen = ({navigation}): JSX.Element => {
  const statusBarHeight = getStatusBarHeight();
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

  const headerTranslate = scrollAnim.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT + statusBarHeight],
    extrapolate: 'clamp',
    // outputRange: [0, -HEADER_HEIGHT + statusBarHeight],
    // extrapolate: 'clamp',
  });

  const headerContentTranslate = scrollAnim.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 5],
    extrapolate: 'clamp',
  });

  console.log('headerTranslate', headerTranslate);

  const renderItem = ({item}) => {
    // console.log(styles.listImage);
    return (
      <TouchableScale
        onPress={() => {
          navigation.navigate('Detail', {item});
        }}>
        <SharedElement id={item.id}>
          <Image
            style={styles.listImage}
            resizeMode="contain"
            source={require('assets/NZPassportFront.png')}
          />
        </SharedElement>
      </TouchableScale>
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
      <Animated.FlatList
        contentContainerStyle={styles.flatListContentContainer}
        // contentInset={{top: HEADER_HEIGHT}}
        // contentOffset={{y: -HEADER_HEIGHT}}
        bounces={true}
        scrollEventThrottle={16}
        style={styles.flatList}
        data={credentialsList}
        renderItem={renderItem}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listImage: {
    // width: 200,
    // height: 150,
  },
  flatList: {flexGrow: 1, width: '100%'},
  flatListContentContainer: {paddingBottom: 50, paddingTop: HEADER_HEIGHT},
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
});

export default ListScreen;
