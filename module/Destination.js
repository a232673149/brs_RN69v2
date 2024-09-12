class Destination {
  checkDestination = destination => {
    if (destination.length === 0) {
      return '請輸入目的地';
    } else if (!/^[A-Z][A-Z][A-Z]$/.test(destination)) {
      return '目的地格式錯誤!!';
    }
    return true;
  };
}
export const destination = new Destination();
