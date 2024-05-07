import {logger,rnFsFileAsync} from 'react-native-logs';
// import {rnFsFileAsync} from 'react-native-logs/dist/transports/rnFsFileAsync';

const config = {
  transport: rnFsFileAsync,
  transportOptions: {
    hideDate: false,
    dateFormat: 'local',
    hideLevel: false,
    loggerName: 'brsLogsFile',
    loggerPath: '/sdcard/Download/log',
  },
};

const log = logger.createLogger(config);

export default log;
