import { Dimensions } from 'react-native';

export default defaults = {
  maxWidth: Dimensions.get('screen').width * 20,
  maxheight: Dimensions.get('screen').height * 20,
  boardSize: 4,
  cellSize: 80,
};
