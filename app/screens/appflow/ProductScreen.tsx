import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from '../../components/common/Container';
import {RootStackParamList} from '../../utils/globalTypes';
import ButtonUI from '../../components/common/ButtonUI';

export default function ProductScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const homeNavigation = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);
  return (
    <Container>
      <Text>ProductScreen</Text>
      <ButtonUI title="GOTO Product" onPress={homeNavigation} />
    </Container>
  );
}
