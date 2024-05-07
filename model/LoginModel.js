import React from 'react';
import {observable} from 'mobx';
import {brsStore} from '../storage/brsStore';
import {androidPermission} from '../module/RequestPermission';
import {PermissionsAndroid} from 'react-native';
import SystemSetting from 'react-native-system-setting';
import wifi from 'react-native-android-wifi';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import Moment from 'moment';
import {displayFlashMessage} from '../module/DisplayFlashMessage';
import log from '../module/Logger';



class LoginModel {
  wifiItems = observable([
    {label: '第一航廈', value: 'T1'},
    {label: '第二航廈', value: 'T2'},
  ]);
  @observable showUP = false;
  
  async requestFilePermission() {
    await androidPermission.requestPermission(
      '檔案',
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
  }

  
  async requestCameraPermission() {
    await androidPermission.requestPermission(
      '相機',
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  }
  
  async requestWifiPermission() {
    await androidPermission.requestPermission(
      'Wifi',
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }

  

  
  async setMaxVolume() {
    await SystemSetting.setVolume(1);
  }
  async setVolume(value) {
    
    await SystemSetting.setVolume(value);
    
  }
  async getVolume() {
    
    let volume = await SystemSetting.getVolume();
    
    
    return volume;
  }
  async setMaxBrightness() {
    await SystemSetting.setBrightness(1);
  }
  async setBrightness(value) {
    
    
    
    
    
    await SystemSetting.setBrightness(value);
  }
  async getBrightness() {
    let brightness = await SystemSetting.getBrightness();
    
    
    return brightness;
  }

  
  
  getFightServer() {
    return new Promise(async resolve => {
      try {
        const parseString = require('react-native-xml2js').parseString;
        let input = `${brsStore.useWsAddress}/GetUSER?strName=USER02&strArgs=${
          brsStore.brsUI
        }&strArgs=${brsStore.brsUP}&strArgs=${brsStore.EQUID}`;
        
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
          let text = await response.text();
          parseString(text, {trim: [true]}, function(err, result) {
            brsStore.connectionFailed = false; 
            if (result.string._ == null) {
              brsStore.brsFightServer = '此裝置無對應公司';
            } else {
              brsStore.brsFightServer = result.string._;
            }
            
            
            
            
            
            
            
            
            displayFlashMessage.displayMessage('success', '連線主機成功');
          });
        } else {
          brsStore.connectionFailed = true; 
          brsStore.brsFightServer = '連線失敗!!';
          displayFlashMessage.displayMessage('danger', '連線主機失敗!');
          console.log(
            `連線主機失敗(getFightServer)-response.status:${response.status}`,
          );
        }
        resolve(true);
      } catch (err) {
        console.log('Fetch Error', err);
        brsStore.syncServer = brsStore.syncServer - 1; 
        brsStore.connectionFailed = true; 
        brsStore.brsFightServer = '連線失敗!!';
        displayFlashMessage.displayMessage('danger', '連線失敗，請檢查網路');

        log._transportOptions.loggerName =
          Moment().format('yyyy-MM-DD') + '_brsLogsFile';
        log.warn('連線失敗，請檢查網路 ' + err);
        resolve(false);
      }
    });
  }

  checkUserPromise() {
    return new Promise(resolve => {
      let input = `${brsStore.useWsAddress}/GetUSER?strName=USER01&strArgs=${
        brsStore.brsUI
      }&strArgs=${brsStore.brsUP}`;
      const parseString = require('react-native-xml2js').parseString;
      
      fetch(input, {
        method: 'GET',
        timeoutInterval: 10000, 
        
        
        
        
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          e_platform: 'mobile',
        },
      })
        .then(response => response.text())
        .then(response => {
          parseString(response, {trim: [true]}, function(err, result) {
            brsStore.connectionFailed = false; 
            
            if (result.string._ == null) {
              
              brsStore.brsUserLogin = false;
              resolve(false);
            } else {
              
              brsStore.brsUserLogin = true;
              resolve(true);
            }
          });
        })
        
        .catch(err => {
          console.log('Fetch Error', err);
          brsStore.connectionFailed = true; 
        });
    });
  }

  
  
  async checkUser() {
    try {
      let input = `${brsStore.useWsAddress}/GetUSER?strName=USER01&strArgs=${
        brsStore.brsUI
      }&strArgs=${brsStore.brsUP}`;
      const parseString = require('react-native-xml2js').parseString;
      

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
        const text = await response.text();
        brsStore.syncServer = false;
        parseString(text, {trim: [true]}, function(err, result) {
          
          if (result.string._ == null) {
            
            brsStore.brsUserLogin = false;
          } else if (
            result.string._.split('-')[0] !== brsStore.brsFightServer
          ) {
            
            brsStore.brsUserLogin = false;
          } else {
            
            if (result.string._.split('-')[1] == 'S') {
              brsStore.brsCompanyIdType = 'SFLIGHT_CODE'; 
              brsStore.brsUserLogin = true;
              brsStore.loadTab = true;
              brsStore.unloadTab = true;
            } else if (result.string._.split('-')[1] == 'A') {
              brsStore.brsCompanyIdType = 'FLIGHT_CODE'; 
              brsStore.brsUserLogin = true;
              brsStore.loadTab = false;
              brsStore.unloadTab = false;
            } else {
              brsStore.brsCompanyIdType = 'ERR_CODE'; 
              brsStore.brsUserLogin = false;
            }
            
            
          }
        });
      } else {
        brsStore.connectionFailed = true; 
        displayFlashMessage.displayMessage('danger', '資料傳輸失敗!');
        brsStore.brsUserLogin = false;
        console.log(
          `連線主機失敗(checkUser)-response.status:${response.status}`,
        );
      }
    } catch (err) {
      console.log('Fetch Error', err);
      brsStore.syncServer = brsStore.syncServer - 1; 
      brsStore.connectionFailed = true; 
      displayFlashMessage.displayMessage('danger', '連線主機失敗!');

      log._transportOptions.loggerName =
        Moment().format('yyyy-MM-DD') + '_brsLogsFile';
      log.warn('連線主機失敗! ' + err);
      brsStore.brsUserLogin = false;
    }
  }

  
  
  onChangeTextUI = brsUI => {
    let autoLogin = false;
    if (brsUI.includes('*') && brsUI.includes('&') && brsUI.includes('#')) {
      brsStore.brsUI = brsUI.split('&')[0].replace('*', '');
      brsStore.brsUP = brsUI
        .split('&')[1]
        .split('&')[0]
        .replace('#', '');
      brsUI = brsStore.brsUI;
      console.log(brsStore.brsUI);
      console.log(brsStore.brsUP);
      autoLogin = true;
    } else {
      brsStore.brsUI = brsUI;
    }
    return autoLogin;
  };

  onChangeTextUP = UP => {
    brsStore.brsUP = UP;
  };
  async onLoginConfirm() {
    
    if (
      (('LoadDefault' === brsStore.brsUI ||
        'ld' === brsStore.brsUI ||
        'LD' === brsStore.brsUI) &&
        'LoadDefault' === brsStore.brsUP) ||
      'ld' === brsStore.brsUP ||
      'LD' === brsStore.brsUP
    ) {
      brsStore.adminP = 'admin20';
      brsStore.brsUI = '';
      brsStore.brsUP = brsStore.brsUI;
      brsStore.setValue = true;
    } else if ('brstest' === brsStore.brsUI && 'brstest' === brsStore.brsUP) {
      brsStore.brsFightServer;
      brsStore.t2WsHostIp = 'https://onlinetravel.meco.org.tw/BRSWS';
      brsStore.EQUID = 'BRS-PDA-69';
      brsStore.usePlace = 'T2';
      brsStore.useWsHostIp = brsStore.t2WsHostIp;
      brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
      brsStore.t2WifiSsid = 'StellaTsai';
      brsStore.t2WifiP = '0982572030';
      loginModel.getFightServer();
      brsStore.brsUI = 'EGAS01';
      brsStore.brsUP = 'egas01';
      brsStore.setValue = true;
    } else if ('T1' === brsStore.brsUI && 'T1' === brsStore.brsUP) {
      
      brsStore.usePlace = 'T1';
      brsStore.useWsHostIp = brsStore.t1WsHostIp;
      brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
      loginModel.getFightServer();
      brsStore.brsUI = '';
      brsStore.brsUP = brsStore.brsUI;
      brsStore.setValue = true;
    } else if ('T2' === brsStore.brsUI && 'T2' === brsStore.brsUP) {
      
      brsStore.usePlace = 'T2';
      brsStore.useWsHostIp = brsStore.t2WsHostIp;
      brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
      loginModel.getFightServer();
      brsStore.brsUI = '';
      brsStore.brsUP = brsStore.brsUI;
      brsStore.setValue = true;
    } else if (
      brsStore.adminId === brsStore.brsUI &&
      brsStore.adminP === brsStore.brsUP
    ) {
      
      brsStore.loginConfirm = true;
      brsStore.adminLogin = true;
    } else if (
      
      brsStore.ABUI === brsStore.brsUI &&
      brsStore.ABUP === brsStore.brsUP
    ) {
      
      brsStore.brsUI = 'ABU';
      brsStore.brsUP = 'ABU20';
      brsStore.ABUserLogin = true;
      brsStore.loginConfirm = true;
    } else if (
      
      brsStore.brsInspUI === brsStore.brsUI &&
      brsStore.brsInspUP === brsStore.brsUP
    ) {
      brsStore.brsInspUserLogin = true;
      brsStore.brsUI = 'insp';
      brsStore.brsUP = 'insp20';
      brsStore.loginConfirm = true;
    } else if (
      brsStore.brsA3UI === brsStore.brsUI &&
      brsStore.brsA3UP === brsStore.brsUP
    ) {
      brsStore.brsA3UserLogin = true;
      brsStore.loginConfirm = true;
    } else {
      
      await this.checkUser();
      if (brsStore.brsUserLogin === true) {
        
        brsStore.brsUserLogin = true;
        brsStore.loginConfirm = true;
      } else {
        
        brsStore.loginConfirm = false; 
        brsStore.brsUI = '';
        brsStore.brsUP = brsStore.brsUI;
        brsStore.adminLogin = false; 
        brsStore.ABUserLogin = false; 
        brsStore.brsInspUserLogin = false; 
        brsStore.brsUserLogin = false; 
        brsStore.brsA3UserLogin = false; 
      }
    }
  }

  
  async enableBlueTooth() {
    RNZebraBluetoothPrinter.enableBluetooth().then(res => {
      
    });
  }

  scanWifiList(value = brsStore.usePlace) {
    if (brsStore.scanWifiIntervalId === false) {
      brsStore.scanWifiIntervalId = true;
      
      if (value === 'T2') {
        brsStore.useWsHostIp = brsStore.t2WsHostIp;
        brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
        
        
        wifi.findAndConnect(brsStore.t2WifiSsid, brsStore.t2WifiP, found => {
          if (found) {
            wifi.getSSID(ssid => {
              if (ssid === brsStore.t2WifiSsid) {
                
                if (brsStore.scanWifiIntervalId === true) {
                  brsStore.scanWifiIntervalId = false;
                }
              }
            });
          } else {
            if (brsStore.scanWifiIntervalId === true) {
              
              brsStore.scanWifiIntervalId = false;
              brsStore.wifiOff = true;
              brsStore.connectionFailed = true;
              setTimeout(() => {
                brsStore.scanWifiIntervalId = false;
                this.scanWifiList(value);
              }, 1000);
            }
          }
        });
      } else if (value === 'T1') {
        brsStore.useWsHostIp = brsStore.t1WsHostIp;
        brsStore.useWsAddress = `${brsStore.useWsHostIp}/Service1.asmx`;
        
        
        wifi.findAndConnect(brsStore.t1WifiSsid, brsStore.t1WifiP, found => {
          if (found) {
            wifi.getSSID(ssid => {
              if (ssid === brsStore.t1WifiSsid) {
                
                if (brsStore.scanWifiIntervalId === true) {
                  brsStore.scanWifiIntervalId = false;
                }
              }
            });
          } else {
            if (brsStore.scanWifiIntervalId === true) {
              
              brsStore.scanWifiIntervalId = false;
              brsStore.wifiOff = true;
              brsStore.connectionFailed = true;
              setTimeout(() => {
                brsStore.scanWifiIntervalId = false;
                this.scanWifiList(value);
              }, 1000);
            }
          }
        });
      }
      brsStore.scanWifiIntervalId = false;
    }
  }
}
export const loginModel = new LoginModel();
