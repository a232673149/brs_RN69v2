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
import BigKeyBoard from '../components/BigKeyBoard';
import Modal from 'react-native-modalbox';
const Px = posize(View);
const PxFlex = posize(View);
const PxTouchableOpacity = posize(TouchableOpacity);
const PxImage = posize(Image);

@observer
class ManageAccountScreen extends BaseScreen {
  static inStorybook = true;
  static fitScreen = true;
  static scrollHeight = 696;

  static propTypes = {};
  static defaultProps = {};

  plusValue = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.adminP =
        brsStore.adminP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.adminP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.adminP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.adminP.length) {
      brsStore.keyboardSelectionStart = brsStore.adminP.length;
      brsStore.keyboardSelectionEnd = brsStore.adminP.length;
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
      brsStore.keyboardSelectionStart <= brsStore.adminP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.adminP =
          brsStore.adminP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.adminP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.adminP.length,
          );
      }
    } else {
      brsStore.adminP = brsStore.adminP.substring(
        0,
        brsStore.adminP.length - 1,
      );
    }
    
  };
  plusValue2 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.ABUI =
        brsStore.ABUI.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.ABUI.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.ABUI += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.ABUI.length) {
      brsStore.keyboardSelectionStart = brsStore.ABUI.length;
      brsStore.keyboardSelectionEnd = brsStore.ABUI.length;
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
      brsStore.keyboardSelectionStart <= brsStore.ABUI.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.ABUI =
          brsStore.ABUI.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.ABUI.slice(
            brsStore.keyboardSelectionStart,
            brsStore.ABUI.length,
          );
      }
    } else {
      brsStore.ABUI = brsStore.ABUI.substring(0, brsStore.ABUI.length - 1);
    }
    
  };
  plusValue3 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.ABUP =
        brsStore.ABUP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.ABUP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.ABUP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.ABUP.length) {
      brsStore.keyboardSelectionStart = brsStore.ABUP.length;
      brsStore.keyboardSelectionEnd = brsStore.ABUP.length;
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
      brsStore.keyboardSelectionStart <= brsStore.ABUP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.ABUP =
          brsStore.ABUP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.ABUP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.ABUP.length,
          );
      }
    } else {
      brsStore.ABUP = brsStore.ABUP.substring(0, brsStore.ABUP.length - 1);
    }
    
  };
  plusValue4 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsInspUI =
        brsStore.brsInspUI.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsInspUI.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsInspUI += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.brsInspUI.length) {
      brsStore.keyboardSelectionStart = brsStore.brsInspUI.length;
      brsStore.keyboardSelectionEnd = brsStore.brsInspUI.length;
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
      brsStore.keyboardSelectionStart <= brsStore.brsInspUI.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.brsInspUI =
          brsStore.brsInspUI.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.brsInspUI.slice(
            brsStore.keyboardSelectionStart,
            brsStore.brsInspUI.length,
          );
      }
    } else {
      brsStore.brsInspUI = brsStore.brsInspUI.substring(
        0,
        brsStore.brsInspUI.length - 1,
      );
    }
    
    
    
    
  };
  plusValue5 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsInspUP =
        brsStore.brsInspUP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsInspUP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsInspUP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.brsInspUP.length) {
      brsStore.keyboardSelectionStart = brsStore.brsInspUP.length;
      brsStore.keyboardSelectionEnd = brsStore.brsInspUP.length;
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
      brsStore.keyboardSelectionStart <= brsStore.brsInspUP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.brsInspUP =
          brsStore.brsInspUP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.brsInspUP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.brsInspUP.length,
          );
      }
    } else {
      brsStore.brsInspUP = brsStore.brsInspUP.substring(
        0,
        brsStore.brsInspUP.length - 1,
      );
    }
    
    
    
    
  };
  plusValue6 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsA3UI =
        brsStore.brsA3UI.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsA3UI.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsA3UI += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.brsA3UI.length) {
      brsStore.keyboardSelectionStart = brsStore.brsA3UI.length;
      brsStore.keyboardSelectionEnd = brsStore.brsA3UI.length;
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
  backValue6 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.brsA3UI.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.brsA3UI =
          brsStore.brsA3UI.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.brsA3UI.slice(
            brsStore.keyboardSelectionStart,
            brsStore.brsA3UI.length,
          );
      }
    } else {
      brsStore.brsA3UI = brsStore.brsA3UI.substring(
        0,
        brsStore.brsA3UI.length - 1,
      );
    }
    
    
    
    
  };
  plusValue7 = value => {
    if (brsStore.keyboardSelectionStart !== null) {
      brsStore.brsA3UP =
        brsStore.brsA3UP.slice(0, brsStore.keyboardSelectionStart) +
        value +
        brsStore.brsA3UP.slice(brsStore.keyboardSelectionStart);
    } else {
      brsStore.brsA3UP += value;
    }
    

    if (brsStore.keyboardSelectionStart >= brsStore.brsA3UP.length) {
      brsStore.keyboardSelectionStart = brsStore.brsA3UP.length;
      brsStore.keyboardSelectionEnd = brsStore.brsA3UP.length;
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
  backValue7 = () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= brsStore.brsA3UP.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        brsStore.brsA3UP =
          brsStore.brsA3UP.slice(0, brsStore.keyboardSelectionStart - 1) +
          brsStore.brsA3UP.slice(
            brsStore.keyboardSelectionStart,
            brsStore.brsA3UP.length,
          );
      }
    } else {
      brsStore.brsA3UP = brsStore.brsA3UP.substring(
        0,
        brsStore.brsA3UP.length - 1,
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
                    {'管理者密碼：'}
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
                      brsStore.adminP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.adminP}
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
                    {'巡場程式帳號：'}
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
                      brsStore.ABUI = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.ABUI}
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
                    {'巡場程式密碼：'}
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
                      brsStore.ABUP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.ABUP}
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
                    {'卸載道查詢程式帳號：'}
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
                      brsStore.brsInspUI = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.brsInspUI}
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
                    {'卸載道查詢程式密碼：'}
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
                      brsStore.brsInspUP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.brsInspUP}
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
                <Px layout={layouts.txt20}>
                  <Text style={styles.txt20Content} ellipsizeMode={'clip'}>
                    {'A3行李確認系統帳號：'}
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
                      brsStore.brsA3UI = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.brsA3UI}
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
                      brsStore.keyboardModal = this.refs.modal6;
                      this.refs.modal6.open();
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
                    {'A3行李確認系統密碼：'}
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
                      brsStore.brsA3UP = text;
                    }}
                    style={{marginLeft: 0, flex: 1, fontSize: 18}}
                    value={brsStore.brsA3UP}
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
                      brsStore.keyboardModal = this.refs.modal7;
                      this.refs.modal7.open();
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
            value={brsStore.adminP}
            valueEx={''}
            onPlusValue={this.plusValue}
            onBackValue={this.backValue}
            placeholder={'管理者密碼'}
            refs={this.refs}
            modal={'modal1'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal2'}>
          <BigKeyBoard
            value={brsStore.ABUI}
            valueEx={''}
            onPlusValue={this.plusValue2}
            onBackValue={this.backValue2}
            placeholder={'巡場程式帳號'}
            refs={this.refs}
            modal={'modal2'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal3'}>
          <BigKeyBoard
            value={brsStore.ABUP}
            valueEx={''}
            onPlusValue={this.plusValue3}
            onBackValue={this.backValue3}
            placeholder={'巡場程式密碼'}
            refs={this.refs}
            modal={'modal3'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal4'}>
          <BigKeyBoard
            value={brsStore.brsInspUI}
            valueEx={''}
            onPlusValue={this.plusValue4}
            onBackValue={this.backValue4}
            placeholder={'卸載道查詢程式帳號'}
            refs={this.refs}
            modal={'modal4'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal5'}>
          <BigKeyBoard
            value={brsStore.brsInspUP}
            valueEx={''}
            onPlusValue={this.plusValue5}
            onBackValue={this.backValue5}
            placeholder={'卸載道查詢程式密碼'}
            refs={this.refs}
            modal={'modal5'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal6'}>
          <BigKeyBoard
            value={brsStore.brsA3UI}
            valueEx={''}
            onPlusValue={this.plusValue6}
            onBackValue={this.backValue6}
            placeholder={'A3行李確認系統帳號'}
            refs={this.refs}
            modal={'modal6'}
          />
        </Modal>
        <Modal
          style={[styles.modal, styles.modalHeight]}
          position={'bottom'}
          ref={'modal7'}>
          <BigKeyBoard
            value={brsStore.brsA3UP}
            valueEx={''}
            onPlusValue={this.plusValue7}
            onBackValue={this.backValue7}
            placeholder={'A3行李確認系統密碼'}
            refs={this.refs}
            modal={'modal7'}
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
  modalHeight: {
    height: 550,
  },
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
  group42Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 42, minHeight: 42},

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
    xy: [['0px', 'minmax(0px,302fr)', '0px'], ['42px']],
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

export default ManageAccountScreen;
