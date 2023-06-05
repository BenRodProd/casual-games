import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";


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
`

const Popup = styled.div `
display: flex;
flex-direction: column;
position: absolute;
height: 60%;
width: 60%;
background-color: rgba(0, 0, 0, 0.9);
border: 3px solid white;
align-items: center;
justify-content: center;
padding: 2rem;
`
const ElementBox = styled.div`

border: 3px solid white;

`

const Elements = styled.div`
display: flex;
position:relative;
justify-content: center;
align-items: center;
flex-direction: row;
gap: 15px;
`
const Header = styled.h2`
margin-top:3rem;
  color: white;
  text-align: center;
`

export default function StoneRockScissors({setGamePoints}) {
  const [difficulty, setDifficulty] = useState("easy");
  const gameElements = ["Rock", "Paper", "Scissors"];
  const [computerChoice, setComputerChoice] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [round, setRound] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
const [gameMessage, setGameMessage] = useState("");



useEffect(() => {
    if (round >= 3) {
        if (playerWins > computerWins) {
          setTimeout(() => {
            setPopupMessage("YOU HAVE WON!!!!")
            setPopup(true);
            setGamePoints((prev) => prev + 10);
          },500)
        

        
    }   else if (computerWins > playerWins) {
      setTimeout(() => {
        
        setPopupMessage("YOU LOST!!!!")
        setPopup(true);
        setGamePoints((prev) => prev - 10);
      },500)
    }
        
    }
}, [round])



  function determineWinner (playersChoice, computersChoice) {
    console.log(playersChoice, computersChoice)
    if ((playersChoice === "Rock" && computersChoice === "Scissors") || (playersChoice === "Scissors" && computersChoice === "Rock")) {
      setGameMessage("Rock crashes Scissors");
    }
    if ((playersChoice === "Rock" && computersChoice === "Paper") || (playersChoice === "Paper" && computersChoice === "Rock")) {
      setGameMessage("Paper holds Rock");
    }
    if ((playersChoice === "Scissors" && computersChoice === "Paper") || (playersChoice === "Paper" && computersChoice === "Scissors")) {
      setGameMessage("Scissors cut Paper");
    }
    
    if (
      (playersChoice === "Rock" && computersChoice === "Scissors") ||
      (playersChoice === "Scissors" && computersChoice === "Paper") ||
      (playersChoice === "Paper" && computersChoice === "Rock")
    ) {
      setPlayerWins(playerWins + 1);
      setRound(round + 1);
      return "Player wins!";
    } else if (playersChoice === computersChoice) {
      setGameMessage("Tie!")
      return "It's a tie!";
      
    } else {
      setComputerWins(computerWins + 1);
      setRound(round + 1);
      return "Computer wins!";
    }
  };

  function resetGame() {
    setPopupMessage("")
    setRound(0)
    setComputerWins(0)
    setPlayerWins(0)
    setPopup(false)
    setComputerChoice("")
    setGameMessage("")
  }

  const handleChoice = (choice) => {
    const NewChoice =gameElements[Math.floor(Math.random() * gameElements.length)]
    setComputerChoice(NewChoice);
    setPlayerChoice(choice);
    determineWinner(choice, NewChoice);
   
    console.log(choice, computerChoice)
    // You can update the game state or perform other actions based on the result
  };

  return (
    <>
      <Main>
      <Menu>
        <button
          className={difficulty === "easy" ? "active" : ""}
         
          type="button"
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
          className={difficulty === "medium" ? "active" : ""}
         
          type="button"
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>
        <button
          className={difficulty === "hard" ? "active" : ""}
         
          type="button"
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </Menu>
      <Header>Points Computer: {computerWins}</Header>
      
      {computerChoice !== "" &&
      <ElementBox>
      <Image src = {`/assets/${computerChoice}.png`} alt={computerChoice} height="100" width="100" key={computerChoice} />
      </ElementBox>}
      {gameMessage !== "" && <Header >{gameMessage}</Header>}
        <Elements>
        {gameElements.map((element) => (
            <ElementBox key = {element}>
          <Image src = {`/assets/${element}.png`} alt={element} height="100" width="100" key={element} onClick={() => handleChoice(element)}>
         
          </Image>
          </ElementBox>
        ))}
        </Elements>
     
      <Header>Your Points: {playerWins}</Header>
      {popup && <Popup>
        <div>{popupMessage}</div>
        <button onClick = {()=> resetGame()} type ="button">TRY AGAIN</button>
        </Popup>}
      </Main>
    </>
  );
}
