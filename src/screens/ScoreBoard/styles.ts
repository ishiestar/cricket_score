import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 50,
    paddingHorizontal: 30,
    height: '100%',
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {color: Colors.black, fontSize: 14},
  button: {
    borderColor: Colors.black,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  pitch: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 30,
    marginHorizontal: 50,
  },
  currentRuns: {fontSize: 70},
  runLabel: {fontSize: 20, alignSelf: 'flex-end'},
});
