//已排除的套件
import React, { useRef, useEffect }  from 'react';
import { Dimensions, Keyboard, AppState} from 'react-native';
import log from './module/Logger'
import Moment from 'moment';
import CustomisableAlert from 'react-native-customisable-alert';
import {observer} from 'mobx-react';
import {createStackNavigator} from '@react-navigation/stack';
import {MenuProvider} from 'react-native-popup-menu';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

import LoginScreen from './screen/LoginScreen';
import BrsButtomTab from './components/BrsButtomTab';
import BrsTopTab from './components/BrsTopTab';
import BusyCursor from './screen/BusyCursor';
// import A3_BagCheckForm from './screen/A3_BagCheckForm';


const RootStack = createStackNavigator();



@observer
class App extends React.Component {

  _handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        console.log('APP has come to the foreground! ');
      } else {
        console.log('APP has come to the background! ');
      }
    };

  _keyboardDidShow = () => {
    const currentlyFocusedInput = TextInput.State.currentlyFocusedField();
    if (currentlyFocusedInput) {
      console.log('Keyboard Shown '+TextInput.State.currentlyFocusedField());
      currentlyFocusedInput.blur();
      currentlyFocusedInput.focus();
    } else {
      console.log('No focused input field found');
    }
  };


  componentWillUnmount() {
    // Ensure log object is available and defined
    if (log) {
      log._transportOptions.loggerName = Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.info('App componentWillUnmount');
    }
  }

  componentDidMount = async () => {
    
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    if (!(await RNFS.exists(log._transportOptions.loggerPath))) {
      RNFS.mkdir(log._transportOptions.loggerPath);
      console.log('新增資料夾' + log._transportOptions.loggerPath);
    }
    RNFS.readDir(log._transportOptions.loggerPath).then(ReadDirItem => {
      for (let i = 0; i < ReadDirItem.length; i++) {
        if (Moment().diff(ReadDirItem[i].mtime, 'days') >= 7) {
          let path =
            log._transportOptions.loggerPath + '/' + ReadDirItem[i].name;
          RNFS.unlink(path)
            .then(() => {
              log._transportOptions.loggerName =
                Moment().format('yyyy-MM-DD') + '_brsLogsFile';
              log.info('刪除過期檔案:' + ReadDirItem[i].name);
            })
            
            .catch(err => {
              log._transportOptions.loggerName =
                Moment().format('yyyy-MM-DD') + '_brsLogsFile';
              log.warn(err.message);
            });
        }
      }
    });

    log._transportOptions.loggerName =
      Moment().format('yyyy-MM-DD') + '_brsLogsFile';
    log.info('App componentDidMount');
  };


  render(){
    return(
      <React.Fragment>
      <CustomisableAlert
          titleStyle={{
            fontSize: 0,
          }}
          textStyle={{
            fontSize: 24,
          }}
          btnLeftLabelStyle={{
            fontSize: 20,
          }}
          btnRightLabelStyle={{
            fontSize: 20,
          }}
        />

        

      <MenuProvider>
        <NavigationContainer>
        <RootStack.Navigator initialRouteName="LoginScreen">
          <RootStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          {/* <RootStack.Screen
            name="作業選擇"
            component={BrsButtomTab}
            options={{headerShown: false}}
          /> */}
          {/* <RootStack.Screen
            name="BrsTopTab"
            component={BrsTopTab}
            options={{headerShown: false}}
          /> */}
          
          
        </RootStack.Navigator>
        </NavigationContainer>
      </MenuProvider>

      <BusyCursor />

      <FlashMessage
          textStyle={{
            fontSize: 29,
          }}
      />
    </React.Fragment>

    );
  }
}
export default App;