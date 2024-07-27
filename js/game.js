'use strict';

(() => {
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const game = () => {
    const result = {
      player: 0,
      computer: 0,
    };

    const getResultMessage = () => alert(`Общий счёт\n` +
      `Вы : ${result.player}\nКомпьютер : ${result.computer}`);

    const getResultUserChoice = (userEnter) => FIGURES_RUS.find(item =>
      item.startsWith(userEnter.toLowerCase().trim()));


    return function start() {
      const userEnter = prompt(`${FIGURES_RUS} ?`, '');

      if (userEnter === null) {
        if (confirm('Вы точно хотите выйти ?')) {
          return getResultMessage();
        } else {
          start();
        }
      }

      if (userEnter.trim() === '' || !getResultUserChoice(userEnter)) {
        return start();
      }

      const computerChoice = FIGURES_RUS[getRandomIntInclusive(0,
          FIGURES_RUS.length - 1)];
      console.log('computerChoice: ', computerChoice);
      const userChoice = getResultUserChoice(userEnter);
      const userIndex = FIGURES_RUS.indexOf(userChoice);
      const computerIndex = FIGURES_RUS.indexOf(computerChoice);

      switch (true) {
        case userChoice === computerChoice:
          alert('Вы: ' +
            ` ${userChoice}\nКомпьютер: ${computerChoice}\nНичья`);
          break;
        case (userIndex + 1) % FIGURES_RUS.length === computerIndex:
          alert('Вы: ' +
            ` ${userChoice}\nКомпьютер: ${computerChoice}\nВы выиграли!`);
          ++result.player;
          break;
        default:
          alert('Вы: ' +
            ` ${userChoice}\nКомпьютер: ${computerChoice}\nВы проиграли`);
          ++result.computer;
      }

      if (confirm('Играем еще?')) {
        return start();
      } else {
        return getResultMessage();
      }
    };
  };

  window.RPS = game;
})();


