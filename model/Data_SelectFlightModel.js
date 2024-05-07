//已排除之套件
import React from 'react';
import {brsStore} from '../storage/brsStore';
import {operationStore} from '../storage/operationStore';
import {observable} from 'mobx';
import {Alert} from '../components/Alert';
import Moment from 'moment';
import {cabinDestListItemsModel} from './CabinDestListItemsModel';
import {cartListItemsModel} from './CartListItemsModel';
import {bsmListItemsModel} from './BSMListItemsModel';
import {searchBagLoadStatisticModel} from '../model/Search_BagLoadStatisticModel';
import {searchBagInfoQueryModel} from '../model/Search_BagInfoQueryModel';
import log from '../module/Logger';


// import {operationModule} from '../module/OperationModule';//循環相依性

class Data_SelectFlightModel {
  @observable dowloadFidsBusy = 0;
  @observable errMessage = '';
  @observable successMessage = '';
  @observable showDatePicker = false;
  @observable toggleCheckBox = false;
  
  @observable flightListItems = []; 
  @observable flight = '';
  selectNearAirplanFlight = '0';
  @observable nearAirplanFlight1 = '';
  @observable nearAirplanFlight1ListItems = '';
  @observable nearAirplanFlight2 = '';
  @observable nearAirplanFlight2ListItems = '';
  @observable nearAirplanFlight3 = '';
  @observable nearAirplanFlight3ListItems = '';

  @observable lock = false; 
  
  renewFlightListItems = date => {
    console.log('renewFlightListItems');
    let date_yyyyMMDD = Moment(date).format('yyyyMMDD');
    let today_yyyMMDD = Moment(new Date()).format('yyyyMMDD');
    this.flightListItems.clear();
    this.flightListItems = operationStore.FIDSListItems.filter(
      item => item.FLIGHT_DATE === date_yyyyMMDD,
    );

    
    this.flightListItems.replace(
      this.flightListItems.slice().sort((a, b) => a.STD - b.STD),
    );

    
    if (this.toggleCheckBox) {
      
      if (date_yyyyMMDD === today_yyyMMDD) {
        
        this.flightListItems = this.flightListItems.filter(
          item => item.ETD >= Moment(new Date()).format('HHmm'),
        );
      }
      
      else if (date_yyyyMMDD < today_yyyMMDD) {
        
        this.flightListItems = this.flightListItems.filter(
          item => item.FLIGHT_DATE >= today_yyyMMDD,
        );
      }
      
      else if (date_yyyyMMDD > today_yyyMMDD) {
        
      }
    }
  };
  asyncForEach = async (
    array,
    callback1,
    callback2,
    callback3,
    callback4,
    date1 = null,
    date2 = null,
    date3 = null,
  ) => {
    return new Promise(async (resolve, reject) => {
      if (date1 !== null) {
        date1 = Moment(date1).format('yyyyMMDD');
      }
      if (date2 !== null) {
        date2 = Moment(date2).format('yyyyMMDD');
      }
      if (date3 !== null) {
        date3 = Moment(date3).format('yyyyMMDD');
      }
      brsStore.syncServer = brsStore.syncServer + 1; 
      for (let index = 0; index < array.length; index++) {
        if (
          array[index].FLIGHT_DATE === date1 ||
          array[index].FLIGHT_DATE === date2 ||
          array[index].FLIGHT_DATE === date3
        ) {
          await callback1(array[index]);
          
          if (brsStore.brsUserLogin === true) {
            await callback2(array[index]);
            
            await callback3(array[index]);
            
            
            
          }
        }
      }
      brsStore.syncServer = brsStore.syncServer - 1; 
      resolve(true);
    });
  };
  
  alertSelectFlight = (navigation, jumpTo) => {
    let message = '請選清單中的作業航班號碼';
    Alert.alert('', message, [
      {
        text: '挑選',
        onPress: () => {
          brsStore.navigatelevelLock = false;
          navigation.navigate(jumpTo);
        },
      },
    ]);
  };

  
  getFIDSMFiveByFlightDay = date => {
    return new Promise(async (resolve, reject) => {
      let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
      try {
        let input = `${
          brsStore.useWsAddress
        }/GetFIDSMD5?strName=FIDS07&strArgs=${brsStore.brsUI}&strArgs=${
          brsStore.brsUP
        }&strArgs=${FLIGHT_DATE}`;
        
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
              console.log(
                '主機連線成功，但無法取得Mfive字串, 表示主機無此日航班資料，需將內儲資料刪除',
              );
              operationStore.FIDSMFiveListItems = operationStore.FIDSMFiveListItems.filter(
                element => element.FLIGHT_DATE !== FLIGHT_DATE,
              );
              operationStore.FIDSListItems = operationStore.FIDSListItems.filter(
                element => element.FLIGHT_DATE !== FLIGHT_DATE,
              );
              resolve(false);
            } else {
              
              let CREATION_TIME = new Date();
              let MfiveItems = {
                FLIGHT_DATE: `${FLIGHT_DATE}`,
                FIDSMFive: `${result.string._}`,
                CREATION_TIME: `${CREATION_TIME}`,
              };
              if (
                operationStore.FIDSMFiveListItems.find(element =>
                  element.FIDSMFive == result.string._ &&
                  element.FLIGHT_DATE == FLIGHT_DATE
                    ? true
                    : false,
                )
              ) {
                
                resolve(false);
              } else if (
                operationStore.FIDSMFiveListItems.find(element => {
                  if (
                    element.FLIGHT_DATE == FLIGHT_DATE &&
                    element.FIDSMFive != result.string._
                      ? true
                      : false
                  ) {
                    element.FIDSMFive = result.string._;
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                
                resolve(true);
              } else {
                operationStore.FIDSMFiveListItems.push(MfiveItems);
                
                resolve(true);
              }
              
            }
          });
        } else {
          
          this.errMessage = `連線主機失敗，未更新${Moment(date).format(
            'yyyyMMDD',
          )}航班資訊`;
          console.log(this.errMessage);

          console.log(
            `連線主機失敗(getFIDSMFiveByFlightDay)-response.status:${
              response.status
            }`,
          );
          resolve(false);
        }
      } catch (err) {
        console.log('Fetch Error', err);
        
        brsStore.connectionFailed = true; 
        this.errMessage = `網路不良，未更新${Moment(date).format(
          'yyyyMMDD',
        )}航班資訊 `;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
        resolve(false);
      }
    });
  };

  
  
  deleteExpiredFIDS = date => {
    operationStore.FIDSListItems = operationStore.FIDSListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    operationStore.FIDSMFiveListItems = operationStore.FIDSMFiveListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    console.log(
      '系統自動刪除過期的FIDS航班資訊' + Moment(date).format('yyyyMMDD'),
    );
  };

  
  getSelectFIDSByFlightDay = async date => {
    let renewListItems = false;
    let updateOrNot = false;
    let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
    if (brsStore.upload) {
      

      return false;
    } else {
      try {
        let input = `${brsStore.useWsAddress}/GetFIDS?strName=FIDS07&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${FLIGHT_DATE}`;
        
        
        
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
          updateOrNot = await this.getFIDSMFiveByFlightDay(date);
          if (updateOrNot === true) {
            let text = await response.text();

            if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
              text = text
                .split('<NewDataSet xmlns="">')[1]
                .split('</NewDataSet>')[0]
                .split('msdata:rowOrder=');
              const leng = text.length - 1;
              if (leng > 0) {
                operationStore.FIDSListItems = operationStore.FIDSListItems.filter(
                  item => item.FLIGHT_DATE !== Moment(date).format('yyyyMMDD'),
                );
              }
              let i = 1;
              for (i; i <= leng; i++) {
                let FLIGHT_NO = '';
                if (text[i].indexOf('<FLIGHT_NO>') !== -1) {
                  FLIGHT_NO = text[i]
                    .split('<FLIGHT_NO>')[1]
                    .split('</FLIGHT_NO>')[0];
                  FLIGHT_NO = FLIGHT_NO.trim();
                }
                let STD = '';
                if (text[i].indexOf('<STD>') !== -1) {
                  STD = text[i].split('<STD>')[1].split('</STD>')[0];
                  STD = STD.trim();
                }
                let ETD = '';
                if (text[i].indexOf('<ETD>') !== -1) {
                  ETD = text[i].split('<ETD>')[1].split('</ETD>')[0];
                  ETD = ETD.trim();
                }

                let DESTINATION = '';
                if (text[i].indexOf('<DESTINATION>') !== -1) {
                  DESTINATION = text[i]
                    .split('<DESTINATION>')[1]
                    .split('</DESTINATION>')[0];
                  DESTINATION = DESTINATION.trim();
                }
                let CREATION_TIME = new Date();
                operationStore.FIDSListItems.push({
                  title: `${FLIGHT_NO} - ${STD.slice(0, 2)}:${STD.slice(
                    2,
                    4,
                  )} 往 ${DESTINATION}`,
                  FLIGHT_NO: `${FLIGHT_NO}`,
                  STD: `${STD}`,
                  ETD: `${ETD}`,
                  DESTINATION: `${DESTINATION}`,
                  FLIGHT_DATE: `${FLIGHT_DATE}`,
                  CREATION_TIME: `${CREATION_TIME}`,
                });
              }
            }
          }

          renewListItems = true;
          console.log(
            `getSelectFIDSByFlightDay(${Moment(date).format(
              'yyyyMMDD',
            )}) Done----------------------------------------------------------------------`,
          );
          
          return renewListItems;
        } else {
          brsStore.connectionFailed = true; 
          this.errMessage = `連線主機失敗，未更新${Moment(date).format(
            'yyyyMMDD',
          )}航班資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getSelectFIDSByFlightDay)-response.status:${
              response.status
            }`,
          );

          
          return true;
        }
      } catch (err) {
        console.log('Fetch Error', err);
        
        brsStore.connectionFailed = true; 
        this.errMessage = `網路不良，未更新${Moment(date).format(
          'yyyyMMDD',
        )}航班資訊 `;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
        return true;
      }
    }
  };

  onChangeSelectedDate = async (event, date) => {
    this.showDatePicker = false;
    if (date === undefined) {
      
    } else {
      if (
        Moment(operationStore.selectedDate).format('yyyyMMDD') !==
        Moment(date).format('yyyyMMDD')
      ) {
        operationStore.selectedDate = date;

        
        if (brsStore.getFIDSIntervalId != '') {
          clearInterval(brsStore.getFIDSIntervalId);
          brsStore.getFIDSIntervalId = '';
        }
        if (operationStore.selectflighItem !== '') {
          brsStore.alertlock = true;
          this.flight = '';
          operationStore.selectflighItem = '';
        }
        
        //需要知道本段程式在做什麼，期望可以降低本程式的循環依賴
        // brsStore.getFIDSIntervalId = setInterval(
        //   operationModule.getFidsCartByDay,
        //   brsStore.updateIntervalTime,
        //   date,
        // );
      }
      
      brsStore.syncServer = brsStore.syncServer + 1; 
      this.dowloadFidsBusy = this.dowloadFidsBusy + 1;
      await this.getSelectFIDSByFlightDay(date);
      this.renewFlightListItems(date);
      this.dowloadFidsBusy = this.dowloadFidsBusy - 1;

      
      if (operationStore.selectflighItem !== '') {
        this.onItemSelect(operationStore.selectflighItem, null);
      }

      
      await this.asyncForEach(
        operationStore.FIDSListItems,
        cartListItemsModel.getSelectCARTByFlightDayFlightNo,
        cabinDestListItemsModel.getCartPatternByFlightInfo,
        cabinDestListItemsModel.getCabinDestByUserWithFlightInfo,
        bsmListItemsModel.getBSMByFlightDayFlightNo,
        Moment(date).format('yyyyMMDD'),
      );
      brsStore.syncServer = brsStore.syncServer - 1; 

      if (operationStore.selectflighItem !== '') {
        if (
          this.flightListItems.find(element =>
            operationStore.selectflighItem.title === element.title
              ? true
              : false,
          )
        ) {
          
          
          cartListItemsModel.renewCartListItems(
            Moment(date).format('yyyyMMDD'),
            operationStore.selectflighItem.FLIGHT_NO,
            false, 
          );
          cabinDestListItemsModel.renewCabinDestListItems(
            Moment(date).format('yyyyMMDD'),
            operationStore.selectflighItem.FLIGHT_NO,
            false, 
          );
        } else {
          
          if (operationStore.selectflighItem !== '') {
            brsStore.alertlock = true;
            this.flight = '';
            operationStore.selectflighItem = '';
          }
        }
      }

      if (operationStore.selectflighItem === '') {
        
        cartListItemsModel.renewCartListItems(
          Moment(date).format('yyyyMMDD'),
          '',
          true,
        );
        
        cabinDestListItemsModel.renewCabinDestListItems(
          Moment(date).format('yyyyMMDD'),
          '',
          true,
        );
      }
    }
  };
  onChangeCheckBox = value => {
    this.toggleCheckBox = value;
    this.renewFlightListItems(operationStore.selectedDate);
  };

  onItemSelect = async (item, navigation = null) => {
    cartListItemsModel.dowloadCartBusy = cartListItemsModel.dowloadCartBusy + 1;
    cabinDestListItemsModel.dowloadCabinBusy =
      cabinDestListItemsModel.dowloadCabinBusy + 1;
    
    if (item !== '') {
      brsStore.syncServer = brsStore.syncServer + 1; 
      
      await cartListItemsModel.getSelectCARTByFlightDayFlightNo(item);
      
      await cabinDestListItemsModel.getCartPatternByFlightInfo(item);
      
      await cabinDestListItemsModel.getCabinDestByUserWithFlightInfo(item);
      
      await bsmListItemsModel.getBSMByFlightDayFlightNo(item);
      
      await searchBagLoadStatisticModel.getBagStatisticByFlightDayFlightNo(
        item,
      );
      
      await searchBagLoadStatisticModel.GetUnloadedBagsByFlight(item);
      
      await searchBagInfoQueryModel.SearchBagInfoByFilght(item);

      brsStore.syncServer = brsStore.syncServer - 1; 
    }

    if (this.selectNearAirplanFlight == 1) {
      this.nearAirplanFlight1ListItems = item;
      this.nearAirplanFlight1 = item.title;

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.info('機場作業航班1:' + this.nearAirplanFlight1);
      this.selectNearAirplanFlight = 0;
      console.log(
        '~~~~~~~~~~~~~~~~~~~~ nearAirplanFlight1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`',
      );
      
    } else if (this.selectNearAirplanFlight == 2) {
      this.nearAirplanFlight2ListItems = item;
      this.nearAirplanFlight2 = item.title;

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.info('機場作業航班2:' + this.nearAirplanFlight2);
      this.selectNearAirplanFlight = 0;
      console.log(
        '~~~~~~~~~~~~~~~~~~~~ nearAirplanFlight2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`',
      );
      
    } else if (this.selectNearAirplanFlight == 3) {
      this.nearAirplanFlight3ListItems = item;
      this.nearAirplanFlight3 = item.title;

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.info('機場作業航班3:' + this.nearAirplanFlight3);
      this.selectNearAirplanFlight = 0;
      console.log(
        '~~~~~~~~~~~~~~~~~~~~ nearAirplanFlight3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`',
      );
      
    }

    if (this.flight !== item.title || operationStore.selectflighItem !== item) {
      
      this.flight = item.title;
      operationStore.selectflighItem = item;
      cartListItemsModel.renewCartListItems(
        Moment(operationStore.selectedDate).format('yyyyMMDD'),
        operationStore.selectflighItem.FLIGHT_NO,
        true, 
      );
      
      cabinDestListItemsModel.renewCabinDestListItems(
        Moment(operationStore.selectedDate).format('yyyyMMDD'),
        operationStore.selectflighItem.FLIGHT_NO,
        true, 
      );
      bsmListItemsModel.renewbsmBagListItems(
        operationStore.selectflighItem.FLIGHT_DATE,
        operationStore.selectflighItem.FLIGHT_NO,
      );
    } else {
      
      if (operationStore.selectflighItem !== '') {
        
        cartListItemsModel.renewCartListItems(
          Moment(operationStore.selectedDate).format('yyyyMMDD'),
          operationStore.selectflighItem.FLIGHT_NO,
          false,
        );
        
        cabinDestListItemsModel.renewCabinDestListItems(
          Moment(operationStore.selectedDate).format('yyyyMMDD'),
          operationStore.selectflighItem.FLIGHT_NO,
          false,
        );
      }
    }
    if (operationStore.selectflighItem === '') {
      
      cartListItemsModel.renewCartListItems(
        Moment(operationStore.selectedDate).format('yyyyMMDD'),
        '',
        true,
      );
      cabinDestListItemsModel.renewCabinDestListItems(
        Moment(operationStore.selectedDate).format('yyyyMMDD'),
        '',
        true,
      );
    }
    cartListItemsModel.dowloadCartBusy = cartListItemsModel.dowloadCartBusy - 1;
    cabinDestListItemsModel.dowloadCabinBusy =
      cabinDestListItemsModel.dowloadCabinBusy - 1;
    if (navigation !== null) {
      if (brsStore.navigatelevelLock === false) {
        brsStore.navigatelevelLock = true;
        if (navigation.canGoBack()) {
          if (brsStore.navigatelevel >= 2) {
            brsStore.navigatelevel = brsStore.navigatelevel - 1;
          }
          brsStore.navigatelevelLock = false;

          console.log('進入航班首頁');

          brsStore.selectFlightEntrypoint = true; 

          {
            console.log(
              '進入航班首頁 1 navigatelevel:' + brsStore.navigatelevel,
            );
          }
          {
            console.log(
              '進入航班首頁 2 bagLoadEntrypoint:' +
                (brsStore.bagLoadEntrypoint == true ? '裝載頁' : '非裝載頁'),
            );
          }

          {
            console.log(
              '進入航班首頁 3 navigateSelectFlight:' +
                (brsStore.navigateSelectFlight == true ? '鎖住' : '開啟'),
            );
          }

          {
            console.log(
              '進入航班首頁 4 selectFlightEntrypoint:' +
                (brsStore.selectFlightEntrypoint == true
                  ? '航班首頁'
                  : '非航班首頁'),
            );
          }
          {
            console.log(
              '進入航班首頁 5 selectCartNoEntrypoint:' +
                (brsStore.selectCartNoEntrypoint == true
                  ? '選櫃頁'
                  : '非選櫃頁'),
            );
          }
          navigation.goBack();
        }
        brsStore.navigatelevelLock = false;
      }
    }
  };

  onSubmitConfirm = navigation => {
    if (
      this.flightListItems.find(element =>
        operationStore.selectflighItem.title == element.title ? true : false,
      )
    ) {
      if (brsStore.navigatelevelLock === false) {
        brsStore.navigatelevelLock = true;
        if (navigation.canGoBack()) {
          if (brsStore.navigatelevel >= 2) {
            brsStore.navigatelevel = brsStore.navigatelevel - 1;
          }

          if (brsStore.navigateSelectFlight) {
            brsStore.navigateSelectFlight = false; 
          }
          brsStore.selectFlightEntrypoint = false; 

          brsStore.navigatelevelLock = false;
          navigation.goBack();
        }
        brsStore.navigatelevelLock = false;
      }
    } else {
      console.log('不在清單中');
      if (brsStore.navigatelevelLock === false) {
        brsStore.navigatelevelLock = true;
        brsStore.navigateSelectFlight = true; 
        this.alertSelectFlight(navigation, 'Data_SelectFlightForm');
        brsStore.navigatelevelLock = false;
      }
    }
  };
}
export const DataSelectFlightModel = new Data_SelectFlightModel();
