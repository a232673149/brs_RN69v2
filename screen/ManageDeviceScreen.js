import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import posize from './posize.v11';

import BaseScreen from './BaseScreen';
import {observer} from 'mobx-react';
import {brsStore} from '../storage/brsStore';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import BigKeyBoard from '../components/BigKeyBoard';
const Px = posize(View);
const PxFlex = posize(View);
const PxTouchableOpacity = posize(TouchableOpacity);
const PxImage = posize(Image);

@observer
class ManageDeviceScreen extends BaseScreen {
  static inStorybook = true;
  static fitScreen = true;
  static scrollHeight = 696;

  static propTypes = {};
  static defaultProps = {};

  plusValue = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.EQUID =
        brsStore.EQUID.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.EQUID.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.EQUID += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.EQUID.length) {
      brsStore.keyboardSelectionStart = brsStore.EQUID.length;
      brsStore.keyboardSelectionEnd = brsStore.EQUID.length;
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
  backValue = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.EQUID.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.EQUID =
          brsStore.EQUID.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.EQUID.slice(
            brsStore.keyboardSelectionStart,
            brsStore.EQUID.length,
          );
      }
    } else {
      brsStore.EQUID = brsStore.EQUID.substring(0, brsStore.EQUID.length - 1);
    }
    
  };
  plusValue2 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.t1WifiSsid =
        brsStore.t1WifiSsid.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.t1WifiSsid.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.t1WifiSsid += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.t1WifiSsid.length) {
      brsStore.keyboardSelectionStart = brsStore.t1WifiSsid.length;
      brsStore.keyboardSelectionEnd = brsStore.t1WifiSsid.length;
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
      brsStore.keyboardSelectionStart <= brsStore.t1WifiSsid.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.t1WifiSsid =
          brsStore.t1WifiSsid.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.t1WifiSsid.slice(
            brsStore.keyboardSelectionStart,
            brsStore.t1WifiSsid.length,
          );
      }
    } else {
      brsStore.t1WifiSsid = brsStore.t1WifiSsid.substring(
        0,
        brsStore.t1WifiSsid.length - 1,
      );
    }
    
    
    
    
  };
  plusValue3 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.t1WifiP =
        brsStore.t1WifiP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.t1WifiP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.t1WifiP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.t1WifiP.length) {
      brsStore.keyboardSelectionStart = brsStore.t1WifiP.length;
      brsStore.keyboardSelectionEnd = brsStore.t1WifiP.length;
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
  backValue3 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.t1WifiP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.t1WifiP =
          brsStore.t1WifiP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.t1WifiP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.t1WifiP.length,
          );
      }
    } else {
      brsStore.t1WifiP = brsStore.t1WifiP.substring(
        0,
        brsStore.t1WifiP.length - 1,
      );
    }
    
    
    
    
  };
  plusValue4 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.t2WifiSsid =
        brsStore.t2WifiSsid.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.t2WifiSsid.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.t2WifiSsid += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.t2WifiSsid.length) {
      brsStore.keyboardSelectionStart = brsStore.t2WifiSsid.length;
      brsStore.keyboardSelectionEnd = brsStore.t2WifiSsid.length;
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
  backValue4 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.t2WifiSsid.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.t2WifiSsid =
          brsStore.t2WifiSsid.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.t2WifiSsid.slice(
            brsStore.keyboardSelectionStart,
            brsStore.t2WifiSsid.length,
          );
      }
    } else {
      brsStore.t2WifiSsid = brsStore.t2WifiSsid.substring(
        0,
        brsStore.t2WifiSsid.length - 1,
      );
    }
    
    
    
    
  };
  plusValue5 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.t2WifiP =
        brsStore.t2WifiP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.t2WifiP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.t2WifiP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.t2WifiP.length) {
      brsStore.keyboardSelectionStart = brsStore.t2WifiP.length;
      brsStore.keyboardSelectionEnd = brsStore.t2WifiP.length;
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
  backValue5 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.t2WifiP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.t2WifiP =
          brsStore.t2WifiP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.t2WifiP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.t2WifiP.length,
          );
      }
    } else {
      brsStore.t2WifiP = brsStore.t2WifiP.substring(
        0,
        brsStore.t2WifiP.length - 1,
      );
    }
    
    
    
    
  };

  title = '參數設定';
  componentDidMount() {
    brsStore.navigatelevel = 1;
    brsStore.navigatelevelLock = false;
    brsStore.navigateGotoBrsButtomTab = false; 
    brsStore.bagLoadEntrypoint = false; 
    brsStore.navigateSelectFlight = false; 
  }

  render() {
    return (
      <PxFlex layout={layouts.flexbox}>
        {this.renderHeader()}
        <View style={styles.spaceHeader} />

        <KeyboardAwareScrollView>
          <SafeAreaView>
            <ScrollView>
              <Px layout={layouts.groupAll}>
                <View style={styles.space48}>
                  <Text style={styles.txtNoteContent} ellipsizeMode={'clip'}>
                    '註:系統會在您輸入時自動儲存所有變更'
                  </Text>
                </View>
                <View style={styles.space50} />
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'手持機編碼：'}
                  </Text>
                </Px>

                <View style={styles.space50} />
                <Px layout={layouts.rect8} removeClippedSubviews={true}>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    onChangeText={async text => {
                      brsStore.EQUID = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.EQUID}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.numberFlag = false;
                      brsStore.EnFlag = true;
                      brsStore.enFlag = false;
                      brsStore.symbolFlag = false;
                      brsStore.keyboardOpen = true;
                      brsStore.keyboardModal = this.refs.modal1;
                      this.refs.modal1.open();
                    }}>
                    <PxImage
                      source={require('../assets/mobile_keyboard.png')}
                      layout={layouts.img10}
                    />
                  </PxTouchableOpacity>
                </Px>

                <View style={styles.space48} />
                <View style={styles.space50} />
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'T1 WIFI SSID：'}
                  </Text>
                </Px>
                <View style={styles.space50} />
                <Px layout={layouts.rect8} removeClippedSubviews={true}>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    onChangeText={async text => {
                      brsStore.t1WifiSsid = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.t1WifiSsid}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.numberFlag = false;
                      brsStore.EnFlag = true;
                      brsStore.enFlag = false;
                      brsStore.symbolFlag = false;
                      brsStore.keyboardOpen = true;
                      brsStore.keyboardModal = this.refs.modal2;
                      this.refs.modal2.open();
                    }}>
                    <PxImage
                      source={require('../assets/mobile_keyboard.png')}
                      layout={layouts.img10}
                    />
                  </PxTouchableOpacity>
                </Px>
                <View style={styles.space48} />
                <View style={styles.space50} />
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'T1 WIFI 密碼：'}
                  </Text>
                </Px>
                <View style={styles.space50} />
                <Px layout={layouts.rect8} removeClippedSubviews={true}>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    onChangeText={async text => {
                      brsStore.t1WifiP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.t1WifiP}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.numberFlag = false;
                      brsStore.EnFlag = true;
                      brsStore.enFlag = false;
                      brsStore.symbolFlag = false;
                      brsStore.keyboardOpen = true;
                      brsStore.keyboardModal = this.refs.modal3;
                      this.refs.modal3.open();
                    }}>
                    <PxImage
                      source={require('../assets/mobile_keyboard.png')}
                      layout={layouts.img10}
                    />
                  </PxTouchableOpacity>
                </Px>
                <View style={styles.space48} />
                <View style={styles.space50} />
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'T2 WIFI SSID：'}
                  </Text>
                </Px>
                <View style={styles.space50} />
                <Px layout={layouts.rect8} removeClippedSubviews={true}>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    onChangeText={async text => {
                      brsStore.t2WifiSsid = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.t2WifiSsid}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.numberFlag = false;
                      brsStore.EnFlag = true;
                      brsStore.enFlag = false;
                      brsStore.symbolFlag = false;
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
                <View style={styles.space48} />
                <View style={styles.space50} />
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'T2 WIFI 密碼：'}
                  </Text>
                </Px>
                <View style={styles.space50} />
                <Px layout={layouts.rect8} removeClippedSubviews={true}>
                  <TextInput
                    contextMenuHidden={true}
                    scrollEnabled={false}
                    showSoftInputOnFocus={false}
                    blurOnSubmit={false}
                    onChangeText={async text => {
                      brsStore.t2WifiP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.t2WifiP}
                  />
                  <PxTouchableOpacity
                    layout={layouts.img09}
                    onPress={async () => {
                      brsStore.keyboardSelection = 100;
                      brsStore.keyboardSelectionStart = 100;
                      brsStore.keyboardSelectionEnd = 100;
                      brsStore.numberFlag = false;
                      brsStore.EnFlag = true;
                      brsStore.enFlag = false;
                      brsStore.symbolFlag = false;
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
                <View style={styles.space48} />
                <View style={styles.space50} />
              </Px>
              <View style={styles.space103} />
            </ScrollView>
          </SafeAreaView>
        </KeyboardAwareScrollView>

        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal1'}>
          <BigKeyBoard
            value={brsStore.EQUID}
            valueEx={''}
            onPlusValue={this.plusValue}
            onBackValue={this.backValue}
            placeholder={'手持機編碼'}
            refs={this.refs}
            modal={'modal1'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal2'}>
          <BigKeyBoard
            value={brsStore.t1WifiSsid}
            valueEx={''}
            onPlusValue={this.plusValue2}
            onBackValue={this.backValue2}
            placeholder={'T1 WIFI SSID'}
            refs={this.refs}
            modal={'modal2'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal3'}>
          <BigKeyBoard
            value={brsStore.t1WifiP}
            valueEx={''}
            onPlusValue={this.plusValue3}
            onBackValue={this.backValue3}
            placeholder={'T1 WIFI 密碼'}
            refs={this.refs}
            modal={'modal3'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal4'}>
          <BigKeyBoard
            value={brsStore.t2WifiSsid}
            valueEx={''}
            onPlusValue={this.plusValue4}
            onBackValue={this.backValue4}
            placeholder={'T2 WIFI SSID'}
            refs={this.refs}
            modal={'modal4'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal5'}>
          <BigKeyBoard
            value={brsStore.t2WifiP}
            valueEx={''}
            onPlusValue={this.plusValue5}
            onBackValue={this.backValue5}
            placeholder={'T2 WIFI 密碼'}
            refs={this.refs}
            modal={'modal5'}
          />
        </Modal>
      </PxFlex>
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
  rect8Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 42, minHeight: 42},
  modalHeight: {height: 550},
  rectffBody: {
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
  group37Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 37, minHeight: 37},

  txtOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 'auto'},

  txtBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  img17Outer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderStyle: 'solid',
    borderColor: '#919191ff',
    borderWidth: 1,
    overflow: 'hidden',
  },
  img17Body: {width: '100%', height: '100%', resizeMode: 'cover'},

  space50: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 12,
    minHeight: 12,
  },
  txtNoteContent: {
    color: 'red',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  txt20Content: {
    color: '#000000ff',
    textAlign: 'left',
    lineHeight: 33.599999999999994,
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  space48: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 5,
    minHeight: 5,
  },
  flexboxBody: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffff',
    overflow: 'hidden',
  },
  spaceHeader: {flexGrow: 0, flexShrink: 0, flexBasis: 30},

  groupAllOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 520},
  groupBody: {width: '100%', height: '100%'},

  space103: {flexGrow: 1, flexShrink: 1, flexBasis: 84},
});

const layouts = {
  img10: {
    xy: [['40px'], ['0fr', '40px', '20px']],
    outerStyle: styles.img15Outer,
    style: styles.img15Body,
  },
  img09: {
    absolute: true,
    xy: [['280px', '40px', '5px'], ['0fr', '40px', '20px']],
    outerStyle: styles.img15Outer,
    style: styles.img15Body,
  },
  rect8: {
    xy: [['0px', 'minmax(0px,303fr)', '0px'], ['42px']],
    outerStyle: styles.rect8Outer,
    style: styles.rectffBody,
  },
  group37: {
    xy: [['0px', 'minmax(0px,302fr)', '0px'], ['37px']],
    outerStyle: styles.group37Outer,
    style: styles.groupBody,
  },
  txt20: {
    xy: [
      ['0px', 'minmax(192px,auto)', '137fr'],
      ['0px', 'minmax(33px,auto)', '1fr'],
    ],
    outerStyle: styles.txtOuter,
    style: styles.txtBody,
  },
  img17: {
    absolute: true,
    xy: [['0px', 'minmax(0px,320px)', '0px'], ['minmax(37px,37px)']],
    outerStyle: styles.img17Outer,
    style: styles.img17Body,
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

export default ManageDeviceScreen;
