
import React from 'react';
import {brsStore} from '../storage/brsStore';
import {observable} from 'mobx';
import Moment from 'moment';
import {operationStore} from '../storage/operationStore';
// import {cabinDestListItemsModel} from './CabinDestListItemsModel';//相互引用套件
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import log from '../module/Logger';


class CartListItemsModel {
  @observable cartListItems = []; 
  @observable cartListItemsLength = 0;
  @observable cartList = [];
  @observable errMessage = '';
  @observable successMessage = '';
  @observable dowloadCartBusy = 0;

  @observable tranInCart = ''; 
  @observable tranOutCart = ''; 
  @observable bagCartItem = ''; 
  @observable bagCart = ''; 
  operationBagCartItem = ''; 
  @observable operationBagCart = ''; 
  @observable selectCartNoItem = ''; 
  @observable searchBagInfoCart = ''; 
  @observable searchAbnormalBagCart = ''; 
  @observable lock = false; 
  onItemSelectCartNo = async (item, navigation) => {
    

    // await cabinDestListItemsModel.getCabinDestByCardIdWithFlightInfo(
    //   item.CART_ID,
    //   operationStore.selectflighItem,
    // );

    cartListItemsModel.renewCartListItems(
      Moment(operationStore.selectedDate).format('yyyyMMDD'),
      operationStore.selectflighItem.FLIGHT_NO, 
      false, 
    );

    this.selectCartNoItem = operationStore.CARTListItems.filter(
      element =>
        element.FLIGHT_NO === operationStore.selectflighItem.FLIGHT_NO &&
        element.FLIGHT_DATE ===
          Moment(operationStore.selectedDate).format('yyyyMMDD') &&
        element.CART_ID === item.CART_ID,
    )[0];

    if (brsStore.navigatelevelLock === false) {
      brsStore.navigatelevelLock = true;
      if (navigation.canGoBack()) {
        if (brsStore.navigatelevel >= 2) {
          brsStore.navigatelevel = brsStore.navigatelevel - 1;
        }
        brsStore.navigatelevelLock = false;
        navigation.goBack();
      }
      brsStore.navigatelevelLock = false;
    }
  };

  
  renewCartListItems = (date, flightNo, clear = true) => {
    if (clear === true) {
      this.cartListItems.clear(); 
      this.cartList.clear();
      this.tranOutCart = ''; 
      this.tranInCart = ''; 
      this.bagCartItem = ''; 
      this.bagCart = ''; 
      this.operationBagCartItem = ''; 
      this.operationBagCart = ''; 
      this.selectCartNoItem = '';
      this.searchBagInfoCart = '';
      this.searchAbnormalBagCart = '';
    }
    if (flightNo !== '') {
      this.cartListItems.clear();
      this.cartListItems = operationStore.CARTListItems.filter(
        item => item.FLIGHT_DATE === date && item.FLIGHT_NO === flightNo,
      );
      
      this.cartListItems.replace(
        this.cartListItems.slice().sort((a, b) => a.CART_ID - b.CART_ID),
      );
      this.cartList.clear();
      new Promise(async (resolve, reject) => {
        this.cartListItems.forEach(item => {
          
          let label = {label: item.CART_ID, value: item.CART_ID};
          this.cartList.push(label);
        });
        this.cartListItemsLength = this.cartListItems.length;
        resolve();
      });
    }
    
    if (this.tranOutCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(item => item.CART_ID === this.tranOutCart)
          ? false
          : true
      ) {
        this.tranOutCart = '';
        
      }
    }
    
    if (this.tranInCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(item => item.CART_ID === this.tranInCart)
          ? false
          : true
      ) {
        this.tranInCart = '';
        
      }
    }
    
    if (this.bagCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(item => item.CART_ID === this.bagCart)
          ? false
          : true
      ) {
        this.bagCartItem = '';
        this.bagCart = '';
        
        
      }
    }

    
    if (this.operationBagCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(item => item.CART_ID === this.operationBagCart)
          ? false
          : true
      ) {
        this.operationBagCartItem = '';
        this.operationBagCart = '';
        
        
      }
    }

    
    if (this.searchBagInfoCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(item => item.CART_ID === this.searchBagInfoCart)
          ? false
          : true
      ) {
        this.searchBagInfoCart = '';
        
      }
    }

    
    if (this.searchAbnormalBagCart !== '' && this.cartListItems !== []) {
      if (
        this.cartListItems.find(
          item => item.CART_ID === this.searchAbnormalBagCart,
        )
          ? false
          : true
      ) {
        this.searchAbnormalBagCart = '';
        
      }
    }
  };

  
  deleteExpiredCART = date => {
    operationStore.CARTListItems = operationStore.CARTListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    operationStore.CARTMFiveListItems = operationStore.CARTMFiveListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    console.log(
      '系統自動刪除過期的CART行李櫃資訊-' + Moment(date).format('yyyyMMDD'),
    );
  };

  
  getCARTMFiveByFlightDayFlightNo = flighItem => {
    return new Promise(async (resolve, reject) => {
      let date = flighItem.FLIGHT_DATE;
      let flightNo = flighItem.FLIGHT_NO;
      let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
      try {
        let input = `${
          brsStore.useWsAddress
        }/GetCARTMD5?strName=CART01&strArgs=${brsStore.brsUI}&strArgs=${
          brsStore.brsUP
        }&strArgs=${flightNo}&strArgs=${FLIGHT_DATE}`;
        
        
        
        const parseString = require('react-native-xml2js').parseString;
        
        
        
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
          parseString(text, {trim: [true]}, function(err, result) {
            if (result.string._ == null) {
              
              
              

              operationStore.CARTMFiveListItems = operationStore.CARTMFiveListItems.filter(
                element =>
                  element.FLIGHT_DATE !== FLIGHT_DATE ||
                  element.FLIGHT_NO !== flightNo,
              );
              operationStore.CARTListItems = operationStore.CARTListItems.filter(
                element =>
                  element.FLIGHT_DATE !== FLIGHT_DATE ||
                  element.FLIGHT_NO !== flightNo,
              );

              resolve(false);
            } else {
              
              let CREATION_TIME = new Date();
              let MfiveItems = {
                FLIGHT_DATE: `${FLIGHT_DATE}`,
                FLIGHT_NO: `${flightNo}`,
                CARTMFive: `${result.string._}`,
                CREATION_TIME: `${CREATION_TIME}`,
              };
              if (
                operationStore.CARTMFiveListItems.find(element =>
                  element.CARTMFive === result.string._ &&
                  element.FLIGHT_DATE === FLIGHT_DATE &&
                  element.FLIGHT_NO === flightNo
                    ? true
                    : false,
                )
              ) {
                
                resolve(false);
              } else if (
                operationStore.CARTMFiveListItems.find(element => {
                  if (
                    element.FLIGHT_DATE === FLIGHT_DATE &&
                    element.FLIGHT_NO === flightNo &&
                    element.CARTMFive !== result.string._
                      ? true
                      : false
                  ) {
                    element.CARTMFive = result.string._;
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                
                
                resolve(true);
              } else {
                operationStore.CARTMFiveListItems.push(MfiveItems);
                
                
                resolve(true);
              }
            }
          });
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_DATE}-${flightNo}行李櫃資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getCARTMFiveByFlightDayFlightNo)-response.status:${
              response.status
            }`,
          );

          resolve(false);
        }
      } catch (err) {
        console.log('Fetch Error', err);
        brsStore.connectionFailed = true; 
        
        this.errMessage = `網路不良，未更新${FLIGHT_DATE}-${flightNo}行李櫃資訊 `;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
        resolve(false);
      }
    });
  };

  
  getSelectCARTByFlightDayFlightNo = async flighItem => {
    let date = flighItem.FLIGHT_DATE;
    let flightNo = flighItem.FLIGHT_NO;
    let updateOrNot = false;
    let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
    if (brsStore.upload) {
      
      return false;
    } else {
      try {
        let input = `${brsStore.useWsAddress}/GetCART?strName=CART01&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${flightNo}&strArgs=${FLIGHT_DATE}`;
        
        
        
        
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
          updateOrNot = await this.getCARTMFiveByFlightDayFlightNo(flighItem);
          if (updateOrNot === true) {
            let text = await response.text();
            if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
              text = text
                .split('<NewDataSet xmlns="">')[1]
                .split('</NewDataSet>')[0]
                .split('msdata:rowOrder=');
              const leng = text.length - 1;
              if (leng > 0) {
                operationStore.CARTListItems = operationStore.CARTListItems.filter(
                  item =>
                    item.FLIGHT_DATE !== Moment(date).format('yyyyMMDD') ||
                    item.FLIGHT_NO !== flightNo,
                );
              }
              let i = 1;
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
                  CART_ID = text[i]
                    .split('<CART_ID>')[1]
                    .split('</CART_ID>')[0];
                }

                let CABIN_CLASS = '';
                if (text[i].indexOf('<CABIN_CLASS>') !== -1) {
                  CABIN_CLASS = text[i]
                    .split('<CABIN_CLASS>')[1]
                    .split('</CABIN_CLASS>')[0];
                }

                let BT_FLAG = '';
                if (text[i].indexOf('<BT_FLAG>') !== -1) {
                  BT_FLAG = text[i]
                    .split('<BT_FLAG>')[1]
                    .split('</BT_FLAG>')[0];
                }

                let NEXT_FLIGHT = '';
                if (text[i].indexOf('<NEXT_FLIGHT>') !== -1) {
                  NEXT_FLIGHT = text[i]
                    .split('<NEXT_FLIGHT>')[1]
                    .split('</NEXT_FLIGHT>')[0];
                }

                let CREATION_TIME = new Date();

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
                      let update = false;
                      if (!element.CABIN_CLASS.includes(CABIN_CLASS)) {
                        element.CABIN_CLASS =
                          element.CABIN_CLASS + ',' + CABIN_CLASS;
                        element.title = `${CART_ID} - ${element.CABIN_CLASS}`;
                        element.CREATION_TIME = CREATION_TIME;
                        update = true;
                      }
                      if (!element.NEXT_FLIGHT.includes(NEXT_FLIGHT)) {
                        element.NEXT_FLIGHT =
                          element.NEXT_FLIGHT + ',' + NEXT_FLIGHT;
                        element.CREATION_TIME = CREATION_TIME;
                        update = true;
                      }
                      if (update) {
                        console.log(
                          '合併行李櫃資訊:' +
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
                            element.NEXT_FLIGHT,
                        );
                      }
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
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                }
              }

              
            }
          }
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_DATE}-${flightNo}行李櫃資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getSelectCARTByFlightDayFlightNo)-response.status:${
              response.status
            }`,
          );
        }
      } catch (err) {
        brsStore.connectionFailed = true; 
        console.log('Fetch Error', err);
        this.errMessage = `網路不良，未更新${FLIGHT_DATE}-${flightNo}行李櫃資訊 `;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        console.log(this.errMessage);
      }
      return true;
    }
  };

  
  
  
  
  
  
  
  

  setCartsCombine = async () => {
    try {
      let input = `${brsStore.useWsAddress}/SetCART?strName=CART08&strArgs1=${
        brsStore.brsUI
      }&strArgs1=${brsStore.brsUP}&strArgs1=${
        operationStore.selectflighItem.FLIGHT_NO
      }&strArgs1=${operationStore.selectflighItem.FLIGHT_DATE}&strArgs1=${
        this.tranOutCart
      }&strArgs1=${this.tranInCart}&strArgs2=`;
      

      this.dowloadCartBusy = this.dowloadCartBusy + 1;
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
        this.successMessage = `${this.tranOutCart}全部行李併入${
          this.tranInCart
        }行李櫃。`;
        this.errMessage = '';
        this.tranInCart = '';
        this.tranOutCart = '';
        this.dowloadCartBusy = this.dowloadCartBusy - 1;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info(this.successMessage);
        return true;
      } else {
        brsStore.connectionFailed = true; 
        this.errMessage = '併櫃失敗!!';
        this.successMessage = '';
        this.dowloadCartBusy = this.dowloadCartBusy - 1;
        console.log(
          `連線主機失敗(併櫃失敗setCartsCombine)-response.status:${
            response.status
          }`,
        );

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info(this.errMessage + `-response.status:${response.status}`);
        return false;
      }
    } catch (err) {
      brsStore.syncServer = brsStore.syncServer - 1; 
      console.log('Fetch Error', err);
      this.errMessage = '網路不良, 行李併櫃失敗 ';
      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn(this.errMessage + err);
      this.successMessage = '';
      brsStore.connectionFailed = true; 
      this.dowloadCartBusy = this.dowloadCartBusy - 1;
      return false;
    }
  };
  onSubmitCartsCombineConfirm = async () => {
    if (this.tranOutCart === '') {
      this.errMessage = '請選擇行李轉出的行李櫃號';
      return false;
    } else if (this.tranInCart === '') {
      this.errMessage = '請選擇行李轉入的行李櫃號';
      return false;
    } else if (this.tranOutCart === this.tranInCart) {
      this.errMessage = '轉出轉入行李櫃號不可相同';
      return false;
    } else {
      await this.setCartsCombine();
      return true;
    }
  };

  
  deleteCarts = async () => {
    

    try {
      let strLookSQL = `sSQL=SELECT COUNT(*) from BSM_2DAY where BSM_DATE='${
        this.bagCartItem.FLIGHT_DATE
      }' and BSM_FLIGHT='${
        this.bagCartItem.FLIGHT_NO
      }' and BAG_STATE = '10' and CART_ID='${
        this.bagCartItem.CART_ID
      }'&bImgDB=false`;
      let input = `${brsStore.useWsAddress}/QLookSQL`;
      
      const response = await fetch(input, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: strLookSQL,
        method: 'POST',
        
        
        
      });
      if (response.status == 200) {
        brsStore.connectionFailed = false; 
        let text = await response.text();

        if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
          text = text
            .split('<NewDataSet xmlns="">')[1]
            .split('</NewDataSet>')[0]
            .split('<Column1>')[1]
            .split('</Column1>')[0];
        }

        if (text > 0) {
          this.errMessage = '該行李櫃已裝載行李, 無法刪除!';
          displayFlashMessage.displayMessage('danger', this.errMessage);
          console.log(this.errMessage);

          log._transportOptions.loggerName =
            Moment().format('yyyy-MM-DD') + '_brsLogsFile';
          log.info(this.bagCartItem.CART_ID + ' ' + this.errMessage);

          return false;
        } else {
          let strLookSQL = `sSQL=DELETE from CART_2DAY where DATE_TIME='${
            this.bagCartItem.FLIGHT_DATE
          }' and FLIGHT_NO='${this.bagCartItem.FLIGHT_NO}' and CART_ID='${
            this.bagCartItem.CART_ID
          }'&bImgDB=false`;
          let input = `${brsStore.useWsAddress}/QLookSQL`;
          
          const response = await fetch(input, {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            body: strLookSQL,
            method: 'POST',
            
            
            
          });
          if (response.status == 200) {
            brsStore.connectionFailed = false; 
            this.successMessage = '行李櫃刪除成功!';

            log._transportOptions.loggerName =
              Moment().format('yyyy-MM-DD') + '_brsLogsFile';
            log.info(this.bagCartItem.CART_ID + ' ' + this.successMessage);
            operationStore.CARTListItems = operationStore.CARTListItems.filter(
              item =>
                item.FLIGHT_DATE !== this.bagCartItem.FLIGHT_DATE ||
                item.FLIGHT_NO !== this.bagCartItem.FLIGHT_NO ||
                item.CART_ID !== this.bagCartItem.CART_ID,
            );
            operationStore.CARTMFiveListItems.find(element => {
              if (
                element.FLIGHT_DATE === this.bagCartItem.FLIGHT_DATE &&
                element.FLIGHT_NO === this.bagCartItem.FLIGHT_NO
                  ? true
                  : false
              ) {
                element.CARTMFive = 'change';
              }
            });
            return true;
          } else {
            brsStore.connectionFailed = true; 
            this.errMessage = '與主機傳輸失敗, 無法刪除行李櫃';

            log._transportOptions.loggerName =
              Moment().format('yyyy-MM-DD') + '_brsLogsFile';
            log.warn(this.errMessage);
            console.log(
              `連線主機失敗(deleteCarts 1 )-response.status:${response.status}`,
            );
            return false;
          }
        }
      } else {
        brsStore.connectionFailed = true; 
        this.errMessage = '行李櫃裝載狀態查詢失敗，無法刪除行李櫃';
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage);
        console.log(
          `連線主機失敗(deleteCarts 2 )-response.status:${response.status}`,
        );
        return false;
      }
    } catch (err) {
      console.log('Fetch Error', err);
      brsStore.connectionFailed = true; 
      this.errMessage = '網路不良，行李櫃刪除失敗 ';

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn(this.errMessage + err);
      return false;
    }
  };
  onSubmitDeleteCartsConfirm = async () => {
    if (this.bagCart === '') {
      this.errMessage = '請輸入欲刪除的行李櫃號!';
      this.bagCart = '';
      this.bagCartItem = '';
      return false;
    } else if (
      this.cartListItems.find(element =>
        this.bagCartItem.title === element.title ? true : false,
      )
    ) {
      this.dowloadCartBusy = this.dowloadCartBusy + 1; 
      brsStore.syncServer = brsStore.syncServer + 1; 
      let result = await this.deleteCarts();
      brsStore.syncServer = brsStore.syncServer - 1; 
      this.dowloadCartBusy = this.dowloadCartBusy - 1; 
      return result;
    } else {
      this.errMessage = '請選擇欲刪除的行李櫃號!';
      this.bagCart = '';
      this.bagCartItem = '';
      return false;
    }
  };
}
export const cartListItemsModel = new CartListItemsModel();
