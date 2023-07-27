import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {resetScoreboard} from '../../redux/reducers/scoreboardReducer';
import {useAppDispatch} from '../../redux/store';
import Button from '../Button';
import {styles} from './styles';

interface IResultProps {
  hasWon?: boolean;
  winByWickets?: number;
  winByBalls?: number;
  loseByRuns?: number;
}

const MatchResults: FC<IResultProps> = ({
  hasWon,
  winByWickets,
  winByBalls,
  loseByRuns,
}) => {
  const dispatch = useAppDispatch();

  //compute results message
  let matchResultText = 'won the match with';
  if (hasWon) {
    matchResultText = matchResultText.concat(` ${winByWickets} wickets`);
    if (winByBalls) {
      matchResultText = matchResultText.concat(` and ${winByBalls} balls`);
    }
  } else {
    matchResultText = `lost the match by ${loseByRuns} runs`;
  }

  //display results and button to play again
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Bengaluru {matchResultText}</Text>
      <Button title="Play again" onPress={() => dispatch(resetScoreboard())} />
    </View>
  );
};

export default MatchResults;
