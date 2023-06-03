import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
`;

const Button = styled.button`
  ${(props) => (props.active ? `background-color: blue;` : `background-color: white;`)}
`;

const Header = styled.h2`
  color: white;
  text-align: center;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ turned }) => (turned ? "white" : "blue")};
  cursor: ${({ turned, matched }) => (turned || matched ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function Memory({setGamePoints}) {
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [turnedCards, setTurnedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [clickable, setClickable] = useState(true);
  const memoryThemes = {
    FantasyLandscapes: "/assets/fl",
  };

  useEffect(() => {
    generateCards(difficulty);
  }, [difficulty]);

  const generateCards = (difficulty) => {
    let cardCount = 0;
    switch (difficulty) {
      case "easy":
        cardCount = 9;
        break;
      case "medium":
        cardCount = 12;
        break;
      case "hard":
        cardCount = 25;
        break;
      default:
        cardCount = 9;
    }

    const cardValues = Array(Math.floor(cardCount / 2))
      .fill(0)
      .map((_, index) => index + 1);
    const allCards = [...cardValues, ...cardValues];
    const shuffledCards = shuffleArray(allCards);

    const cardImages = [
      "/assets/memory/fl1.webp",
      "/assets/memory/fl2.webp",
      "/assets/memory/fl3.webp",
      "/assets/memory/fl4.webp",
      "/assets/memory/fl5.webp",
      "/assets/memory/fl6.webp",
      "/assets/memory/fl7.webp",
      "/assets/memory/fl8.webp",
      "/assets/memory/fl9.webp",
      "/assets/memory/fl10.webp",
      "/assets/memory/fl11.webp",
      "/assets/memory/fl12.webp",
      "/assets/memory/fl13.webp",

        ];

    setCards(
      shuffledCards.map((value, index) => ({
        id: index,
        value,
        turned: false,
        image: cardImages[value - 1],
      }))
    );
    setTurnedCards([]);
    setMatchedCards([]);
    setWrongAttempts(0);
  };

  const handleCardClick = (card) => {
    if (!clickable || card.turned || matchedCards.some((c) => c.id === card.id)) {
      return;
    }

    

    const turnedCount = turnedCards.length;
    if (turnedCount === 0) {
      // First card to be turned
      setTurnedCards([card]);
    } else if (turnedCount === 1) {
      // Second card to be turned
      setClickable(false);
      setTurnedCards((prevTurnedCards) => [...prevTurnedCards, card]);
      setTimeout(() => {
        checkTurnedCards([...turnedCards, card]);
        setClickable(true); // Enable clicking after the timeout
      }, 2000);
    }

    setCards((prevCards) =>
      prevCards.map((c) => {
        if (c.id === card.id) {
          return { ...c, turned: true };
        }
        return c;
      })
    );
  };

  const checkTurnedCards = (turnedCards) => {
    const [card1, card2] = turnedCards;
    if (card1.value === card2.value) {
      // Matched
      setGamePoints((prevGamePoints) => prevGamePoints + 5);
      setMatchedCards((prevMatchedCards) => [...prevMatchedCards, card1, card2]);
    } else {
      // Not matched
      setGamePoints((prevGamePoints) => prevGamePoints - 1);
      setCards((prevCards) =>
        prevCards.map((c) => {
          if (c.id === card1.id || c.id === card2.id) {
            return { ...c, turned: false };
          }
          return c;
        })
      );
    }
    setTurnedCards([]);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <Main>
      <Menu>
        <Button className={difficulty === "easy" ? "active" : ""} active={difficulty === "easy"} type="button" onClick={() => setDifficulty("easy")}>
          Easy
        </Button>
        <Button className={difficulty === "medium" ? "active" : ""} active={difficulty === "medium"} type="button" onClick={() => setDifficulty("medium")}>
          Medium
        </Button>
        <Button className={difficulty === "hard" ? "active" : ""} active={difficulty === "hard"} type="button" onClick={() => setDifficulty("hard")}>
          Hard
        </Button>
      </Menu>
      <Header>Memory</Header>
      <CardContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            turned={card.turned}
            matched={matchedCards.some((c) => c.id === card.id)}
            onClick={() => handleCardClick(card)}
          >
            {card.turned || matchedCards.some((c) => c.id === card.id) ? (
              <Image priority={true} src={card.image} width="100" height="100" alt={`Card ${card.id}`} />
            ) : (
              <span>?</span>
            )}
          </Card>
        ))}
      </CardContainer>
      
    </Main>
  );
}
