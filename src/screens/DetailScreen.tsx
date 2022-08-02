import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {useParam} from '';
import Styles from 'src/SharedStyles';

const DetailScreen = ({route}): JSX.Element => {
  const {id} = route.params;
  console.log('DetailScreen id', id);
  return (
    <View style={styles.container}>
      <SharedElement id="1234">
        <Image
          style={styles.detailImage}
          resizeMode="contain"
          source={require('assets/NZPassportBack.png')}
        />
      </SharedElement>
      <Text style={Styles.titleText}>DetailScreen</Text>
      <Text style={Styles.paragraphText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        dignissimos, sit earum illo quos repudiandae quasi consequuntur porro.
        Laudantium quos nulla corrupti temporibus? Debitis incidunt earum non
        cupiditate delectus deserunt?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailImage: {},
});

export default DetailScreen;
