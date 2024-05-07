import {cartListItemsModel} from '../model/CartListItemsModel';
import {cabinDestListItemsModel} from '../model/CabinDestListItemsModel';
import Moment from 'moment';
import {brsStore} from '../storage/brsStore';
import {offLineStore} from '../storage/offLineStore';
import {bsmListItemsModel} from '../model/BSMListItemsModel';
import {displayFlashMessage} from './DisplayFlashMessage';
import {Alert} from '../components/Alert';
import log from '../module/Logger';
import {operationStore} from '../storage/operationStore';

import {DataSelectFlightModel} from '../model/Data_SelectFlightModel';//循環相依性


class OperationModule {
  getFidsCartByDay = async date => {
    if (
      brsStore.synclock === false && 
      
      DataSelectFlightModel.dowloadFidsBusy === 0 &&
      cabinDestListItemsModel.dowloadCabinBusy === 0 &&
      cartListItemsModel.dowloadCartBusy === 0
    ) {
      brsStore.synclock = true;
      
      
      
      brsStore.syncServer = brsStore.syncServer + 1; 
      DataSelectFlightModel.dowloadFidsBusy =
        DataSelectFlightModel.dowloadFidsBusy + 1;
      await DataSelectFlightModel.getSelectFIDSByFlightDay(date);
      DataSelectFlightModel.renewFlightListItems(date);
      DataSelectFlightModel.dowloadFidsBusy =
        DataSelectFlightModel.dowloadFidsBusy - 1;

      
      if (operationStore.selectflighItem !== '') {
        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy + 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy + 1;
        
        await cartListItemsModel.getSelectCARTByFlightDayFlightNo(
          operationStore.selectflighItem,
        );
        
        cartListItemsModel.renewCartListItems(
          Moment(operationStore.selectedDate).format('yyyyMMDD'),
          operationStore.selectflighItem.FLIGHT_NO,
          false,
        );

        
        await bsmListItemsModel.getBSMByFlightDayFlightNo(
          operationStore.selectflighItem,
        );

        
        await cabinDestListItemsModel.getCartPatternByFlightInfo(
          operationStore.selectflighItem,
        );
        
        await cabinDestListItemsModel.getCabinDestByUserWithFlightInfo(
          operationStore.selectflighItem,
        );
        
        cabinDestListItemsModel.renewCabinDestListItems(
          Moment(operationStore.selectedDate).format('yyyyMMDD'),
          operationStore.selectflighItem.FLIGHT_NO,
          false,
        );

        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy - 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy - 1;
      }
      brsStore.syncServer = brsStore.syncServer - 1; 
      let busy = false;
      if (operationStore.selectflighItem === '') {
        busy = true;
        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy + 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy + 1;
      }
      
      await DataSelectFlightModel.asyncForEach(
        operationStore.FIDSListItems,
        cartListItemsModel.getSelectCARTByFlightDayFlightNo,
        cabinDestListItemsModel.getCartPatternByFlightInfo,
        cabinDestListItemsModel.getCabinDestByUserWithFlightInfo,
        bsmListItemsModel.getBSMByFlightDayFlightNo,
        Moment(date).format('yyyyMMDD'),
      );

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
      } else {
        
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
      }
      if (operationStore.selectflighItem === '' || busy === true) {
        cartListItemsModel.dowloadCartBusy =
          cartListItemsModel.dowloadCartBusy - 1;
        cabinDestListItemsModel.dowloadCabinBusy =
          cabinDestListItemsModel.dowloadCabinBusy - 1;
      }
      
      let bGetToday = brsStore.bGetToday;
      let bGetTomorrow = brsStore.bGetTomorrow;
      let bGetYestarday = brsStore.bGetYestarday;
      if (bGetToday || bGetTomorrow || bGetYestarday) {
        let today = new Date();
        let tomorrow = new Date().setDate(new Date().getDate() + 1);
        let yestarday = new Date().setDate(new Date().getDate() - 1);
        console.log(`today: ${Moment(today).format('yyyyMMDD')}`);
        console.log(`tomorrow: ${Moment(tomorrow).format('yyyyMMDD')}`);
        console.log(`yestarday: ${Moment(yestarday).format('yyyyMMDD')}`);
        switch (Moment(date).format('yyyyMMDD')) {
          case Moment(today).format('yyyyMMDD'):
            bGetToday = false;
            today = null;
            break;
          case Moment(tomorrow).format('yyyyMMDD'):
            bGetTomorrow = false;
            tomorrow = null;
            break;
          case Moment(yestarday).format('yyyyMMDD'):
            bGetYestarday = false;
            yestarday = null;
            break;
        }
        brsStore.syncServer = brsStore.syncServer + 1; 
        if (bGetToday) {
          await DataSelectFlightModel.getSelectFIDSByFlightDay(today);
          console.log(
            '取得' + Moment(today).format('yyyyMMDD') + '航班資料完成',
          );
        }
        if (bGetTomorrow) {
          await DataSelectFlightModel.getSelectFIDSByFlightDay(tomorrow);
          console.log(
            '取得' + Moment(tomorrow).format('yyyyMMDD') + '航班資料完成',
          );
        }
        if (bGetYestarday) {
          await DataSelectFlightModel.getSelectFIDSByFlightDay(yestarday);
          console.log(
            '取得' + Moment(yestarday).format('yyyyMMDD') + '航班資料完成',
          );
        }
        brsStore.syncServer = brsStore.syncServer - 1; 

        if (bGetToday || bGetTomorrow || bGetYestarday) {
          
          await DataSelectFlightModel.asyncForEach(
            operationStore.FIDSListItems,
            cartListItemsModel.getSelectCARTByFlightDayFlightNo,
            cabinDestListItemsModel.getCartPatternByFlightInfo,
            cabinDestListItemsModel.getCabinDestByUserWithFlightInfo,
            bsmListItemsModel.getBSMByFlightDayFlightNo,
            today,
            tomorrow,
            yestarday,
          );
        }
      }
      brsStore.synclock = false;
    } else {
      
    }
  };
  offLineKeepStore = offLineKeepStoreItems => {
    
    brsStore.upload = true;
    offLineStore.offLineKeepStoreLastDateTime =
      offLineKeepStoreItems.CREATION_TIME;
    offLineStore.offLineKeepStoreListItems.push(offLineKeepStoreItems);
    offLineStore.offLineKeepStoreCount =
      offLineStore.offLineKeepStoreListItems.length;
  };
  offlineAlertMessage = () => {
    let mode = brsStore.online
      ? brsStore.wifiOff
        ? '連線操作(無網路連線)'
        : '連線操作'
      : brsStore.nearAirplan
      ? '機邊作業'
      : '離線作業';
    if (brsStore.online) {
      let message = `離網環境狀態!! \n\n目前作業模式:\n${mode}\n\n"離線作業"模式 - 提供無網路環境下，可將行李裝載指令內儲於手機，等待連通網路後再補上傳於伺服器中。\n\n切換作業模式? `;
      Alert.alert('', message, [
        {
          text: '切換"離線作業"',
          onPress: () => {
            brsStore.online = false;
            brsStore.unloadTab = false;
            brsStore.searchTab = false;
            log._transportOptions.loggerName =
              Moment().format('yyyy-MM-DD') + '_brsLogsFile';
            log.info('切換離線作業');
          },
        },
        {
          text: '離開',
          onPress: () => null,
        },
      ]);
    }
  };
  uploadSubmitStoreToServer = async (array, index) => {
    
    let response = '';
    try {
      let input = array[index].API;
      if (array[index].method === 'GET') {
        
        response = await fetch(input, {
          
          
          
        });
      }

      if (response.status == 200) {
        brsStore.connectionFailed = false; 
        this.successMessage = '資料上傳成功!!';
        displayFlashMessage.displayMessage('success', this.successMessage);
        this.successMessage = '';
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('資料上傳成功');
        return true;
      } else {
        brsStore.connectionFailed = true; 
        this.errMessage = '資料上傳失敗!!';
        displayFlashMessage.displayMessage('danger', this.errMessage);
        this.errMessage = '';
        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info(
          `連線主機失敗(資料上傳失敗)-response.status:${response.status}`,
        );
        return false;
      }
    } catch (err) {
      brsStore.syncServer = brsStore.syncServer - 1; 
      brsStore.connectionFailed = true; 
      
      console.log('Fetch Error', err);
      this.errMessage = '網路不良, 資料上傳失敗 ';

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn(this.errMessage + err);
      displayFlashMessage.displayMessage('danger', this.errMessage);
      this.errMessage = '';
      return false;
    }
  };

  asyncForEach = async (array, callback) => {
    return new Promise(async resolve => {
      let result = false;
      for (let index = 0; index < array.length; index++) {
        result = await callback(array, index);
        
        if (result === false) {
          
          break;
        }
      }
      resolve(result);
    });
  };

  uploadSubmitStore = async () => {
    if (offLineStore.offLineKeepStoreListItems.length > 0) {
      brsStore.showBusyCursor('上傳資訊中...請勿關閉電源。');
      console.log('上傳資訊中...請勿關閉電源。');
      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.info('上傳資訊中...請勿關閉電源。');
      
      brsStore.syncServer = brsStore.syncServer + 1; 
      if (
        (await this.asyncForEach(
          offLineStore.offLineKeepStoreListItems,
          this.uploadSubmitStoreToServer,
        )) === true
      ) {
        console.log('uploadSubmitStore done');

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.info('上傳資訊完成。');
        offLineStore.offLineKeepStoreListItems.splice(
          0,
          offLineStore.offLineKeepStoreListItems.length,
        );
        offLineStore.offLineKeepStoreCount =
          offLineStore.offLineKeepStoreListItems.length;
        brsStore.upload = false;
        brsStore.unloadTab = true;
        brsStore.searchTab = true;
        brsStore.online = true;
        
        brsStore.nearAirplan = false;
        DataSelectFlightModel.nearAirplanFlight1ListItems = '';
        DataSelectFlightModel.nearAirplanFlight1 = '';
        DataSelectFlightModel.nearAirplanFlight2ListItems = '';
        DataSelectFlightModel.nearAirplanFlight2 = '';
        DataSelectFlightModel.nearAirplanFlight3ListItems = '';
        DataSelectFlightModel.nearAirplanFlight3 = '';
      }
      brsStore.syncServer = brsStore.syncServer - 1; 
      brsStore.dismissBusyCursor();
    } else {
      brsStore.upload = false;
      brsStore.unloadTab = true;
      brsStore.searchTab = true;
      brsStore.online = true;
      
      brsStore.nearAirplan = false;
      DataSelectFlightModel.nearAirplanFlight1ListItems = '';
      DataSelectFlightModel.nearAirplanFlight1 = '';
      DataSelectFlightModel.nearAirplanFlight2ListItems = '';
      DataSelectFlightModel.nearAirplanFlight2 = '';
      DataSelectFlightModel.nearAirplanFlight3ListItems = '';
      DataSelectFlightModel.nearAirplanFlight3 = '';
    }
  };

  clearSubmitStore = () => {
    brsStore.upload = false;
    brsStore.unloadTab = true;
    brsStore.searchTab = true;
    brsStore.online = true;
    
    brsStore.nearAirplan = false;
    DataSelectFlightModel.nearAirplanFlight1ListItems = '';
    DataSelectFlightModel.nearAirplanFlight1 = '';
    DataSelectFlightModel.nearAirplanFlight2ListItems = '';
    DataSelectFlightModel.nearAirplanFlight2 = '';
    DataSelectFlightModel.nearAirplanFlight3ListItems = '';
    DataSelectFlightModel.nearAirplanFlight3 = '';
    offLineStore.offLineKeepStoreCount = 0;
    offLineStore.offLineKeepStoreLastDateTime = '';

    offLineStore.offLineKeepStoreListItems.splice(
      0,
      offLineStore.offLineKeepStoreListItems.length,
    );
    

    log._transportOptions.loggerName =
      Moment().format('yyyy-MM-DD') + '_brsLogsFile';
    log.info('地勤人員選擇資料作廢。');
    this.getFidsCartByDay(operationStore.selectedDate);
  };
}
export const operationModule = new OperationModule();
