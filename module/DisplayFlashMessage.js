import {showMessage} from 'react-native-flash-message';

import {operationStore} from '../storage/operationStore';
class DisplayFlashMessage {
  displayMessage = (type, message) => {
    if (message !== '') {
      if (type === 'danger') {
        operationStore.errorsound.play();
      }
      showMessage({
        message: message,
        type: type,
        duration: 6000,
        position: 'top',
        icon: type,
        style: {
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        },
        titleStyle: {
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          height: 40,
          fontSize: 22,
          lineHeight: 40,
        },
      });
    }
  };
}
export const displayFlashMessage = new DisplayFlashMessage();
