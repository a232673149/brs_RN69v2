//使用函數庫的套件
import React from 'react';
import Modal from 'react-native-modalbox';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import Moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
//使用本機的套件
import {Alert} from '../components/Alert';
import posize from './posize.v11';
import {brsStore} from '../storage/brsStore';


import PickerSelect from '../components/PickerSelect';

import Sound from 'react-native-sound';


import {loginModel} from '../model/LoginModel';
import {operationStore} from '../storage/operationStore';
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import {operationModule} from '../module/OperationModule';
import {DataSelectFlightModel} from '../model/Data_SelectFlightModel';
import BigKeyBoard from '../components/BigKeyBoard';
import {offLineStore} from '../storage/offLineStore';

import log from '../module/Logger';

//2024-09-04以上套件皆已完善，以下畫面需要進行調整。

const Px = posize(View);
const PxFlex = posize(View);
const PxImage = posize(Image);
const PxTouchableOpacity = posize(TouchableOpacity);


@observer
class LoginScreen extends React.Component {
  static inStorybook = true;
  static fitScreen = true;
  static scrollHeight = 696.192321777344;

  static propTypes = {};
  static defaultProps = {};

  plusValue = async value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsUI =
        brsStore.brsUI.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsUI.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsUI += value;
    }
    brsStore.brsUI = brsStore.brsUI.trim();
    if (loginModel.onChangeTextUI(brsStore.brsUI)) {
      brsStore.showBusyCursor('');
      await loginModel.onLoginConfirm();
      brsStore.dismissBusyCursor();
      this.gotoLoginConfirm();
    }
    if (brsStore.keyboardSelectionStart >= brsStore.brsUI.length) {
      brsStore.keyboardSelectionStart = brsStore.brsUI.length;
      brsStore.keyboardSelectionEnd = brsStore.brsUI.length;
      brsStore.keyboardSelection = {
        start: brsStore.keyboardSelectionStart,
        end: brsStore.keyboardSelectionEnd,
      };
    } else {
      brsStore.keyboardSelectionStart += 1;
      brsStore.keyboardSelectionEnd += 1;
      brsStore.keyboardSelection = {
        start: brsStore.keyboardSelectionStart,
        end: brsStore.keyboardSelectionEnd,
      };
    }
  };
  

  plusValue2 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsUP =
        brsStore.brsUP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsUP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsUP += value;
    }
    loginModel.onChangeTextUP(brsStore.brsUP);

    if (brsStore.keyboardSelectionStart >= brsStore.brsUP.length) {
      brsStore.keyboardSelectionStart = brsStore.brsUP.length;
      brsStore.keyboardSelectionEnd = brsStore.brsUP.length;
      brsStore.keyboardSelection = {
        start: brsStore.keyboardSelectionStart,
        end: brsStore.keyboardSelectionEnd,
      };
    } else {
      brsStore.keyboardSelectionStart += 1;
      brsStore.keyboardSelectionEnd += 1;
      brsStore.keyboardSelection = {
        start: brsStore.keyboardSelectionStart,
        end: brsStore.keyboardSelectionEnd,
      };
    }
  };
  backValue2 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.brsUP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.brsUP =
          brsStore.brsUP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.brsUP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.brsUP.length,
          );
      }
    } else {
      brsStore.brsUP = brsStore.brsUP.substring(0, brsStore.brsUP.length - 1);
    }
    
    loginModel.onChangeTextUP(brsStore.brsUP);
  };

  componentWillUnmount() {
    console.log('LoginScreen Unmount');
  }

  async componentDidMount() {
    console.log('LoginScreen componentDidMount');

    await brsStore.init;
    console.log('brsStore.init');
    await offLineStore.init;
    console.log('offLineStore.init');

    
    await loginModel.requestFilePermission();
    
    await loginModel.requestCameraPermission();
    
    await loginModel.requestWifiPermission();

    
    
    loginModel.setVolume(1);
    
    loginModel.setBrightness(1);
    

    
    loginModel.enableBlueTooth();

    brsStore.dismissBusyCursor();

    Sound.setCategory('Playback');
    operationStore.scanread = new Sound(
      'scanre.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load scanre.wav', error);
          return;
        }
   
      },
    );

    operationStore.errorsound = new Sound(
      'error.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load error.wav', error);
          return;
        }
        
      },
    );

    operationStore.keyboardButtonSound = new Sound(
      'keyboardsound.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load keyboardsound.wav', error);
          return;
        }
          
      },
    );

    
    if (brsStore.getFIDSIntervalId != '') {
      clearInterval(brsStore.getFIDSIntervalId);
      brsStore.getFIDSIntervalId = '';
    }
    
    brsStore.loginConfirm = false;
    brsStore.adminLogin = false; 
    brsStore.ABUserLogin = false; 
    brsStore.brsA3UserLogin = false;
    brsStore.brsInspUserLogin = false; 
    brsStore.brsUserLogin = false; 
    brsStore.navigate = this.title;
    brsStore.navigatelevel = 0;
    brsStore.navigatelevelLock = false;
    brsStore.navigateGotoBrsButtomTab = false; 
    brsStore.bagLoadEntrypoint = false; 
    brsStore.selectFlightEntrypoint = false; 
    brsStore.navigateSelectFlight = false; 
    brsStore.keyboardModal = this.refs.modal4; 
    brsStore.setValue = false;
    brsStore.brsFightServer = '查詢中...';
    brsStore.verison = '1.1.5';
    loginModel.showUP = false;
    
    let appDate = new Date();
    console.log('PDA設備時間:' + Moment(appDate).format());
    if (brsStore.usePlace === 'T2') {
      brsStore.useWsHostIp = brsStore.t2WsHostIp;
      brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
      
    } else if (brsStore.usePlace === 'T1') {
      brsStore.useWsHostIp = brsStore.t1WsHostIp;
      brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
    }
    brsStore.brsUI = '';
    brsStore.brsUP = brsStore.brsUI;
    loginModel.getFightServer();

    
    NetInfo.addEventListener(state => {
      
      

      if (state.isConnected === true && brsStore.wifiOff === true) {
        brsStore.wifiOff = false;
        console.log('NetInfo.addEventListener: ' + state.isConnected);
        if (
          brsStore.navigatelevel === 0 ||
          brsStore.brsFightServer === '查詢中...' ||
          brsStore.brsFightServer === '連線失敗!!' ||
          brsStore.brsFightServer === '此裝置無對應公司'
        ) {
          loginModel.getFightServer();
        }
        if (
          brsStore.brsUserLogin === true &&
          brsStore.brsCompanyIdType === 'SFLIGHT_CODE'
        ) {
          console.log(
            'NetInfo.addEventListener set brsStore.connectionFailed = false',
          );
          brsStore.connectionFailed = false;
          
          
          if (brsStore.upload === true) {
            brsStore.online = false;
            brsStore.unloadTab = false;
            brsStore.searchTab = false;
            let mode = brsStore.online
              ? brsStore.wifiOff
                ? '連線操作(無網路連線)'
                : '連線操作'
              : brsStore.nearAirplan
              ? '機邊作業'
              : '離線作業';
            let yesOrno = brsStore.upload ? '有' : '無';
            let message = `連網成功! \n\n作業模式: ${mode}\n待傳資料: ${yesOrno} ${
              offLineStore.offLineKeepStoreCount
            } 筆\n發生時間: ${Moment(
              offLineStore.offLineKeepStoreLastDateTime,
            ).format('yyyy/MM/DD ')}${Moment(
              offLineStore.offLineKeepStoreLastDateTime,
            ).format('LTS')}\n\n無法更新作業資訊，請'資料上傳'\n`;
            Alert.alert('', message, [
              {
                text: '資料上傳',
                onPress: () => {
                  operationModule.uploadSubmitStore();
                },
              },
              {
                text: '資料作廢',
                onPress: () => {
                  if (brsStore.upload) {
                    
                    operationModule.clearSubmitStore();
                  }
                },
              },
              {
                text: '離開',
                onPress: () => null,
              },
            ]);
          }
        }
        
        else {
          if (brsStore.loginConfirm === true) {
            brsStore.online = true;
            brsStore.unloadTab = true;
            brsStore.searchTab = true;
          }
        }
      }
      
      else if (state.isConnected === false && brsStore.wifiOff === false) {
        brsStore.wifiOff = true;
        brsStore.connectionFailed = true;
        
        if (
          brsStore.brsUserLogin === true &&
          brsStore.brsCompanyIdType === 'SFLIGHT_CODE'
        ) {
          
          
          if (brsStore.upload === true) {
            brsStore.online = false;
            brsStore.unloadTab = false;
            brsStore.searchTab = false;
          }
          if (brsStore.bagLoadEntrypoint === false) {
            let message = '無網路連線，請檢查網路連線';
            Alert.alert('', message, [
              {
                text: '離開',
                onPress: () => null,
              },
            ]);
          }
          if (brsStore.bagLoadEntrypoint === true) {
            
            
            
            
            operationModule.offlineAlertMessage();
          }
        } else {
          brsStore.online = true;
          brsStore.unloadTab = true;
          brsStore.searchTab = true;
          if (
            brsStore.navigatelevel === 0 ||
            brsStore.brsFightServer === '查詢中...' ||
            brsStore.brsFightServer === '連線失敗!!' ||
            brsStore.brsFightServer === '此裝置無對應公司'
          ) {
            loginModel.getFightServer();
          }
        }
      }
    });

    
  }

  title = 'BRS登入';
  onChangeWifi = () => {};
  gotoLoginConfirm = () => {
    
    DataSelectFlightModel.flight = '';
    operationStore.selectflighItem = '';
    
    operationStore.selectedDate = new Date();
    console.log(
      '預設當日為航班日期:' + Moment(operationStore.selectedDate).format(),
    );
    if (brsStore.loginConfirm) {
      if (brsStore.adminLogin) {
        
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('管理者帳號登入');
        this.props.navigation.replace('BrsTopTab');
      } else if (brsStore.ABUserLogin) {
        
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('巡場程式帳號登入');
        this.props.navigation.replace('巡場作業');
      } else if (brsStore.brsInspUserLogin) {
        
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('卸載道查詢帳號登入');
        this.props.navigation.replace('卸載道查詢');
      } else if (brsStore.brsA3UserLogin) {
        
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('A3行李查詢帳號登入');
        this.props.navigation.replace('A3行李查詢');
      } else if (brsStore.brsUserLogin === true) {
        
        operationModule.getFidsCartByDay(operationStore.selectedDate);
        brsStore.getFIDSIntervalId = setInterval(
          operationModule.getFidsCartByDay,
          brsStore.updateIntervalTime,
          operationStore.selectedDate,
        );
        brsStore.navigatelevel = 1;
        brsStore.navigatelevelLock = false;
        brsStore.navigateGotoBrsButtomTab = false; 
        brsStore.bagLoadEntrypoint = false; 
        brsStore.navigateSelectFlight = false; 
        brsStore.selectFlightEntrypoint = false; 
        brsStore.selectCartNoEntrypoint = false; 
        brsStore.fromBoxBagLoad = false; 
        brsStore.numberFlag = false;
        brsStore.EnFlag = true;
        brsStore.enFlag = false;
        brsStore.symbolFlag = false;
        console.log('LoginScreen(to go 作業選擇)=>=>=>=>=>=>=>=>=>=>=>');
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('操造人員帳號登入');
        this.props.navigation.replace('作業選擇');
      }
    } else {
      if (brsStore.getFIDSIntervalId !== '') {
        clearInterval(brsStore.getFIDSIntervalId);
        brsStore.getFIDSIntervalId = '';
      }

      if (brsStore.setValue) {
        displayFlashMessage.displayMessage('success', '變更參數資料');
        brsStore.setValue = false;
      } else {
        displayFlashMessage.displayMessage('danger', '登入的資料不正確');
      }
    }
  };





  render() {
    return (
      
      <View behavior={'height'} style={{flex: 1}}>
        {brsStore.connectionFailed === false && (
          <StatusBar backgroundColor="gray" />
        )}
        {brsStore.connectionFailed === true && (
          <StatusBar backgroundColor="red" />
        )}
        <Px layout={layouts.group1}>
          <PxImage
            source={require('../assets/f98a87d4fc7b6f60cb5f5d61d5b0737b.png')}
            layout={layouts.img79}
          />

          <PxFlex layout={layouts.flexbox91}>
            <View style={styles.space97} />
            <Px layout={layouts.group61}>
              <Px layout={layouts.rect12} />

              <PxFlex layout={layouts.flexbox66}>
                <PxImage
                  source={require('../assets/1c4e63f3a545d8afc6860a700cb83f35.png')}
                  layout={layouts.img38}
                />
                <View style={styles.space68} />
                <Px layout={layouts.group63}>
                  <Px layout={layouts.rect35} />
                  <Px layout={layouts.txt37}>
                    <Text style={styles.txt37Content} ellipsizeMode={'clip'}>
                      {brsStore.brsFightServer}
                    </Text>
                  </Px>
                  <PxImage
                    source={require('../assets/a2fe00e5a83d6b84d83706d59aa97ba8.png')}
                    layout={layouts.img36}
                  />
                </Px>
                <View style={styles.space70} />
                <Px layout={layouts.group40}>
                  <Px layout={layouts.rect30} />

                  <PxFlex layout={layouts.flexbox47}>
                    <PxImage
                      source={require('../assets/e8c0cd9d79176c45687176331930ea34.png')}
                      layout={layouts.img32}
                    />
                    <View style={styles.space49} />
                    <PxImage
                      source={require('../assets/e2255428291d79d4375813b4d120ca36.png')}
                      layout={layouts.img31}
                    />
                    <View style={styles.space51} />
                  </PxFlex>
                  <PickerSelect
                    title=" "
                    pickerSelectItems={loginModel.wifiItems}
                    onValueChange={this.onChangeWifi}
                    placeholderLabel="請選擇作業航廈"
                    placeholderValue={brsStore.usePlace}
                    value={brsStore.usePlace}
                    disabled={true}
                  />
                </Px>
                <View style={styles.space72} />
                <Px layout={layouts.group41} removeClippedSubviews={true}>
                  <Px layout={layouts.rect25} />

                  <PxTouchableOpacity layout={layouts.group43}>
                    <PxImage
                      source={require('../assets/a07c6ecce4cc2ee20e70b9ab10057e7f.png')}
                      layout={layouts.img26}
                    />
                    <Px layout={layouts.rect27} />
                    <PxImage
                      source={require('../assets/7413e94121ccc1a3077bf8bba8348a07.png')}
                      layout={layouts.img28}
                    />
                  </PxTouchableOpacity>
                  <TextInput
                    contextMenuHidden={true}//防止用戶進行複製貼上
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholder="使用者名稱"
                    value={brsStore.brsUI}
                    onChangeText={async brsUI => {
                      brsUI = brsUI.trim();//去除用戶輸入文本的前後空格，確保處理的輸入是乾淨的。
                      if (loginModel.onChangeTextUI(brsUI)) {
                        brsStore.showBusyCursor('');
                        await loginModel.onLoginConfirm();
                        brsStore.dismissBusyCursor();
                        this.gotoLoginConfirm();
                      }
                    }}
                    style={{marginLeft: 60, flex: 1}}
                  />

                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.keyboardOpen = true;
                      brsStore.keyboardModal = this.refs.modal4;
                      this.refs.modal4.open();
                    }}>
                    <PxImage
                      source={require('../assets/mobile_keyboard.png')}
                      layout={layouts.img10}
                    />
                  </PxTouchableOpacity>
                </Px>
                <View style={styles.space74} />
                <Px layout={layouts.group44} removeClippedSubviews={true}>
                  <Px layout={layouts.rect20} />

                  <PxTouchableOpacity
                    layout={layouts.group42}
                    onPress={() => {
                      loginModel.showUP = !loginModel.showUP;
                    }}
                    >
                    <PxImage
                      source={require('../assets/a07c6ecce4cc2ee20e70b9ab10057e7f.png')}
                      layout={layouts.img21}
                    />
                    <Px layout={layouts.rect22} />

                    {loginModel.showUP === false && (
                      <PxImage
                        source={require('../assets/6263633b82ffc36a6e7f789bf0617da6.png')}
                        layout={layouts.img23}
                      />
                    )}
                    {loginModel.showUP === true && (
                      <PxImage
                        source={require('../assets/showUPIcon.png')}
                        layout={layouts.img23}
                      />
                    )}
                  </PxTouchableOpacity>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    placeholder="密碼"
                    value={brsStore.brsUP}
                    secureTextEntry={!loginModel.showUP}
                    onChangeText={loginModel.onChangeTextUP}
                    style={{marginLeft: 60, flex: 1}}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.keyboardOpen = true;
                      brsStore.keyboardModal = this.refs.modal5;
                      this.refs.modal5.open();
                    }}>
                    <PxImage
                      source={require('../assets/mobile_keyboard.png')}
                      layout={layouts.img10}
                    />
                  </PxTouchableOpacity>
                </Px>
                <View style={styles.space76} />
                <PxTouchableOpacity
                  layout={layouts.group54}
                  navigation={this.props.navigation}
                  onPress={async () => {
                    brsStore.showBusyCursor('');
                    await loginModel.onLoginConfirm();
                    brsStore.dismissBusyCursor();
                    this.gotoLoginConfirm();
                  }}
                  >
                  <Px layout={layouts.rect17} />
                  <Px layout={layouts.txt18}>
                    <Text style={styles.txt18Content} ellipsizeMode={'clip'}>
                      {'登入'}
                    </Text>
                  </Px>
                </PxTouchableOpacity>

                <View style={styles.space76} />
                {/* 此區塊為弱勢出現連線失敗，該按鈕則會跳出來即可進行重新連線 */}
                {brsStore.brsFightServer === '連線失敗!!' && (
                  <PxTouchableOpacity
                    layout={layouts.group54}
                    navigation={this.props.navigation}
                    onPress={() => {
                      loginModel.getFightServer();
                    }}>
                    <Px layout={layouts.rect17} />
                    <Px layout={layouts.txt18}>
                      <Text style={styles.txt18Content} ellipsizeMode={'clip'}>
                        {'重連伺服器'}
                      </Text>
                    </Px>
                  </PxTouchableOpacity>
                )}
              </PxFlex>
            </Px>
            <View style={styles.space93} />
            <Px layout={layouts.group88}>
              <PxImage
                source={require('../assets/7d4ffc6b2f969bc88530734cabdc62ed.png')}
                layout={layouts.img13}
              />
              <Px layout={layouts.txt14}>
                <Text style={styles.txt14Content} ellipsizeMode={'clip'}>
                  {brsStore.EQUID}
                </Text>
              </Px>

              <Px layout={layouts.txt15}>
                <Text style={styles.txt14Content} ellipsizeMode={'clip'}>
                  {brsStore.verison}
                </Text>
              </Px>
            </Px>
            <View style={styles.space99} />
          </PxFlex>
        </Px>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal4'}>
          <BigKeyBoard
            value={brsStore.brsUI}
            valueEx={''}
            onPlusValue={this.plusValue}
            onBackValue={this.backValue}
            placeholder={'使用者名稱'}
            refs={this.refs}
            modal={'modal4'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal5'}>
          <BigKeyBoard
            value={brsStore.brsUP}
            valueEx={''}
            onPlusValue={this.plusValue2}
            onBackValue={this.backValue2}
            placeholder={'密碼'}
            refs={this.refs}
            modal={'modal5'}
          />
        </Modal>
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  img15Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 20, minWidth: 20},
  img15Body: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  group1Body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
  },

  modalHeight: {
    height: 550,
  },
  img79Body: {
    width: '160.22467054054982%',
    height: '104.13789082722306%',
    transform: [{translateX: 0}, {translateY: 0}],
    resizeMode: 'cover',
  },
  flexbox91Body: {width: '100%', height: '100%'},
  space97: {flexGrow: 0, flexShrink: 1, flexBasis: 117},
  group61Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 439, minHeight: 439},
  group61Body: {width: '100%', height: '100%'},
  rect12Body: {width: '100%', height: '100%', backgroundColor: '#ffffffff'},
  flexbox66Body: {width: '100%', height: '100%'},
  img38Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 62, minHeight: 62},
  img38Body: {width: '100%', height: '100%', resizeMode: 'cover'},
  space68: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 33.833320617676236,
    minHeight: 33.833320617676236,
  },
  group63Outer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 31.166679382323764,
    minHeight: 31.166679382323764,
  },
  group63Body: {width: '100%', height: '100%'},
  rect35Body: {width: '100%', height: '100%'},
  txt37Body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  txt37Content: {
    color: '#323232ff',
    textAlign: 'left',
    lineHeight: 30,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  img36Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space70: {flexGrow: 0, flexShrink: 0, flexBasis: 19, minHeight: 19},
  group40Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 38, minHeight: 38},
  group40Body: {width: '100%', height: '100%'},
  rect30Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#ffffffff',
    borderStyle: 'solid',
    borderColor: '#919191ff',
    borderWidth: 1,
  },
  flexbox47Body: {width: '100%', height: '100%', flexDirection: 'row'},
  img32Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 22, minWidth: 22},
  img32Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space49: {flexGrow: 0, flexShrink: 0, flexBasis: 12, minWidth: 12},
  img31Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 2, minWidth: 2},
  img31Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space51: {flexGrow: 1, flexShrink: 1, flexBasis: 160, minWidth: 160},
  img33Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 10, minWidth: 10},
  img33Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space72: {flexGrow: 0, flexShrink: 0, flexBasis: 21, minHeight: 21},
  group41Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 38, minHeight: 38},
  group41Body: {width: '100%', height: '100%'},
  rect25Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#ffffffff',
    borderStyle: 'solid',
    borderColor: '#919191ff',
    borderWidth: 1,
  },
  group43Body: {width: '100%', height: '100%'},
  img26Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  rect27Body: {width: '100%', height: '100%'},
  img28Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space74: {flexGrow: 0, flexShrink: 0, flexBasis: 21, minHeight: 21},
  group44Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 38, minHeight: 38},
  group44Body: {width: '100%', height: '100%'},
  rect20Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#ffffffff',
    borderStyle: 'solid',
    borderColor: '#919191ff',
    borderWidth: 1,
  },
  group42Body: {width: '100%', height: '100%'},
  img21Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  rect22Body: {width: '100%', height: '100%'},
  img23Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  space76: {flexGrow: 0, flexShrink: 0, flexBasis: 20, minHeight: 20},
  group54Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 41, minHeight: 41},
  group54Body: {width: '100%', height: '100%'},
  rect17Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#77be51ff',
  },
  txt18Body: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt18Content: {
    color: '#323232ff',
    textAlign: 'center',
    lineHeight: 25.2,
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  space93: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 59.566650390625,
  },
  group88Outer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 98.433349609375,
    minHeight: 98.433349609375,
  },
  group88Body: {width: '100%', height: '100%'},
  img13Body: {width: '100%', height: '100%', resizeMode: 'contain'},
  txt14Body: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txt14Content: {
    color: '#b0b0b0ff',
    textAlign: 'center',
    lineHeight: 33.599999999999994,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  space99: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 12.192321777343977,
    minHeight: 12.192321777343977,
  },
});

const layouts = {
  img10: {
    xy: [['40px'], ['0fr', '40px', '20px']],
    outerStyle: styles.img15Outer,
    style: styles.img15Body,
  },
  img09: {
    absolute: true,
    xy: [['200px', '40px', '5px'], ['0fr', '40px', '20px']],
    outerStyle: styles.img15Outer,
    style: styles.img15Body,
  },
  img79: {
    absolute: true,
    cross: true,
    xy: [['minmax(0px,360fr)'], ['minmax(696px,696fr)']],
    style: styles.img79Body,
  },
  rect12: {
    absolute: true,
    xy: [['minmax(0px,296fr)'], ['minmax(439px,439fr)']],
    style: styles.rect12Body,
  },
  img38: {
    xy: [['18px', 'minmax(0px,210fr)', '16px'], ['62px']],
    outerStyle: styles.img38Outer,
    style: styles.img38Body,
  },
  rect35: {
    absolute: true,
    xy: [['0px', '30px', '76fr'], ['minmax(31px,31fr)']],
    style: styles.rect35Body,
  },
  txt37: {
    absolute: true,
    xy: [
      ['45px', 'minmax(200px,auto)', '0px'],
      ['1fr', 'minmax(30px,auto)', '1fr'],
    ],
    style: styles.txt37Body,
  },
  img36: {
    absolute: true,
    xy: [['3px', '26px', '77fr'], ['3px', '25px', '3fr']],
    style: styles.img36Body,
  },
  group63: {
    xy: [['13fr', '106px', '125fr'], ['31px']],
    outerStyle: styles.group63Outer,
    style: styles.group63Body,
  },
  rect30: {
    absolute: true,
    xy: [['minmax(0px,242fr)'], ['minmax(38px,38fr)']],
    style: styles.rect30Body,
  },
  img32: {
    xy: [['22px'], ['3px', '20px', '2fr']],
    outerStyle: styles.img32Outer,
    style: styles.img32Body,
  },
  img31: {
    xy: [['2px'], ['25px']],
    outerStyle: styles.img31Outer,
    style: styles.img31Body,
  },
  img33: {
    xy: [['10px'], ['11px', '8px', '6fr']],
    outerStyle: styles.img33Outer,
    style: styles.img33Body,
  },
  flexbox47: {
    absolute: true,
    xy: [['15px', 'minmax(0px,206fr)', '21px'], ['6px', '25px', '7fr']],
    style: styles.flexbox47Body,
  },
  group40: {
    xy: [['0px', 'minmax(0px,242fr)', '2px'], ['38px']],
    outerStyle: styles.group40Outer,
    style: styles.group40Body,
  },
  rect25: {
    absolute: true,
    xy: [['minmax(0px,242fr)'], ['minmax(38px,38fr)']],
    style: styles.rect25Body,
  },
  img26: {
    absolute: true,
    xy: [['37fr', '2px', '0px'], ['3px', '25px', '4fr']],
    style: styles.img26Body,
  },
  rect27: {
    absolute: true,
    xy: [['0px', 'minmax(0px,30fr)', '9px'], ['minmax(32px,32fr)']],
    style: styles.rect27Body,
  },
  img28: {
    absolute: true,
    xy: [['6fr', '19px', '14fr'], ['4px', '22px', '6fr']],
    style: styles.img28Body,
  },
  group43: {
    //使用者的人像圖
    absolute: true,
    xy: [['13px', '39px', '190fr'], ['4px', 'minmax(32px,32fr)', '2fr']],
    style: styles.group43Body,
  },
  group41: {
    //使用者名稱整體框的內容
    xy: [['1px', 'minmax(0px,242fr)', '1px'], ['38px']],
    outerStyle: styles.group41Outer,
    style: styles.group41Body,
  },
  rect20: {
    absolute: true,
    xy: [['minmax(0px,242fr)'], ['minmax(38px,38fr)']],
    style: styles.rect20Body,
  },
  img21: {
    absolute: true,
    xy: [['37fr', '2px', '0px'], ['6px', '25px', '1fr']],
    style: styles.img21Body,
  },
  rect22: {
    absolute: true,
    xy: [['0px', 'minmax(0px,30fr)', '9px'], ['minmax(32px,32fr)']],
    style: styles.rect22Body,
  },
  img23: {
    absolute: true,
    xy: [['6fr', '19px', '14fr'], ['3px', '25px', '4fr']],
    style: styles.img23Body,
  },
  img24: {
    absolute: true,
    xy: [['32px', '19px', '14fr'], ['3px', '25px', '4fr']],
    style: styles.img23Body,
  },
  group42: {
    absolute: true,
    xy: [['12px', '39px', '191fr'], ['3px', 'minmax(32px,32fr)', '3fr']],
    style: styles.group42Body,
  },
  group44: {
    xy: [['2px', 'minmax(0px,242fr)', '0px'], ['38px']],
    outerStyle: styles.group44Outer,
    style: styles.group44Body,
  },
  rect17: {
    absolute: true,
    xy: [['minmax(0px,156fr)'], ['minmax(41px,41fr)']],
    style: styles.rect17Body,
  },
  txt18: {
    absolute: true,
    xy: [['minmax(156px,156fr)'], ['1fr', 'minmax(40px,auto)', '1fr']],
    style: styles.txt18Body,
  },
  group54: {
    xy: [['41fr', '156px', '47fr'], ['41px']],
    outerStyle: styles.group54Outer,
    style: styles.group54Body,
  },
  flexbox66: {
    absolute: true,
    xy: [
      ['25px', 'minmax(0px,244fr)', '27px'],
      ['9px', 'minmax(388px,388fr)', '42fr'],
    ],
    style: styles.flexbox66Body,
  },
  group61: {
    xy: [['minmax(0px,296fr)'], ['439px']],
    outerStyle: styles.group61Outer,
    style: styles.group61Body,
  },
  img13: {
    absolute: true,
    xy: [['44fr', '103px', '45fr'], ['63px', '38px', '0fr']],
    style: styles.img13Body,
  },
  txt14: {
    absolute: true,
    xy: [['minmax(0px,192fr)'], ['0px', 'minmax(33px,auto)', '35fr']],
    style: styles.txt14Body,
  },
  txt15: {
    absolute: true,
    xy: [['minmax(0px,192fr)'], ['30px', 'minmax(33px,auto)', '35fr']],
    style: styles.txt14Body,
  },
  group88: {
    xy: [['51fr', '192px', '53fr'], ['98px']],
    outerStyle: styles.group88Outer,
    style: styles.group88Body,
  },
  flexbox91: {
    absolute: true,
    xy: [['33px', 'minmax(0px,296fr)', '31px'], ['minmax(567px,696fr)']],
    style: styles.flexbox91Body,
  },
  group1: {absolute: true, xy: [['100%'], ['100%']], style: styles.group1Body},
};

export default LoginScreen;
