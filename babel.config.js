// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo']
//   };
// };
//有問題再用上面的部分
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ]
};

