"use client"
import { useState } from "react";
import Memory from "@/components/Memory";

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
flex-direction: column;
width: 100%;
height: 100%;
margin-top: 3rem;
`

export default function Home() {
  const [game, setGame] = useState("TicTacToe")
  return (
 <>
 <Navigation>
  <button onClick={()=> setGame("TicTacToe")} className={game === "TicTacToe" ? "active" : ""} type="button">TicTacToe</button>
  <button onClick={()=> setGame("Memory")} className={game === "Memory" ? "active" : ""} type="button">Memory</button>
 </Navigation>
 <Main>
  {game==="TicTacToe" && <TicTacToe />}
  {game==="Memory" && <Memory />}

  </Main>
 </>
  )
}
