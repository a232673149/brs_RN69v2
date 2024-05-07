
import React from 'react';
import {brsStore} from '../storage/brsStore';
import {observable} from 'mobx';
import Moment from 'moment';
import {operationStore} from '../storage/operationStore';
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import {cartNo} from '../module/CartNo';
import {cartListItemsModel} from './CartListItemsModel';//相互引用套件
import log from '../module/Logger';


class CabinDestListItemsModel {
  @observable placeholderLabel_Dest = '請選擇目的地';
  @observable placeholderLabel_Cabin = '請選擇艙等';
  @observable placeholderLabel_NextFligh = '請選擇次航班';
  @observable placeholderLabel_CARTPrefixCode = '請選擇前置碼';
  @observable _DestItems = []; 
  @observable _CabinItems = []; 
  @observable _NextFlightItems = []; 
  @observable _DestValue = ''; 
  @observable _CabinValue = ''; 
  @observable _FlagValue = 'N'; 
  @observable _NextFlightValue = ''; 
  @observable _CARTPrefixCode = ''; 
  @observable _BagCartNumber = ''; 
  @observable tableHead = ['', '目的地', '艙等', '次航班', '專櫃'];
  @observable tableData = [];
  _FlagItems = [
    
    {label: 'N', value: 'N'}, 
    {label: 'Y', value: 'Y'}, 
  ];
  _DestTemp = [];
  _CabinTemp = [];
  _NextFlightTemp = [];

  @observable errMessage = '';
  @observable successMessage = '';
  @observable dowloadCabinBusy = 0;
  @observable submitSetCartInFlightToServer = false;

  
  getCartPatternByFlightInfo = async flighItem => {
    let FLIGHT_NO = flighItem.FLIGHT_NO;
    if (brsStore.upload) {
      

      return false;
    } else {
      try {
        let input = `${brsStore.useWsAddress}/GetCART?strName=CART02&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${FLIGHT_NO}`;
        
        
        const response = await fetch(input, {
          method: 'GET',
          timeoutInterval: 10000, 
          
          
          
          
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            e_platform: 'mobile',
          },
        });

        if (response.status == 200) {
          brsStore.connectionFailed = false; 
          let text = await response.text();
          if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
            text = text
              .split('<NewDataSet xmlns="">')[1]
              .split('</NewDataSet>')[0]
              .split('msdata:rowOrder=');
            const leng = text.length - 1;
            if (leng > 0) {
              operationStore.CARTPatternListItems = operationStore.CARTPatternListItems.filter(
                item => item.FLIGHT_NO !== FLIGHT_NO,
              );
            }
            let i = 1;
            for (i; i <= leng; i++) {
              let CABIN_CLASS = '';
              if (text[i].indexOf('<CABIN_CLASS>') !== -1) {
                CABIN_CLASS = text[i]
                  .split('<CABIN_CLASS>')[1]
                  .split('</CABIN_CLASS>')[0];
                CABIN_CLASS = CABIN_CLASS.trim();
              }
              let DESTINATION = '';
              if (text[i].indexOf('<DESTINATION>') !== -1) {
                DESTINATION = text[i]
                  .split('<DESTINATION>')[1]
                  .split('</DESTINATION>')[0];
                DESTINATION = DESTINATION.trim();
              }
              let NEXT_FLIGHT = '';
              if (text[i].indexOf('<NEXT_FLIGHT>') !== -1) {
                NEXT_FLIGHT = text[i]
                  .split('<NEXT_FLIGHT>')[1]
                  .split('</NEXT_FLIGHT>')[0];
                NEXT_FLIGHT = NEXT_FLIGHT.trim();
              }
              let BT_FLAG = '';
              if (text[i].indexOf('<BT_FLAG>') !== -1) {
                BT_FLAG = text[i].split('<BT_FLAG>')[1].split('</BT_FLAG>')[0];
                BT_FLAG = BT_FLAG.trim();
              }
              let CREATION_TIME = new Date();
              operationStore.CARTPatternListItems.push({
                FLIGHT_NO: `${FLIGHT_NO}`,
                CABIN_CLASS: `${CABIN_CLASS}`,
                DESTINATION: `${DESTINATION}`,
                NEXT_FLIGHT: `${NEXT_FLIGHT}`,
                BT_FLAG: `${BT_FLAG}`,
                CREATION_TIME: `${CREATION_TIME}`,
              });
            }
          }
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_NO}行李櫃打櫃計畫`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getCartPatternByFlightInfo)-response.status:${
              response.status
            }`,
          );
        }
      } catch (err) {
        brsStore.connectionFailed = true; 
        console.log('Fetch Error', err);
        this.errMessage = `網路不良，未更新 ${FLIGHT_NO} 行李櫃打櫃計畫`;
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
      }
      
      return true;
    }
  };
  
  
  getCabinDestByCardIdWithFlightInfo = async (bagCartId, flighItem) => {
    let FLIGHT_DATE = flighItem.FLIGHT_DATE;
    let FLIGHT_NO = flighItem.FLIGHT_NO;
    if (brsStore.upload) {
      

      return false;
    } else {
      console.log('getCabinDestByCardIdWithFlightInfo');
      try {
        let input = `${brsStore.useWsAddress}/GetFIDS?strName=FIDS04&strArgs=${
          brsStore.brsUI
        }&strArgs=${
          brsStore.brsUP
        }&strArgs=${bagCartId}&strArgs=${FLIGHT_NO}&strArgs=${FLIGHT_DATE}`;
        

        
        const response = await fetch(input, {
          method: 'GET',
          timeoutInterval: 10000, 
          
          
          
          
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            e_platform: 'mobile',
          },
        });

        if (response.status == 200) {
          brsStore.connectionFailed = false; 
          let text = await response.text();
          if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
            text = text
              .split('<NewDataSet xmlns="">')[1]
              .split('</NewDataSet>')[0]
              .split('msdata:rowOrder=');
            const leng = text.length - 1;
            let i = 1;

            operationStore.CARTListItems = operationStore.CARTListItems.filter(
              element =>
                element.FLIGHT_DATE !== FLIGHT_DATE ||
                element.FLIGHT_NO !== FLIGHT_NO ||
                element.CART_ID !== bagCartId,
            );

            for (i; i <= leng; i++) {
              let FLIGHT_NO = '';
              if (text[i].indexOf('<FLIGHT_NO>') !== -1) {
                FLIGHT_NO = text[i]
                  .split('<FLIGHT_NO>')[1]
                  .split('</FLIGHT_NO>')[0];
              }

              let FLIGHT_DATE = '';
              if (text[i].indexOf('<DATE_TIME>') !== -1) {
                FLIGHT_DATE = text[i]
                  .split('<DATE_TIME>')[1]
                  .split('</DATE_TIME>')[0];
              }

              let DESTINATION = '';
              if (text[i].indexOf('<DESTINATION>') !== -1) {
                DESTINATION = text[i]
                  .split('<DESTINATION>')[1]
                  .split('</DESTINATION>')[0];
              }

              let CART_ID = '';
              if (text[i].indexOf('<CART_ID>') !== -1) {
                CART_ID = text[i].split('<CART_ID>')[1].split('</CART_ID>')[0];
              }

              let CABIN_CLASS = '';
              if (text[i].indexOf('<CABIN_CLASS>') !== -1) {
                CABIN_CLASS = text[i]
                  .split('<CABIN_CLASS>')[1]
                  .split('</CABIN_CLASS>')[0];
              }

              let BT_FLAG = '';
              if (text[i].indexOf('<BT_FLAG>') !== -1) {
                BT_FLAG = text[i].split('<BT_FLAG>')[1].split('</BT_FLAG>')[0];
              }

              let NEXT_FLIGHT = '';
              if (text[i].indexOf('<NEXT_FLIGHT>') !== -1) {
                NEXT_FLIGHT = text[i]
                  .split('<NEXT_FLIGHT>')[1]
                  .split('</NEXT_FLIGHT>')[0];
              }

              let CREATION_TIME = new Date();
              console.log(
                FLIGHT_NO +
                  '-' +
                  FLIGHT_DATE +
                  '-' +
                  CART_ID +
                  '-' +
                  NEXT_FLIGHT,
              );

              if (
                !operationStore.CARTListItems.find(element => {
                  if (
                    element.FLIGHT_NO === FLIGHT_NO &&
                    element.FLIGHT_DATE === FLIGHT_DATE &&
                    element.CART_ID === CART_ID &&
                    element.DESTINATION === DESTINATION &&
                    element.BT_FLAG === BT_FLAG
                      ? true
                      : false
                  ) {
                    if (!element.CABIN_CLASS.includes(CABIN_CLASS)) {
                      element.CABIN_CLASS =
                        element.CABIN_CLASS + ',' + CABIN_CLASS;
                      element.title = `${CART_ID} - ${element.CABIN_CLASS}`;
                    }
                    if (!element.NEXT_FLIGHT.includes(NEXT_FLIGHT)) {
                      element.NEXT_FLIGHT =
                        element.NEXT_FLIGHT + ',' + NEXT_FLIGHT;
                    }
                    element.CREATION_TIME = CREATION_TIME;
                    console.log(
                      '合併挑選的行李櫃資訊:' +
                        element.FLIGHT_DATE +
                        '-' +
                        element.FLIGHT_NO +
                        ' ' +
                        element.CART_ID +
                        ' ' +
                        element.CABIN_CLASS +
                        ' ' +
                        element.BT_FLAG +
                        '-' +
                        element.NEXT_FLIGHT +
                        '~' +
                        element.CREATION_TIME,
                    );
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                operationStore.CARTListItems.push({
                  title: `${CART_ID} - ${CABIN_CLASS}`,
                  FLIGHT_NO: `${FLIGHT_NO}`,
                  FLIGHT_DATE: `${FLIGHT_DATE}`,
                  DESTINATION: `${DESTINATION}`,
                  CART_ID: `${CART_ID}`,
                  CABIN_CLASS: `${CABIN_CLASS}`,
                  NEXT_FLIGHT: `${NEXT_FLIGHT}`,
                  BT_FLAG: `${BT_FLAG}`,
                  CREATION_TIME: `${CREATION_TIME}`,
                });
                console.log(
                  'push:' +
                    FLIGHT_DATE +
                    '-' +
                    FLIGHT_NO +
                    ' ' +
                    CART_ID +
                    ' ' +
                    CABIN_CLASS +
                    ' ' +
                    BT_FLAG +
                    '-' +
                    NEXT_FLIGHT +
                    '~' +
                    CREATION_TIME,
                );
              }
            }
          }
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_NO} - ${bagCartId} 艙等目的地資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getCabinDestByCardIdWithFlightInfo)-response.status:${
              response.status
            }`,
          );
        }
      } catch (err) {
        brsStore.connectionFailed = true; 
        console.log('Fetch Error', err);
        this.errMessage = `網路不良，未更新${FLIGHT_NO} - ${bagCartId} 艙等目的地資訊`;
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
      }
      
      return true;
    }
  };
  
  
  getCabinDestByUserWithFlightInfo = async flighItem => {
    let FLIGHT_DATE = flighItem.FLIGHT_DATE;
    let FLIGHT_NO = flighItem.FLIGHT_NO;
    if (brsStore.upload) {
      

      return false;
    } else {
      try {
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM09&strArgs=${
          brsStore.brsUI
        }&strArgs=${
          brsStore.brsUP
        }&strArgs=${FLIGHT_NO}&strArgs=${FLIGHT_DATE}`;
        
        
        const response = await fetch(input, {
          method: 'GET',
          timeoutInterval: 10000, 
          
          
          
          
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            e_platform: 'mobile',
          },
        });

        if (response.status == 200) {
          brsStore.connectionFailed = false; 
          let text = await response.text();
          if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
            text = text
              .split('<NewDataSet xmlns="">')[1]
              .split('</NewDataSet>')[0]
              .split('msdata:rowOrder=');
            const leng = text.length - 1;
            if (leng > 0) {
              operationStore.CABINDestByUserListItems = operationStore.CABINDestByUserListItems.filter(
                item =>
                  item.FLIGHT_DATE !== FLIGHT_DATE ||
                  item.FLIGHT_NO !== FLIGHT_NO,
              );
            }
            let i = 1;
            for (i; i <= leng; i++) {
              let CABIN_CLASS = '';
              if (text[i].indexOf('<CABIN_CLASS>') !== -1) {
                CABIN_CLASS = text[i]
                  .split('<CABIN_CLASS>')[1]
                  .split('</CABIN_CLASS>')[0];
                CABIN_CLASS = CABIN_CLASS.trim();
              }

              let DESTINATION = '';
              if (text[i].indexOf('<DESTINATION>') !== -1) {
                DESTINATION = text[i]
                  .split('<DESTINATION>')[1]
                  .split('</DESTINATION>')[0];
                DESTINATION = DESTINATION.trim();
              }

              let NEXT_FLIGHT = '';
              if (text[i].indexOf('<NEXT_FLIGHT>') !== -1) {
                NEXT_FLIGHT = text[i]
                  .split('<NEXT_FLIGHT>')[1]
                  .split('</NEXT_FLIGHT>')[0];
                NEXT_FLIGHT = NEXT_FLIGHT.trim();
              }

              let CREATION_TIME = new Date();
              let Items = {
                FLIGHT_NO: `${FLIGHT_NO}`,
                FLIGHT_DATE: `${FLIGHT_DATE}`,
                DESTINATION: `${DESTINATION}`,
                CABIN_CLASS: `${CABIN_CLASS}`,
                NEXT_FLIGHT: `${NEXT_FLIGHT}`,
                CREATION_TIME: `${CREATION_TIME}`,
              };
              if (
                operationStore.CABINDestByUserListItems.find(element =>
                  element.FLIGHT_NO === FLIGHT_NO &&
                  element.FLIGHT_DATE === FLIGHT_DATE &&
                  element.DESTINATION === DESTINATION &&
                  element.CABIN_CLASS === CABIN_CLASS &&
                  element.NEXT_FLIGHT === NEXT_FLIGHT
                    ? true
                    : false,
                )
              ) {
                
              } else {
                operationStore.CABINDestByUserListItems.push(Items);
                
                
              }
            }
          }
        } else {
          
          this.errMessage = `連線主機失敗，未更新 ${FLIGHT_DATE} - ${FLIGHT_NO} 自訂打櫃資訊`;
          
          console.log(
            `連線主機失敗(getCabinDestByUserWithFlightInfo)-response.status:${
              response.status
            }`,
          );
        }
      } catch (err) {
        brsStore.connectionFailed = true; 
        console.log('Fetch Error', err);
        this.errMessage = `網路不良，未更新 ${FLIGHT_DATE} - ${FLIGHT_NO} 自訂打櫃資訊 `;
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
      }
      
      return true;
    }
  };
  
  deleteExpiredCabinDest = date => {
    operationStore.CABINDestByUserListItems = operationStore.CABINDestByUserListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    operationStore.CARTPatternListItems = operationStore.CARTPatternListItems.filter(
      item => item.CREATION_TIME > date,
    );
    console.log(
      '系統自動刪除過期的行李櫃打櫃資訊-' + Moment(date).format('yyyyMMDD'),
    );
  };
  
  renewCabinDestListItems = (date, flightNo, clear = true) => {
    
    this._DestItems.clear(); 
    this._CabinItems.clear(); 
    this._NextFlightItems.clear(); 
    this._DestTemp = [];
    this._CabinTemp = [];
    this._NextFlightTemp = [];
    if (clear === true) {
      this.tableData = [];
      this._DestValue = ''; 
      this._CabinValue = ''; 
      this._FlagValue = 'N'; 
      this._NextFlightValue = ''; 
    }
    if (flightNo !== '') {
      operationStore.CARTPatternListItems.filter(
        item => item.FLIGHT_NO === flightNo,
      ).forEach(element => {
        this.addToTableData(
          element.DESTINATION,
          element.CABIN_CLASS,
          element.NEXT_FLIGHT,
          element.BT_FLAG,
        );
      });
      
      this.creatCABINByUser(date, flightNo);
    }
    
    this.changePlaceholderLabel();
  };
  
  creatCABINByUser = (date, flightNo) => {
    operationStore.CABINDestByUserListItems.forEach(element => {
      if (
        element.FLIGHT_DATE === Moment(date).format('yyyyMMDD') &&
        element.FLIGHT_NO === flightNo
      ) {
        if (element.DESTINATION !== '') {
          element.DESTINATION = element.DESTINATION.trim();
          if (this._DestTemp.length === 0) {
            this._DestValue = element.DESTINATION;
            this._DestTemp.push(element.DESTINATION);
            this._DestItems.push({
              label: `${element.DESTINATION}`,
              value: `${element.DESTINATION}`,
              DESTINATION: `${element.DESTINATION}`,
            });
          } else {
            if (!this._DestTemp.includes(element.DESTINATION)) {
              this._DestTemp.push(element.DESTINATION);
              this._DestItems.push({
                label: `${element.DESTINATION}`,
                value: `${element.DESTINATION}`,
                DESTINATION: `${element.DESTINATION}`,
              });
            }
          }
        }
        if (element.CABIN_CLASS !== '') {
          if (this._CabinTemp.length === 0) {
            element.CABIN_CLASS = element.CABIN_CLASS.trim();
            this._CabinValue = element.CABIN_CLASS;
            this._CabinTemp.push(element.CABIN_CLASS);
            this._CabinItems.push({
              label: `${element.CABIN_CLASS}`,
              value: `${element.CABIN_CLASS}`,
              CABIN_CLASS: `${element.CABIN_CLASS}`,
            });
          } else {
            if (!this._CabinTemp.includes(element.CABIN_CLASS)) {
              this._CabinTemp.push(element.CABIN_CLASS);
              this._CabinItems.push({
                label: `${element.CABIN_CLASS}`,
                value: `${element.CABIN_CLASS}`,
                CABIN_CLASS: `${element.CABIN_CLASS}`,
              });
            }
          }
        }
        if (element.NEXT_FLIGHT !== '') {
          if (this._NextFlightTemp.length === 0) {
            this._NextFlightTemp.push(element.NEXT_FLIGHT);
            this._NextFlightItems.push({
              label: `${element.NEXT_FLIGHT}`,
              value: `${element.NEXT_FLIGHT}`,
              NEXT_FLIGHT: `${element.NEXT_FLIGHT}`,
            });
          } else {
            if (!this._NextFlightTemp.includes(element.NEXT_FLIGHT)) {
              this._NextFlightTemp.push(element.NEXT_FLIGHT);
              this._NextFlightItems.push({
                label: `${element.NEXT_FLIGHT}`,
                value: `${element.NEXT_FLIGHT}`,
                NEXT_FLIGHT: `${element.NEXT_FLIGHT}`,
              });
            }
          }
        }
      }
    });

    if (!this._CabinTemp.includes('Y')) {
      if (this._CabinValue === '') {
        this._CabinValue = 'Y';
      }
      this._CabinTemp.push('Y');
      this._CabinItems.push({
        label: 'Y',
        value: 'Y',
        CABIN_CLASS: 'Y',
      });
    }
    if (!this._CabinTemp.includes('C')) {
      if (this._CabinValue === '') {
        this._CabinValue = 'C';
      }
      this._CabinTemp.push('C');
      this._CabinItems.push({
        label: 'C',
        value: 'C',
        CABIN_CLASS: 'C',
      });
    }
    if (
      this._DestItems.length === 0 ||
      !this._DestTemp.includes(operationStore.selectflighItem.DESTINATION)
    ) {
      this._DestValue = `${operationStore.selectflighItem.DESTINATION}`;
      this._DestTemp.push(`${operationStore.selectflighItem.DESTINATION}`);
      this._DestItems.push({
        label: `${operationStore.selectflighItem.DESTINATION}`,
        value: `${operationStore.selectflighItem.DESTINATION}`,
        DESTINATION: `${operationStore.selectflighItem.DESTINATION}`,
      });
    }
    if (this._CabinTemp.length === 0) {
      this._CabinValue = 'Y';
      this._CabinTemp.push('Y');
      this._CabinItems.push({
        label: 'Y',
        value: 'Y',
        CABIN_CLASS: 'Y',
      });
      this._CabinTemp.push('C');
      this._CabinItems.push({
        label: 'C',
        value: 'C',
        CABIN_CLASS: 'C',
      });
    }
  };
  
  changePlaceholderLabel = () => {
    if (this._DestItems.length === 0) {
      this.placeholderLabel_Dest = '無自訂目的地清單';
    } else {
      this.placeholderLabel_Dest = '請選擇目的地';
    }
    if (this._CabinTemp.length === 0) {
      this.placeholderLabel_Cabin = '無自訂艙等清單';
    } else {
      this.placeholderLabel_Cabin = '請選擇艙等';
    }
    if (this._NextFlightItems.length === 0) {
      this.placeholderLabel_NextFligh = '無自訂次航班清單';
    } else {
      this.placeholderLabel_NextFligh = '請選擇次航班';
    }
  };
  addToTableData = (_DestValue, _CabinValue, _NextFlightValue, _FlagValue) => {
    if (
      this.tableData.length === 0 ||
      !this.tableData.find(
        item =>
          item[1] === _DestValue &&
          item[2] === _CabinValue &&
          item[3] === _NextFlightValue &&
          item[4] === _FlagValue,
      )
    ) {
      this.tableData.push([
        false,
        _DestValue,
        _CabinValue,
        _NextFlightValue,
        _FlagValue,
      ]);
    }
  };
  getCARTPrefixCodeListItems = async () => {
    this.dowloadCabinBusy = this.dowloadCabinBusy + 1; 
    try {
      let strLookSQL =
        "SELECT LU_ID FROM PDA_LU_ALL WHERE GP_ID='CART_PREFIX' ORDER BY LU_ORDER";
      let input = `${brsStore.useWsAddress}/QLookSQL`;
      

      brsStore.syncServer = brsStore.syncServer + 1; 
      const response = await fetch(input, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: `sSQL=${strLookSQL}&bImgDB=true`,
        method: 'POST',
        
        
        
      });
      brsStore.syncServer = brsStore.syncServer - 1; 
      if (response.status == 200) {
        brsStore.connectionFailed = false; 

        let text = await response.text();
        if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
          text = text
            .split('<NewDataSet xmlns="">')[1]
            .split('</NewDataSet>')[0]
            .split('msdata:rowOrder=');
          const leng = text.length - 1;
          if (leng > 0) {
            operationStore.CARTPrefixCodeListItems.splice(
              0,
              operationStore.CARTPrefixCodeListItems.length,
            );
          }
          let i = 1;
          for (i; i <= leng; i++) {
            let LU_ID = '';
            if (text[i].indexOf('<LU_ID>') !== -1) {
              LU_ID = text[i].split('<LU_ID>')[1].split('</LU_ID>')[0];
            }

            operationStore.CARTPrefixCodeListItems.push({
              label: `${LU_ID}`,
              value: `${LU_ID}`,
              LU_ID: `${LU_ID}`,
            });
          }
        }
        this.dowloadCabinBusy = this.dowloadCabinBusy - 1; 
        if (operationStore.CARTPrefixCodeListItems.length === 0) {
          this.placeholderLabel_CARTPrefixCode = '無預設前置碼';
        } else {
          this.placeholderLabel_CARTPrefixCode = '請選擇前置碼';
          
          operationStore.CARTPrefixCodeListItems.unshift({
            label: ' ',
            value: ' ',
            LU_ID: '',
          });
        }
        return true;
      } else {
        if (operationStore.CARTPrefixCodeListItems.length === 0) {
          operationStore.CARTPrefixCodeListItems.push({
            label: 'AKE',
            value: 'AKE',
            LU_ID: 'AKE',
          });

          operationStore.CARTPrefixCodeListItems.push({
            label: 'AKH',
            value: 'AKH',
            LU_ID: 'AKH',
          });

          operationStore.CARTPrefixCodeListItems.push({
            label: 'ABK',
            value: 'ABK',
            LU_ID: 'ABK',
          });
          operationStore.CARTPrefixCodeListItems.push({
            label: 'FRP',
            value: 'FRP',
            LU_ID: 'FRP',
          });
        }
        
        console.log(
          `連線主機失敗(getCARTPrefixCodeListItems)-response.status:${
            response.status
          }`,
        );
        this.dowloadCabinBusy = this.dowloadCabinBusy - 1; 
        this.errMessage = '傳輸失敗';
        if (operationStore.CARTPrefixCodeListItems.length === 0) {
          this.placeholderLabel_CARTPrefixCode = '無預設前置碼';
        } else {
          this.placeholderLabel_CARTPrefixCode = '請選擇前置碼';
          
          operationStore.CARTPrefixCodeListItems.unshift({
            label: ' ',
            value: ' ',
            LU_ID: '',
          });
        }
        return true;
      }
    } catch (err) {
      console.log('Fetch Error', err);
      brsStore.syncServer = brsStore.syncServer - 1; 
      brsStore.connectionFailed = true; 
      this.dowloadCabinBusy = this.dowloadCabinBusy - 1; 
      this.errMessage = '網路不良，未更新櫃號前置碼 ';
      if (operationStore.CARTPrefixCodeListItems.length === 0) {
        this.placeholderLabel_CARTPrefixCode = '無預設前置碼';
      }
      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn(this.errMessage + err);
      return false;
    }
  };
  onChangeTextBagCartNumber = text => {
    text = text.split(' ')[0].toUpperCase();
    if (!/^[A-Z0-9-]*[A-Z0-9-]*$/.test(text)) {
      text = '';
    }
    this._BagCartNumber = text;
  };
  asyncForEach = (array, callback, flighItem, bagCartId) => {
    return new Promise(async (resolve, reject) => {
      let result = false;
      let listCartSets = [];
      let DESTINATION = '';
      let CABIN_CLASS = '';
      let NEXT_FLIGHT = '';
      let BT_FLAG = '';
      let pushToList = false;
      for (let index = 0; index < array.length; index++) {
        if (array[index][0] === true) {
          pushToList = true;
          DESTINATION = array[index][1];
          if (CABIN_CLASS === '') {
            CABIN_CLASS = array[index][2];
          } else {
            if (array[index][2] !== '') {
              CABIN_CLASS = CABIN_CLASS + ',' + array[index][2];
            }
          }
          NEXT_FLIGHT = array[index][3];
          BT_FLAG = array[index][4];
        }
      }

      if (CABIN_CLASS.length > 12) {
        result = '複合艙等字元總長度不可大於12';
        for (
          let int = 0;
          int < cabinDestListItemsModel.tableData.length;
          int++
        ) {
          cabinDestListItemsModel.tableData[int][0] = false;
        }
      } else {
        if (pushToList == true) {
          listCartSets.push(
            
            DESTINATION + '-' + CABIN_CLASS + '-' + NEXT_FLIGHT + '-' + BT_FLAG,
          );
          console.log(listCartSets);
          result = await callback(flighItem, bagCartId, listCartSets);
        }
      }
      resolve(result);
    });
  };
  onSubmitSetCartInFlightConfirm = async flighItem => {
    this._CARTPrefixCode = this._CARTPrefixCode.toUpperCase(); 
    this._BagCartNumber = this._BagCartNumber.toUpperCase(); 
    let bagCartId = '';
    if (this._CARTPrefixCode === ' ') {
      bagCartId = this._BagCartNumber;
    } else {
      bagCartId = this._CARTPrefixCode + this._BagCartNumber;
    }
    let result = cartNo.checkCartNo(bagCartId);

    if (result === true) {
      if (this.tableData.length !== 0) {
        if (this.tableData.find(item => (item[0] === true ? true : false))) {
          this.dowloadCabinBusy = this.dowloadCabinBusy + 1; 
          brsStore.syncServer = brsStore.syncServer + 1; 
          result = await this.asyncForEach(
            this.tableData,
            this.setCartInFlight,
            flighItem,
            bagCartId,
          );
          console.log('setCartInFlight :' + result);
          if (result === true) {
            operationStore.CARTMFiveListItems.find(element => {
              if (
                element.FLIGHT_DATE ===
                  operationStore.selectflighItem.FLIGHT_DATE &&
                element.FLIGHT_NO === operationStore.selectflighItem.FLIGHT_NO
                  ? true
                  : false
              ) {
                element.CARTMFive = 'change';
                console.log('CARTMFiveListItems change');
              }
            });
            displayFlashMessage.displayMessage('success', this.successMessage);
            this.successMessage = '';

            if (operationStore.selectflighItem !== '') {
              cartListItemsModel.dowloadCartBusy =
                cartListItemsModel.dowloadCartBusy + 1;
              brsStore.syncServer = brsStore.syncServer + 1; 

              
              await cartListItemsModel.getSelectCARTByFlightDayFlightNo(
                operationStore.selectflighItem,
              );
              
              cartListItemsModel.renewCartListItems(
                Moment(operationStore.selectedDate).format('yyyyMMDD'),
                operationStore.selectflighItem.FLIGHT_NO,
                false,
              );
              brsStore.syncServer = brsStore.syncServer - 1; 
            }
            this.submitSetCartInFlightToServer = true;
            cartListItemsModel.dowloadCartBusy =
              cartListItemsModel.dowloadCartBusy - 1;
          } else {
            this.errMessage = result;
            displayFlashMessage.displayMessage('danger', this.errMessage);
            this.errMessage = '';
          }
          brsStore.syncServer = brsStore.syncServer - 1; 
          this.dowloadCabinBusy = this.dowloadCabinBusy - 1; 
          return result;
        } else {
          result = '請輸入打櫃資訊!';
          this.errMessage = result;
          displayFlashMessage.displayMessage('danger', this.errMessage);
          this.errMessage = '';
          return false;
        }
      } else {
        result = '請自訂輸入打櫃資訊!';
        this.errMessage = result;
        displayFlashMessage.displayMessage('danger', this.errMessage);
        this.errMessage = '';
        return false;
      }
    } else {
      this.errMessage = result;
      this._CARTPrefixCode = '';
      this._BagCartNumber = '';
      displayFlashMessage.displayMessage('danger', this.errMessage);
      this.errMessage = '';
      return false;
    }
  };
  
  setCartInFlight = async (flighItem, bagCartId, listCartSets) => {
    try {
      
      
      let input = `${brsStore.useWsAddress}/SetCART?strName=CART05&strArgs1=${
        brsStore.brsUI
      }&strArgs1=${brsStore.brsUP}&strArgs1=${bagCartId}&strArgs1=${
        operationStore.selectflighItem.FLIGHT_NO
      }&strArgs1=${
        operationStore.selectflighItem.FLIGHT_DATE
      }&strArgs2=${listCartSets}`;
      

      this.dowloadCabinBusy = this.dowloadCabinBusy + 1;
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
      if (response.status == 200) {
        brsStore.connectionFailed = false; 
        this.successMessage = `行李櫃${bagCartId}打櫃完成。`;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info(this.successMessage);
        this.errMessage = '';
        this.dowloadCabinBusy = this.dowloadCabinBusy - 1;
        return true;
      } else {
        brsStore.connectionFailed = true; 
        this.errMessage = `行李櫃${bagCartId}打櫃失敗!!`;
        this.successMessage = '';
        this.dowloadCabinBusy = this.dowloadCabinBusy - 1;
        console.log(
          `連線主機失敗(setCartInFlight)-response.status:${response.status}`,
        );

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info(this.errMessage);
        return false;
      }
    } catch (err) {
      brsStore.syncServer = brsStore.syncServer - 1; 
      console.log('Fetch Error', err);
      this.errMessage = `網路不良, 行李櫃${bagCartId}打櫃失敗 `;
      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn(this.errMessage + err);
      this.successMessage = '';
      brsStore.connectionFailed = true; 
      this.dowloadCabinBusy = this.dowloadCabinBusy - 1;
      return false;
    }
  };
}
export const cabinDestListItemsModel = new CabinDestListItemsModel();
