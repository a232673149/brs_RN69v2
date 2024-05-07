
// import React from 'react';
import {brsStore} from '../storage/brsStore';
import {observable} from 'mobx';
import {operationStore} from '../storage/operationStore';
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import {cartListItemsModel} from './CartListItemsModel';
import Moment from 'moment';
import {Alert} from '../components/Alert';
import log from '../module/Logger';
import {bagBarcode} from '../module/BagBarcode';

class Search_BagInfoQueryModel {
  @observable bagNo = '';
  @observable showBagNo = '';
  @observable downloadBusy = false;
  @observable toggleCheckBox = false;
  @observable searchAllCheckBox = false;
  @observable cabinList = [];
  @observable destinationList = [];
  @observable cartList = [];
  @observable cabin_class = '';
  @observable destination = '';
  @observable cart_id = '';
  @observable load_flight_done = false;
  @observable tableHead = ['行李號碼', '航班號碼', '目的地', '艙等', '檢視'];
  @observable tableData = [];
  @observable widthArr = [120, 100, 80, 50, 60];
  @observable resultLen = 0;
  @observable BSMDataByFlight = [];
  @observable load_done = false;
  @observable lock = false;

  onChangeTextBagNo = text => {
    this.showBagNo = text;
    this.bagNo = text;
    if (bagBarcode.checkBagBarcode(text) === true) {
      this.showBagNo = '';
    }
  };

  onChangeCheckBox = async value => {
    if (operationStore.selectflighItem !== '') {
      this.toggleCheckBox = value;
      if (this.toggleCheckBox === false) {
        this.cabinList = [];
        this.destinationList = [];
        this.cartList = [];
        this.BSMDataByFlight = [];
        this.cabin_class = '';
        this.destination = '';
        this.cart_id = '';
      } else {
        this.load_flight_done = false;
        this.downloadBusy = true; 
        this.downloadBusy = false; 
        this.load_flight_done = true;
        this.searchAllCheckBox = false;
      }
    } else {
      displayFlashMessage.displayMessage('danger', '請先選擇航班!');
    }
  };

  onChangeSearchAllCheckBox = async value => {
    if (operationStore.selectflighItem !== '') {
      this.searchAllCheckBox = value;
      if (this.searchAllCheckBox === true) {
        this.cabinList = [];
        this.destinationList = [];
        this.cartList = [];
        this.BSMDataByFlight = [];
        this.cabin_class = '';
        this.destination = '';
        this.cart_id = '';
        this.toggleCheckBox = false;
      } else {
        this.load_flight_done = false;
        this.downloadBusy = true; 
        this.downloadBusy = false; 
        this.load_flight_done = true;
      }
    } else {
      displayFlashMessage.displayMessage('danger', '請先選擇航班!');
    }
  };

  onChangeCabinClass = async value => {
    this.cabin_class = value;
  };
  onChangeDestination = async value => {
    this.destination = value;
  };
  onChangeCartId = async value => {
    this.cart_id = value;
  };

  
  
  SearchBagInfo = async () => {
    this.tableData = [];
    this.resultLen = 0;
    this.load_done = false;

    if (brsStore.wifiOff === true) {
      displayFlashMessage.displayMessage(
        'danger',
        '網路不良, 無法搜尋行李資料',
      );
      return;
    }

    if (this.toggleCheckBox === false && this.searchAllCheckBox === false) {
      if (this.bagNo === '') {
        displayFlashMessage.displayMessage('danger', '請輸入行李號碼!');
        return;
      } else if (bagBarcode.checkBagBarcodeForSearch(this.bagNo) !== true) {
        displayFlashMessage.displayMessage('danger', '行李號碼格式錯誤!');
        return;
      }
      let bag_tag = this.bagNo;

      if (bag_tag.length < 10) {
        bag_tag = '%' + bag_tag;
      }

      bag_tag = encodeURIComponent(bag_tag);

      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${
          brsStore.useWsAddress
        }/GetBSMForAndroid?strName=BSM02&strArgs=${brsStore.brsUI}&strArgs=${
          brsStore.brsUP
        }&strArgs=${bag_tag}`;
        
        brsStore.syncServer = brsStore.syncServer + 1; 
        
        const response = await fetch(input, {
          method: 'GET',
          timeoutInterval: 10000, 
          
          
          
          
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            e_platform: 'mobile',
          },
        });

        brsStore.syncServer = brsStore.syncServer - 1; 

        if (response.status === 200) {
          brsStore.connectionFailed = false; 
          this.downloadBusy = false; 
          this.errMessage = '';
          let text = await response.text();
          parseString(text, {trim: [true]}, function(err, result) {
            if (result.DataSet['diffgr:diffgram'] != null) {
              
              
              
              

              if (
                result.DataSet['diffgr:diffgram'][0].NewDataSet === undefined
              ) {
                Alert.alert('', '此行李不屬於登入帳號的公司', [
                  {
                    text: '確認',
                    onPress: () => null,
                  },
                ]);
              } else {
                _thisRef.resultLen =
                  result.DataSet[
                    'diffgr:diffgram'
                  ][0].NewDataSet[0].Table.length;
                new Promise(async (resolve, reject) => {
                  result.DataSet[
                    'diffgr:diffgram'
                  ][0].NewDataSet[0].Table.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }

                    _thisRef.tableData.push([
                      bsm_tag,
                      bsm_flight,
                      destination,
                      cabin_class,
                      bsm_tag,
                    ]);
                  });
                  resolve();
                });
                _thisRef.load_done = true;
                displayFlashMessage.displayMessage(
                  'success',
                  '搜尋行李資料成功!',
                );
              }
            } else {
              
              displayFlashMessage.displayMessage('danger', '此行李號碼無資料!');
            }
          });

          return true;
        } else {
          
          
          brsStore.connectionFailed = true; 
          this.successMessage = '';
          this.downloadBusy = false; 

          return false;
        }
      } catch (err) {
        console.log('Fetch Error', err);
        brsStore.syncServer = brsStore.syncServer - 1; 
        brsStore.connectionFailed = true; 
        this.downloadBusy = false; 
        this.errMessage = '網路不良, 無法搜尋行李資料 ';
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    } else if (
      this.toggleCheckBox === true &&
      this.searchAllCheckBox === false
    ) {
      
      
      

      if (operationStore.selectflighItem !== '') {
        let _thisRef = this;
        this.downloadBusy = true; 
        try {
          const parseString = require('react-native-xml2js').parseString;
          let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
            brsStore.brsUI
          }&strArgs=${brsStore.brsUP}&strArgs=${
            operationStore.selectflighItem.FLIGHT_NO
          }&strArgs=${operationStore.selectflighItem.FLIGHT_DATE}`;
          
          brsStore.syncServer = brsStore.syncServer + 1; 
          
          const response = await fetch(input, {
            method: 'GET',
            timeoutInterval: 10000, 
            
            
            
            
            headers: {
              Accept: 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              e_platform: 'mobile',
            },
          });

          brsStore.syncServer = brsStore.syncServer - 1; 

          if (response.status === 200) {
            brsStore.connectionFailed = false; 
            this.downloadBusy = false; 
            this.errMessage = '';
            let text = await response.text();
            parseString(text, {trim: [true]}, function(err, result) {
              if (result.DataSet['diffgr:diffgram'] != null) {
                
                
                
                
                
                _thisRef.BSMDataByFlight =
                  result.DataSet['diffgr:diffgram'][0].NewDataSet[0].Table;

                new Promise(async (resolve, reject) => {
                  _thisRef.BSMDataByFlight.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }
                    let bag_state = item.BAG_STATE[0];
                    let matchFlag = true;

                    let bsm_cartId = '';
                    try {
                      bsm_cartId = item.CART_ID[0];
                    } catch (err) {
                      bsm_cartId = '未裝櫃';
                    }

                    if (
                      cartListItemsModel.searchBagInfoCart !== '' &&
                      cartListItemsModel.searchBagInfoCart !== undefined
                    ) {
                      if (
                        cartListItemsModel.searchBagInfoCart === bsm_cartId &&
                        bag_state === '10'
                      ) {
                      } else {
                        matchFlag = false;
                      }
                    }
                    if (_thisRef.destination !== '') {
                      if (_thisRef.destination !== destination) {
                        matchFlag = false;
                      }
                    }
                    if (_thisRef.cabin_class !== '') {
                      if (_thisRef.cabin_class !== cabin_class) {
                        matchFlag = false;
                      }
                    }

                    if (_thisRef.bagNo !== '') {
                      if (bsm_tag.indexOf(_thisRef.bagNo) === -1) {
                        matchFlag = false;
                      }
                    }

                    if (matchFlag === true) {
                      _thisRef.tableData.push([
                        bsm_tag,
                        bsm_flight,
                        destination,
                        cabin_class,
                        bsm_tag,
                      ]);
                    }
                  });
                  resolve();
                });
                _thisRef.resultLen = _thisRef.tableData.length;
                _thisRef.load_done = true;
                displayFlashMessage.displayMessage(
                  'success',
                  '取得行李資料成功!',
                );
              } else {
                
                displayFlashMessage.displayMessage(
                  'danger',
                  '此航班無行李資料!',
                );
              }
            });

            return true;
          } else {
            
            
            brsStore.connectionFailed = true; 
            this.successMessage = '';
            this.downloadBusy = false; 

            return false;
          }
        } catch (err) {
          console.log('Fetch Error', err);
          brsStore.syncServer = brsStore.syncServer - 1; 
          brsStore.connectionFailed = true; 
          this.downloadBusy = false; 
          this.errMessage = '網路不良, 無法取得行李資料 ';

          log._transportOptions.loggerName =
            Moment().format('yyyy-MM-DD') + '_brsLogsFile';
          log.warn(this.errMessage + err);

          return false;
        }
      }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    } else if (
      this.searchAllCheckBox === true &&
      this.toggleCheckBox === false
    ) {
      
      
      

      if (operationStore.selectflighItem !== '') {
        let _thisRef = this;
        this.downloadBusy = true; 
        try {
          const parseString = require('react-native-xml2js').parseString;
          let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
            brsStore.brsUI
          }&strArgs=${brsStore.brsUP}&strArgs=${
            operationStore.selectflighItem.FLIGHT_NO
          }&strArgs=${operationStore.selectflighItem.FLIGHT_DATE}`;
          
          brsStore.syncServer = brsStore.syncServer + 1; 
          
          const response = await fetch(input, {
            method: 'GET',
            timeoutInterval: 10000, 
            
            
            
            
            headers: {
              Accept: 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              e_platform: 'mobile',
            },
          });

          brsStore.syncServer = brsStore.syncServer - 1; 

          if (response.status === 200) {
            brsStore.connectionFailed = false; 
            this.downloadBusy = false; 
            this.errMessage = '';
            let text = await response.text();
            parseString(text, {trim: [true]}, function(err, result) {
              if (result.DataSet['diffgr:diffgram'] != null) {
                
                
                
                
                
                _thisRef.BSMDataByFlight =
                  result.DataSet['diffgr:diffgram'][0].NewDataSet[0].Table;

                new Promise(async (resolve, reject) => {
                  _thisRef.BSMDataByFlight.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }
                    let bag_state = item.BAG_STATE[0];
                    let matchFlag = true;

                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    

                    if (_thisRef.bagNo !== '') {
                      if (bsm_tag.indexOf(_thisRef.bagNo) === -1) {
                        matchFlag = false;
                      }
                    }

                    if (matchFlag === true) {
                      _thisRef.tableData.push([
                        bsm_tag,
                        bsm_flight,
                        destination,
                        cabin_class,
                        bsm_tag,
                      ]);
                    }
                  });
                  resolve();
                });
                _thisRef.resultLen = _thisRef.tableData.length;
                _thisRef.load_done = true;
                displayFlashMessage.displayMessage(
                  'success',
                  '取得行李資料成功!',
                );
              } else {
                
                displayFlashMessage.displayMessage(
                  'danger',
                  '此航班無行李資料!',
                );
              }
            });

            return true;
          } else {
            
            
            brsStore.connectionFailed = true; 
            this.successMessage = '';
            this.downloadBusy = false; 

            return false;
          }
        } catch (err) {
          console.log('Fetch Error', err);
          brsStore.syncServer = brsStore.syncServer - 1; 
          brsStore.connectionFailed = true; 
          this.downloadBusy = false; 
          this.errMessage = '網路不良, 無法取得行李資料 ';
          log._transportOptions.loggerName =
            Moment().format('yyyy-MM-DD') + '_brsLogsFile';
          log.warn(this.errMessage + err);

          return false;
        }
      }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    }
  };

  
  
  SearchBagInfoByFilght = async flightItem => {
    this.tableData = [];
    this.resultLen = 0;
    this.load_done = false;

    
    
    
    
    
    
    

    if (this.toggleCheckBox === false && this.searchAllCheckBox === false) {
      if (this.bagNo === '') {
        
        return;
      } else if (bagBarcode.checkBagBarcodeForSearch(this.bagNo) !== true) {
        
        return;
      }
      let bag_tag = this.bagNo;

      if (bag_tag.length < 10) {
        bag_tag = '%' + bag_tag;
      }

      bag_tag = encodeURIComponent(bag_tag);

      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${
          brsStore.useWsAddress
        }/GetBSMForAndroid?strName=BSM02&strArgs=${brsStore.brsUI}&strArgs=${
          brsStore.brsUP
        }&strArgs=${bag_tag}`;
        
        brsStore.syncServer = brsStore.syncServer + 1; 
        
        const response = await fetch(input, {
          method: 'GET',
          timeoutInterval: 10000, 
          
          
          
          
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            e_platform: 'mobile',
          },
        });

        brsStore.syncServer = brsStore.syncServer - 1; 

        if (response.status === 200) {
          brsStore.connectionFailed = false; 
          this.downloadBusy = false; 
          this.errMessage = '';
          let text = await response.text();
          parseString(text, {trim: [true]}, function(err, result) {
            if (result.DataSet['diffgr:diffgram'] != null) {
              
              
              
              
              if (
                result.DataSet['diffgr:diffgram'][0].NewDataSet === undefined
              ) {
                
                
                
                
                
                
              } else {
                _thisRef.resultLen =
                  result.DataSet[
                    'diffgr:diffgram'
                  ][0].NewDataSet[0].Table.length;
                new Promise(async (resolve, reject) => {
                  result.DataSet[
                    'diffgr:diffgram'
                  ][0].NewDataSet[0].Table.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }

                    _thisRef.tableData.push([
                      bsm_tag,
                      bsm_flight,
                      destination,
                      cabin_class,
                      bsm_tag,
                    ]);
                  });
                  resolve();
                });
                _thisRef.load_done = true;
                
                
                
                
              }
            } else {
              
              
            }
          });

          return true;
        } else {
          
          
          brsStore.connectionFailed = true; 
          this.successMessage = '';
          this.downloadBusy = false; 

          return false;
        }
      } catch (err) {
        console.log('Fetch Error', err);
        brsStore.syncServer = brsStore.syncServer - 1; 
        brsStore.connectionFailed = true; 
        this.downloadBusy = false; 
        this.errMessage = '網路不良, 無法搜尋行李資料 ';
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    } else if (
      this.toggleCheckBox === true &&
      this.searchAllCheckBox === false
    ) {
      
      
      
      cartListItemsModel.searchBagInfoCart = '';
      this.cabin_class = '';
      this.destination = '';
      this.lock = false;

      if (flightItem !== '') {
        let _thisRef = this;
        this.downloadBusy = true; 
        try {
          const parseString = require('react-native-xml2js').parseString;
          let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
            brsStore.brsUI
          }&strArgs=${brsStore.brsUP}&strArgs=${flightItem.FLIGHT_NO}&strArgs=${
            flightItem.FLIGHT_DATE
          }`;
          
          brsStore.syncServer = brsStore.syncServer + 1; 
          
          const response = await fetch(input, {
            method: 'GET',
            timeoutInterval: 10000, 
            
            
            
            
            headers: {
              Accept: 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              e_platform: 'mobile',
            },
          });

          brsStore.syncServer = brsStore.syncServer - 1; 

          if (response.status === 200) {
            brsStore.connectionFailed = false; 
            this.downloadBusy = false; 
            this.errMessage = '';
            let text = await response.text();
            parseString(text, {trim: [true]}, function(err, result) {
              if (result.DataSet['diffgr:diffgram'] != null) {
                
                
                
                
                
                _thisRef.BSMDataByFlight =
                  result.DataSet['diffgr:diffgram'][0].NewDataSet[0].Table;

                new Promise(async (resolve, reject) => {
                  _thisRef.BSMDataByFlight.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }
                    let bag_state = item.BAG_STATE[0];
                    let matchFlag = true;

                    let bsm_cartId = '';
                    try {
                      bsm_cartId = item.CART_ID[0];
                    } catch (err) {
                      bsm_cartId = '未裝櫃';
                    }

                    if (
                      cartListItemsModel.searchBagInfoCart !== '' &&
                      cartListItemsModel.searchBagInfoCart !== undefined
                    ) {
                      if (
                        cartListItemsModel.searchBagInfoCart === bsm_cartId &&
                        bag_state === '10'
                      ) {
                      } else {
                        matchFlag = false;
                      }
                    }
                    if (_thisRef.destination !== '') {
                      if (_thisRef.destination !== destination) {
                        matchFlag = false;
                      }
                    }
                    if (_thisRef.cabin_class !== '') {
                      if (_thisRef.cabin_class !== cabin_class) {
                        matchFlag = false;
                      }
                    }

                    if (_thisRef.bagNo !== '') {
                      if (bsm_tag.indexOf(_thisRef.bagNo) === -1) {
                        matchFlag = false;
                      }
                    }

                    if (matchFlag === true) {
                      _thisRef.tableData.push([
                        bsm_tag,
                        bsm_flight,
                        destination,
                        cabin_class,
                        bsm_tag,
                      ]);
                    }
                  });
                  resolve();
                });
                _thisRef.resultLen = _thisRef.tableData.length;
                _thisRef.load_done = true;
                
                
                
                
              } else {
                
                
                
                
                
              }
            });

            return true;
          } else {
            
            
            brsStore.connectionFailed = true; 
            this.successMessage = '';
            this.downloadBusy = false; 

            return false;
          }
        } catch (err) {
          console.log('Fetch Error', err);
          brsStore.syncServer = brsStore.syncServer - 1; 
          brsStore.connectionFailed = true; 
          this.downloadBusy = false; 
          this.errMessage = '網路不良, 無法取得行李資料';

          return false;
        }
      }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    } else if (
      this.searchAllCheckBox === true &&
      this.toggleCheckBox === false
    ) {
      
      
      

      if (flightItem !== '') {
        let _thisRef = this;
        this.downloadBusy = true; 
        try {
          const parseString = require('react-native-xml2js').parseString;
          let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
            brsStore.brsUI
          }&strArgs=${brsStore.brsUP}&strArgs=${flightItem.FLIGHT_NO}&strArgs=${
            flightItem.FLIGHT_DATE
          }`;
          
          brsStore.syncServer = brsStore.syncServer + 1; 
          
          const response = await fetch(input, {
            method: 'GET',
            timeoutInterval: 10000, 
            
            
            
            
            headers: {
              Accept: 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              e_platform: 'mobile',
            },
          });

          brsStore.syncServer = brsStore.syncServer - 1; 

          if (response.status === 200) {
            brsStore.connectionFailed = false; 
            this.downloadBusy = false; 
            this.errMessage = '';
            let text = await response.text();
            parseString(text, {trim: [true]}, function(err, result) {
              if (result.DataSet['diffgr:diffgram'] != null) {
                
                
                
                
                
                _thisRef.BSMDataByFlight =
                  result.DataSet['diffgr:diffgram'][0].NewDataSet[0].Table;

                new Promise(async (resolve, reject) => {
                  _thisRef.BSMDataByFlight.forEach(item => {
                    let bsm_tag = item.BAG_TAG[0];
                    let bsm_flight = item.BSM_FLIGHT[0];
                    
                    
                    let destination = '';
                    try {
                      destination = item.DESTINATION[0];
                    } catch (err) {
                      destination = '';
                    }
                    let cabin_class = '';
                    try {
                      cabin_class = item.CABIN_CLASS[0];
                    } catch (err) {
                      cabin_class = '';
                    }
                    let bag_state = item.BAG_STATE[0];
                    let matchFlag = true;

                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    if (_thisRef.bagNo !== '') {
                      if (bsm_tag.indexOf(_thisRef.bagNo) === -1) {
                        matchFlag = false;
                      }
                    }

                    if (matchFlag === true) {
                      _thisRef.tableData.push([
                        bsm_tag,
                        bsm_flight,
                        destination,
                        cabin_class,
                        bsm_tag,
                      ]);
                    }
                  });
                  resolve();
                });
                _thisRef.resultLen = _thisRef.tableData.length;
                _thisRef.load_done = true;
                
                
                
                
              } else {
                
                
                
                
                
              }
            });

            return true;
          } else {
            
            
            brsStore.connectionFailed = true; 
            this.successMessage = '';
            this.downloadBusy = false; 

            return false;
          }
        } catch (err) {
          console.log('Fetch Error', err);
          brsStore.syncServer = brsStore.syncServer - 1; 
          brsStore.connectionFailed = true; 
          this.downloadBusy = false; 
          this.errMessage = '網路不良, 無法取得行李資料';

          return false;
        }
      }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    }
  };
}

export const searchBagInfoQueryModel = new Search_BagInfoQueryModel();
