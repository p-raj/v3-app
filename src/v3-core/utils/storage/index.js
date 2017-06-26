import { Platform } from 'react-native';
import AsyncStore from './AsyncStore';

/*
 * Requiring module doesn't work on Native Platforms :/
 * */
let Storage = (Platform.OS === 'web') ? require(`./IdbStore`).default : AsyncStore;
export default Storage;
