import { PlayerDocSchema } from './interfaces';
import shuffle from './shuffleQuestions';
import questions from './questions';

export default function questionAssigner(players: PlayerDocSchema[]) {
  shuffle(questions);

  let i = players.length - 1;
  const modifiedQuestions: string[] = [];
  players.forEach((player) => {
    if (i >= 0) {
      const name = player.username;
      const newQuestion = questions[i](name);
      i -= 1;
      modifiedQuestions.push(newQuestion);
    }
  });
  return modifiedQuestions;
}
