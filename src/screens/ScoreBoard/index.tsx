import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {
  TARGET_SCORE,
  TOTAL_BALLS_REMAINING,
  WICKETS_REMAINING,
  playerLineUp,
  players,
} from '../../utils/Constants';
import RandomizerModule from '../../bridge';
import Button from '../../components/Button';
import MatchResults from '../../components/MatchResults';
import {
  increaseTotalBallsBowled,
  increaseWicketsFallen,
  interchangeBatsmen,
  setCurrentRuns,
  setStriker,
  setStrikerRuns,
  setTotalScore,
} from '../../redux/reducers/scoreboardReducer';
import {RootState, useAppDispatch, useAppSelector} from '../../redux/store';
import {styles} from './styles';

const ScoreBoard: FC = () => {
  const {
    currentRuns,
    nonStriker,
    nonStrikerRuns,
    striker,
    strikerRuns,
    totalBallsBowled,
    totalScore,
    wicketsFallen,
  } = useAppSelector((state: RootState) => state.scoreboard);
  const dispatch = useAppDispatch();

  //parse balls and overs for scoreboard
  const overs = parseInt(`${totalBallsBowled / 6}`);
  const balls = totalBallsBowled % 6;

  /**
   * Gets the score for the current bowled ball from the native code based on the
   * probability matrix of the current striker
   */
  const getCurrentScore = async () => {
    const result = await RandomizerModule.randomize(players[striker]);

    //update scoreboard
    if (result === 'out') {
      //Show out instead of runs
      dispatch(setCurrentRuns(result.toLocaleUpperCase()));
      //update number of wickets fallen
      dispatch(increaseWicketsFallen());
      //if all wickets fell, match is over, return
      if (wicketsFallen === WICKETS_REMAINING) return;
      //else set next player to be the striker and update his current run to 0
      dispatch(setStriker(playerLineUp[wicketsFallen + 2]));
      dispatch(setStrikerRuns(0));
    } else {
      //update runs for current ball
      const score = result === 'dotBall' ? 0 : parseInt(`${result}`);
      dispatch(setCurrentRuns(`${score}`));
      //update total runs for current striker
      dispatch(setStrikerRuns(score + strikerRuns));
      //update total runs for the match
      dispatch(setTotalScore(score + totalScore));
      //based on runs scored in the ball, change the striker
      if (score % 2 !== 0) {
        dispatch(interchangeBatsmen());
      }
    }
  };

  const onBowl = () => {
    //check if any balls are remaining
    if (totalBallsBowled < TOTAL_BALLS_REMAINING) {
      //if so, increase the number of balls bowled
      dispatch(increaseTotalBallsBowled());
      //and get the striker's score from the bridge, based on weighted probability
      getCurrentScore();
    }
  };

  const displayPitchOrResults = () => {
    //match is over, display results
    if (
      totalBallsBowled === TOTAL_BALLS_REMAINING ||
      totalScore >= TARGET_SCORE ||
      wicketsFallen === WICKETS_REMAINING
    ) {
      return (
        <MatchResults
          hasWon={totalScore >= TARGET_SCORE}
          winByBalls={TOTAL_BALLS_REMAINING - totalBallsBowled}
          loseByRuns={TARGET_SCORE - totalScore}
          winByWickets={WICKETS_REMAINING - wicketsFallen}
        />
      );
    }
    //match is still running, display pitch
    return (
      <>
        <View style={styles.pitch}>
          <Text style={styles.text}>
            {striker} ({strikerRuns})*
          </Text>
          <Text style={styles.text}>
            {nonStriker} ({nonStrikerRuns})
          </Text>
        </View>
        <Button onPress={() => onBowl()} title="Bowl" />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreboard}>
        <View>
          <Text style={styles.text}>
            Score: {totalScore} - {wicketsFallen}
          </Text>
          <Text style={styles.text}>
            Overs: {overs}.{balls}
          </Text>
        </View>
        <View>
          <Text style={[styles.text, styles.currentRuns]}>{currentRuns}</Text>
          {currentRuns.toLowerCase() !== 'out' ? (
            <Text style={[styles.text, styles.runLabel]}>Runs</Text>
          ) : null}
        </View>
      </View>
      {displayPitchOrResults()}
    </View>
  );
};

export default ScoreBoard;
