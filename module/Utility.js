class Utility {
  debounce = (func, delay) => {
    let timer = null;
    return function() {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  };
}
export const utility = new Utility();
