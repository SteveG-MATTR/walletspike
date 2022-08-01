import React, {useRef, useCallback} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';
import CardFlip from 'react-native-card-flip';
import {useFocusEffect} from '@react-navigation/native';
import {credentialsList} from 'src/SharedData';

const ListScreen = ({navigation}): JSX.Element => {
  const cardRef = useRef();
  const cardFlipIndex = useRef(0);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect called cardFlipIndex=', cardFlipIndex);
      if (cardFlipIndex.current === 1) {
        console.log('should flip');
        setTimeout(() => {
          cardRef.current.flip();
        }, 500);
      }
    }, [cardFlipIndex]),
  );

  const goToDetailScreen = () => cardRef.current.flip();

  return (
    <View style={styles.container}>
      <CardFlip
        ref={cardRef}
        style={styles.cardContainer}
        onFlip={index => {
          cardFlipIndex.current = index;
        }}
        onFlipEnd={index => {
          console.log('onFlipEnd called index=', index);
          if (index === 1) {
            navigation.navigate('Detail');
          }
        }}>
        <TouchableScale
          onPress={() => {
            cardRef.current.flip();
          }}>
          <Image
            style={styles.listImage}
            resizeMode="contain"
            source={require('assets/NZPassportFront.png')}
          />
        </TouchableScale>
        <TouchableScale onPress={goToDetailScreen}>
          <SharedElement id="1234">
            <Image
              style={styles.listImage}
              resizeMode="contain"
              source={require('assets/NZPassportBack.png')}
            />
          </SharedElement>
        </TouchableScale>
      </CardFlip>

      <Text>ListScreen</Text>
      <Button title="Detail" onPress={goToDetailScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    width: 200,
    height: 150,
  },
  listImage: {
    width: 200,
    height: 150,
  },
});

export default ListScreen;
