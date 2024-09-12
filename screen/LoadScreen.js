import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Alert} from '../components/Alert';
import posize from './posize.v11';
import BaseScreen from './BaseScreen';
import {observer} from 'mobx-react';
import {brsStore} from '../storage/brsStore';
import {cartListItemsModel} from '../model/CartListItemsModel';
import {operationStore} from '../storage/operationStore';
import Moment from 'moment';
import {cabinDestListItemsModel} from '../model/CabinDestListItemsModel';
import {bsmListItemsModel} from '../model/BSMListItemsModel';
import {bsmStore} from '../storage/bsmStore';
// import {loadBoxBagLoadModel} from '../model/Load_BoxBagLoadModel';
// import {loadDisBoxBagLoadModel} from '../model/Load_DisBoxBagLoadModel';

const Px = posize(View);
const PxFlex = posize(View);
const PxImage = posize(Image);
const PxTouchableOpacity = posize(TouchableOpacity);
@observer
class LoadScreen extends BaseScreen {
  static inStorybook = true;
  static fitScreen = true;
  static scrollHeight = 696;

  static propTypes = {};
  static defaultProps = {};
  title = '作業選擇';
  componentDidMount(): void {
    brsStore.navigatelevel = 1;
    brsStore.navigatelevelLock = false;
    brsStore.navigateGotoBrsButtomTab = false; 
    brsStore.bagLoadEntrypoint = false; 
    brsStore.navigateSelectFlight = false; 
    brsStore.selectFlightEntrypoint = false; 
    brsStore.selectCartNoEntrypoint = false; 
    brsStore.fromBoxBagLoad = false; 
    console.log(
      'LoadScreen(componentDidMount)=>brsStore.bagLoadEntrypoint = false && brsStore.navigatelevel = 1',
    );
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    brsStore.navigatelevel = 1;
  }
  render() {
    return (
      <PxFlex layout={layouts.flexbox}>
        {this.renderHeader()}
        <View style={styles.spaceHeader} />
        <Px layout={layouts.groupAll}>
          {brsStore.online === true && (
            <PxTouchableOpacity
              layout={layouts.groupTouch1_1}
              onPress={async () => {
                if (operationStore.selectflighItem !== '') {
                  brsStore.showBusyCursor('下載打櫃資訊...');
                  brsStore.syncServer = brsStore.syncServer + 1; 
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy + 1;
                  cabinDestListItemsModel.dowloadCabinBusy =
                    cabinDestListItemsModel.dowloadCabinBusy + 1;

                  
                  await cartListItemsModel.getSelectCARTByFlightDayFlightNo(
                    operationStore.selectflighItem,
                  );
                  cartListItemsModel.renewCartListItems(
                    Moment(operationStore.selectedDate).format('yyyyMMDD'),
                    operationStore.selectflighItem.FLIGHT_NO, 
                    true, 
                  );

                  
                  await cabinDestListItemsModel.getCARTPrefixCodeListItems();
                  
                  await cabinDestListItemsModel.getCartPatternByFlightInfo(
                    operationStore.selectflighItem,
                  );
                  
                  await cabinDestListItemsModel.getCabinDestByUserWithFlightInfo(
                    operationStore.selectflighItem,
                  );
                  cabinDestListItemsModel.renewCabinDestListItems(
                    Moment(operationStore.selectedDate).format('yyyyMMDD'),
                    operationStore.selectflighItem.FLIGHT_NO, 
                    true, 
                  );
                  cabinDestListItemsModel.dowloadCabinBusy =
                    cabinDestListItemsModel.dowloadCabinBusy - 1;
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy - 1;
                  brsStore.syncServer = brsStore.syncServer - 1; 
                  brsStore.dismissBusyCursor();
                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.navigateSelectFlight = false; 
                    brsStore.bagLoadEntrypoint = false; 
                    this.props.navigation.navigate('Load_BoxSettingForm');
                  }
                } else {
                  

                  Alert.alert('', '先設定航班，再行李打櫃。', [
                    {
                      text: '離開',
                      onPress: () => null,
                    },
                    {
                      text: '設定作業航班',
                      onPress: () => {
                        this.props.navigation.push('Data_SelectFlightModeForm');
                      },
                    },
                  ]);
                }
              }}>
              <Px layout={layouts.rectTouch1_1} />
              <Px layout={layouts.txtTouch1_1}>
                <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                  {'打櫃'}
                </Text>
              </Px>
              <PxImage
                source={require('../assets/45357694c4727380fa7b9eb0d1379cdf.png')}
                layout={layouts.imgTouch1_1}
              />
            </PxTouchableOpacity>
          )}
          <PxTouchableOpacity
            layout={layouts.groupTouch1_2}
            onPress={async () => {
              loadBoxBagLoadModel.destCheckBox = true; 
              loadBoxBagLoadModel.cabinCheckBox = true; 
              loadBoxBagLoadModel.batchCheckBox = true; 
              loadBoxBagLoadModel.useTypeValue = 'A'; 
              loadBoxBagLoadModel.leadTypeValue = 'bsmBox';
              if (operationStore.selectflighItem !== '') {
                brsStore.showBusyCursor('下載資訊...');
                brsStore.syncServer = brsStore.syncServer + 1; 
                cartListItemsModel.dowloadCartBusy =
                  cartListItemsModel.dowloadCartBusy + 1;

                
                await cartListItemsModel.getSelectCARTByFlightDayFlightNo(
                  operationStore.selectflighItem,
                );
                cartListItemsModel.renewCartListItems(
                  Moment(operationStore.selectedDate).format('yyyyMMDD'),
                  operationStore.selectflighItem.FLIGHT_NO, 
                  true, 
                );
                

                
                await bsmListItemsModel.getBSMByFlightDayFlightNo(
                  operationStore.selectflighItem,
                );
                bsmListItemsModel.renewbsmBagListItems(
                  operationStore.selectflighItem.FLIGHT_DATE,
                  operationStore.selectflighItem.FLIGHT_NO,
                );
                cartListItemsModel.dowloadCartBusy =
                  cartListItemsModel.dowloadCartBusy - 1;
                brsStore.syncServer = brsStore.syncServer - 1; 
                brsStore.dismissBusyCursor();
                cartListItemsModel.operationBagCartItem = ''; 
                cartListItemsModel.operationBagCart = ''; 
                
                bsmStore.addBagListItem.splice(
                  0,
                  bsmStore.addBagListItem.length,
                );
                bsmStore.normalBagListItem.splice(
                  0,
                  bsmStore.normalBagListItem.length,
                );
                bsmStore.errorBagListItem.splice(
                  0,
                  bsmStore.errorBagListItem.length,
                );
                if (brsStore.navigatelevelLock === false) {
                  brsStore.navigatelevel = 2;
                  brsStore.navigatelevelLock = true;
                  brsStore.navigateGotoBrsButtomTab = false; 
                  brsStore.navigateSelectFlight = false; 
                  brsStore.bagLoadEntrypoint = true; 
                  brsStore.updateBsmViewListItemFlage = false;

                  loadBoxBagLoadModel.clearBsmbagBarcode(); 
                  
                  bsmStore.addBagListItem.splice(
                    0,
                    bsmStore.addBagListItem.length,
                  );
                  bsmStore.normalBagListItem.splice(
                    0,
                    bsmStore.normalBagListItem.length,
                  );
                  bsmStore.errorBagListItem.splice(
                    0,
                    bsmStore.errorBagListItem.length,
                  );
                  loadBoxBagLoadModel.updateBsmViewListItem(); 

                  this.props.navigation.navigate('Load_BoxBagLoadForm');
                }
              } else {
                
                Alert.alert('', '先設定航班，再裝載行李。', [
                  {
                    text: '離開',
                    onPress: () => null,
                  },
                  {
                    text: '設定作業航班',
                    onPress: () => {
                      this.props.navigation.push('Data_SelectFlightModeForm');
                    },
                  },
                ]);
              }
            }}>
            <Px layout={layouts.rectTouch1_2} />
            <Px layout={layouts.txtTouch1_2}>
              <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                {'裝載\n行李櫃行李'}
              </Text>
            </Px>
            <PxImage
              source={require('../assets/c3e39e413bc4375d518b82a3263167ad.png')}
              layout={layouts.imgTouch1_2}
            />
          </PxTouchableOpacity>

          {brsStore.online === true && (
            <PxTouchableOpacity
              layout={layouts.groupTouch2_1}
              onPress={async () => {
                if (operationStore.selectflighItem !== '') {
                  brsStore.showBusyCursor('下載行李櫃資訊...');
                  brsStore.syncServer = brsStore.syncServer + 1; 
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy + 1;

                  
                  await cartListItemsModel.getSelectCARTByFlightDayFlightNo(
                    operationStore.selectflighItem,
                  );
                  cartListItemsModel.renewCartListItems(
                    Moment(operationStore.selectedDate).format('yyyyMMDD'),
                    operationStore.selectflighItem.FLIGHT_NO, 
                    true, 
                  );

                  
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy - 1;
                  brsStore.syncServer = brsStore.syncServer - 1; 
                  brsStore.dismissBusyCursor();

                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.navigateSelectFlight = false; 
                    brsStore.bagLoadEntrypoint = false; 
                    this.props.navigation.navigate('Load_BoxCombineForm');
                  }
                } else {
                  

                  Alert.alert('', '先設定航班，再行李併櫃。', [
                    {
                      text: '離開',
                      onPress: () => null,
                    },
                    {
                      text: '設定作業航班',
                      onPress: () => {
                        this.props.navigation.push('Data_SelectFlightModeForm');
                      },
                    },
                  ]);
                }
              }}>
              <Px layout={layouts.rectTouch2_1} />
              <Px layout={layouts.txtTouch2_1}>
                <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                  {'併櫃'}
                </Text>
              </Px>
              <PxImage
                source={require('../assets/2b7b89ebb44768d1ac6840559a5b7066.png')}
                layout={layouts.imgTouch2_1}
              />
            </PxTouchableOpacity>
          )}

          {brsStore.online === true && (
            <PxTouchableOpacity
              layout={layouts.groupTouch2_2}
              onPress={async () => {
                if (operationStore.selectflighItem !== '') {
                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.navigateSelectFlight = false; 
                    brsStore.bagLoadEntrypoint = false; 
                    this.props.navigation.navigate('Load_Box2FlightForm');
                  }
                } else {
                  
                  Alert.alert('', '先設定航班，再整櫃轉機。', [
                    {
                      text: '離開',
                      onPress: () => null,
                    },
                    {
                      text: '設定作業航班',
                      onPress: () => {
                        this.props.navigation.push('Data_SelectFlightModeForm');
                      },
                    },
                  ]);
                }
              }}>
              <Px layout={layouts.rectTouch2_2} />
              <Px layout={layouts.txtTouch2_2}>
                <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                  {'整櫃轉機'}
                </Text>
              </Px>
              <PxImage
                source={require('../assets/412cf4f5814bc0ad6e84b51f5538fd47.png')}
                layout={layouts.imgTouch2_2}
              />
            </PxTouchableOpacity>
          )}

          {brsStore.online === false && (
            <PxTouchableOpacity
              layout={layouts.groupTouch1_1}
              onPress={async () => {
                loadDisBoxBagLoadModel.batchCheckBox = true; 
                loadDisBoxBagLoadModel.useTypeValue = 'A'; 
                loadDisBoxBagLoadModel.leadTypeValue = 'bsmBox';
                if (operationStore.selectflighItem !== '') {
                  brsStore.showBusyCursor('下載資訊...');
                  brsStore.syncServer = brsStore.syncServer + 1; 
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy + 1;

                  

                  
                  await bsmListItemsModel.getBSMByFlightDayFlightNo(
                    operationStore.selectflighItem,
                  );

                  
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy - 1;
                  brsStore.syncServer = brsStore.syncServer - 1; 
                  brsStore.dismissBusyCursor();
                  
                  bsmStore.addBagListItem.splice(
                    0,
                    bsmStore.addBagListItem.length,
                  );
                  bsmStore.normalBagListItem.splice(
                    0,
                    bsmStore.normalBagListItem.length,
                  );
                  bsmStore.errorBagListItem.splice(
                    0,
                    bsmStore.errorBagListItem.length,
                  );
                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.navigateSelectFlight = false; 
                    brsStore.bagLoadEntrypoint = true; 
                    brsStore.updateBsmViewListItemFlage = false;
                    loadDisBoxBagLoadModel.operationBagCart = '*';
                    loadDisBoxBagLoadModel.updateBsmViewListItem();
                    this.props.navigation.navigate('Load_DisBoxBagLoadForm');
                  }
                } else {
                  

                  Alert.alert('', '先設定航班，再裝載行李。', [
                    {
                      text: '離開',
                      onPress: () => null,
                    },
                    {
                      text: '設定作業航班',
                      onPress: () => {
                        this.props.navigation.push('Data_SelectFlightModeForm');
                      },
                    },
                  ]);
                }
              }}>
              <Px layout={layouts.rectTouch3_1} />
              <Px layout={layouts.txtTouch3_1}>
                <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                  {'裝載\n散艙行李'}
                </Text>
              </Px>
              <PxImage
                source={require('../assets/315430f491f213b1189b0a9b7279ea2e.png')}
                layout={layouts.imgTouch3_1}
              />
            </PxTouchableOpacity>
          )}
          {brsStore.online === true && (
            <PxTouchableOpacity
              layout={layouts.groupTouch3_1}
              onPress={async () => {
                loadDisBoxBagLoadModel.batchCheckBox = true; 
                loadDisBoxBagLoadModel.useTypeValue = 'A'; 
                loadDisBoxBagLoadModel.leadTypeValue = 'bsmBox';

                if (operationStore.selectflighItem !== '') {
                  brsStore.showBusyCursor('下載資訊...');
                  brsStore.syncServer = brsStore.syncServer + 1; 
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy + 1;

                  

                  
                  await bsmListItemsModel.getBSMByFlightDayFlightNo(
                    operationStore.selectflighItem,
                  );

                  
                  cartListItemsModel.dowloadCartBusy =
                    cartListItemsModel.dowloadCartBusy - 1;
                  brsStore.syncServer = brsStore.syncServer - 1; 
                  brsStore.dismissBusyCursor();
                  
                  bsmStore.addBagListItem.splice(
                    0,
                    bsmStore.addBagListItem.length,
                  );
                  bsmStore.normalBagListItem.splice(
                    0,
                    bsmStore.normalBagListItem.length,
                  );
                  bsmStore.errorBagListItem.splice(
                    0,
                    bsmStore.errorBagListItem.length,
                  );
                  if (brsStore.navigatelevelLock === false) {
                    brsStore.navigatelevel = 2;
                    brsStore.navigatelevelLock = true;
                    brsStore.navigateGotoBrsButtomTab = false; 
                    brsStore.navigateSelectFlight = false; 
                    brsStore.bagLoadEntrypoint = true; 
                    brsStore.updateBsmViewListItemFlage = false;
                    loadDisBoxBagLoadModel.operationBagCart = '*';
                    loadDisBoxBagLoadModel.updateBsmViewListItem();
                    this.props.navigation.navigate('Load_DisBoxBagLoadForm');
                  }
                } else {
                  

                  Alert.alert('', '先設定航班，再裝載行李。', [
                    {
                      text: '離開',
                      onPress: () => null,
                    },
                    {
                      text: '設定作業航班',
                      onPress: () => {
                        this.props.navigation.push('Data_SelectFlightModeForm');
                      },
                    },
                  ]);
                }
              }}>
              <Px layout={layouts.rectTouch3_1} />
              <Px layout={layouts.txtTouch3_1}>
                <Text style={styles.txtCenterContent} ellipsizeMode={'clip'}>
                  {'裝載\n散艙行李'}
                </Text>
              </Px>
              <PxImage
                source={require('../assets/315430f491f213b1189b0a9b7279ea2e.png')}
                layout={layouts.imgTouch3_1}
              />
            </PxTouchableOpacity>
          )}
        </Px>
      </PxFlex>
    );
  }
}

const styles = StyleSheet.create({
  flexboxBody: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffff',
  },

  spaceHeader: {flexGrow: 0, flexShrink: 0, flexBasis: 30},
  groupAllOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 520},
  rectBody: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#b4f2ffff',
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
  imgBody: {width: '100%', height: '100%', resizeMode: 'contain'},
  groupBody: {width: '100%', height: '100%'},

  txtBody: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

const layouts = {
  rectTouch1_1: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch1_1: {
    absolute: true,
    xy: [['0fr', '150px', '0fr'], ['95fr', 'minmax(30px,auto)', '10px']],
    style: styles.txtBody,
  },
  imgTouch1_1: {
    absolute: true,
    xy: [['36fr', '95px', '38fr'], ['15px', '84px', '41fr']],
    style: styles.imgBody,
  },
  groupTouch1_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['0px', '150px', '370fr']],
    style: styles.groupBody,
  },
  rectTouch1_2: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch1_2: {
    absolute: true,
    xy: [['0fr', '150px', '0fr'], ['90fr', 'minmax(50px,auto)', '10px']],
    style: styles.txtBody,
  },
  imgTouch1_2: {
    absolute: true,
    xy: [['35fr', '124px', '31fr'], ['15px', '67px', '43fr']],
    style: styles.imgBody,
  },
  groupTouch1_2: {
    absolute: true,
    xy: [['170fr', '150px', '0px'], ['0px', '150px', '370fr']],
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
    style: styles.txtBody,
  },
  imgTouch2_1: {
    absolute: true,
    xy: [['28fr', '85px', '32fr'], ['15px', '98px', '42fr']],
    style: styles.imgBody,
  },
  groupTouch2_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['185px', '150px', '185fr']],
    style: styles.groupBody,
  },
  rectTouch2_2: {
    absolute: true,
    xy: [['minmax(0px,120fr)'], ['minmax(126px,126fr)']],
    style: styles.rectBody,
  },
  txtTouch2_2: {
    absolute: true,
    xy: [['0fr', '150px', '0fr'], ['95fr', 'minmax(30px,auto)', '6px']],
    style: styles.txtBody,
  },
  imgTouch2_2: {
    absolute: true,
    xy: [['28fr', '88px', '24fr'], ['15px', '105px', '42fr']],
    style: styles.imgBody,
  },
  groupTouch2_2: {
    absolute: true,
    xy: [['170fr', '150px', '0px'], ['185px', '150px', '185fr']],
    style: styles.groupBody,
  },
  rectTouch3_1: {
    absolute: true,
    xy: [['minmax(0px,150fr)'], ['minmax(150px,150fr)']],
    style: styles.rectBody,
  },
  txtTouch3_1: {
    absolute: true,
    xy: [['0fr', '150px', '0fr'], ['90fr', 'minmax(50px,auto)', '10px']],
    style: styles.txtBody,
  },
  imgTouch3_1: {
    absolute: true,
    xy: [['27fr', '67px', '36fr'], ['15px', '68px', '40fr']],
    style: styles.imgBody,
  },
  groupTouch3_1: {
    absolute: true,
    xy: [['0fr', '150px', '170fr'], ['370px', '150px', '0fr']],
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
  rect3: {
    absolute: true,
    xy: [['minmax(0px,360fr)'], ['minmax(55px,55fr)']],
    style: styles.rect3Body,
  },
  flexbox: {
    absolute: true,
    xy: [['100%'], ['100%']],
    style: styles.flexboxBody,
  },
};

export default LoadScreen;
