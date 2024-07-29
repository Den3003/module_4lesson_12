'use strict';

(() => {
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const settingsLanguage = {
    ru: {
      player: 'Вы :',
      computer: 'Компьютер :',
      win: 'Вы выиграли!',
      lose: 'Вы проиграли',
      draw: 'Ничья',
      score: 'Общий счёт',
      playAgain: 'Играем ещё?',
      quit: 'Вы точно хотите выйти ?',
    },
    en: {
      player: 'You :',
      computer: 'Computer :',
      win: 'You win!',
      lose: 'You lost',
      draw: 'Draw',
      score: 'Total score',
      playAgain: 'Are we still playing?',
      quit: 'Are you sure you want to get out?',
    },
  };

  const game = (language) => {
    const result = {
      player: 0,
      computer: 0,
    };

    const languageGame = language === 'EN' || language === 'ENG' ? 'en' : 'ru';
    const figures = languageGame === 'en' ? FIGURES_ENG : FIGURES_RUS;
    const settingsMessage = settingsLanguage[languageGame];

    const getResultMessage = () => alert(`${settingsMessage.score}\n` +
      `${settingsMessage.player} ${result.player}\n` +
      `${settingsMessage.computer} ${result.computer}`);

    const getResultUserChoice = (userEnter) => figures.find(item =>
      item.startsWith(userEnter.toLowerCase().trim()));


    return function start() {
      const userEnter = prompt(`${figures} ?`, '');

      if (userEnter === null) {
        if (confirm(`${settingsMessage.quit}`)) {
          return getResultMessage();
        } else {
          start();
        }
      }

      if (userEnter.trim() === '' || !getResultUserChoice(userEnter)) {
        return start();
      }

      const computerChoice = figures[getRandomIntInclusive(0,
          figures.length - 1)];
      console.log('computerChoice: ', computerChoice);
      const userChoice = getResultUserChoice(userEnter);
      const userIndex = figures.indexOf(userChoice);
      const computerIndex = figures.indexOf(computerChoice);

      switch (true) {
        case userChoice === computerChoice:
          alert(`${settingsMessage.player} ${userChoice}\n` +
            `${settingsMessage.computer} ${computerChoice}\n` +
            `${settingsMessage.draw}`);
          break;

        case (userIndex + 1) % figures.length === computerIndex:
          alert(`${settingsMessage.player} ${userChoice}\n` +
            `${settingsMessage.computer} ${computerChoice}\n` +
            `${settingsMessage.win}`);
          ++result.player;
          break;

        default:
          alert(`${settingsMessage.player} ${userChoice}\n` +
            `${settingsMessage.computer} ${computerChoice}\n` +
            `${settingsMessage.lose}`);
          ++result.computer;
      }

      if (confirm(`${settingsMessage.playAgain}`)) {
        return start();
      } else {
        return getResultMessage();
      }
    };
  };

  window.RPS = game;
})();


