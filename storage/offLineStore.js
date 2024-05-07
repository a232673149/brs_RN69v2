
import AsyncStorage from '@react-native-async-storage/async-storage';//@react-native-community/async-storage
import {observable} from 'mobx';
import {create, persist} from 'mobx-persist';
import CryptoJS from 'react-native-crypto-js';
import React from 'react';



class OffLineKeepStoreItems {
  @persist @observable API = '';
  @persist @observable headers = '';
  @persist @observable body = '';
  @persist @observable method = '';
  @persist @observable CREATION_TIME = '';
}

class OffLineStore {
  
  
  @persist('list', OffLineKeepStoreItems)
  @observable
  offLineKeepStoreListItems = [];
  @persist @observable offLineKeepStoreCount = 0; 
  @persist @observable offLineKeepStoreLastDateTime; 
}
const options = {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.AnsiX923};
const secretKey = 'OffLine Store Secret key';
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

export const offLineStore = new OffLineStore();
offLineStore.init = new Promise(async resolve => {
  await hydrate('offLineStore', offLineStore);
  console.log('offLineStore has been hydrated');
  resolve();
});
