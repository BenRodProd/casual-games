"use client"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
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

const Header = styled.h2`
margin-top:3rem;
  color: white;
  text-align: center;
`



export default function TicTacToe({setGamePoints}) {
  const [difficulty, setDifficulty] = useState("easy")
  const [cards, setCards] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState("")


  useEffect(() => {
    if (!playerTurn) {
      // Call the computer's move logic here
      makeComputerMove()
    }
  }, [playerTurn])
useEffect(() => {
    if (winner === "Player") {
        setGamePoints((prevGamePoints) => prevGamePoints + 10)
      
        
    } else if (winner === "Computer") {
        setGamePoints((prevGamePoints) => prevGamePoints - 10)
      
        
    } else if (winner === "Tie") {
        setGamePoints((prevGamePoints) => prevGamePoints + 1)
        
        
    }
}, [winner, setGamePoints])
  const handleCardClick = index => {
    if (!cards[index] && playerTurn && !gameOver) {
      const newCards = [...cards]
      newCards[index] = "X"
      setCards(newCards)
      setPlayerTurn(false)

      // Check for a winner or tie
      checkGameStatus(newCards)
    }
  }

  const makeComputerMove = () => {
    const availableIndexes = cards
      .map((card, index) => (card === null ? index : null))
      .filter(index => index !== null);
  
    let computerIndex;
  
    if (difficulty === 'easy') {
      // For easy difficulty, choose a random available position
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      computerIndex = availableIndexes[randomIndex];
    } else if (difficulty === 'medium') {
      // For medium difficulty, occasionally choose a random position instead of the optimal move
      const random = Math.random();
  
      if (random < 0.2) {
        const randomIndex = Math.floor(Math.random() * availableIndexes.length);
        computerIndex = availableIndexes[randomIndex];
      } else {
        // Find the optimal move based on winning or blocking the player
        computerIndex = findOptimalMove(cards, 'O');
      }
    } else if (difficulty === 'hard') {
      // For hard difficulty, always choose the optimal move
      computerIndex = findOptimalMove(cards, 'O');
    }
  
    const newCards = [...cards];
    newCards[computerIndex] = 'O';
    setCards(newCards);
    setPlayerTurn(true);
  
    // Check for a winner or tie
    checkGameStatus(newCards);
  };
  const findOptimalMove = (cards, player) => {
    // Array of winning combinations
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // Check for a winning move
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cards[a] === player &&
        cards[a] === cards[b] &&
        cards[c] === null
      ) {
        return c; // Return the winning move
      } else if (
        cards[a] === player &&
        cards[a] === cards[c] &&
        cards[b] === null
      ) {
        return b; // Return the winning move
      } else if (
        cards[b] === player &&
        cards[b] === cards[c] &&
        cards[a] === null
      ) {
        return a; // Return the winning move
      }
    }
  
    // Check for a blocking move
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cards[a] !== null &&
        cards[a] === cards[b] &&
        cards[c] === null
      ) {
        return c; // Return the blocking move
      } else if (
        cards[a] !== null &&
        cards[a] === cards[c] &&
        cards[b] === null
      ) {
        return b; // Return the blocking move
      } else if (
        cards[b] !== null &&
        cards[b] === cards[c] &&
        cards[a] === null
      ) {
        return a; // Return the blocking move
      }
    }
  
    // If no winning or blocking move, choose a random available position
    const availableIndexes = cards
      .map((card, index) => (card === null ? index : null))
      .filter(index => index !== null);
  
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    return availableIndexes[randomIndex];
  };
  const checkGameStatus = newCards => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  
    // Check for a winner
    for (let combo of winningCombos) {
      const [a, b, c] = combo
      if (
        newCards[a] &&
        newCards[a] === newCards[b] &&
        newCards[a] === newCards[c]
      ) {
        setGameOver(true)
        if (newCards[a] === 'X') {
          setWinner("Player")
        } else {
          setWinner("Computer")
        }
        return
      }
    }
  
    // Check for a tie
    if (!newCards.includes(null)) {
      setGameOver(true)
      setWinner("Tie")
    }
  }
  const resetGame = () => {
    setCards(Array(9).fill(null));
    setPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };
  return (
    <Main>
      <Menu>
        <button
            key={"easy"}
          className={difficulty === "easy" ? "active" : ""}
          type="button"
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
        key="medium"
          className={difficulty === "medium" ? "active" : ""}
         
          type="button"
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>
        <button
            className={difficulty === "hard" ? "active" : ""}
        key="Hard"
         
          type="button"
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </Menu>
      <Header>TicTacToe</Header>
      <div className="ticfield">
        {cards.map((card, index) => (
          <button
          className="tic"
            key={index}
            type="button"
            onClick={() => handleCardClick(index)}
            disabled={card !== null || !playerTurn || gameOver}
          >
            {card}
          </button>
        ))}
      </div>
      {winner==="Player" && (
        <>
        <Popup>
          <Header>You have won!!!</Header>
          <button type="button" onClick={()=> resetGame()} >Play Again</button>
          </Popup>
        </>
      )}
      {winner==="Computer" && (
        <>
        <Popup>
          <Header>You have lost!!!</Header>
          <button type="button" onClick={()=> resetGame()} >Play Again</button>
          </Popup>
        </>
      )}
      {winner==="Tie" && (
        <>
        <Popup>
          <Header>Tie!!!</Header>
          <button type="button" onClick={()=> resetGame()} >Play Again</button>
          </Popup>
        </>
      )}
    </Main>
  )
}
