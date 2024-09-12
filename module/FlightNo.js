class FlightNo {
  checkFlightNo = flightNo => {
    if (flightNo.length === 0) {
      return '請輸入航班號碼';
    } else if (!/^[A-Z][A-Z][0-9][0-9][0-9][0-9]$/.test(flightNo)) {
      return '航班號碼格式錯誤!!';
    }
    return true;
  };
}
export const flightNo = new FlightNo();
