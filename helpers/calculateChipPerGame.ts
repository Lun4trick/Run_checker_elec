import { HandType } from '@/types/handType';

export function calculateChipPerGame(games: HandType[]) {
  let chips = 0;
  games.forEach(game => {
    chips += game.chipsWon;
  });

  return {
    chipsWon: chips,
    gamesPlayed: games.length,
    chipPerGame: chips / games.length
  };
}