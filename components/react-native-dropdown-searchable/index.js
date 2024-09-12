import PropTypes from 'prop-types';
import React from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewPropTypes,
  StyleSheet,
  Image,
} from 'react-native';
import normalize from './utility/NormalizedText';
import {hp, wp} from './utility/ResponsiveScreen';
import Utils from './utility/Utils';
import Modal from 'react-native-modalbox';
import BigKeyBoard from '../BigKeyBoard';
import posize from '../../screen/posize.v11';
import {brsStore} from '../../storage/brsStore';
const PxImage = posize(Image);
const PxTouchableOpacity = posize(TouchableOpacity);

function styleByListSize(list) {
  const length = list.length;
  const height = hp('8.5%');
  const style = {
    maxHeight: hp('70%'),
    borderWidth: 1,
  };
  
  
  
  
  
  
  
  
  return style;
}

export default class SearchableDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      listItems: [],
      focus: true,
    };
  }

  textTitle = '';
  plusValue = async value => {
    if (brsStore.keyboardSelectionStart !== null) {
      this.textTitle =
        this.textTitle.slice(0, brsStore.keyboardSelectionStart) +
        value +
        this.textTitle.slice(brsStore.keyboardSelectionStart);
    } else {
      this.textTitle += value;
    }
    
    await this.searchedItems(this.textTitle);

    if (brsStore.keyboardSelectionStart >= this.textTitle.length) {
      brsStore.keyboardSelectionStart = this.textTitle.length;
      brsStore.keyboardSelectionEnd = this.textTitle.length;
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
  backValue = async () => {
    if (
      brsStore.keyboardSelectionStart !== null &&
      brsStore.keyboardSelectionStart <= this.textTitle.length
    ) {
      if (brsStore.keyboardSelectionStart !== 0) {
        this.textTitle =
          this.textTitle.slice(0, brsStore.keyboardSelectionStart - 1) +
          this.textTitle.slice(
            brsStore.keyboardSelectionStart,
            this.textTitle.length,
          );
      }
    } else {
      this.textTitle = this.textTitle.substring(0, this.textTitle.length - 1);
    }
    
    await this.searchedItems(this.textTitle);
  };

  componentDidMount() {
    const listItems = this.props.items;
    const defaultIndex = this.props.defaultIndex;
    if (defaultIndex && listItems.length > defaultIndex) {
      this.setState({
        listItems,
        item: listItems[defaultIndex],
      });
    } else {
      this.setState({listItems});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    nextState.focus = true;
    return Utils.shallowCompare(this, nextProps, nextState);
  }

  searchedItems = searchedText => {
    searchedText = searchedText.toUpperCase();
    const ac = this.props.items.filter(item => {
      return item.title.indexOf(searchedText) > -1;
    });
    const item = {
      title: searchedText,
    };
    this.setState({listItems: ac, item});
    const onTextChange = this.props.onTextChange;
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText);
      }, 0);
    }
  };

  renderItems(item) {
    return (
      <TouchableOpacity
        style={searchableDropDownStyle.itemContainer}
        onPress={() => {
          this.setState({item, focus: false}, () => {
            this.props.onItemSelect(item);
          });
          Keyboard.dismiss();
        }}>
        <Text style={searchableDropDownStyle.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  renderFlatList() {
    if (this.state.focus) {
      return (
        <FlatList
          keyboardShouldPersistTaps="always"
          data={this.state.listItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderItems(item)}
          style={[
            searchableDropDownStyle.listContainer,
            styleByListSize(this.state.listItems),
          ]}
        />
      );
    }
  }

  render() {
    return (
      <View style={searchableDropDownStyle.container}>
        <View removeClippedSubviews={true}>
          <TextInput
            contextMenuHidden={true}
            scrollEnabled={false}
            showSoftInputOnFocus={false}
            blurOnSubmit={false}
            underlineColorAndroid={this.props.underlineColorAndroid}
            maxLength={30}
            onFocus={() => this.setState({focus: true})}
            onBlur={() => this.setState({focus: false})}
            ref={e => {
              this.input = e;
            }}
            onChangeText={text => this.searchedItems(text)}
            value={this.state.item.title}
            style={searchableDropDownStyle.input}
            placeholderTextColor={this.props.placeholderTextColor}
            placeholder={this.props.placeholder}
          />
        </View>
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
            source={require('../../assets/mobile_keyboard.png')}
            layout={layouts.img10}
          />
        </PxTouchableOpacity>
        {this.renderFlatList()}

        <Modal
          style={[
            searchableDropDownStyle.modal,
            searchableDropDownStyle.modalHeight,
          ]}
          position={'bottom'}
          ref={'modal1'}>
          <BigKeyBoard
            value={this.state.item.title}
            valueEx={''}
            onPlusValue={this.plusValue}
            onBackValue={this.backValue}
            placeholder={''}
            refs={this.refs}
            modal={'modal1'}
          />
        </Modal>
      </View>
    );
  }
}

const searchableDropDownStyle = StyleSheet.create({
  img15Outer: {flexGrow: 0, flexShrink: 0, flexBasis: 20, minWidth: 20},
  img15Body: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalHeight: {height: 550},
  listContainer: {
    backgroundColor: 'transparent',
    width: wp('95%'),
    borderColor: 'gray',
    borderRadius: 2,
  },
  itemContainer: {
    height: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    margin: 6,
    zIndex: 0,
  },
  itemText: {
    fontSize: normalize(22),
    color: 'black',
    textAlign: 'left',
    fontWeight: '700',
    padding: 1,
  },
  input: {
    height: hp('8%'),
    width: wp('95%'),
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 0.6,
    borderRadius: 2,
    fontSize: normalize(24),
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
});

SearchableDropDown.defaultProps = {
  items: [],
  defaultIndex: -1,
  onTextChange: () => {},
  onItemSelect: () => {},
  containerStyle: {},
  textInputStyle: {},
  itemStyle: {},
  itemTextStyle: {},
  resetValue: true,
  placeholder: 'لطفا متنی وارد کنید...',
  placeholderTextColor: 'black',
  itemsContainerStyle: {},
  underlineColorAndroid: 'transparent',
};

SearchableDropDown.propTypes = {
  items: PropTypes.array,
  defaultIndex: PropTypes.number,
  onTextChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  textInputStyle: ViewPropTypes.style,
  itemStyle: ViewPropTypes.style,
  itemTextStyle: ViewPropTypes.style,
  resetValue: PropTypes.bool,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  itemsContainerStyle: ViewPropTypes.style,
  underlineColorAndroid: PropTypes.string,
};

const layouts = {
  img10: {
    xy: [['50px'], ['0fr', '50px', '20px']],
    outerStyle: searchableDropDownStyle.img15Outer,
    style: searchableDropDownStyle.img15Body,
  },
  img09: {
    absolute: true,
    xy: [['290px', '40px', '5px'], ['5px', '40px', '20px']],
    outerStyle: searchableDropDownStyle.img15Outer,
    style: searchableDropDownStyle.img15Body,
  },
};
