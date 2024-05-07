import {PermissionsAndroid, Platform} from 'react-native';

class RequestPermission {
  requestPermission = async (what, PERMISSIONS) => {
    async function requestAndroidPermission() {
      
      try {
        const granted = await PermissionsAndroid.request(
          PERMISSIONS,
          
        );
        
      } catch (err) {
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      await requestAndroidPermission(PERMISSIONS);
    }
  };
}
export const androidPermission = new RequestPermission();
