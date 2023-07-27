export const TARGET_SCORE = 40;
export const WICKETS_REMAINING = 3;
export const TOTAL_BALLS_REMAINING = 4 * 6; //4 overs remaining

export type Players = 'Kirat Bolhi' | 'NS Nodhi' | 'R Rumrah' | 'Shashi Henra';

export interface PlayerProbabilities {
  out: number;
  dotBall: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

//order of players in the lineup
export const playerLineUp: Players[] = [
  'Kirat Bolhi',
  'NS Nodhi',
  'R Rumrah',
  'Shashi Henra',
];

//probability matrix of all the players
export const players: {[name in Players]: PlayerProbabilities} = {
  'Kirat Bolhi': {out: 5, dotBall: 5, 1: 30, 2: 25, 3: 10, 4: 15, 5: 1, 6: 9},
  'NS Nodhi': {out: 10, dotBall: 10, 1: 40, 2: 20, 3: 5, 4: 10, 5: 1, 6: 4},
  'R Rumrah': {out: 20, dotBall: 20, 1: 30, 2: 15, 3: 5, 4: 5, 5: 1, 6: 4},
  'Shashi Henra': {
    out: 30,
    dotBall: 30,
    1: 25,
    2: 5,
    3: 0,
    4: 5,
    5: 1,
    6: 4,
  },
};
