import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Alert} from './Alert';
import posize from './posize.v11';
import {MenuOption} from 'react-native-popup-menu';
import {brsStore} from '../storage/brsStore';
import {offLineStore} from '../storage/offLineStore';

import {bsmStore} from '../storage/bsmStore';

import {DataSelectFlightModel} from '../model/Data_SelectFlightModel';
import {cartListItemsModel} from '../model/CartListItemsModel';
import Moment from 'moment';
import {operationStore} from '../storage/operationStore';
import {cabinDestListItemsModel} from '../model/CabinDestListItemsModel';
import {bsmListItemsModel} from '../model/BSMListItemsModel';
import {observer} from 'mobx-react';
import {operationModule} from '../module/OperationModule';
import log from '../module/Logger';
import RNFS from 'react-native-fs';
const Px = posize(View);
const PxFlex = posize(View);
const PxImage = posize(Image);
const PxMenuOption = posize(MenuOption);

@observer
class BrsPopupMenu extends React.Component {
  static inStorybook = true;
  static fitScreen = false;
  static scrollHeight = 246;

  static propTypes = {};
  static defaultProps = {};

  static aboutMessage() {
    let operationMode = brsStore.online
      ? brsStore.wifiOff
        ? '連線操作(無網路連線)'
        : '連線操作'
      : brsStore.nearAirplan
      ? '機邊作業'
      : '離線作業';
    let usePlace = brsStore.usePlace === 'T1' ? '第一航廈' : '第二航廈';
    let upload = brsStore.upload ? '有' : '無';

    let message = '';

    if (brsStore.upload === true) {
      message = `作業航廈: ${usePlace}\n登入帳號: ${
        brsStore.brsUI
      }\n公司名稱: ${brsStore.brsFightServer}\n設備機號: ${
        brsStore.EQUID
      }\n作業模式: ${operationMode}\n待傳資料: ${upload} ${
        offLineStore.offLineKeepStoreCount
      } 筆\n發生時間: ${Moment(
        offLineStore.offLineKeepStoreLastDateTime,
      ).format('yyyy/MM/DD ')}${Moment(
        offLineStore.offLineKeepStoreLastDateTime,
      ).format('LTS')}\n\n無法更新作業資訊，請連網'資料上傳'\n`;
    } else {
      message = `作業航廈: ${usePlace}\n登入帳號: ${
        brsStore.brsUI
      }\n公司名稱: ${brsStore.brsFightServer}\n設備機號: ${
        brsStore.EQUID
      }\n作業模式: ${operationMode}\n待傳資料: ${upload}`;
    }

    Alert.alert('', message, [
      {
        text: '離開',
        onPress: () => null,
      },
    ]);
  }
  static alertExit = (navigation, jumpTo, action) => {
    let message;
    if (action == 'logout') {
      message = '確認是否登出系統?';
    } else if (action == 'logout2') {
      if (
        brsStore.bagLoadEntrypoint === true &&
        bsmStore.addBagListItem.length !== 0
      ) {
        message = `您非常確認登出系統嗎?\n\n否: 繼續行李裝載作業。\n是: 將會 '捨棄/遺失' 未確認的行李裝載資料!!`;
      } else {
        message = '您非常確認要登出系統嗎?';
      }
    } else if (action == 'goto') {
      if (
        brsStore.bagLoadEntrypoint === true &&
        bsmStore.addBagListItem.length !== 0
      ) {
        message = `確認是否離開此頁? \n\n否: 繼續行李裝載作業。\n是: 將會 '捨棄/遺失' 未確認的行李裝載資料!!`;
      } else {
        message = '確認是否離開此頁?';
      }
    } else if (action == 'exitApp') {
      message = '確認是否關閉系統?';
    } else if (action == 'exitApp2') {
      if (
        brsStore.bagLoadEntrypoint === true &&
        bsmStore.addBagListItem.length !== 0
      ) {
        message = `您非常確認要關閉系統嗎? \n\n否: 繼續行李裝載作業。\n是: 將會 '捨棄/遺失' 未確認的行李裝載資料!!`;
      } else {
        message = '您非常確認要關閉系統嗎?';
      }
    }
    if (action == 'exitApp2' || action == 'logout2') {
      Alert.alert('', message, [
        {
          text: '是',
          onPress: () => {
            if (
              brsStore.bagLoadEntrypoint === true &&
              bsmStore.addBagListItem.length !== 0
            ) {
              log._transportOptions.loggerName =
                Moment().format('yyyy-MM-DD') + '_brsLogsFile';
              log.info("地勤人員選擇 '捨棄/遺失' 未確認的行李裝載資料!!");
            }
            if (action == 'logout2') {
              log._transportOptions.loggerName =
                Moment().format('yyyy-MM-DD') + '_brsLogsFile';
              log.info('登出系統');
              brsStore.navigatelevel = 0;
              brsStore.navigatelevelLock = false;
              brsStore.navigateGotoBrsButtomTab = false; 
              brsStore.bagLoadEntrypoint = false; 
              brsStore.navigateSelectFlight = false; 
              brsStore.selectFlightEntrypoint = false; 
              brsStore.selectCartNoEntrypoint = false; 
              brsStore.fromBoxBagLoad = false; 
              console.log('alertExit(1)=>確認登出');
              
              if (brsStore.getFIDSIntervalId != '') {
                clearInterval(brsStore.getFIDSIntervalId);
                brsStore.getFIDSIntervalId = '';
              }
              navigation.replace(jumpTo);
            } else if (action == 'exitApp2') {
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
                log._transportOptions.loggerName =
                  Moment().format('yyyy-MM-DD') + '_brsLogsFile';
                log.info('關閉系統');
                brsStore.navigatelevel = 0;
                brsStore.navigatelevelLock = false;
                brsStore.navigateGotoBrsButtomTab = false; 
                brsStore.bagLoadEntrypoint = false; 
                brsStore.navigateSelectFlight = false; 
                brsStore.selectFlightEntrypoint = false; 
                brsStore.selectCartNoEntrypoint = false; 
                brsStore.fromBoxBagLoad = false; 
                console.log('alertExit(2)=>確認離開系統');
                
                if (brsStore.getFIDSIntervalId != '') {
                  clearInterval(brsStore.getFIDSIntervalId);
                  brsStore.getFIDSIntervalId = '';
                }

                BackHandler.exitApp(); 
              }
            }
          },
        },
        {
          text: '否',
          onPress: () => (brsStore.navigatelevelLock = false),
        },
      ]);
    } else {
      Alert.alert('', message, [
        {
          text: '否',
          onPress: () => (brsStore.navigatelevelLock = false),
        },
        {
          text: '是',
          onPress: () => {
            if (action == 'logout') {
              this.alertExit(navigation, 'LoginScreen', 'logout2');
            } else if (action == 'goto') {
              
              brsStore.navigatelevel = 1;
              brsStore.navigatelevelLock = false;
              brsStore.navigateGotoBrsButtomTab = false; 
              brsStore.bagLoadEntrypoint = false; 
              brsStore.navigateSelectFlight = false; 
              brsStore.selectFlightEntrypoint = false; 
              brsStore.selectCartNoEntrypoint = false; 
              brsStore.fromBoxBagLoad = false; 
              console.log(
                'alertExit(3)=>由漢堡功能鍵選取 "資料" "裝載" "卸載" "查詢" 離開',
              );
              navigation.navigate(jumpTo);
            } else if (action == 'exitApp') {
              this.alertExit(navigation, '', 'exitApp2');
            }
          },
        },
      ]);
    }
  };
  async componentDidMount() {
    if (DataSelectFlightModel.flight === '') {
      operationStore.selectflighItem = '';
    }
    if (brsStore.brsUserLogin === true) {
      if (brsStore.navigatelevel === 1) {
        layouts.group84.xy = [['190px'], ['120px']];
        layouts.img33.xy = [
          ['8px', 'minmax(0px,171fr)', '11px'],
          ['0px', 'minmax(120px,120fr)', '6fr'],
        ];
        layouts.rect35.xy = [
          ['8px', 'minmax(0px,171fr)', '11px'],
          ['0px', 'minmax(120px,120fr)', '6fr'],
        ];
      } else {
        layouts.group84.xy = [['190px'], ['246px']];
        layouts.img33.xy = [
          ['8px', 'minmax(0px,171fr)', '11px'],
          ['0px', 'minmax(240px,240fr)', '6fr'],
        ];
        layouts.rect35.xy = [
          ['8px', 'minmax(0px,171fr)', '11px'],
          ['0px', 'minmax(240px,240fr)', '6fr'],
        ];
      }
    } else {
      layouts.group84.xy = [['190px'], ['80px']];
      layouts.img33.xy = [
        ['4px', 'minmax(190px,32px)', '4px'],
        ['0px', 'minmax(40px,80fr)', '6fr'],
      ];
      layouts.rect35.xy = [
        ['4px', 'minmax(190px,32px)', '4px'],
        ['0px', 'minmax(40px,80fr)', '6fr'],
      ];
    }
    if (brsStore.brsUserLogin === true) {
      RNFS.readDir(log._transportOptions.loggerPath).then(ReadDirItem => {
        for (let i = 0; i < ReadDirItem.length; i++) {
          if (
            Moment().diff(ReadDirItem[i].mtime, 'days') >=
            brsStore.logFileKeepDay
          ) {
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
      console.log('navigatelevel:' + brsStore.navigatelevel);
      let beforeYesterday = new Date().setDate(new Date().getDate() - 2);
      
      DataSelectFlightModel.deleteExpiredFIDS(beforeYesterday);
      
      cartListItemsModel.deleteExpiredCART(beforeYesterday);
      
      bsmListItemsModel.deleteExpiredBSM(beforeYesterday);
      
      cabinDestListItemsModel.deleteExpiredCabinDest(beforeYesterday);
      
      if (
        Moment(operationStore.selectedDate).format('yyyyMMDD') <=
        Moment(beforeYesterday).format('yyyyMMDD')
      ) {
        DataSelectFlightModel.dowloadFidsBusy =
          DataSelectFlightModel.dowloadFidsBusy + 1;
        let date = new Date();
        operationStore.selectedDate = date;

        if (operationStore.selectflighItem !== '') {
          brsStore.alertlock = true;
          DataSelectFlightModel.flight = '';
          operationStore.selectflighItem = '';
        }
        if (brsStore.upload === false) {
          brsStore.syncServer = brsStore.syncServer + 1; 
          await DataSelectFlightModel.getSelectFIDSByFlightDay(date);
          brsStore.syncServer = brsStore.syncServer - 1; 
        }
        DataSelectFlightModel.renewFlightListItems(date);
        DataSelectFlightModel.dowloadFidsBusy =
          DataSelectFlightModel.dowloadFidsBusy - 1;
        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy + 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy + 1;
        
        await DataSelectFlightModel.asyncForEach(
          operationStore.FIDSListItems,
          cartListItemsModel.getSelectCARTByFlightDayFlightNo,
          cabinDestListItemsModel.getCartPatternByFlightInfo,
          cabinDestListItemsModel.getCabinDestByUserWithFlightInfo,
          bsmListItemsModel.getBSMByFlightDayFlightNo,
          Moment(date).format('yyyyMMDD'),
        );
        
        cartListItemsModel.renewCartListItems(
          Moment(date).format('yyyyMMDD'),
          '',
          true,
        );
        
        cabinDestListItemsModel.renewCabinDestListItems(
          Moment(date).format('yyyyMMDD'),
          '',
          true,
        );

        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy - 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy - 1;
      }
    }
  }

  render() {
    return (
      <Px layout={layouts.group84}>
        <PxImage
          source={require('../assets/7f07b01641f3f2dc02cd41d4059af711.png')}
          layout={layouts.img33}
        />
        <Px layout={layouts.rect35} />

        <PxFlex layout={layouts.flexbox110}>
          {brsStore.navigatelevel != 1 &&
            brsStore.navigatelevel != 0 &&
            brsStore.brsUserLogin === true && (
              <Px layout={layouts.group99}>
                <PxMenuOption
                  layout={layouts.group86}
                  onSelect={() => {
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      '資料',
                      'goto',
                    );
                  }}
                  disabled={!brsStore.dataTab}>
                  <PxImage
                    source={require('../assets/131d9c55d2cbc17a29c88af4e35e7b12.png')}
                    layout={layouts.img62}
                  />
                  <Px layout={layouts.txt64}>
                    <Text style={styles.txtContent} ellipsizeMode={'clip'}>
                      {'資料'}
                    </Text>
                  </Px>
                  <PxImage
                    source={require('../assets/ca7315dc392da2946f2200bcaeecb3df.png')}
                    layout={layouts.img65}
                  />
                  <Px layout={layouts.rect67} />
                </PxMenuOption>
                <PxMenuOption
                  layout={layouts.group87}
                  onSelect={() => {
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      '裝載',
                      'goto',
                    );
                  }}
                  disabled={!brsStore.loadTab}>
                  <PxImage
                    source={require('../assets/131d9c55d2cbc17a29c88af4e35e7b12.png')}
                    layout={layouts.img54}
                  />
                  <Px layout={layouts.txt56}>
                    <Text style={styles.txtContent} ellipsizeMode={'clip'}>
                      {'裝載'}
                    </Text>
                  </Px>
                  <PxImage
                    source={require('../assets/ca7315dc392da2946f2200bcaeecb3df.png')}
                    layout={layouts.img57}
                  />
                  <Px layout={layouts.rect59} />
                </PxMenuOption>
                <PxMenuOption
                  layout={layouts.group88}
                  onSelect={() => {
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      '卸載',
                      'goto',
                    );
                  }}
                  disabled={!brsStore.unloadTab}>
                  <PxImage
                    source={require('../assets/131d9c55d2cbc17a29c88af4e35e7b12.png')}
                    layout={layouts.img46}
                  />
                  <Px layout={layouts.txt48}>
                    <Text style={styles.txtContent} ellipsizeMode={'clip'}>
                      {'卸載'}
                    </Text>
                  </Px>
                  <PxImage
                    source={require('../assets/ca7315dc392da2946f2200bcaeecb3df.png')}
                    layout={layouts.img49}
                  />
                  <Px layout={layouts.rect51} />
                </PxMenuOption>

                <PxMenuOption
                  layout={layouts.group89}
                  onSelect={() => {
                    BrsPopupMenu.alertExit(
                      this.props.navigation,
                      '查詢',
                      'goto',
                    );
                  }}
                  disabled={!brsStore.searchTab}>
                  <PxImage
                    source={require('../assets/131d9c55d2cbc17a29c88af4e35e7b12.png')}
                    layout={layouts.img38}
                  />
                  <Px layout={layouts.txt40}>
                    <Text style={styles.txtContent} ellipsizeMode={'clip'}>
                      {'查詢'}
                    </Text>
                  </Px>
                  <PxImage
                    source={require('../assets/ca7315dc392da2946f2200bcaeecb3df.png')}
                    layout={layouts.img41}
                  />
                  <Px layout={layouts.rect43} />
                  <PxImage
                    source={require('../assets/9b796709403abf541f37bd43a6256422.png')}
                    layout={layouts.img79}
                  />
                </PxMenuOption>
              </Px>
            )}

          <PxFlex layout={layouts.flexbox102}>
            {(brsStore.synclock === true || brsStore.syncServer !== 0) && (
              <PxMenuOption layout={layouts.group90} disabled={true}>
                <Px layout={layouts.txt74}>
                  <ActivityIndicator />
                </Px>
                <Px layout={layouts.rect76} />
                <PxImage
                  source={require('../assets/a3202bd93c8b0edf390d74e9122b8566.png')}
                  layout={layouts.img77}
                />
                <PxImage
                  source={require('../assets/438e7dfc8ea9bb40321550496288d3b5.png')}
                  layout={layouts.img78}
                />
              </PxMenuOption>
            )}
            {brsStore.synclock === false && brsStore.syncServer === 0 && (
              <PxMenuOption
                layout={layouts.group90}
                onSelect={() => {
                  if (brsStore.upload === false) {
                    operationModule.getFidsCartByDay(
                      operationStore.selectedDate,
                    );
                  }
                }}>
                <Px layout={layouts.txt74}>
                  {brsStore.upload === true && (
                    <Text style={styles.txt74Content} ellipsizeMode={'clip'}>
                      {'待傳，不能更新'}
                    </Text>
                  )}
                  {brsStore.upload === false && (
                    <Text style={styles.txtContent} ellipsizeMode={'clip'}>
                      {'更新'}
                    </Text>
                  )}
                </Px>
                <Px layout={layouts.rect76} />
                <PxImage
                  source={require('../assets/a3202bd93c8b0edf390d74e9122b8566.png')}
                  layout={layouts.img77}
                />
                <PxImage
                  source={require('../assets/438e7dfc8ea9bb40321550496288d3b5.png')}
                  layout={layouts.img78}
                />
              </PxMenuOption>
            )}
            <View style={styles.space104} />
            {DataSelectFlightModel.dowloadFidsBusy !== 0 && (
              <PxMenuOption layout={layouts.group91} disabled={true}>
                <PxImage
                  source={require('../assets/50792863fe52058450aa9003bd20b293.png')}
                  layout={layouts.img72}
                />
                <Px layout={layouts.txt73}>
                  <ActivityIndicator />
                </Px>
                <PxImage
                  source={require('../assets/c16c049fcdd804744289c88551caa98f.png')}
                  layout={layouts.img80}
                />
              </PxMenuOption>
            )}
            {DataSelectFlightModel.dowloadFidsBusy === 0 &&
              bsmStore.addBagListItem.length === 0 && (
                <PxMenuOption
                  layout={layouts.group91}
                  onSelect={() => {
                    
                    if (
                      brsStore.fromBoxBagLoad === false &&
                      brsStore.bagLoadEntrypoint === true &&
                      brsStore.navigatelevel == 2
                    ) {
                      brsStore.fromBoxBagLoad = true; 
                      console.log('來自裝載頁面, 進入挑選航班');
                    }
                    this.props.navigation.push('Data_SelectFlightModeForm');
                  }}
                  disabled={brsStore.navigateSelectFlight}>
                  <PxImage
                    source={require('../assets/50792863fe52058450aa9003bd20b293.png')}
                    layout={layouts.img72}
                  />
                  <Px layout={layouts.txt73}>
                    {DataSelectFlightModel.flight == '' && (
                      <Text style={styles.txt73Content} ellipsizeMode={'clip'}>
                        {'尚未選擇航班'}
                      </Text>
                    )}

                    {DataSelectFlightModel.flight != '' && (
                      <Text style={styles.txt73Content} ellipsizeMode={'clip'}>
                        {DataSelectFlightModel.flight.split(' ')[0] +
                          ' ' +
                          DataSelectFlightModel.flight.split(' ')[2]}
                      </Text>
                    )}
                  </Px>
                  <PxImage
                    source={require('../assets/c16c049fcdd804744289c88551caa98f.png')}
                    layout={layouts.img80}
                  />
                </PxMenuOption>
              )}

            {DataSelectFlightModel.dowloadFidsBusy === 0 &&
              bsmStore.addBagListItem.length !== 0 && (
                <PxMenuOption
                  layout={layouts.group91}
                  onSelect={() => {
                    Alert.alert('', `需"確認完成裝載"，再切換航班。`, [
                      {
                        text: '離開',
                        onPress: () => {},
                      },
                    ]);
                  }}
                  disabled={brsStore.navigateSelectFlight}>
                  <PxImage
                    source={require('../assets/50792863fe52058450aa9003bd20b293.png')}
                    layout={layouts.img72}
                  />
                  <Px layout={layouts.txt73}>
                    {DataSelectFlightModel.flight != '' && (
                      <Text style={styles.txt73Content} ellipsizeMode={'clip'}>
                        {DataSelectFlightModel.flight.split(' ')[0] +
                          ' ' +
                          DataSelectFlightModel.flight.split(' ')[2]}
                      </Text>
                    )}
                  </Px>
                  <PxImage
                    source={require('../assets/c16c049fcdd804744289c88551caa98f.png')}
                    layout={layouts.img80}
                  />
                </PxMenuOption>
              )}

            {brsStore.brsUserLogin === true &&
              brsStore.brsFightServer === 'EGAS' && (
                <PxMenuOption
                  layout={layouts.group91}
                  onSelect={() => BrsPopupMenu.aboutMessage()}>
                  <PxFlex layout={layouts.flexbox94}>
                    <PxImage
                      source={require('../assets/egasIcon.png')}
                      layout={layouts.img70}
                    />
                    <View style={styles.space96} />
                    <Px layout={layouts.txt69}>
                      <Text style={styles.txtUIContent} ellipsizeMode={'clip'}>
                        {brsStore.brsUI}
                      </Text>
                    </Px>
                  </PxFlex>
                </PxMenuOption>
              )}
            {brsStore.brsUserLogin === true &&
              brsStore.brsFightServer === 'TIAS' && (
                <PxMenuOption
                  layout={layouts.group91}
                  onSelect={() => BrsPopupMenu.aboutMessage()}>
                  <PxFlex layout={layouts.flexbox94}>
                    <PxImage
                      source={require('../assets/tiasIcon.png')}
                      layout={layouts.img70}
                    />
                    <View style={styles.space96} />
                    <Px layout={layouts.txt69}>
                      <Text style={styles.txtUIContent} ellipsizeMode={'clip'}>
                        {brsStore.brsUI}
                      </Text>
                    </Px>
                  </PxFlex>
                </PxMenuOption>
              )}
            {brsStore.brsUserLogin === true &&
              brsStore.brsFightServer === 'SJXG' && (
                <PxMenuOption
                  layout={layouts.group91}
                  onSelect={() => BrsPopupMenu.aboutMessage()}>
                  <PxFlex layout={layouts.flexbox94}>
                    <PxImage
                      source={require('../assets/sjxgIcon.png')}
                      layout={layouts.img70}
                    />
                    <View style={styles.space96} />
                    <Px layout={layouts.txt69}>
                      <Text style={styles.txtUIContent} ellipsizeMode={'clip'}>
                        {brsStore.brsUI}
                      </Text>
                    </Px>
                  </PxFlex>
                </PxMenuOption>
              )}
          </PxFlex>
        </PxFlex>
      </Px>
    );
  }
}

const styles = StyleSheet.create({
  group84Body: {width: '100%', height: '100%'},
  img33Body: {width: '100%', height: '100%', resizeMode: 'cover'},
  rect35Body: {width: '100%', height: '100%', backgroundColor: '#ffffffff'},
  flexbox110Body: {width: '100%', height: '100%'},
  group99Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 130, minHeight: 130},
  group99Body: {width: '100%', height: '100%'},
  group89Body: {width: '100%', height: '100%'},
  img38Outer: {overflow: 'hidden'},
  imgBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  txtBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  rect43Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },

  group88Body: {width: '100%', height: '100%'},
  img46Outer: {overflow: 'hidden'},

  txtContent: {
    color: '#000000df',
    textAlign: 'left',
    lineHeight: 28,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  txtUIContent: {
    color: '#000000df',
    textAlign: 'left',
    lineHeight: 26,
    fontSize: 22,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  rect51Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },
  group87Body: {width: '100%', height: '100%'},
  img54Outer: {overflow: 'hidden'},

  rect59Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },
  group86Body: {width: '100%', height: '100%'},
  img62Outer: {overflow: 'hidden'},

  rect67Body: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },
  flexbox102Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 93, minHeight: 93},
  flexbox102Body: {width: '100%', height: '100%'},
  group90Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 31, minHeight: 31},
  group90Body: {width: '100%', height: '100%'},

  txt74Content: {
    color: '#000000ff',
    textAlign: 'left',
    lineHeight: 22.4,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  rect76Body: {width: '100%', height: '100%'},

  space104: {flexGrow: 0, flexShrink: 0, flexBasis: 6, minHeight: 6},
  group91Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 30, minHeight: 30},
  group91Body: {width: '100%', height: '100%'},

  txt73Content: {
    color: '#000000ff',
    textAlign: 'left',
    lineHeight: 22,
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  space106: {flexGrow: 0, flexShrink: 0, flexBasis: 3, minHeight: 3},
  flexbox94Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 23, minHeight: 23},
  flexbox94Body: {width: '100%', height: '100%', flexDirection: 'row'},
  img70Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 28, minWidth: 28},

  space96: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 10.00012207031307,
    minWidth: 10.00012207031307,
  },
  txtOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 'auto'},
});

const layouts = {
  img33: {
    absolute: true,
    xy: [
      ['8px', 'minmax(0px,171fr)', '11px'],
      ['0px', 'minmax(240px,240fr)', '6fr'],
    ],
    style: styles.img33Body,
  },
  rect35: {
    absolute: true,
    xy: [
      ['8px', 'minmax(0px,171fr)', '11px'],
      ['0px', 'minmax(240px,240fr)', '6fr'],
    ],
    style: styles.rect35Body,
  },
  img38: {
    absolute: true,
    xy: [['16px', '174px', '0fr'], ['31fr', '3px', '0px']],
    outerStyle: styles.img38Outer,
    style: styles.imgBody,
  },
  txt40: {
    absolute: true,
    xy: [
      ['56px', 'minmax(48px,auto)', '86fr'],
      ['3fr', 'minmax(28px,auto)', '3fr'],
    ],
    style: styles.txtBody,
  },
  img41: {
    absolute: true,
    xy: [['18px', '19px', '153fr'], ['10px', '16px', '8fr']],
    style: styles.imgBody,
  },
  rect43: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['0px', 'minmax(33px,33fr)', '1fr']],
    style: styles.rect43Body,
  },
  img79: {
    absolute: true,
    xy: [['12px', '163px', '15fr'], ['30fr', '3px', '1px']],
    style: styles.imgBody,
  },
  group89: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['96fr', '34px', '0px']],
    style: styles.group89Body,
  },
  img46: {
    absolute: true,
    xy: [['16px', '174px', '0fr'], ['31fr', '3px', '0px']],
    outerStyle: styles.img46Outer,
    style: styles.imgBody,
  },
  txt48: {
    absolute: true,
    xy: [
      ['56px', 'minmax(48px,auto)', '86fr'],
      ['3fr', 'minmax(28px,auto)', '3fr'],
    ],
    style: styles.txtBody,
  },
  txt56: {
    absolute: true,
    xy: [
      ['56px', 'minmax(48px,auto)', '86fr'],
      ['3fr', 'minmax(28px,auto)', '3fr'],
    ],
    style: styles.txtBody,
  },
  img49: {
    absolute: true,
    xy: [['18px', '19px', '153fr'], ['10px', '16px', '8fr']],
    style: styles.imgBody,
  },
  rect51: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['0px', 'minmax(33px,33fr)', '1fr']],
    style: styles.rect51Body,
  },
  group88: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['64px', '34px', '32fr']],
    style: styles.group88Body,
  },
  img54: {
    absolute: true,
    xy: [['16px', '174px', '0fr'], ['31fr', '3px', '0px']],
    outerStyle: styles.img54Outer,
    style: styles.imgBody,
  },

  img57: {
    absolute: true,
    xy: [['18px', '19px', '153fr'], ['10px', '16px', '8fr']],
    style: styles.imgBody,
  },
  rect59: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['0px', 'minmax(33px,33fr)', '1fr']],
    style: styles.rect59Body,
  },
  group87: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['32px', '34px', '64fr']],
    style: styles.group87Body,
  },
  img62: {
    absolute: true,
    xy: [['16px', '174px', '0fr'], ['31fr', '3px', '0px']],
    outerStyle: styles.img62Outer,
    style: styles.imgBody,
  },
  txt64: {
    absolute: true,
    xy: [
      ['56px', 'minmax(48px,auto)', '86fr'],
      ['3fr', 'minmax(28px,auto)', '3fr'],
    ],
    style: styles.txtBody,
  },
  img65: {
    absolute: true,
    xy: [['18px', '19px', '153fr'], ['10px', '16px', '8fr']],
    style: styles.imgBody,
  },
  rect67: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['0px', 'minmax(33px,33fr)', '1fr']],
    style: styles.rect67Body,
  },
  group86: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['0px', '34px', '96fr']],
    style: styles.group86Body,
  },
  group99: {
    xy: [['minmax(0px,190fr)'], ['130px']],
    outerStyle: styles.group99Outer,
    style: styles.group99Body,
  },
  txt74: {
    absolute: true,
    xy: [
      ['48px', 'minmax(32px,auto)', '83fr'],
      ['1px', 'minmax(22px,auto)', '8fr'],
    ],
    style: styles.txtBody,
  },
  rect76: {
    absolute: true,
    xy: [['7px', '24px', '132fr'], ['0px', 'minmax(24px,24fr)', '7fr']],
    style: styles.rect76Body,
  },
  img77: {
    absolute: true,
    xy: [['9px', '20px', '134fr'], ['2px', '19px', '10fr']],
    style: styles.imgBody,
  },
  img78: {
    absolute: true,
    xy: [['163px'], ['29fr', '2px', '0px']],
    style: styles.imgBody,
  },
  group90: {
    xy: [['minmax(0px,163fr)'], ['31px']],
    outerStyle: styles.group90Outer,
    style: styles.group90Body,
  },
  img72: {
    absolute: true,
    xy: [['10px', '19px', '134fr'], ['0fr', '23px', '7px']],
    style: styles.imgBody,
  },
  txt73: {
    absolute: true,
    xy: [
      ['48px', 'minmax(96px,auto)', '19fr'],
      ['1fr', 'minmax(18px,auto)', '11px'],
    ],
    style: styles.txtBody,
  },
  img80: {
    absolute: true,
    xy: [['163px'], ['28fr', '2px', '0px']],
    style: styles.imgBody,
  },
  group91: {
    xy: [['minmax(0px,163fr)'], ['30px']],
    outerStyle: styles.group91Outer,
    style: styles.group91Body,
  },
  img70: {
    xy: [['0px', '22px', '6px'], ['23px']],
    outerStyle: styles.img70Outer,
    style: styles.imgBody,
  },
  txt69: {
    xy: [
      ['0px', 'minmax(64px,auto)', '1fr'],
      ['0px', 'minmax(18px,auto)', '2fr'],
    ],
    outerStyle: styles.txtOuter,
    style: styles.txtBody,
  },
  flexbox94: {
    xy: [['5fr', '108px', '50fr'], ['23px']],
    outerStyle: styles.flexbox94Outer,
    style: styles.flexbox94Body,
  },
  flexbox102: {
    xy: [['8px', 'minmax(0px,163fr)', '15px'], ['93px']],
    outerStyle: styles.flexbox102Outer,
    style: styles.flexbox102Body,
  },
  flexbox110: {
    absolute: true,
    xy: [['minmax(0px,190fr)'], ['8px', 'minmax(223px,223fr)', '15fr']],
    style: styles.flexbox110Body,
  },
  group84: {xy: [['190px'], ['246px']], style: styles.group84Body},
};

export default BrsPopupMenu;
