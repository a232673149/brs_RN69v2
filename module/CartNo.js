class CartNo {
  cartNoMaxLength = 15;
  checkCartNo = cartNo => {
    

    if (cartNo.length === 0) {
      return '請輸入行李櫃號';
    } else if (cartNo.length <= 3) {
      return '行李櫃號格式錯誤';
    } else if (!/^[A-Z]{2,}/.test(cartNo)) {
      return '請輸入正確行李櫃號格式!';
    } else if (cartNo.length > this.cartNoMaxLength) {
      return '行李櫃號格式錯誤!!';
      
      
      
    }
    return true;
  };
}
export const cartNo = new CartNo();
