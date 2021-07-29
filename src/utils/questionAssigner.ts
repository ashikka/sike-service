import { PlayerDocSchema } from './interfaces';
import questionGenerator from './questionGenerator';
import shuffle from './shuffleQuestions';

export default function questionAssigner(players: PlayerDocSchema[]) {
  const name = '';
  const questions = [
    `Who is ${name} most likely to sleep with?`,
    `You find a brown paper bag with DO NOT OPEN in the ${name}'s refrigerator what is inside?`,
    `What would ${name}'s signature fragrance be?`,
  ];
  shuffle(questions);
  let i = players.length;
  const modifiedQuestions = [''];
  players.forEach((player) => {
    if (i >= 0) {
      const newQuestion = questionGenerator(player.username, questions[i]);
      i -= 1;
      modifiedQuestions.push(newQuestion);
    }
  });
  return modifiedQuestions;
}
