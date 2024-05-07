Require cycle: model\CabinDestListItemsModel.js -> model\CartListItemsModel.js -> model\CabinDestListItemsModel.js
Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
cartListItemsModel與cabinDestListItemsModel，兩個檔案間有循環引用，警告指出了一個“要求循環”，意味著在模組之間存在相互依賴，這可能導致程式碼執行時的一些問題。這個部分可能需要去解決。
目前cartListItemsModel與cabinDestListItemsModel之間，是先關掉CartListItemsModel　33~36行程式的事件，需要釐清該事件內容，以及關掉CabinDestListItemsModel的套件引入，以「暫時」解決警告問題。
=====================================================================================================
Require cycle: model\Data_SelectFlightModel.js -> module\OperationModule.js -> model\Data_SelectFlightModel.js
Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
Data_SelectFlightModel與OperationModule，兩個檔案間有循環引用，警告指出了一個“要求循環”，意味著在模組之間存在相互依賴，這可能導致程式碼執行時的一些問題。這個部分可能需要去解決。
目前Data_SelectFlightModel與OperationModule之間，是先關掉Data_SelectFlightModel 417~422行程式的事件按鈕，需要釐清該事件內容，以及關掉OperationModule的套件引入，以「暫時」解決警告問題。
=====================================================================================================
目前import Sound from 'react-native-sound'的音訊部分查到的狀況是套件本身去向native請求


