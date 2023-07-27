import {NativeModules} from 'react-native';
import {PlayerProbabilities} from '../utils/Constants';

const {RandomizerModule} = NativeModules;

interface IRandomizerModule {
  randomize(
    playerProbabilities: PlayerProbabilities,
  ): Promise<keyof PlayerProbabilities>;
}

export default RandomizerModule as IRandomizerModule;
