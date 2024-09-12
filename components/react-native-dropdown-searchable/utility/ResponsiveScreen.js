
import {Dimensions, PixelRatio} from 'react-native';


let screenWidth = Dimensions.get('window').width;


let screenHeight = Dimensions.get('window').height;


const widthPercentageToDP = widthPercent => {
  
  const elemWidth = parseFloat(widthPercent);

  
  
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};


const heightPercentageToDP = heightPercent => {
  
  const elemHeight = parseFloat(heightPercent);

  
  
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};


const listenOrientationChange = that => {
  Dimensions.addEventListener('change', newDimensions => {
    
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
    });
  });
};


const removeOrientationListener = () => {
  Dimensions.removeEventListener('change', () => {});
};

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (screenWidth / guidelineBaseWidth) * size;
const verticalScale = size => (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
  removeOrientationListener,
  scale,
  verticalScale,
  moderateScale,
};
