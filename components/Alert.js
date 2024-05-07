import {showAlert, closeAlert} from 'react-native-customisable-alert';

export const Alert = {
  alert: (title, message, buttons = []) => {
    showAlert({
      alertType: buttons.length === 2 ? 'warning' : 'success',
      title: title,
      message,
      customIcon: 'none',
      leftBtnLabel: buttons.length === 2 ? buttons[0].text : undefined,
      onDismiss: () => {
        (buttons.length === 2 ? buttons[0].onPress : () => {})();
        closeAlert();
      },
      btnLabel: buttons.length === 2 ? buttons[1].text : buttons[0].text,
      onPress: () => {
        (buttons.length === 2 ? buttons[1].onPress : buttons[0].onPress)();
        closeAlert();
      },
    });
  },
};
