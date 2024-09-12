import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Alert} from '../components/Alert';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import posize from './posize.v11';
import BrsPopupMenu from './BrsPopupMenu';
import {brsStore} from '../storage/brsStore';
import {observer} from 'mobx-react';
import {operationStore} from '../storage/operationStore';
import {bsmStore} from '../storage/bsmStore';
import {DataSelectFlightModel} from '../model/Data_SelectFlightModel';
import {cabinDestListItemsModel} from '../model/CabinDestListItemsModel';
import {cartListItemsModel} from '../model/CartListItemsModel';
import log from '../module/Logger';
import Moment from 'moment';
import RNFS from 'react-native-fs';
import Slider from '@react-native-community/slider';
import {loginModel} from '../model/LoginModel';
import {observable} from 'mobx';
const PxTouchableOpacity = posize(TouchableOpacity);
const Px = posize(View);
const PxFlex = posize(View);
const PxImage = posize(Image);
@observer
class BrsHeader extends React.Component {
  static inStorybook = true;
  static fitScreen = false;
  static scrollHeight = 55;

  static propTypes = {};
  static defaultProps = {};
  lastBackPressed = 0;
  @observable volume = 1;
  @observable brightness = 1;

  async componentDidMount() {
    this.brightness = await loginModel.getBrightness();
    this.volume = await loginModel.getVolume();
    brsStore.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
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
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    this.brightness = await loginModel.getBrightness();
    this.volume = await loginModel.getVolume();
  }

  backAction = () => {
    if (brsStore.keyboardOpen === true) {
      brsStore.keyboardModal.close();
      brsStore.keyboardOpen = false;
    } else {
      if (
        operationStore.selectflighItem === '' &&
        brsStore.alertlock === true
      ) {
        Alert.alert('', '請重新選擇作業航班。', [
          {
            text: '離開',
            onPress: () => {
              brsStore.alertlock = false;
              brsStore.navigatelevel = 1;
              brsStore.navigatelevelLock = false;
              brsStore.navigateGotoBrsButtomTab = false; 
              brsStore.bagLoadEntrypoint = false; 
              brsStore.navigateSelectFlight = false; 
              brsStore.selectFlightEntrypoint = false; 
              brsStore.selectCartNoEntrypoint = false; 
              brsStore.fromBoxBagLoad = false; 
              console.log('backAction(1)=>作業選擇=>=>=>=>=>=>=>=>=>=>=>');
              this.props.navigation.navigate('作業選擇');
            },
          },
          {
            text: '挑選',
            onPress: () => {
              brsStore.navigateGotoBrsButtomTab = true; 
              brsStore.alertlock = false;
              if (DataSelectFlightModel.lock === false) {
                DataSelectFlightModel.lock = true;
                this.props.navigation.push('Data_SelectFlightForm');
              }
            },
          },
        ]);
      } else {
        if (this.props.navigation.canGoBack()) {
          
          if (
            DataSelectFlightModel.dowloadFidsBusy === 0 &&
            cabinDestListItemsModel.dowloadCabinBusy === 0 &&
            cartListItemsModel.dowloadCartBusy === 0
          ) {
            if (brsStore.navigatelevelLock === false) {
              brsStore.navigatelevelLock = true;
              if (
                brsStore.bagLoadEntrypoint === true &&
                bsmStore.addBagListItem.length !== 0
              ) {
                let message = `確認是否離開此頁? \n\n否: 繼續行李裝載作業。\n是: 將會 '捨棄/遺失' 未確認的行李裝載資料!!`;
                Alert.alert('', message, [
                  {
                    text: '是',
                    onPress: () => {
                      log._transportOptions.loggerName =
                        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
                      log.info(
                        "地勤人員選擇 '捨棄/遺失' 未確認的行李裝載資料!!",
                      );
                      if (brsStore.navigateGotoBrsButtomTab === true) {
                        brsStore.navigatelevel = 1;
                        brsStore.navigatelevelLock = false;
                        brsStore.navigateGotoBrsButtomTab = false; 
                        brsStore.bagLoadEntrypoint = false; 
                        brsStore.navigateSelectFlight = false; 
                        brsStore.selectFlightEntrypoint = false; 
                        brsStore.selectCartNoEntrypoint = false; 
                        brsStore.fromBoxBagLoad = false; 
                        console.log('backAction(2)=>作業選擇=>=>=>=>=>=>=>=>');
                        this.props.navigation.navigate('作業選擇');
                      } else {
                        if (brsStore.navigatelevel >= 2) {
                          brsStore.navigatelevel = brsStore.navigatelevel - 1;
                        }
                        brsStore.bagLoadEntrypoint = false; 
                        brsStore.navigatelevelLock = false;
                        console.log(
                          `backAction(3)=>brsStore.navigatelevel = ${
                            brsStore.navigatelevel
                          } `,
                        );
                        this.props.navigation.goBack();
                      }
                    },
                  },
                  {
                    text: '否',
                    onPress: () => (brsStore.navigatelevelLock = false),
                  },
                ]);
              } else {
                if (brsStore.navigateGotoBrsButtomTab === true) {
                  brsStore.navigatelevel = 1;
                  brsStore.navigatelevelLock = false;
                  brsStore.navigateGotoBrsButtomTab = false; 
                  brsStore.bagLoadEntrypoint = false; 
                  brsStore.navigateSelectFlight = false; 
                  brsStore.selectFlightEntrypoint = false; 
                  brsStore.selectCartNoEntrypoint = false; 
                  brsStore.fromBoxBagLoad = false; 
                  console.log('backAction(4)=>作業選擇=>=>=>=>=>=>=>=>=>=>=>');
                  this.props.navigation.navigate('作業選擇');
                } else {
                  if (brsStore.navigatelevel !== 0) {
                    if (brsStore.navigatelevel >= 2) {
                      brsStore.navigatelevel = brsStore.navigatelevel - 1;
                      brsStore.navigatelevelLock = false;
                      console.log(
                        `backAction(5)=>brsStore.selectFlightEntrypoint = ${
                          brsStore.selectFlightEntrypoint
                        } - brsStore.selectCartNoEntrypoint = ${
                          brsStore.selectCartNoEntrypoint
                        }- brsStore.navigatelevel = ${
                          brsStore.navigatelevel
                        } - brsStore.navigateSelectFlight = ${
                          brsStore.navigateSelectFlight
                        }`,
                      );
                      
                      if (brsStore.selectFlightEntrypoint) {
                        if (brsStore.navigateSelectFlight) {
                          brsStore.navigateSelectFlight = false; 
                          brsStore.selectFlightEntrypoint = false; 
                        }
                      }
                      
                      if (brsStore.selectCartNoEntrypoint) {
                        if (brsStore.navigateSelectFlight) {
                          brsStore.navigateSelectFlight = false; 
                          brsStore.selectCartNoEntrypoint = false; 
                        }
                      }

                      
                      if (brsStore.navigateSelectFlight) {
                        if (!brsStore.selectFlightEntrypoint) {
                          brsStore.selectFlightEntrypoint = true; 
                        }
                      }

                      
                      if (
                        brsStore.fromBoxBagLoad === true &&
                        brsStore.navigatelevel == 2
                      ) {
                        brsStore.fromBoxBagLoad = false; 
                        brsStore.bagLoadEntrypoint = true;
                        console.log(`backAction(6)=>=>=>=>=>=>=>=>`);
                        console.log(
                          'backAction(6) 1 navigatelevel:' +
                            brsStore.navigatelevel,
                        );
                        console.log(
                          'backAction(6) 2 bagLoadEntrypoint:' +
                            (brsStore.bagLoadEntrypoint == true
                              ? '裝載頁'
                              : '非裝載頁'),
                        );
                        console.log(
                          'backAction(6) 3 navigateSelectFlight:' +
                            (brsStore.navigateSelectFlight == true
                              ? '鎖住'
                              : '開啟'),
                        );
                        console.log(
                          'backAction(6) 4 selectFlightEntrypoint:' +
                            (brsStore.selectFlightEntrypoint == true
                              ? '航班首頁'
                              : '非航班首頁'),
                        );
                        console.log(
                          'backAction(6) 5 selectCartNoEntrypoint:' +
                            (brsStore.selectCartNoEntrypoint == true
                              ? '選櫃頁'
                              : '非選櫃頁'),
                        );
                      }

                      
                      if (brsStore.navigatelevel === 1) {
                        brsStore.navigatelevelLock = false;
                        brsStore.navigateGotoBrsButtomTab = false; 
                        brsStore.bagLoadEntrypoint = false; 
                        brsStore.navigateSelectFlight = false; 
                        brsStore.selectFlightEntrypoint = false; 
                        brsStore.selectCartNoEntrypoint = false; 
                        brsStore.fromBoxBagLoad = false; 
                        console.log(
                          `backAction(7)=>brsStore.selectFlightEntrypoint = ${
                            brsStore.selectFlightEntrypoint
                          } - brsStore.selectCartNoEntrypoint = ${
                            brsStore.selectCartNoEntrypoint
                          }- brsStore.navigatelevel = ${
                            brsStore.navigatelevel
                          } - brsStore.navigateSelectFlight = ${
                            brsStore.navigateSelectFlight
                          }`,
                        );
                      }
                      this.props.navigation.goBack();
                    } else if (brsStore.navigatelevel === 1) {
                      if (
                        brsStore.brsUserLogin !== true &&
                        brsStore.adminLogin === true &&
                        brsStore.adminP === 'admin20'
                      ) {
                        Alert.alert(
                          '',
                          `資安管控，請您進入'帳號管理'變更管理者密碼。`,
                          [
                            {
                              text: '離開',
                              onPress: () => null,
                            },
                          ],
                        );
                      } else {
                        BrsPopupMenu.alertExit(
                          this.props.navigation,
                          'LoginScreen',
                          'logout',
                        );
                      }
                    }
                  } else {
                    console.log('BrsPopupMenu.alertExit(exitApp)');
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      '',
                      'exitApp',
                    );
                    brsStore.navigatelevelLock = false;
                  }
                }
              }
              brsStore.navigatelevelLock = false;
            }
          } else {
            Alert.alert('', '請等待下載結束，再執行返回功能。', [
              {
                text: '離開',
                onPress: () => null,
              },
            ]);
          }
        } else {
          if (
            this.lastBackPressed &&
            this.lastBackPressed + 200 >= Date.now()
          ) {
            BrsPopupMenu.alertExit(this.props.navigation, '', 'exitApp');
          } else {
            this.lastBackPressed = Date.now();
          }
        }
      }
    }
    return true;
  };
  render() {
    return (
      <Px layout={layouts.groupHeaderbuttons}>
        {brsStore.connectionFailed == false && (
          <StatusBar backgroundColor="gray" />
        )}
        {brsStore.connectionFailed == true && (
          <StatusBar backgroundColor="red" />
        )}
        <Px layout={layouts.rectHeaderbuttons} />
        <PxFlex layout={layouts.flexbox47}>
          <View style={styles.space56} />

          <PxTouchableOpacity
            layout={layouts.groupGoBack}
            onPress={() => {
              this.backAction();
            }}>
            <PxImage
              source={require('../assets/c3ae2958a3b6227a0052d361e43c9f75.png')}
              layout={layouts.imgGoBack}
            />
          </PxTouchableOpacity>

          <View style={styles.space49} />
          <Px layout={layouts.txtHeaderTitle}>
            <Text style={styles.txtHeaderTitleContent} ellipsizeMode={'clip'}>
              {this.props.title}
            </Text>
          </Px>
          <View style={styles.space51} />

          {brsStore.syncServer > 0 && brsStore.brsUserLogin === true && (
            <TouchableOpacity
              onPress={() => {
                BrsPopupMenu.aboutMessage();
              }}>
              <Px layout={layouts.img41}>
                <ActivityIndicator size="large" />
              </Px>
            </TouchableOpacity>
          )}
          {brsStore.syncServer > 0 && brsStore.brsUserLogin !== true && (
            <TouchableOpacity>
              <Px layout={layouts.img41}>
                <ActivityIndicator size="large" />
              </Px>
            </TouchableOpacity>
          )}
          {brsStore.syncServer === 0 &&
            brsStore.brsUserLogin === true &&
            brsStore.brsFightServer === 'EGAS' && (
              <TouchableOpacity
                onPress={() => {
                  BrsPopupMenu.aboutMessage();
                }}>
                <PxImage
                  source={require('../assets/egasiconhearder.png')}
                  layout={layouts.img41}
                />
              </TouchableOpacity>
            )}
          {brsStore.syncServer === 0 &&
            brsStore.brsUserLogin === true &&
            brsStore.brsFightServer === 'SJXG' && (
              <TouchableOpacity
                onPress={() => {
                  BrsPopupMenu.aboutMessage();
                }}>
                <PxImage
                  source={require('../assets/starluxiconhearder.png')}
                  layout={layouts.img41}
                />
              </TouchableOpacity>
            )}

          {brsStore.syncServer === 0 &&
            brsStore.brsUserLogin === true &&
            brsStore.brsFightServer === 'TIAS' && (
              <TouchableOpacity
                onPress={() => {
                  BrsPopupMenu.aboutMessage();
                }}>
                <PxImage
                  source={require('../assets/tiasheardericon.png')}
                  layout={layouts.img41}
                />
              </TouchableOpacity>
            )}
          {brsStore.syncServer === 0 && brsStore.brsUserLogin !== true && (
            <TouchableOpacity>
              <Px layout={layouts.img41} />
            </TouchableOpacity>
          )}
          <View style={styles.space53} />
          <Menu>
            <MenuTrigger>
              <Image
                source={require('../assets/431d20ff3aebeb96b8fe993eac673c45.png')}
                style={{marginVertical: 10, marginHorizontal: 5}}
              />
            </MenuTrigger>
            <MenuOptions>
              {console.log(
                'BrsHeader 1 navigatelevel:' + brsStore.navigatelevel,
              )}
              {}
              {}
              {}
              {}
              {}
              {}
              {}
              {console.log(
                'BrsHeader 4 bagLoadEntrypoint:' +
                  (brsStore.bagLoadEntrypoint == true ? '裝載頁' : '非裝載頁'),
              )}

              {console.log(
                'BrsHeader 5 navigateSelectFlight:' +
                  (brsStore.navigateSelectFlight == true ? '鎖住' : '開啟'),
              )}

              {console.log(
                'BrsHeader 6 selectFlightEntrypoint:' +
                  (brsStore.selectFlightEntrypoint == true
                    ? '航班首頁'
                    : '非航班首頁'),
              )}
              {console.log(
                'BrsHeader 7 selectCartNoEntrypoint:' +
                  (brsStore.selectCartNoEntrypoint == true
                    ? '選櫃頁'
                    : '非選櫃頁'),
              )}
              {console.log(
                'BrsHeader 8 brsStore.brsUserLogin:' +
                  (brsStore.brsUserLogin == true
                    ? '地勤人員登入'
                    : brsStore.brsUserLogin),
              )}
              {console.log(
                'BrsHeader 9 brsStore.adminLogin:' +
                  (brsStore.adminLogin == true
                    ? '管理人員登入'
                    : brsStore.adminLogin),
              )}
              {}
              {}
              {}
              {brsStore.brsUserLogin === true && (
                <BrsPopupMenu navigation={this.props.navigation} />
              )}
              <View style={layouts.container}>
                <View style={styles.space52} />
                <Text style={styles.txtSliderContent} ellipsizeMode={'clip'}>
                  {'音量'}
                </Text>
                <Slider
                  maximumValue={1}
                  minimumValue={0}
                  minimumTrackTintColor="#307ecc"
                  maximumTrackTintColor="#000000"
                  step={0}
                  value={this.volume}
                  onSlidingComplete={async value => {
                    await loginModel.setVolume(value);
                    this.volume = value;
                    operationStore.scanread.play();
                  }}
                  onValueChange={async value => {
                    await loginModel.setVolume(value);
                    this.volume = value;
                    operationStore.scanread.play();
                  }}
                />
              </View>

              {true && (
                <View style={layouts.container}>
                  <Text style={styles.txtSliderContent} ellipsizeMode={'clip'}>
                    {'亮度'}
                  </Text>
                  <Slider
                    maximumValue={1}
                    minimumValue={0.01} 
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={0}
                    value={this.brightness}
                    onSlidingComplete={async value => {
                      
                      await loginModel.setBrightness(value);
                      this.brightness = value;
                    }}
                    onValueChange={async value => {
                      
                      await loginModel.setBrightness(value);
                      this.brightness = value;
                    }}
                  />
                  <View style={styles.space52} />
                </View>
              )}
              <MenuOption
                onSelect={() => {
                  if (
                    brsStore.brsUserLogin !== true &&
                    brsStore.adminLogin === true &&
                    brsStore.adminP === 'admin20'
                  ) {
                    Alert.alert(
                      '',
                      `資安管控，請您進入'帳號管理'變更管理者密碼。`,
                      [
                        {
                          text: '離開',
                          onPress: () => null,
                        },
                      ],
                    );
                  } else {
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      'LoginScreen',
                      'logout',
                    );
                  }
                }}>
                {brsStore.brsUserLogin === true && (
                  <Text style={styles.txtContent}>登出</Text>
                )}
                {brsStore.brsUserLogin !== true &&
                  brsStore.adminLogin !== true && (
                    <Text style={styles.txtCenterContent}>登出</Text>
                  )}
                {brsStore.brsUserLogin !== true &&
                  brsStore.adminLogin === true && (
                    <Text style={styles.txtCenterContent}>儲存離開</Text>
                  )}
              </MenuOption>
            </MenuOptions>
          </Menu>
          <View style={styles.space58} />
        </PxFlex>
      </Px>
    );
  }
}

const styles = StyleSheet.create({
  groupBody: {width: '100%', height: '100%'},
  rectHeaderbuttonsBody: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e3e3e3ff',
  },
  flexbox47Body: {width: '100%', height: '100%', flexDirection: 'row'},
  space56: {flexGrow: 0, flexShrink: 0, flexBasis: 7, minWidth: 7},
  groupGoBackOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 28, minWidth: 28},
  groupGoBackBody: {width: '100%', height: '100%'},
  imgGoBackBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  space49: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 96.9998779296875,
    minWidth: 96.9998779296875,
  },
  txtHeaderTitleOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 'auto'},
  txtHeaderTitleBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtHeaderTitleContent: {
    color: '#323232ff',
    textAlign: 'center',
    lineHeight: 33.599999999999994,
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  space51: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 47.0001220703125,
    minWidth: 47.0001220703125,
  },
  img41Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 40, minWidth: 40},
  imgBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  space53: {flexGrow: 0, flexShrink: 0, flexBasis: 10, minWidth: 10},
  space52: {flexGrow: 0, flexShrink: 0, flexBasis: 10, minHeight: 10},
  imgDrawerOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 18, minWidth: 18},
  imgDrawerBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  space58: {flexGrow: 0, flexShrink: 0, flexBasis: 17, minWidth: 17},
  txtSliderContent: {
    color: 'blue',
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  txtContent: {
    color: 'red',
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  txtCenterContent: {
    color: 'red',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

const layouts = {
  container: {
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

  rectHeaderbuttons: {
    absolute: true,
    xy: [['minmax(0px,360fr)'], ['minmax(55px,55fr)']],
    style: styles.rectHeaderbuttonsBody,
  },
  imgGoBack: {
    xy: [['10px', '8px', '10fr'], ['10px', '13px', '10fr']],
    style: styles.imgGoBackBody,
  },
  groupGoBack: {
    xy: [['28px'], ['2px', '33px', '0fr']],
    outerStyle: styles.groupGoBackOuter,
    style: styles.groupGoBackBody,
  },
  txtHeaderTitle: {
    xy: [['1fr', 'auto', '1fr'], ['1fr', 'minmax(33px,auto)', '2fr']],
    outerStyle: styles.txtHeaderTitleOuter,
    style: styles.txtHeaderTitleBody,
  },
  img41: {
    xy: [['40px'], ['3px', '30px', '2fr']],
    outerStyle: styles.img41Outer,
    style: styles.imgBody,
  },
  imgDrawer: {
    xy: [['18px'], ['11px', '13px', '11fr']],
    outerStyle: styles.imgDrawerOuter,
    style: styles.imgDrawerBody,
  },
  flexbox47: {
    absolute: true,
    xy: [['minmax(0px,360fr)'], ['9px', '35px', '11fr']],
    style: styles.flexbox47Body,
  },
  groupHeaderbuttons: {
    xy: [['minmax(0px,360fr)'], ['55px']],
    style: styles.groupBody,
  },
};

export default BrsHeader;
