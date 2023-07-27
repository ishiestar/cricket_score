import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {playerLineUp, Players} from '../../utils/Constants';

interface IScoreBoard {
  currentRuns: string;
  totalScore: number;
  totalBallsBowled: number;
  strikerRuns: number;
  nonStrikerRuns: number;
  striker: Players;
  nonStriker: Players;
  wicketsFallen: number;
}

const initialState: IScoreBoard = {
  currentRuns: '0',
  totalScore: 0,
  totalBallsBowled: 0,
  strikerRuns: 0,
  nonStrikerRuns: 0,
  striker: playerLineUp[0],
  nonStriker: playerLineUp[1],
  wicketsFallen: 0,
};

const scoreboardSlice = createSlice({
  name: 'scoreboard',
  initialState,
  reducers: {
    setCurrentRuns: (state, action: PayloadAction<string>) => {
      state.currentRuns = action.payload;
    },
    setTotalScore: (state, action: PayloadAction<number>) => {
      state.totalScore = action.payload;
    },
    increaseTotalBallsBowled: state => {
      state.totalBallsBowled = state.totalBallsBowled + 1;
    },
    increaseWicketsFallen: state => {
      state.wicketsFallen = state.wicketsFallen + 1;
    },
    interchangeBatsmen: state => {
      const nonStriker = state.striker;
      const nonStrikerRuns = state.strikerRuns;
      state.striker = state.nonStriker;
      state.nonStriker = nonStriker;
      state.strikerRuns = state.nonStrikerRuns;
      state.nonStrikerRuns = nonStrikerRuns;
    },
    setStrikerRuns: (state, action: PayloadAction<number>) => {
      state.strikerRuns = action.payload;
    },
    setNonStrikerRuns: (state, action: PayloadAction<number>) => {
      state.nonStrikerRuns = action.payload;
    },
    setStriker: (state, action: PayloadAction<Players>) => {
      state.striker = action.payload;
    },
    setNonStriker: (state, action: PayloadAction<Players>) => {
      state.nonStriker = action.payload;
    },
    resetScoreboard: () => initialState,
  },
});

export const {
  increaseTotalBallsBowled,
  increaseWicketsFallen,
  interchangeBatsmen,
  resetScoreboard,
  setCurrentRuns,
  setNonStriker,
  setNonStrikerRuns,
  setStriker,
  setStrikerRuns,
  setTotalScore,
} = scoreboardSlice.actions;

export default scoreboardSlice.reducer;
