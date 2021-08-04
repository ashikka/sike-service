import { PlayerDocSchema } from './interfaces';
import shuffle from './shuffleQuestions';

export default function questionAssigner(players: PlayerDocSchema[]) {
  const questions = [
    (name: string) => `Who is ${name} most likely to sleep with?`,
    (name: string) => `You find a brown paper bag with DO NOT OPEN in the ${name}'s`
    + ' refrigerator what is inside?',
    (name: string) => `What would ${name}'s signature fragrance be?`,
    (name: string) => `${name}'s dream occupation is?`,
    (name: string) => `The reason ${name}'s boss fired them is?`,
    (name: string) => `What is ${name}'s reaction when they realize their flight has landed`,
    (name: string) => `${name}'s favorite thing to do is?`,
    (name: string) => `What will ${name} tip the pizza delivery boy?`,
    (name: string) => `What is ${name}'s spirit animal?`,
  ];
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
