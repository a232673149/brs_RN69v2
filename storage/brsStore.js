import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {observable} from 'mobx';
import {create, persist} from 'mobx-persist';
import CryptoJS from 'react-native-crypto-js';


class BrsStore {
  @persist @observable dataTab = true; 
  @persist @observable loadTab = true; 
  @persist @observable unloadTab = true; 
  @persist @observable searchTab = true; 
  @observable loginConfirm = false; 
  @observable adminLogin = false; 
  @observable ABUserLogin = false; 
  @observable brsInspUserLogin = false; 
  @observable brsUserLogin = false; 
  @observable brsA3UserLogin = false; 
  @observable navigatelevel = 0; 
  @observable navigateSelectFlight = false; 
  @observable updateBsmViewListItemFlage = false; 
  selectFlightEntrypoint = false; 
  selectCartNoEntrypoint = false; 
  bagLoadEntrypoint = false; 
  navigatelevelLock = false; 
  navigateGotoBrsButtomTab = false; 
  backHandler = ''; 
  fromBoxBagLoad = false; 
  @persist @observable scanWifiIntervalId = false; 
  @persist @observable getFIDSIntervalId = ''; 
  @observable wifiOff = false; 
  @observable connectionFailed = false; 
  @observable syncServer = 0; 
  @observable synclock = false; 
  @observable alertlock = false; 
  @persist @observable online = true; 
  @persist @observable nearAirplan = false; 
  @persist @observable upload = false; 
  @persist @observable updateIntervalTime = 600000; 
  
  
  @persist @observable bGetToday = true; 
  @persist @observable bGetTomorrow = false; 
  @persist @observable bGetYestarday = false; 

  @persist @observable bVibration = true; 

  
  @persist @observable EQUID = 'BRS-PDA-141'; 
  @persist @observable verison = '1.0.8'; 

  @observable setValue = false;
  
  @persist @observable t1WifiSsid = 'T1BRS_NEW'; 
  @persist @observable t1WifiP = 'a12345678b'; 
  @persist @observable t2WifiSsid = 'T2BRS_NEW'; 
  @persist @observable t2WifiP = 'a12345678b'; 

  
  @persist @observable t1WsHostIp = 'https://192.168.100.112/BRSWS_T1'; //T1伺服器網址:192.168.189.128 (權限:admin)
  @persist @observable t2WsHostIp = 'https://192.168.100.112/BRSWS_T2'; //T1伺服器網址:192.168.189.128 (權限:admin)
  @persist @observable A3WsHostIp = 'https://192.168.100.112/BRSWS_TEST'; //(權限:admin)

  
  
  
  
  

  
  
  @persist @observable usePlace = 'T2'; 
  @persist @observable useWsHostIp = this.t1WsHostIp; 
  @persist @observable useWsAddress = `${this.useWsHostIp}/Service1.asmx`; 
  @persist @observable A3WsAddress = `${this.A3WsHostIp}/Service1.asmx`; 
  
  
  adminId = 'Admin'; 
  @persist @observable adminP = 'admin20'; 
  
  
  @persist @observable ABUI = 'ABU'; 
  @persist @observable ABUP = 'ABU20'; 
  @persist @observable brsInspUI = 'insp'; 
  @persist @observable brsInspUP = 'insp20'; 
  @persist @observable brsA3UI = 'A3'; 
  @persist @observable brsA3UP = 'A320'; 

  
  @observable brsUI = ''; 
  @observable brsUP = this.brsUI; 

  
  @observable brsFightServer = '查詢中...'; 
  @observable brsCompanyIdType = ''; 

  @observable displayBusyCursor = false;
  @observable busyCursorText = '';
  @observable numberFlag = true;
  @observable enFlag = false;
  @observable EnFlag = false;
  @observable symbolFlag = false;
  @observable keyboardOpen = false;
  @observable keyboardSelection = null;
  @observable keyboardSelectionStart = null;
  @observable keyboardSelectionEnd = null;
  keyboardModal = '';
  @observable logFileKeepDay = 7;

  @observable brsButtomTabChange = false;
  showBusyCursor(title = '處理中') {
    this.busyCursorText = title;
    this.displayBusyCursor = true;
  }

  dismissBusyCursor() {
    this.busyCursorText = '';
    this.displayBusyCursor = false;
  }
}
const options = {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923};
const secretKey = 'Brs Store Secret key';
const hydrate = create({
  storage: {
    getItem: async key => {
      const result = await AsyncStorage.getItem(key);
      if (result != null) {
        
        return CryptoJS.AES.decrypt(result, secretKey, options).toString(
          CryptoJS.enc.Utf8,
        );
      }
      return result;
    },
    setItem: async (key, value) => {
      const result = CryptoJS.AES.encrypt(value, secretKey, options);
      await AsyncStorage.setItem(key, result.toString());
    },
    removeItem: async key => AsyncStorage.removeItem(key),
  }, 
  
  jsonify: true, 
});

export const brsStore = new BrsStore();
brsStore.init = new Promise(async (resolve,reject) => {
  try{
    await hydrate('brs', brsStore);
    console.log('brsStore has been hydrated');
    resolve();
  }catch(error){
    console.error('Error hydrating brsStore:', error);
    reject(error)
  }

});
