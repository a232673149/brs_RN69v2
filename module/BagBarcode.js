class BagBarcode {
  bagBarcodeLength = 10;
  checkBagBarcode = bagBarcode => {
    if (bagBarcode.length === 0) {
      return '請輸入行李條碼';
    } else if (!/^[0-9]*[1-9][0-9]*$/.test(bagBarcode)) {
      return '行李條碼格式錯誤!!';
    } else if (bagBarcode.length === this.bagBarcodeLength) {
      return true;
    } else {
      return '行李條碼格式錯誤!!';
    }
  };

  checkBagBarcodeForSearch = bagBarcode => {
    if (bagBarcode.length === 0) {
      return '請輸入行李號碼';
    } else if (!/^[0-9]*[1-9][0-9]*$/.test(bagBarcode)) {
      return '行李號碼格式錯誤!!';
    } else if (bagBarcode.length <= this.bagBarcodeLength) {
      return true;
    } else {
      return '行李號碼格式錯誤!!';
    }
  };
}
export const bagBarcode = new BagBarcode();
