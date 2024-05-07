class BsmItems {
  BAG_TAG = ' ';
  BSM_FLIGHT = ' ';
  BSM_DATE = ' ';
  DESTINATION = ' ';
  CABIN_CLASS = ' ';
  NEXT_FLIGHT = ' ';
  AUTH_LOAD = ' ';
  AUTH_TRANSPORT = ' ';
  BSM_STATE = ' ';
  BAG_FLIGHT = ' ';
  BAG_DATE = ' ';
  CART_ID = ' ';
  BAG_STATE = ' ';
  OP_Attribute = ' ';
  title = ' ';
  FLIGHT_NO = ' ';
  FLIGHT_DATE = ' ';
  CREATION_TIME = ' ';
  bagScanResulNum = 0;
  bagScanResultColor = 'Green';
  bagScanResultMsg = ' ';
}
class BSMMFiveItems {
  FLIGHT_NO = ' ';
  FLIGHT_DATE = ' ';
  BSMMFive = ' ';
  CREATION_TIME = ' ';
}
class BsmStore {
  
  BsmListItems = [];
  addBagListItem = [];
  errorBagListItem = [];
  normalBagListItem = [];
  BSMMFiveListItems = [];
}

export const bsmStore = new BsmStore();

