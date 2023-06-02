"use client"
import { useState, useEffect } from "react";
import Memory from "@/components/Memory";
import useLocalStorage from "use-local-storage";
import TicTacToe from "@/components/Tictactoe";
import styled from "styled-components";

const Navigation = styled.div`
display: flex;
justify-content: space-evenly;
background-color: lightblue;
position: absolute;
width: 100%;
top:0;
margin-bottom: 3rem;

`

const Main = styled.div`
display: flex;
position: relative;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
margin-top: 3rem;
`

export default function Home() {
  const [gamePoints, setGamePoints] = useLocalStorage("gamePoints", 0);
  const [game, setGame] = useState("TicTacToe")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);
  if (isLoading) {
    return (<Main>Loading..</Main>

    )

  }
  return (
 <>
 <Navigation>
  <button onClick={()=> setGame("TicTacToe")} className={game === "TicTacToe" ? "active" : ""} type="button">TicTacToe</button>
  <button onClick={()=> setGame("Memory")} className={game === "Memory" ? "active" : ""} type="button">Memory</button>
 </Navigation>
 <Main>
  {game==="TicTacToe" && <TicTacToe setGamePoints={setGamePoints} />}
  {game==="Memory" && <Memory setGamePoints={setGamePoints} />}
    <p>Points: {gamePoints}</p>
  </Main>
 </>
  )
}
