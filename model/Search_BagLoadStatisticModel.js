// import React from 'react';
import {observable} from 'mobx';
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import {brsStore} from '../storage/brsStore';
import {operationStore} from '../storage/operationStore';
// import {cartNo} from '../module/CartNo';
import log from '../module/Logger';
import Moment from 'moment';


class Search_BagLoadStatisticModel {
  @observable extraFlag = true;
  @observable lackFlag = true;
  @observable shouldLoad = '0';
  @observable alreadyLoad = '0';
  @observable extra = '0';
  @observable lack = '0';
  @observable transferCount = '0';
  @observable attendantCount = '0';
  @observable mailCount = '0';
  @observable RUSH = '0';
  @observable diplomatic = '0';
  @observable tableHead = ['選擇', '行李號碼', '目的地', '艙等', '檢視'];
  @observable tableData = [];
  @observable widthArr = [60, 120, 80, 50, 60];
  @observable bagNo = '';
  @observable resultLen = '0';
  @observable showErrFlag = false;
  @observable errFlightNo = '無紀錄';
  @observable errFlightDate = '無紀錄';
  @observable BSMDataByFlight = [];
  @observable hash = [];
  @observable cartCountHead = ['行李櫃號', '行李數量', '行李檢視'];
  @observable cartCountData = [];
  @observable cartCountWidthArr = [150, 100, 120];
  @observable cartCountLen = '0';
  @observable BSMtableHead = ['行李號碼', '目的地', '艙等', '檢視'];
  @observable BSMtableData = [];
  @observable BSMwidthArr = [140, 80, 50, 100];
  @observable BSMLen = '0';
  @observable BSMCartId = '';

  
  GetStatisticInfo = async () => {
    this.extraFlag = true;
    this.lackFlag = true;
    this.shouldLoad = '0';
    this.alreadyLoad = '0';
    this.extra = '0';
    this.lack = '0';
    this.transferCount = '0';
    this.attendantCount = '0';
    this.mailCount = '0';
    this.RUSH = '0';
    this.diplomatic = '0';
    if (operationStore.selectflighItem !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetDATA?strName=DATA01&strArgs=${
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
          parseString(text, {trim: [true]}, async function(err, result) {
            

            _thisRef.shouldLoad = result.ArrayOfString.string[0];
            _thisRef.alreadyLoad = result.ArrayOfString.string[1];
            _thisRef.extra = result.ArrayOfString.string[5];
            
            let lack =
              parseInt(result.ArrayOfString.string[0], 10) +
              parseInt(result.ArrayOfString.string[5], 10) -
              parseInt(result.ArrayOfString.string[1], 10);
            _thisRef.lack = lack.toString();
            _thisRef.transferCount = result.ArrayOfString.string[2];
            _thisRef.attendantCount = result.ArrayOfString.string[3];
            _thisRef.mailCount = result.ArrayOfString.string[4];
            _thisRef.RUSH = result.ArrayOfString.string[6];
            _thisRef.diplomatic = result.ArrayOfString.string[7];

            if (_thisRef.extra === '0') {
              _thisRef.extraFlag = false;
            }
            if (_thisRef.lack === '0') {
              _thisRef.lackFlag = false;
            }

            await _thisRef.GetBSMByFlight(
              operationStore.selectflighItem.FLIGHT_NO,
              operationStore.selectflighItem.FLIGHT_DATE,
            );

            
            
            
            
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
        this.errMessage = '網路不良, 無法取得裝載統計資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  getBagStatisticByFlightDayFlightNo = async flighItem => {
    this.extraFlag = true;
    this.lackFlag = true;
    this.shouldLoad = '0';
    this.alreadyLoad = '0';
    this.extra = '0';
    this.lack = '0';
    this.transferCount = '0';
    this.attendantCount = '0';
    this.mailCount = '0';
    this.RUSH = '0';
    this.diplomatic = '0';
    if (flighItem !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetDATA?strName=DATA01&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${flighItem.FLIGHT_NO}&strArgs=${
          flighItem.FLIGHT_DATE
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
          parseString(text, {trim: [true]}, async function(err, result) {
            

            _thisRef.shouldLoad = result.ArrayOfString.string[0];
            _thisRef.alreadyLoad = result.ArrayOfString.string[1];
            _thisRef.extra = result.ArrayOfString.string[5];
            
            let lack =
              parseInt(result.ArrayOfString.string[0], 10) +
              parseInt(result.ArrayOfString.string[5], 10) -
              parseInt(result.ArrayOfString.string[1], 10);

            _thisRef.lack = lack.toString();
            _thisRef.transferCount = result.ArrayOfString.string[2];
            _thisRef.attendantCount = result.ArrayOfString.string[3];
            _thisRef.mailCount = result.ArrayOfString.string[4];
            _thisRef.RUSH = result.ArrayOfString.string[6];
            _thisRef.diplomatic = result.ArrayOfString.string[7];

            if (_thisRef.extra === '0') {
              _thisRef.extraFlag = false;
            }
            if (_thisRef.lack === '0') {
              _thisRef.lackFlag = false;
            }

            await _thisRef.GetBSMByFlight(
              flighItem.FLIGHT_NO,
              flighItem.FLIGHT_DATE,
            );

            
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
        this.errMessage = '網路不良, 無法取得裝載統計資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  
  GetUnloadedBags = async () => {
    this.showErrFlag = false;
    this.tableData.clear();
    this.resultLen = '0';
    if (operationStore.selectflighItem !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM10&strArgs=${
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
              
              
              
              
              

              new Promise(async (resolve, reject) => {
                result.DataSet[
                  'diffgr:diffgram'
                ][0].NewDataSet[0].Table.forEach(item => {
                  let bsm_tag = item.BAG_TAG[0];
                  
                  
                  
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
                    false,
                    bsm_tag,
                    destination,
                    cabin_class,
                    bsm_tag,
                  ]);
                });
                resolve();
              });
              _thisRef.resultLen = _thisRef.tableData.length;

              displayFlashMessage.displayMessage(
                'success',
                '取得應裝未裝成功!',
              );
            } else {
              
              displayFlashMessage.displayMessage(
                'danger',
                '此航班無應裝未裝資料!',
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
        this.errMessage = '網路不良, 無法取得應裝未裝資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  
  GetUnloadedBagsByFlight = async flighItem => {
    this.showErrFlag = false;
    this.tableData.clear();
    this.resultLen = '0';
    if (flighItem !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM10&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${flighItem.FLIGHT_NO}&strArgs=${
          flighItem.FLIGHT_DATE
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
              
              
              
              
              

              new Promise(async (resolve, reject) => {
                result.DataSet[
                  'diffgr:diffgram'
                ][0].NewDataSet[0].Table.forEach(item => {
                  let bsm_tag = item.BAG_TAG[0];
                  
                  
                  
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
                    false,
                    bsm_tag,
                    destination,
                    cabin_class,
                    bsm_tag,
                  ]);
                });
                resolve();
              });
              _thisRef.resultLen = _thisRef.tableData.length;

              
              
              
              
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
        this.errMessage = '網路不良, 無法取得應裝未裝資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  ShowErrorFlight = async () => {
    this.showErrFlag = false;
    this.errFlightDate = '無紀錄';
    this.errFlightNo = '無紀錄';
    
    if (this.bagNo !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM11&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${_thisRef.bagNo}`;
        
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
              let noData = true;
              new Promise(async (resolve, reject) => {
                result.DataSet['diffgr:diffgram'][0].NewDataSet[0].Table.some(
                  item => {
                    if (
                      operationStore.selectflighItem.FLIGHT_DATE ===
                      item.ERR_DATE[0]
                    ) {
                      _thisRef.errFlightDate = item.ERR_DATE[0];
                      _thisRef.errFlightNo = item.ERR_FLIGHT[0];
                      
                      
                      _thisRef.showErrFlag = true;
                      noData = false;
                      return true;

                      
                    }
                  },
                );
                resolve();
              });
              if (noData === true) {
                _thisRef.errFlightNo = '無紀錄';
                _thisRef.errFlightDate = '無紀錄';
                _thisRef.showErrFlag = true;
              }
            } else {
              
              
              _thisRef.errFlightNo = '無紀錄';
              _thisRef.errFlightDate = '無紀錄';
              _thisRef.showErrFlag = true;
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
        this.errMessage = '網路不良, 無法取得錯誤紀錄資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  GetBack_Click = async () => {
    if (this.bagNo !== '') {
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/SetBSM?strName=BSM03&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${_thisRef.bagNo}&strArgs=${
          _thisRef.errFlightNo
        }&strArgs=${_thisRef.errFlightDate}`;
        
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
        this.errMessage = '網路不良, 無法更新應裝未裝紀錄資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  
  GetBSMByFlight = async (flightNo, flightDate) => {
    if (flightNo !== '' && flightDate !== '') {
      this.cartCountData = [];
      this.cartCountLen = '0';
      let _thisRef = this;
      this.downloadBusy = true; 
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${flightNo}&strArgs=${flightDate}`;
        
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
                let hash = {};
                let list = [];
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
                  
                  
                  let auth_load = '';
                  try {
                    auth_load = item.AUTH_LOAD[0];
                  } catch (err) {
                    auth_load = '';
                  }
                  let auth_transport = '';
                  try {
                    auth_transport = item.AUTH_TRANSPORT[0];
                  } catch (err) {
                    auth_transport = '';
                  }
                  let bsm_state = item.BSM_STATE[0];
                  let bag_state = item.BAG_STATE[0];
                  let bsm_cartId = '';
                  
                  try {
                    bsm_cartId = item.CART_ID[0];
                  } catch (err) {
                    bsm_cartId = '';
                  }
                  

                  if (bsm_cartId === '') {
                    if (
                      auth_load !== 'Y' ||
                      auth_transport !== 'Y' ||
                      bsm_state === '0' ||
                      bag_state !== '10'
                    ) {
                      return;
                    } else {
                      bsm_cartId = '未裝櫃';
                    }
                  }
                  if (bsm_cartId !== '未裝櫃') {
                    try {
                      let space = bsm_cartId.$['xml:space'].toString();
                      if (space === 'preserve') {
                        if (
                          auth_load !== 'Y' ||
                          auth_transport !== 'Y' ||
                          bsm_state === '0' ||
                          bag_state !== '10'
                        ) {
                          return;
                        } else {
                          bsm_cartId = '未裝櫃';
                        }
                      }
                    } catch (error) {
                      bsm_cartId = JSON.stringify(bsm_cartId);
                      bsm_cartId = bsm_cartId.substring(
                        1,
                        bsm_cartId.length - 1,
                      );
                    }
                  }

                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  

                  if (bag_state === '11') {
                    return;
                  }
                  if (list.includes(bsm_cartId) === false) {
                    list.push(bsm_cartId);
                  }
                  hash[bsm_cartId] = hash[bsm_cartId]
                    ? hash[bsm_cartId] + 1
                    : 1;
                });

                list.forEach(item => {
                  
                  _thisRef.cartCountData.push([item, hash[item], item]);
                });
                
                _thisRef.cartCountLen = _thisRef.cartCountData.length;

                resolve();
              });

              
              
              
              
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
        this.errMessage = '網路不良, 無法取得行李資料 ';

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);

        return false;
      }
    }
  };

  
  GetBSMByCart = async cart_id => {
    this.BSMtableData = [];
    this.BSMLen = '0';
    this.BSMCartId = cart_id;
    new Promise(async (resolve, reject) => {
      this.BSMDataByFlight.forEach(item => {
        
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
        
        
        let auth_load = '';
        try {
          auth_load = item.AUTH_LOAD[0];
        } catch (err) {
          auth_load = '';
        }
        let auth_transport = '';
        try {
          auth_transport = item.AUTH_TRANSPORT[0];
        } catch (err) {
          auth_transport = '';
        }
        let bsm_state = item.BSM_STATE[0];
        let bag_state = item.BAG_STATE[0];
        let bsm_cartId = '';
        try {
          bsm_cartId = item.CART_ID[0];
        } catch (err) {
          bsm_cartId = '';
        }
        if (bsm_cartId === '') {
          if (
            auth_load !== 'Y' ||
            auth_transport !== 'Y' ||
            bsm_state === '0' ||
            bag_state !== '10'
          ) {
            return;
          } else {
            bsm_cartId = '未裝櫃';
          }
        }

        if (bsm_cartId === '') {
          if (
            auth_load !== 'Y' ||
            auth_transport !== 'Y' ||
            bsm_state === '0' ||
            bag_state !== '10'
          ) {
            return;
          } else {
            bsm_cartId = '未裝櫃';
          }
        }
        if (bsm_cartId !== '未裝櫃') {
          try {
            let space = bsm_cartId.$['xml:space'].toString();
            if (space === 'preserve') {
              if (
                auth_load !== 'Y' ||
                auth_transport !== 'Y' ||
                bsm_state === '0' ||
                bag_state !== '10'
              ) {
                return;
              } else {
                bsm_cartId = '未裝櫃';
              }
            }
          } catch (error) {
            bsm_cartId = JSON.stringify(bsm_cartId);
            bsm_cartId = bsm_cartId.substring(1, bsm_cartId.length - 1);
          }
        }

        if (bag_state === '11') {
          return;
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        if (bsm_cartId === cart_id) {
          this.BSMtableData.push([bsm_tag, destination, cabin_class, bsm_tag]);
        }
      });
      this.BSMLen = this.BSMtableData.length;
      resolve();
    });
  };
}

export const searchBagLoadStatisticModel = new Search_BagLoadStatisticModel();
