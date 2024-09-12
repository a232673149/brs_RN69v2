class CheckPrintBagBarcode {
  checkPrintBagBarcode = function(printerMac, flightNo, destination, barcode) {
    if (printerMac.length === 0) {
      return '請選擇印表機';
    } else if (
      !/^[A-Z][A-Z][0-9][0-9][0-9][0-9]$/.test(flightNo) &&
      flightNo.length !== 0
    ) {
      return '航班號碼格式錯誤!!';
    } else if (!/^[0-9]{10}$/.test(barcode) && barcode.length !== 0) {
      return '行李條碼格式錯誤!!';
    } else if (
      !/^[A-Z][A-Z][A-Z]$/.test(destination) &&
      destination.length !== 0
    ) {
      return '目的地格式錯誤!!';
    } else if (
      flightNo.length === 0 &&
      barcode.length === 0 &&
      destination.length === 0
    ) {
      return '請至少輸入一組資訊';
    } else {
      return true;
    }
  };
}
export const checkPrintBagBarcode = new CheckPrintBagBarcode();
