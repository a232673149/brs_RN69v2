import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import posize from './posize.v11';

import BaseScreen from './BaseScreen';
import {observer} from 'mobx-react';
import {brsStore} from '../storage/brsStore';
import {operationStore} from '../storage/operationStore';
import {DataRecordSortErrModel} from '../model/Data_RecordSortErrModel';
import {operationModule} from '../module/OperationModule';
import {DataSelectFlightModel} from '../model/Data_SelectFlightModel';
import Moment from 'moment';
import log from '../module/Logger';
const Px = posize(View);
const PxFlex = posize(View);
const PxImage = posize(Image);
const PxTouchableOpacity = posize(TouchableOpacity);




@observer
class DataScreen extends BaseScreen {
  static inStorybook = true;
  static fitScreen = true;
  static scrollHeight = 696;

  static propTypes = {};
  static defaultProps = {};

  title = '作業選擇';
  componentDidMount() {
    brsStore.navigatelevel = 1;
    brsStore.navigatelevelLock = false;
    brsStore.navigateGotoBrsButtomTab = false; 
    brsStore.bagLoadEntrypoint = false; 
    brsStore.navigateSelectFlight = false; 
    brsStore.selectFlightEntrypoint = false; 
    brsStore.selectCartNoEntrypoint = false; 
    brsStore.fromBoxBagLoad = false; 
    brsStore.updateBsmViewListItemFlage = false;
    console.log(
      'DataScreen(componentDidMount)=>brsStore.bagLoadEntrypoint = false && brsStore.navigatelevel = 1',
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    brsStore.navigatelevel = 1;
    console.log(
      'DataScreen(componentDidUpdate)=>brsStore.bagLoadEntrypoint = false && brsStore.navigatelevel = 1',
    );
  }

  render() {
    return (
      <PxFlex layout={layouts.flexbox}>
        {this.renderHeader()}
        <View style={styles.spaceHeader} />

        <Px layout={layouts.groupAll}>
          <PxTouchableOpacity
            layout={layouts.groupTouch1_1}
            onPress={() => {
              this.props.navigation.navigate('Data_SelectFlightModeForm');
            }}>
            <Px layout={layouts.rectTouch1_1} />
            <Px layout={layouts.txtTouch1_1}>
              <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                {'航班設定'}
              </Text>
            </Px>
            <PxImage
              source={require('../assets/06200f4d5da24cb19dcb208826f0128e.png')}
              layout={layouts.imgTouch1_1}
            />
          </PxTouchableOpacity>
          <PxTouchableOpacity
            layout={layouts.groupTouch1_2}
            onPress={() => {
              if (brsStore.navigatelevelLock === false) {
                brsStore.navigatelevel = 2;
                brsStore.navigatelevelLock = true;
                brsStore.navigateGotoBrsButtomTab = false; 
                brsStore.bagLoadEntrypoint = false; 
                brsStore.navigateSelectFlight = false; 
                this.props.navigation.navigate('Data_PrintBagBarcodeForm');
              }
            }}>
            <Px layout={layouts.rectTouch1_2} />
            <Px layout={layouts.txtTouch1_2}>
              <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                {'條碼列印'}
              </Text>
            </Px>
            <PxImage
              source={require('../assets/53c2743773d8b4097a0ddcafbedaa0ee.png')}
              layout={layouts.imgTouch1_2}
            />
          </PxTouchableOpacity>
          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.online === true && (
              <PxTouchableOpacity
                layout={layouts.groupTouch2_1}
                onPress={async () => {
                  brsStore.showBusyCursor('下載轉盤資訊...');
                  await DataRecordSortErrModel.getTurntableItems();
                  brsStore.dismissBusyCursor();
                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.bagLoadEntrypoint = false; 
                    brsStore.navigateSelectFlight = false; 
                    this.props.navigation.navigate('Data_RecordSortErrForm');
                  }
                }}>
                <Px layout={layouts.rectTouch2_1} />
                <Px layout={layouts.txtTouch2_1}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {'轉盤記錄'}
                  </Text>
                </Px>
                <PxImage
                  source={require('../assets/18579ed3257dc94060e2a94cd6a2b761.png')}
                  layout={layouts.imgTouch2_1}
                />
              </PxTouchableOpacity>
            )}
          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.upload === false &&
            brsStore.online === false && (
              <PxTouchableOpacity
                layout={layouts.groupTouch2_1}
                onPress={() => {
                  if (brsStore.online) {
                    brsStore.nearAirplan = true;
                  } else {
                    brsStore.nearAirplan = false;
                  }
                  brsStore.online = !brsStore.online;
                  brsStore.unloadTab = brsStore.online;
                  brsStore.searchTab = brsStore.online;

                  if (brsStore.nearAirplan) {
                    log._transportOptions.loggerName =
                      Moment().format('yyyy-MM-DD') + '_brsLogsFile';
                    log.info('切換機邊作業');
                    
                    operationModule.getFidsCartByDay(
                      operationStore.selectedDate,
                    );
                    this.props.navigation.navigate(
                      'Data_NearAirplanSelectFlightModeForm',
                    );
                  } else {
                    log._transportOptions.loggerName =
                      Moment().format('yyyy-MM-DD') + '_brsLogsFile';
                    log.info('取消機邊作業');
                    
                    DataSelectFlightModel.nearAirplanFlight1ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight1 = '';
                    DataSelectFlightModel.nearAirplanFlight2ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight2 = '';
                    DataSelectFlightModel.nearAirplanFlight3ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight3 = '';
                  }
                }}
                disable={true}>
                {brsStore.online !== true && (
                  <Px layout={layouts.rectTouch2_2Green} />
                )}
                {brsStore.online === true && (
                  <Px layout={layouts.rectTouch2_2Red} />
                )}

                <Px layout={layouts.txtTouch2_1}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {brsStore.online
                      ? '機邊作業'
                      : brsStore.nearAirplan
                      ? '取消機邊'
                      : '連線操作'}
                  </Text>
                </Px>

                {brsStore.online === true && (
                  <PxImage
                    source={require('../assets/offline.png')}
                    layout={layouts.imgTouch2_1}
                  />
                )}

                {brsStore.online !== true && (
                  <PxImage
                    source={require('../assets/online.png')}
                    layout={layouts.imgTouch2_1}
                  />
                )}
              </PxTouchableOpacity>
            )}

          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.upload === false &&
            brsStore.online === true && (
              <PxTouchableOpacity
                layout={layouts.groupTouch2_2}
                onPress={() => {
                  if (brsStore.online) {
                    
                    operationModule.getFidsCartByDay(
                      operationStore.selectedDate,
                    );
                    brsStore.nearAirplan = true;
                  } else {
                    brsStore.nearAirplan = false;
                  }
                  brsStore.online = !brsStore.online;
                  brsStore.unloadTab = brsStore.online;
                  brsStore.searchTab = brsStore.online;
                  if (brsStore.nearAirplan) {
                    
                    operationModule.getFidsCartByDay(
                      operationStore.selectedDate,
                    );
                    this.props.navigation.navigate(
                      'Data_NearAirplanSelectFlightModeForm',
                    );
                  } else {
                    
                    DataSelectFlightModel.nearAirplanFlight1ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight1 = '';
                    DataSelectFlightModel.nearAirplanFlight2ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight2 = '';
                    DataSelectFlightModel.nearAirplanFlight3ListItems = '';
                    DataSelectFlightModel.nearAirplanFlight3 = '';
                  }
                }}
                disable={true}>
                {brsStore.online !== true && (
                  <Px layout={layouts.rectTouch2_2Green} />
                )}
                {brsStore.online === true && (
                  <Px layout={layouts.rectTouch2_2Red} />
                )}

                <Px layout={layouts.txtTouch2_2}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {brsStore.online
                      ? '機邊作業'
                      : brsStore.nearAirplan
                      ? '取消機邊'
                      : '連線操作'}
                  </Text>
                </Px>

                {brsStore.online === true && (
                  <PxImage
                    source={require('../assets/offline.png')}
                    layout={layouts.imgTouch2_2}
                  />
                )}

                {brsStore.online !== true && (
                  <PxImage
                    source={require('../assets/online.png')}
                    layout={layouts.imgTouch2_2}
                  />
                )}
              </PxTouchableOpacity>
            )}
          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.wifiOff === false &&
            brsStore.upload === true && (
              <PxTouchableOpacity
                layout={layouts.groupTouch2_2}
                onPress={() => {
                  if (brsStore.upload) {
                    
                    operationModule.clearSubmitStore();
                  }
                }}>
                <Px layout={layouts.rectTouch2_2} />
                <Px layout={layouts.txtTouch2_2}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {'資料作廢'}
                  </Text>
                </Px>
                <PxImage
                  source={require('../assets/0d2c5d4d2ec22e2be62b2fe189afedaa.png')}
                  layout={layouts.imgTouch2_2}
                />
              </PxTouchableOpacity>
            )}

          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.wifiOff === false &&
            brsStore.upload === true &&
            brsStore.online === false && (
              <PxTouchableOpacity
                layout={layouts.groupTouch2_1}
                onPress={() => {
                  if (brsStore.upload) {
                    
                    operationModule.uploadSubmitStore();
                  }
                }}>
                <Px layout={layouts.rectTouch3_1} />
                <Px layout={layouts.txtTouch3_1}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {'資料上傳'}
                  </Text>
                </Px>
                <PxImage
                  source={require('../assets/eb75f60d66da0ccb99522d197ba173c7.png')}
                  layout={layouts.imgTouch3_1}
                />
              </PxTouchableOpacity>
            )}

          {brsStore.brsCompanyIdType == 'SFLIGHT_CODE' &&
            brsStore.wifiOff === false &&
            brsStore.upload === true &&
            brsStore.online === true && (
              <PxTouchableOpacity
                layout={layouts.groupTouch3_1}
                onPress={() => {
                  if (brsStore.upload) {
                    
                    operationModule.uploadSubmitStore();
                  }
                }}>
                <Px layout={layouts.rectTouch3_1} />
                <Px layout={layouts.txtTouch3_1}>
                  <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                    {'資料上傳'}
                  </Text>
                </Px>
                <PxImage
                  source={require('../assets/eb75f60d66da0ccb99522d197ba173c7.png')}
                  layout={layouts.imgTouch3_1}
                />
              </PxTouchableOpacity>
            )}
        </Px>
        <View style={styles.space103} />
      </PxFlex>
    );
  }
}

const styles = StyleSheet.create({
  flexboxBody: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
  },
  spaceHeader: {flexGrow: 0, flexShrink: 0, flexBasis: 30},

  groupAllOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 520},
  groupBody: {width: '100%', height: '100%'},
  rectBody: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#ffc96cff',
  },

  rectRedBody: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#ff4647',
  },

  rectGreenBody: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#65ab66',
  },

  txtBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  imgBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  txtCenterBody: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtCenterContent: {
    color: '#000000ff',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 26,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  space103: {flexGrow: 1, flexShrink: 1, flexBasis: 84},
});

const layouts = {
  rectTouch2_2Green: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectGreenBody,
  },

  rectTouch2_2Red: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectRedBody,
  },

  rectTouch2_2: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },

  txtTouch2_2: {
    absolute: true,
    xy: [
      ['24px', 'minmax(72px,auto)', '24fr'],
      ['94fr', 'minmax(30px,auto)', '6px'],
    ],
    style: styles.txtBody,
  },
  imgTouch2_2: {
    absolute: true,
    xy: [['28fr', '107px', '32fr'], ['15px', '98px', '42fr']],
    style: styles.imgBody,
  },
  groupTouch3_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['370px', '150px', '0fr']],
    style: styles.groupBody,
  },
  rectTouch3_1: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch3_1: {
    absolute: true,
    xy: [
      ['24px', 'minmax(72px,auto)', '24fr'],
      ['94fr', 'minmax(25px,auto)', '6px'],
    ],
    style: styles.txtBody,
  },
  imgTouch3_1: {
    absolute: true,
    xy: [['20fr', '97px', '23fr'], ['15px', '90px', '35fr']],
    style: styles.imgBody,
  },
  groupTouch2_2: {
    absolute: true,
    xy: [['170fr', '150px', '0px'], ['185px', '150px', '185fr']],
    style: styles.groupBody,
  },
  rectTouch2_1: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch2_1: {
    absolute: true,
    xy: [['0fr', '150px', '0fr'], ['95fr', 'minmax(30px,auto)', '6px']],
    style: styles.txtCenterBody,
  },
  imgTouch2_1: {
    absolute: true,
    xy: [['28fr', '120px', '32fr'], ['15px', '95px', '42fr']],
    style: styles.imgBody,
  },
  groupTouch2_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['185px', '150px', '185fr']],
    style: styles.groupBody,
  },
  rectTouch1_2: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch1_2: {
    absolute: true,
    xy: [
      ['24px', 'minmax(72px,auto)', '24fr'],
      ['94fr', 'minmax(25px,auto)', '10px'],
    ],
    style: styles.txtBody,
  },
  imgTouch1_2: {
    absolute: true,
    xy: [['30fr', '100px', '30fr'], ['15px', '90px', '40fr']],
    style: styles.imgBody,
  },
  groupTouch1_2: {
    absolute: true,
    xy: [['170fr', '150px', '0px'], ['0px', '150px', '370fr']],
    style: styles.groupBody,
  },

  rectTouch1_1: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch1_1: {
    absolute: true,
    xy: [
      ['24px', 'minmax(72px,auto)', '24fr'],
      ['95fr', 'minmax(25px,auto)', '10px'],
    ],
    style: styles.txtBody,
  },

  imgTouch1_1: {
    absolute: true,
    xy: [['17fr', '98px', '15fr'], ['15px', '88px', '30fr']],
    style: styles.imgBody,
  },

  groupTouch1_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['0px', '150px', '370fr']],
    style: styles.groupBody,
  },
  groupAll: {
    xy: [
      ['20px', 'minmax(0px,320fr)', '20px'],
      ['0px', 'minmax(520px,520fr)', '0px'],
    ],
    outerStyle: styles.groupAllOuter,
    style: styles.groupBody,
  },

  flexbox: {
    absolute: true,
    xy: [['100%'], ['100%']],
    style: styles.flexboxBody,
  },
};

export default DataScreen;
