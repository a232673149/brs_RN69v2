import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {observer} from 'mobx-react';
import {operationStore} from '../storage/operationStore';
import {brsStore} from '../storage/brsStore';

@observer
class BigKeyBoard extends React.Component {
  static inStorybook = true;
  static fitScreen = false;
  static scrollHeight = 55;
  pressLong = false;

  static propTypes = {};
  static defaultProps = {};

  clickBack = () => {
    this.props.onBackValue();
    operationStore.keyboardButtonSound.play();
  };
  clickBackLong = async () => {
    this.pressLong = true;

    let backValue = this.props;
    for (let i = 0; i < 100; i++) {
      await this.delay(1);
      let pressLongFlag = this.pressLong;
      if (pressLongFlag) {
        backValue.onBackValue();
        operationStore.keyboardButtonSound.play();
      } else {
        break;
      }
    }
  };
  delay = n => {
    return new Promise(function(resolve) {
      setTimeout(resolve, n * 100);
    });
  };
  pressOut = () => {
    this.pressLong = false;
  };

  click_1 = () => {
    this.props.onPlusValue('1');
    operationStore.keyboardButtonSound.play();
  };
  click_2 = () => {
    this.props.onPlusValue('2');
    operationStore.keyboardButtonSound.play();
  };
  click_3 = () => {
    this.props.onPlusValue('3');
    operationStore.keyboardButtonSound.play();
  };
  click_4 = () => {
    this.props.onPlusValue('4');
    operationStore.keyboardButtonSound.play();
  };
  click_5 = () => {
    this.props.onPlusValue('5');
    operationStore.keyboardButtonSound.play();
  };
  click_6 = () => {
    this.props.onPlusValue('6');
    operationStore.keyboardButtonSound.play();
  };
  click_7 = () => {
    this.props.onPlusValue('7');
    operationStore.keyboardButtonSound.play();
  };
  click_8 = () => {
    this.props.onPlusValue('8');
    operationStore.keyboardButtonSound.play();
  };
  click_9 = () => {
    this.props.onPlusValue('9');
    operationStore.keyboardButtonSound.play();
  };
  click_0 = () => {
    this.props.onPlusValue('0');
    operationStore.keyboardButtonSound.play();
  };
  click_A = () => {
    this.props.onPlusValue('A');
    operationStore.keyboardButtonSound.play();
  };
  click_B = () => {
    this.props.onPlusValue('B');
    operationStore.keyboardButtonSound.play();
  };
  click_C = () => {
    this.props.onPlusValue('C');
    operationStore.keyboardButtonSound.play();
  };
  click_D = () => {
    this.props.onPlusValue('D');
    operationStore.keyboardButtonSound.play();
  };
  click_E = () => {
    this.props.onPlusValue('E');
    operationStore.keyboardButtonSound.play();
  };
  click_F = () => {
    this.props.onPlusValue('F');
    operationStore.keyboardButtonSound.play();
  };
  click_G = () => {
    this.props.onPlusValue('G');
    operationStore.keyboardButtonSound.play();
  };
  click_H = () => {
    this.props.onPlusValue('H');
    operationStore.keyboardButtonSound.play();
  };
  click_I = () => {
    this.props.onPlusValue('I');
    operationStore.keyboardButtonSound.play();
  };
  click_J = () => {
    this.props.onPlusValue('J');
    operationStore.keyboardButtonSound.play();
  };
  click_K = () => {
    this.props.onPlusValue('K');
    operationStore.keyboardButtonSound.play();
  };
  click_L = () => {
    this.props.onPlusValue('L');
    operationStore.keyboardButtonSound.play();
  };
  click_M = () => {
    this.props.onPlusValue('M');
    operationStore.keyboardButtonSound.play();
  };
  click_N = () => {
    this.props.onPlusValue('N');
    operationStore.keyboardButtonSound.play();
  };
  click_O = () => {
    this.props.onPlusValue('O');
    operationStore.keyboardButtonSound.play();
  };
  click_P = () => {
    this.props.onPlusValue('P');
    operationStore.keyboardButtonSound.play();
  };
  click_Q = () => {
    this.props.onPlusValue('Q');
    operationStore.keyboardButtonSound.play();
  };
  click_R = () => {
    this.props.onPlusValue('R');
    operationStore.keyboardButtonSound.play();
  };
  click_S = () => {
    this.props.onPlusValue('S');
    operationStore.keyboardButtonSound.play();
  };
  click_T = () => {
    this.props.onPlusValue('T');
    operationStore.keyboardButtonSound.play();
  };
  click_U = () => {
    this.props.onPlusValue('U');
    operationStore.keyboardButtonSound.play();
  };
  click_V = () => {
    this.props.onPlusValue('V');
    operationStore.keyboardButtonSound.play();
  };
  click_W = () => {
    this.props.onPlusValue('W');
    operationStore.keyboardButtonSound.play();
  };
  click_X = () => {
    this.props.onPlusValue('X');
    operationStore.keyboardButtonSound.play();
  };
  click_Y = () => {
    this.props.onPlusValue('Y');
    operationStore.keyboardButtonSound.play();
  };
  click_Z = () => {
    this.props.onPlusValue('Z');
    operationStore.keyboardButtonSound.play();
  };
  click_a = () => {
    this.props.onPlusValue('a');
    operationStore.keyboardButtonSound.play();
  };
  click_b = () => {
    this.props.onPlusValue('b');
    operationStore.keyboardButtonSound.play();
  };
  click_c = () => {
    this.props.onPlusValue('c');
    operationStore.keyboardButtonSound.play();
  };
  click_d = () => {
    this.props.onPlusValue('d');
    operationStore.keyboardButtonSound.play();
  };
  click_e = () => {
    this.props.onPlusValue('e');
    operationStore.keyboardButtonSound.play();
  };
  click_f = () => {
    this.props.onPlusValue('f');
    operationStore.keyboardButtonSound.play();
  };
  click_g = () => {
    this.props.onPlusValue('g');
    operationStore.keyboardButtonSound.play();
  };
  click_h = () => {
    this.props.onPlusValue('h');
    operationStore.keyboardButtonSound.play();
  };
  click_i = () => {
    this.props.onPlusValue('i');
    operationStore.keyboardButtonSound.play();
  };
  click_j = () => {
    this.props.onPlusValue('j');
    operationStore.keyboardButtonSound.play();
  };
  click_k = () => {
    this.props.onPlusValue('k');
  };
  click_l = () => {
    this.props.onPlusValue('l');
    operationStore.keyboardButtonSound.play();
  };
  click_m = () => {
    this.props.onPlusValue('m');
    operationStore.keyboardButtonSound.play();
  };
  click_n = () => {
    this.props.onPlusValue('n');
    operationStore.keyboardButtonSound.play();
  };
  click_o = () => {
    this.props.onPlusValue('o');
    operationStore.keyboardButtonSound.play();
  };
  click_p = () => {
    this.props.onPlusValue('p');
    operationStore.keyboardButtonSound.play();
  };
  click_q = () => {
    this.props.onPlusValue('q');
    operationStore.keyboardButtonSound.play();
  };
  click_r = () => {
    this.props.onPlusValue('r');
    operationStore.keyboardButtonSound.play();
  };
  click_s = () => {
    this.props.onPlusValue('s');
    operationStore.keyboardButtonSound.play();
  };
  click_t = () => {
    this.props.onPlusValue('t');
    operationStore.keyboardButtonSound.play();
  };
  click_u = () => {
    this.props.onPlusValue('u');
    operationStore.keyboardButtonSound.play();
  };
  click_v = () => {
    this.props.onPlusValue('v');
    operationStore.keyboardButtonSound.play();
  };
  click_w = () => {
    this.props.onPlusValue('w');
    operationStore.keyboardButtonSound.play();
  };
  click_x = () => {
    this.props.onPlusValue('x');
    operationStore.keyboardButtonSound.play();
  };
  click_y = () => {
    this.props.onPlusValue('y');
    operationStore.keyboardButtonSound.play();
  };
  click_z = () => {
    this.props.onPlusValue('z');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_1 = () => {
    this.props.onPlusValue('+');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_2 = () => {
    this.props.onPlusValue('=');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_3 = () => {
    this.props.onPlusValue('-');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_4 = () => {
    this.props.onPlusValue('@');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_5 = () => {
    this.props.onPlusValue('~');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_6 = () => {
    this.props.onPlusValue('&');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_7 = () => {
    this.props.onPlusValue('.');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_8 = () => {
    this.props.onPlusValue('?');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_9 = () => {
    this.props.onPlusValue(':');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_10 = () => {
    this.props.onPlusValue('#');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_11 = () => {
    this.props.onPlusValue('%');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_12 = () => {
    this.props.onPlusValue('_');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_13 = () => {
    this.props.onPlusValue('$');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_14 = () => {
    this.props.onPlusValue('(');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_15 = () => {
    this.props.onPlusValue(')');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_16 = () => {
    this.props.onPlusValue(',');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_17 = () => {
    this.props.onPlusValue('/');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_18 = () => {
    this.props.onPlusValue('*');
    operationStore.keyboardButtonSound.play();
  };
  click_sy_19 = () => {
    this.props.onPlusValue('^');
    operationStore.keyboardButtonSound.play();
  };

  changeToABC = async () => {
    brsStore.numberFlag = false;
    brsStore.EnFlag = true;
    brsStore.enFlag = false;
    brsStore.symbolFlag = false;
    
    
    operationStore.keyboardButtonSound.play();
  };
  changeTo123 = async () => {
    brsStore.numberFlag = true;
    brsStore.EnFlag = false;
    brsStore.enFlag = false;
    brsStore.symbolFlag = false;
    
    
    operationStore.keyboardButtonSound.play();
  };
  changeToAbc = async () => {
    brsStore.numberFlag = false;
    brsStore.EnFlag = false;
    brsStore.enFlag = true;
    brsStore.symbolFlag = false;
    
    
    operationStore.keyboardButtonSound.play();
  };
  changeToSy = async () => {
    brsStore.numberFlag = false;
    brsStore.EnFlag = false;
    brsStore.enFlag = false;
    brsStore.symbolFlag = true;
    
    
    operationStore.keyboardButtonSound.play();
  };

  render() {
    return (
      <View>
        {brsStore.numberFlag === true && (
          <View>
            <View removeClippedSubviews={true} style={{flexDirection: 'row'}}>
              {this.props.valueEx.length !== 10 && (
                <TextInput
                  contextMenuHidden={true}
                  scrollEnabled={false}
                  showSoftInputOnFocus={false}
                  selection={brsStore.keyboardSelection}
                  onSelectionChange={event => {
                    brsStore.keyboardSelection =
                      event.nativeEvent.selection.start;
                    brsStore.keyboardSelectionStart =
                      event.nativeEvent.selection.start;
                    brsStore.keyboardSelectionEnd =
                      event.nativeEvent.selection.end;
                  }}
                  blurOnSubmit={false}
                  editable={true}
                  style={styles.input}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                />
              )}
              {this.props.valueEx.length === 10 && (
                <TextInput
                  contextMenuHidden={true}
                  scrollEnabled={false}
                  showSoftInputOnFocus={false}
                  selection={brsStore.keyboardSelection}
                  onSelectionChange={event => {
                    brsStore.keyboardSelection =
                      event.nativeEvent.selection.start;
                    brsStore.keyboardSelectionStart =
                      event.nativeEvent.selection.start;
                    brsStore.keyboardSelectionEnd =
                      event.nativeEvent.selection.end;
                  }}
                  blurOnSubmit={false}
                  editable={true}
                  style={styles.input}
                  placeholder={this.props.placeholder}
                  value={this.props.valueEx}
                />
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={async () => {
                    
                    
                    operationStore.keyboardButtonSound.play();
                    
                    
                    if (brsStore.keyboardOpen === true) {
                      brsStore.keyboardModal.close();
                      brsStore.keyboardOpen = false;
                    }
                  }}>
                  <Text style={styles.buttonLabel2}>▼</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.changeToABC}>
                  <Text style={styles.buttonLabel2}>ABC</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={this.clickBack}
                  onLongPress={this.clickBackLong}
                  onPressOut={this.pressOut}>
                  <Text style={styles.buttonLabel2}>&larr;</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_1}>
                  <Text style={styles.buttonLabel}>1</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_2}>
                  <Text style={styles.buttonLabel}>2</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_3}>
                  <Text style={styles.buttonLabel}>3</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_4}>
                  <Text style={styles.buttonLabel}>4</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_5}>
                  <Text style={styles.buttonLabel}>5</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_6}>
                  <Text style={styles.buttonLabel}>6</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_7}>
                  <Text style={styles.buttonLabel}>7</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_8}>
                  <Text style={styles.buttonLabel}>8</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_9}>
                  <Text style={styles.buttonLabel}>9</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.changeToSy}>
                  <Text style={styles.buttonLabel3}>#+=</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_0}>
                  <Text style={styles.buttonLabel}>0</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.click_sy_18}>
                  <Text style={styles.buttonLabel}>*</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        )}
        {brsStore.EnFlag === true && (
          <View>
            <View removeClippedSubviews={true} style={{flexDirection: 'row'}}>
              <TextInput
                contextMenuHidden={true}
                scrollEnabled={false}
                showSoftInputOnFocus={false}
                selection={brsStore.keyboardSelection}
                onSelectionChange={event => {
                  brsStore.keyboardSelection =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionStart =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionEnd =
                    event.nativeEvent.selection.end;
                }}
                blurOnSubmit={false}
                editable={true}
                style={styles.input}
                placeholder={this.props.placeholder}
                value={this.props.value}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={async () => {
                    
                    
                    operationStore.keyboardButtonSound.play();
                    operationStore.keyboardButtonSound.play();
                    
                    
                    if (brsStore.keyboardOpen === true) {
                      brsStore.keyboardModal.close();
                      brsStore.keyboardOpen = false;
                    }
                  }}>
                  <Text style={styles.buttonLabel2}>▼</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.changeTo123}>
                  <Text style={styles.buttonLabel2}>123</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={this.clickBack}
                  onLongPress={this.clickBackLong}
                  onPressOut={this.pressOut}>
                  <Text style={styles.buttonLabel2}>&larr;</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_A}>
                  <Text style={styles.buttonLabelEn}>A</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_B}>
                  <Text style={styles.buttonLabelEn}>B</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_C}>
                  <Text style={styles.buttonLabelEn}>C</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_D}>
                  <Text style={styles.buttonLabelEn}>D</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_E}>
                  <Text style={styles.buttonLabelEn}>E</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_F}>
                  <Text style={styles.buttonLabelEn}>F</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_G}>
                  <Text style={styles.buttonLabelEn}>G</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_H}>
                  <Text style={styles.buttonLabelEn}>H</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_I}>
                  <Text style={styles.buttonLabelEn}>I</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_J}>
                  <Text style={styles.buttonLabelEn}>J</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_K}>
                  <Text style={styles.buttonLabelEn}>K</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_L}>
                  <Text style={styles.buttonLabelEn}>L</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_M}>
                  <Text style={styles.buttonLabelEn}>M</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_N}>
                  <Text style={styles.buttonLabelEn}>N</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_O}>
                  <Text style={styles.buttonLabelEn}>O</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_P}>
                  <Text style={styles.buttonLabelEn}>P</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_Q}>
                  <Text style={styles.buttonLabelEn}>Q</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_R}>
                  <Text style={styles.buttonLabelEn}>R</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_S}>
                  <Text style={styles.buttonLabelEn}>S</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_T}>
                  <Text style={styles.buttonLabelEn}>T</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_U}>
                  <Text style={styles.buttonLabelEn}>U</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_V}>
                  <Text style={styles.buttonLabelEn}>V</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_W}>
                  <Text style={styles.buttonLabelEn}>W</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_X}>
                  <Text style={styles.buttonLabelEn}>X</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_Y}>
                  <Text style={styles.buttonLabelEn}>Y</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.changeToSy}>
                  <Text style={styles.buttonLabelEn2}>#+=</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_sy_3}>
                  <Text style={styles.buttonLabelEn}>-</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_Z}>
                  <Text style={styles.buttonLabelEn}>Z</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_sy_7}>
                  <Text style={styles.buttonLabelEn}>.</Text>
                </TouchableHighlight>
              </View>

              {brsStore.brsUserLogin === false && (
                <View style={styles.buttonEn}>
                  <TouchableHighlight onPress={this.changeToAbc}>
                    <Text style={styles.buttonLabelEn2}>⇧</Text>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          </View>
        )}
        {brsStore.enFlag === true && (
          <View>
            <View removeClippedSubviews={true} style={{flexDirection: 'row'}}>
              <TextInput
                contextMenuHidden={true}
                scrollEnabled={false}
                showSoftInputOnFocus={false}
                selection={brsStore.keyboardSelection}
                onSelectionChange={event => {
                  brsStore.keyboardSelection =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionStart =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionEnd =
                    event.nativeEvent.selection.end;
                }}
                blurOnSubmit={false}
                editable={true}
                style={styles.input}
                placeholder={this.props.placeholder}
                value={this.props.value}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={async () => {
                    operationStore.keyboardButtonSound.play();
                    if (brsStore.keyboardOpen === true) {
                      brsStore.keyboardModal.close();
                      brsStore.keyboardOpen = false;
                    }
                  }}>
                  <Text style={styles.buttonLabel2}>▼</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.changeTo123}>
                  <Text style={styles.buttonLabel2}>123</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={this.clickBack}
                  onLongPress={this.clickBackLong}
                  onPressOut={this.pressOut}>
                  <Text style={styles.buttonLabel2}>&larr;</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_a}>
                  <Text style={styles.buttonLabelEn}>a</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_b}>
                  <Text style={styles.buttonLabelEn}>b</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_c}>
                  <Text style={styles.buttonLabelEn}>c</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_d}>
                  <Text style={styles.buttonLabelEn}>d</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_e}>
                  <Text style={styles.buttonLabelEn}>e</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_f}>
                  <Text style={styles.buttonLabelEn}>f</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_g}>
                  <Text style={styles.buttonLabelEn}>g</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_h}>
                  <Text style={styles.buttonLabelEn}>h</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_i}>
                  <Text style={styles.buttonLabelEn}>i</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_j}>
                  <Text style={styles.buttonLabelEn}>j</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_k}>
                  <Text style={styles.buttonLabelEn}>k</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_l}>
                  <Text style={styles.buttonLabelEn}>l</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_m}>
                  <Text style={styles.buttonLabelEn}>m</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_n}>
                  <Text style={styles.buttonLabelEn}>n</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_o}>
                  <Text style={styles.buttonLabelEn}>o</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_p}>
                  <Text style={styles.buttonLabelEn}>p</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_q}>
                  <Text style={styles.buttonLabelEn}>q</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_r}>
                  <Text style={styles.buttonLabelEn}>r</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_s}>
                  <Text style={styles.buttonLabelEn}>s</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_t}>
                  <Text style={styles.buttonLabelEn}>t</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_u}>
                  <Text style={styles.buttonLabelEn}>u</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_v}>
                  <Text style={styles.buttonLabelEn}>v</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_w}>
                  <Text style={styles.buttonLabelEn}>w</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_x}>
                  <Text style={styles.buttonLabelEn}>x</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_y}>
                  <Text style={styles.buttonLabelEn}>y</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.changeToSy}>
                  <Text style={styles.buttonLabelEn2}>#+=</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_sy_3}>
                  <Text style={styles.buttonLabelEn}>-</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_z}>
                  <Text style={styles.buttonLabelEn}>z</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonEn}>
                <TouchableHighlight onPress={this.click_sy_7}>
                  <Text style={styles.buttonLabelEn}>.</Text>
                </TouchableHighlight>
              </View>
              {brsStore.brsUserLogin === false && (
                <View style={styles.buttonEn}>
                  <TouchableHighlight onPress={this.changeToABC}>
                    <Text style={styles.buttonLabelEn2}>⇧</Text>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          </View>
        )}
        {brsStore.symbolFlag === true && (
          <View>
            <View removeClippedSubviews={true} style={{flexDirection: 'row'}}>
              <TextInput
                contextMenuHidden={true}
                scrollEnabled={false}
                showSoftInputOnFocus={false}
                selection={brsStore.keyboardSelection}
                onSelectionChange={event => {
                  brsStore.keyboardSelection =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionStart =
                    event.nativeEvent.selection.start;
                  brsStore.keyboardSelectionEnd =
                    event.nativeEvent.selection.end;
                }}
                blurOnSubmit={false}
                editable={true}
                style={styles.input}
                placeholder={this.props.placeholder}
                value={this.props.value}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={async () => {
                    
                    
                    // operationStore.keyboardButtonSound.play();
                    
                    
                    if (brsStore.keyboardOpen === true) {
                      brsStore.keyboardModal.close();
                      brsStore.keyboardOpen = false;
                    }
                  }}>
                  <Text style={styles.buttonLabel2}>▼</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight onPress={this.changeToABC}>
                  <Text style={styles.buttonLabel2}>ABC</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.button}>
                <TouchableHighlight
                  onPress={this.clickBack}
                  onLongPress={this.clickBackLong}
                  onPressOut={this.pressOut}>
                  <Text style={styles.buttonLabel2}>&larr;</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_1}>
                  <Text style={styles.buttonLabelSy}>+</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_2}>
                  <Text style={styles.buttonLabelSy}>=</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_3}>
                  <Text style={styles.buttonLabelSy}>-</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_4}>
                  <Text style={styles.buttonLabelSy}>@</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_5}>
                  <Text style={styles.buttonLabelSy}>~</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_6}>
                  <Text style={styles.buttonLabelSy}>&</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_7}>
                  <Text style={styles.buttonLabelSy}>.</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_8}>
                  <Text style={styles.buttonLabelSy}>?</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_9}>
                  <Text style={styles.buttonLabelSy}>:</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_10}>
                  <Text style={styles.buttonLabelSy}>#</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_11}>
                  <Text style={styles.buttonLabelSy}>%</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_12}>
                  <Text style={styles.buttonLabelSy}>_</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_13}>
                  <Text style={styles.buttonLabelSy}>$</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_14}>
                  <Text style={styles.buttonLabelSy}>(</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_15}>
                  <Text style={styles.buttonLabelSy}>)</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_16}>
                  <Text style={styles.buttonLabelSy}>,</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.changeTo123}>
                  <Text style={styles.buttonLabelSy2}>123</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_17}>
                  <Text style={styles.buttonLabelSy}>/</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_18}>
                  <Text style={styles.buttonLabelSy}>*</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.buttonSy}>
                <TouchableHighlight onPress={this.click_sy_19}>
                  <Text style={styles.buttonLabelSy}>^</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtDarkBlueSpan0: {
    
    color: '#182EA4',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 36,
    fontWeight: '700',
    fontStyle: 'normal',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modal4: {
    height: 550,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'grey',
    width: 360,
    fontSize: 28,
  },
  buttonLabel: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 78,
  },
  buttonLabel2: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 48,
    backgroundColor: 'gray',
  },
  buttonLabel3: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 78,
    backgroundColor: 'gray',
  },
  buttonLabelEn: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 51,
  },
  buttonLabelEn2: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 51,
    backgroundColor: 'gray',
  },
  buttonLabelSy: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 62,
  },
  buttonLabelSy2: {
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 62,
    backgroundColor: 'gray',
  },
  button: {
    width: '33.333333333%',
  },
  buttonEn: {
    width: '20%',
  },
  buttonSy: {
    width: '25%',
  },
});

const layouts = {};

export default BigKeyBoard;
