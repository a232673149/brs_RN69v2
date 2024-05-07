
import React from 'react';
import {brsStore} from '../storage/brsStore';
import {bsmStore} from '../storage/bsmStore';
import {observable} from 'mobx';
import Moment from 'moment';
import log from '../module/Logger';

class BSMListItemsModel {
  @observable errMessage = '';
  @observable successMessage = '';
  bsmLoadBagListItems = [];
  bsmUnLoadBagListItems = [];
  
  deleteExpiredBSM = date => {
    bsmStore.BsmListItems = bsmStore.BsmListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    bsmStore.BSMMFiveListItems = bsmStore.BSMMFiveListItems.filter(
      item => item.FLIGHT_DATE > Moment(date).format('yyyyMMDD'),
    );
    
    
    
  };
  
  getBSMMFiveByFlightDayFlightNo = flighItem => {
    return new Promise(async resolve => {
      let date = flighItem.FLIGHT_DATE;
      let FLIGHT_NO = flighItem.FLIGHT_NO;
      let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
      try {
        let input = `${brsStore.useWsAddress}/GetBSMMD5?strName=BSM01&strArgs=${
          brsStore.brsUI
        }&strArgs=${
          brsStore.brsUP
        }&strArgs=${FLIGHT_NO}&strArgs=${FLIGHT_DATE}`;
        
        
        
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

        
        if (response.status === 200) {
          brsStore.connectionFailed = false; 
          let text = await response.text();
          parseString(text, {trim: [true]}, function(err, result) {
            if (result.string._ == null) {
              console.log(
                '主機連線成功，但無法取得Mfive字串, 表示主機此航班無行李BSM資料，需將內儲資料刪除',
              );

              bsmStore.BSMMFiveListItems = bsmStore.BSMMFiveListItems.filter(
                element =>
                  element.FLIGHT_DATE !== FLIGHT_DATE ||
                  element.FLIGHT_NO !== FLIGHT_NO,
              );
              bsmStore.BsmListItems = bsmStore.BsmListItems.filter(
                element =>
                  element.FLIGHT_DATE !== FLIGHT_DATE ||
                  element.FLIGHT_NO !== FLIGHT_NO,
              );

              resolve(false);
            } else {
              
              let CREATION_TIME = new Date();
              let MfiveItems = {
                FLIGHT_DATE: `${FLIGHT_DATE}`,
                FLIGHT_NO: `${FLIGHT_NO}`,
                BSMMFive: `${result.string._}`,
                CREATION_TIME: `${CREATION_TIME}`,
              };
              if (
                bsmStore.BSMMFiveListItems.find(element =>
                  element.BSMMFive === result.string._ &&
                  element.FLIGHT_DATE === FLIGHT_DATE &&
                  element.FLIGHT_NO === FLIGHT_NO
                    ? true
                    : false,
                )
              ) {
                
                resolve(false);
              } else if (
                bsmStore.BSMMFiveListItems.find(element => {
                  if (
                    element.FLIGHT_DATE === FLIGHT_DATE &&
                    element.FLIGHT_NO === FLIGHT_NO &&
                    element.BSMMFive !== result.string._
                      ? true
                      : false
                  ) {
                    element.BSMMFive = result.string._;
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                
                
                resolve(true);
              } else {
                bsmStore.BSMMFiveListItems.push(MfiveItems);
                
                
                resolve(true);
              }
            }
          });
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_DATE}-${FLIGHT_NO}行李BSM資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getBSMMFiveByFlightDayFlightNo)-response.status:${
              response.status
            }`,
          );
          resolve(false);
        }
      } catch (err) {
        console.log('Fetch Error', err);
        brsStore.connectionFailed = true; 
        
        this.errMessage = `網路不良，未更新${FLIGHT_DATE}-${FLIGHT_NO}行李BSM Mfive資訊 `;
        
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        resolve(false);
      }
    });
  };

  
  getBSMByFlightDayFlightNo = async flighItem => {
    let date = flighItem.FLIGHT_DATE;
    let FLIGHT_NO = flighItem.FLIGHT_NO;
    let updateOrNot = false;
    let FLIGHT_DATE = Moment(date).format('yyyyMMDD');
    if (brsStore.upload) {
      

      return false;
    } else {
      try {
        let input = `${brsStore.useWsAddress}/GetBSM?strName=BSM01&strArgs=${
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

        if (response.status === 200) {
          brsStore.connectionFailed = false; 
          updateOrNot = await this.getBSMMFiveByFlightDayFlightNo(flighItem);
          if (updateOrNot === true) {
            let text = await response.text();
            if (text.indexOf('<NewDataSet xmlns="">') !== -1) {
              text = text
                .split('<NewDataSet xmlns="">')[1]
                .split('</NewDataSet>')[0]
                .split('msdata:rowOrder=');
              const leng = text.length - 1;
              if (leng > 0) {
                bsmStore.BsmListItems = bsmStore.BsmListItems.filter(
                  item =>
                    item.FLIGHT_DATE !== Moment(date).format('yyyyMMDD') ||
                    item.FLIGHT_NO !== FLIGHT_NO,
                );
              }
              let i = 1;
              for (i; i <= leng; i++) {
                let BAG_TAG = '';
                if (text[i].indexOf('<BAG_TAG>') !== -1) {
                  BAG_TAG = text[i]
                    .split('<BAG_TAG>')[1]
                    .split('</BAG_TAG>')[0];
                  BAG_TAG = BAG_TAG.trim();
                }
                let BSM_FLIGHT = '';
                if (text[i].indexOf('<BSM_FLIGHT>') !== -1) {
                  BSM_FLIGHT = text[i]
                    .split('<BSM_FLIGHT>')[1]
                    .split('</BSM_FLIGHT>')[0];
                  BSM_FLIGHT = BSM_FLIGHT.trim();
                }
                let BSM_DATE = '';
                if (text[i].indexOf('<BSM_DATE>') !== -1) {
                  BSM_DATE = text[i]
                    .split('<BSM_DATE>')[1]
                    .split('</BSM_DATE>')[0];
                }
                let DESTINATION = '';
                if (text[i].indexOf('<DESTINATION>') !== -1) {
                  DESTINATION = text[i]
                    .split('<DESTINATION>')[1]
                    .split('</DESTINATION>')[0];
                  DESTINATION = DESTINATION.trim();
                }

                let CABIN_CLASS = '';
                if (text[i].indexOf('<CABIN_CLASS>') !== -1) {
                  CABIN_CLASS = text[i]
                    .split('<CABIN_CLASS>')[1]
                    .split('</CABIN_CLASS>')[0];
                  CABIN_CLASS = CABIN_CLASS.trim();
                }

                let NEXT_FLIGHT = '';
                if (text[i].indexOf('<NEXT_FLIGHT>') !== -1) {
                  NEXT_FLIGHT = text[i]
                    .split('<NEXT_FLIGHT>')[1]
                    .split('</NEXT_FLIGHT>')[0];
                  NEXT_FLIGHT = NEXT_FLIGHT.trim();
                }
                let AUTH_LOAD = '';
                if (text[i].indexOf('<AUTH_LOAD>') !== -1) {
                  AUTH_LOAD = text[i]
                    .split('<AUTH_LOAD>')[1]
                    .split('</AUTH_LOAD>')[0];
                  AUTH_LOAD = AUTH_LOAD.trim();
                }

                let AUTH_TRANSPORT = '';
                if (text[i].indexOf('<AUTH_TRANSPORT>') !== -1) {
                  AUTH_TRANSPORT = text[i]
                    .split('<AUTH_TRANSPORT>')[1]
                    .split('</AUTH_TRANSPORT>')[0];
                  AUTH_TRANSPORT = AUTH_TRANSPORT.trim();
                }

                let BSM_STATE = '';
                if (text[i].indexOf('<BSM_STATE>') !== -1) {
                  BSM_STATE = text[i]
                    .split('<BSM_STATE>')[1]
                    .split('</BSM_STATE>')[0];
                  BSM_STATE = BSM_STATE.trim();
                }

                let BAG_FLIGHT = '';
                if (text[i].indexOf('<BAG_FLIGHT>') !== -1) {
                  BAG_FLIGHT = text[i]
                    .split('<BAG_FLIGHT>')[1]
                    .split('</BAG_FLIGHT>')[0];
                  BAG_FLIGHT = BAG_FLIGHT.trim();
                }

                let BAG_DATE = '';
                if (text[i].indexOf('<BAG_DATE>') !== -1) {
                  BAG_DATE = text[i]
                    .split('<BAG_DATE>')[1]
                    .split('</BAG_DATE>')[0];
                }
                let CART_ID = '';
                if (text[i].indexOf('<CART_ID>') !== -1) {
                  CART_ID = text[i]
                    .split('<CART_ID>')[1]
                    .split('</CART_ID>')[0];
                  CART_ID = CART_ID.trim();
                }

                let BAG_STATE = '';
                if (text[i].indexOf('<BAG_STATE>') !== -1) {
                  BAG_STATE = text[i]
                    .split('<BAG_STATE>')[1]
                    .split('</BAG_STATE>')[0];
                  BAG_STATE = BAG_STATE.trim();
                }

                let OP_Attribute = '';
                if (text[i].indexOf('<OP_Attribute>') !== -1) {
                  OP_Attribute = text[i]
                    .split('<OP_Attribute>')[1]
                    .split('</OP_Attribute>')[0];
                  OP_Attribute = OP_Attribute.trim();
                }

                let CREATION_TIME = new Date();
                let bagScanResultColor = '';
                let bagScanResulNum = '';
                if (BAG_STATE === '10') {
                  bagScanResultColor = 'Green';
                  bagScanResulNum = 0;
                }

                bsmStore.BsmListItems.push({
                  BAG_TAG: `${BAG_TAG}`,
                  BSM_FLIGHT: `${BSM_FLIGHT}`,
                  BSM_DATE: `${BSM_DATE}`,
                  DESTINATION: `${DESTINATION}`,
                  CABIN_CLASS: `${CABIN_CLASS}`,
                  NEXT_FLIGHT: `${NEXT_FLIGHT}`,
                  AUTH_LOAD: `${AUTH_LOAD}`,
                  AUTH_TRANSPORT: `${AUTH_TRANSPORT}`,
                  BSM_STATE: `${BSM_STATE}`,
                  BAG_FLIGHT: `${BAG_FLIGHT}`,
                  BAG_DATE: `${BAG_DATE}`,
                  CART_ID: `${CART_ID}`,
                  BAG_STATE: `${BAG_STATE}`,
                  OP_Attribute: `${OP_Attribute}`,
                  title: `${FLIGHT_DATE}${FLIGHT_NO} ${CART_ID}-${BAG_TAG}`,
                  FLIGHT_NO: `${FLIGHT_NO}`,
                  FLIGHT_DATE: `${FLIGHT_DATE}`,
                  CREATION_TIME: `${CREATION_TIME}`,
                  bagScanResulNum: `${bagScanResulNum}`,
                  bagScanResultColor: `${bagScanResultColor}`,
                  bagScanResultMsg: ' ',
                });
              }
            }
          }
        } else {
          
          this.errMessage = `連線主機失敗，未更新${FLIGHT_DATE}-${FLIGHT_NO}行李BSM資訊`;
          console.log(this.errMessage);
          console.log(
            `連線主機失敗(getBSMByFlightDayFlightNo)-response.status:${
              response.status
            }`,
          );
        }
      } catch (err) {
        brsStore.connectionFailed = true; 
        console.log('Fetch Error', err);
        this.errMessage = `網路不良，未更新${FLIGHT_DATE}-${FLIGHT_NO}行李BSM資訊 `;

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn(this.errMessage + err);
        
      }
      
      return true;
    }
  };

  
  renewbsmBagListItems = (date, flightNo) => {
    if (flightNo !== '') {
      this.bsmLoadBagListItems.splice(0, this.bsmLoadBagListItems.length); 
      this.bsmUnLoadBagListItems.splice(0, this.bsmUnLoadBagListItems.length); 
      this.bsmLoadBagListItems = bsmStore.BsmListItems.filter(
        item =>
          item.BSM_DATE === date &&
          item.BSM_FLIGHT === flightNo &&
          item.BAG_STATE === '10',
      );
      this.bsmUnLoadBagListItems = bsmStore.BsmListItems.filter(
        item =>
          item.BSM_DATE === date &&
          item.BSM_FLIGHT === flightNo &&
          item.BAG_STATE !== '10',
      );
    }
  };
}
export const bsmListItemsModel = new BSMListItemsModel();
