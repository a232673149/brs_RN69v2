import React from 'react';
import {observable} from 'mobx';


class FidsItems {
  title = ' ';
  FLIGHT_NO = ' ';
  STD = ' ';
  ETD = ' ';
  DESTINATION = ' ';
  FLIGHT_DATE = ' ';
  CREATION_TIME = ' ';
}
class FIDSMFiveItems {
  FLIGHT_DATE = ' ';
  FIDSMFive = ' ';
  CREATION_TIME = ' ';
}


class CartItems {
  title = ' ';
  FLIGHT_NO = ' ';
  FLIGHT_DATE = ' ';
  DESTINATION = ' ';
  CART_ID = ' ';
  CABIN_CLASS = ' ';
  NEXT_FLIGHT = ' ';
  BT_FLAG = ' ';
  CREATION_TIME = ' ';
}
class CARTMFiveItems {
  FLIGHT_NO = ' ';
  FLIGHT_DATE = ' ';
  CARTMFive = ' ';
  CREATION_TIME = ' ';
}

class CartPatternItems {
  FLIGHT_NO = ' ';
  CABIN_CLASS = ' ';
  DESTINATION = ' ';
  NEXT_FLIGHT = ' ';
  BT_FLAG = ' ';
  CREATION_TIME = ' ';
}

class CabinDestByUserItems {
  FLIGHT_NO = ' ';
  FLIGHT_DATE = ' ';
  DESTINATION = ' ';
  CABIN_CLASS = ' ';
  NEXT_FLIGHT = ' ';
  CREATION_TIME = ' ';
}
class CartPrefixCodeItems {
  label = ' ';
  value = ' ';
  LU_ID = ' ';
}

class OperationStore {
  
  @observable selectflighItem = '';
  @observable selectedDate = '';
  scanread = '';
  rescanread = '';
  errorsound = '';
  keyboardButtonSound = '';

  FIDSListItems = [];
  FIDSMFiveListItems = [];
  
  CARTListItems = [];
  CARTMFiveListItems = [];
  
  CARTPatternListItems = [];
  
  CABINDestByUserListItems = [];
  CARTPrefixCodeListItems = [];
}


export const operationStore = new OperationStore();

