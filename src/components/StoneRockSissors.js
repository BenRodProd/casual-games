import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  position: absolute;

  top: 0;
  left: 0;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const PlayerPointsWrapper = styled.div`
  position: relative;
  bottom: 3rem;
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 60%;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.9);
  border: 3px solid white;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 20;
`;
const ElementBox = styled.div`
  padding: 0;

  border: 3px solid white;
`;
const ComputerWrapper = styled.div`
  background-color: transparent;

  height: 100px;
`;
const Elements = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  margin: 20px;
`;
const Header = styled.h2`
  margin-top: 3rem;
  color: white;
  text-align: center;
`;
const OtherHeader = styled.h2`
  margin-top: 0;
  color: white;
  text-align: center;
`;
const GameMessageWrapper = styled.div`
  height: 8rem;
`;
export default function StoneRockScissors({ setGamePoints }) {
  const [difficulty, setDifficulty] = useState('easy');
  const gameElements = ['Rock', 'Paper', 'Scissors', 'Fire', 'Water', 'Well'];
  const [computerChoice, setComputerChoice] = useState('');
  const [playerChoice, setPlayerChoice] = useState('');
  const [round, setRound] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [gameMessage, setGameMessage] = useState('');
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [computerHasWon, setComputerHasWon] = useState(false);

  useEffect(() => {
    if (round >= 3 && difficulty !== 'hard') {
      setButtonDisabled(true);

      if (playerWins > computerWins) {
        setTimeout(() => {
          setComputerHasWon(false);
          setWinnerIndex(-1);
          setPopupMessage('YOU HAVE WON!!!!');
          setPopup(true);
          setGamePoints((prev) => prev + 10);
        }, 1500);
      } else if (computerWins > playerWins) {
        setTimeout(() => {
          setWinnerIndex(-1);
          setComputerHasWon(false);
          setPopupMessage('YOU LOST!!!!');
          setPopup(true);
          setGamePoints((prev) => prev - 10);
        }, 1500);
      }
    } else if (round >= 5 && difficulty === 'hard') {
      setButtonDisabled(true);

      if (playerWins > computerWins) {
        setTimeout(() => {
          setComputerHasWon(false);
          setWinnerIndex(-1);
          setPopupMessage('YOU HAVE WON!!!!');
          setPopup(true);
          setGamePoints((prev) => prev + 10);
        }, 1500);
      } else if (computerWins > playerWins) {
        setTimeout(() => {
          setWinnerIndex(-1);
          setComputerHasWon(false);
          setPopupMessage('YOU LOST!!!!');
          setPopup(true);
          setGamePoints((prev) => prev - 10);
        }, 1500);
      }
    }
  }, [round]);

  function determineWinner(playersChoice, computersChoice) {
    if (
      (playersChoice === 'Rock' && computersChoice === 'Scissors') ||
      (playersChoice === 'Scissors' && computersChoice === 'Rock')
    ) {
      setGameMessage('Rock crashes Scissors');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Rock' && computersChoice === 'Paper') ||
      (playersChoice === 'Paper' && computersChoice === 'Rock')
    ) {
      setGameMessage('Paper covers Rock');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Scissors' && computersChoice === 'Paper') ||
      (playersChoice === 'Paper' && computersChoice === 'Scissors')
    ) {
      setGameMessage('Scissors cut Paper');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Rock' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Rock')
    ) {
      setGameMessage('Rock falls in Well');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Rock' && computersChoice === 'Water') ||
      (playersChoice === 'Water' && computersChoice === 'Rock')
    ) {
      setGameMessage('Rock stands against Water');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Fire' && computersChoice === 'Paper') ||
      (playersChoice === 'Paper' && computersChoice === 'Fire')
    ) {
      setGameMessage('Fire burns Paper');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Water' && computersChoice === 'Paper') ||
      (playersChoice === 'Paper' && computersChoice === 'Water')
    ) {
      setGameMessage('Water dissolves Paper');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Paper' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Paper')
    ) {
      setGameMessage('Paper covers Well');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Fire' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Fire')
    ) {
      setGameMessage('Well extinguishes Fire');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Fire' && computersChoice === 'Water') ||
      (playersChoice === 'Water' && computersChoice === 'Fire')
    ) {
      setGameMessage('Water extinguishes Fire');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Fire' && computersChoice === 'Scissors') ||
      (playersChoice === 'Scissors' && computersChoice === 'Fire')
    ) {
      setGameMessage('Fire melts Scissors');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Scissors' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Scissors')
    ) {
      setGameMessage('Scissors fall into Well');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Water' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Water')
    ) {
      setGameMessage('Water overflows Well');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Water' && computersChoice === 'Scissors') ||
      (playersChoice === 'Scissors' && computersChoice === 'Water')
    ) {
      setGameMessage('Water rusts Scissors');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Rock' && computersChoice === 'Fire') ||
      (playersChoice === 'Fire' && computersChoice === 'Rock')
    ) {
      setGameMessage('Rock survives Fire');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (computersChoice === 'Bomb') {
      setGameMessage('Bomb destroys everything');
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    }
    if (
      (playersChoice === 'Rock' && computersChoice === 'Scissors') ||
      (playersChoice === 'Rock' && computersChoice === 'Water') ||
      (playersChoice === 'Rock' && computersChoice === 'Fire') ||
      (playersChoice === 'Scissors' && computersChoice === 'Paper') ||
      (playersChoice === 'Paper' && computersChoice === 'Rock') ||
      (playersChoice === 'Water' && computersChoice === 'Scissors') ||
      (playersChoice === 'Water' && computersChoice === 'Paper') ||
      (playersChoice === 'Well' && computersChoice === 'Rock') ||
      (playersChoice === 'Water' && computersChoice === 'Well') ||
      (playersChoice === 'Well' && computersChoice === 'Scissors') ||
      (playersChoice === 'Paper' && computersChoice === 'Well') ||
      (playersChoice === 'Fire' && computersChoice === 'Paper') ||
      (playersChoice === 'Fire' && computersChoice === 'Scissors') ||
      (playersChoice === 'Water' && computersChoice === 'Fire') ||
      (playersChoice === 'Well' && computersChoice === 'Fire') ||
      (playersChoice === 'Water' && computersChoice === 'Fire')
    ) {
      setPlayerWins(playerWins + 1);
      setRound(round + 1);
      setWinnerIndex(gameElements.indexOf(playersChoice));
    } else if (playersChoice === computersChoice) {
      setGameMessage('Tie!');
      setWinnerIndex(-1);
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        setGameMessage('');
        setComputerChoice('');
        setWinnerIndex(-1);
      }, 1500);
    } else {
      setComputerWins(computerWins + 1);
      setRound(round + 1);
      setWinnerIndex(-1);
      setComputerHasWon(true);
      setTimeout(() => {
        setComputerHasWon(false);
      }, 1500);
    }
  }

  function resetGame() {
    setPopupMessage('');
    setRound(0);
    setComputerWins(0);
    setPlayerWins(0);
    setPopup(false);
    setComputerChoice('');
    setGameMessage('');
    setButtonDisabled(false);
  }

  const handleChoice = (choice) => {
    if (!buttonDisabled) {
      let computerOptions = [];
      if (difficulty === 'easy') {
        computerOptions = ['Rock', 'Paper', 'Scissors'];
      } else if (difficulty === 'medium') {
        computerOptions = [...gameElements];
      } else if (difficulty === 'hard') {
        computerOptions = [...gameElements, 'Bomb'];
      }

      const randomIndex = Math.floor(Math.random() * computerOptions.length);
      const computerChoice = computerOptions[randomIndex];

      setComputerChoice(computerChoice);
      setPlayerChoice(choice);
      determineWinner(choice, computerChoice);
    }
  };

  return (
    <>
      <Main>
        <Menu>
          <button
            className={difficulty === 'easy' ? 'active' : ''}
            type="button"
            onClick={() => setDifficulty('easy')}>
            Easy
          </button>
          <button
            className={difficulty === 'medium' ? 'active' : ''}
            type="button"
            onClick={() => setDifficulty('medium')}>
            Medium
          </button>
          <button
            className={difficulty === 'hard' ? 'active' : ''}
            type="button"
            onClick={() => setDifficulty('hard')}>
            Hard
          </button>
        </Menu>
        <OtherHeader>Points Computer: {computerWins}</OtherHeader>
        <ComputerWrapper>
          {computerChoice !== '' && (
            <ElementBox className={computerHasWon ? 'winner' : 'roshambo'}>
              <Image
                src={`/assets/${computerChoice}.png`}
                alt={computerChoice}
                height="100"
                width="100"
                key={computerChoice}
                className="roshamboElement"
              />
            </ElementBox>
          )}
        </ComputerWrapper>
        <GameMessageWrapper>
          <Header>{gameMessage}</Header>
        </GameMessageWrapper>
        <Elements>
          {difficulty === 'easy' &&
            gameElements
              .filter((element) =>
                difficulty === 'easy' ? ['Rock', 'Paper', 'Scissors'].includes(element) : true
              )
              .map((element, index) => (
                <ElementBox key={element} className={index === winnerIndex ? 'winner' : 'roshambo'}>
                  <Image
                    className="roshamboElement"
                    src={`/assets/${element}.png`}
                    alt={element}
                    height="80"
                    width="80"
                    key={element}
                    onClick={() => handleChoice(element)}
                  />
                </ElementBox>
              ))}
          {difficulty !== 'easy' &&
            gameElements.map((element, index) => (
              <ElementBox key={element} className={index === winnerIndex ? 'winner' : 'roshambo'}>
                <Image
                  className="roshamboElement"
                  src={`/assets/${element}.png`}
                  alt={element}
                  height="60"
                  width="60"
                  key={element}
                  onClick={() => handleChoice(element)}
                />
              </ElementBox>
            ))}
        </Elements>
        <PlayerPointsWrapper>
          <Header>Your Points: {playerWins}</Header>
        </PlayerPointsWrapper>
        {popup && (
          <Popup>
            <Header>{popupMessage}</Header>
            <Header>Computer : {computerWins}</Header>
            <Header>You : {playerWins}</Header>
            <button onClick={() => resetGame()} type="button">
              TRY AGAIN
            </button>
          </Popup>
        )}
      </Main>
    </>
  );
}
