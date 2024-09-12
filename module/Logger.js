import {logger} from 'react-native-logs';
import {rnFsFileAsync} from 'react-native-logs/dist/transports/rnFsFileAsync';

const config = {
  transport: rnFsFileAsync,
  transportOptions: {
    hideDate: false,
    dateFormat: 'local',
    hideLevel: false,
    loggerName: 'brsLogsFile',
    loggerPath: '/data/data/com.brsrn69v2/files',
  },
};

const log = logger.createLogger(config);

export default log;
