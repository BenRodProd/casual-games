"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Memory from "@/components/Memory";
import useLocalStorage from "use-local-storage";
import TicTacToe from "@/components/Tictactoe";
import styled from "styled-components";
import StoneRockScissors from "@/components/StoneRockSissors";

const Navigation = styled.div`
display: flex;
justify-content: space-evenly;
background-color: rgba(39, 236, 245, 0.5);
position: fixed;
width: 100%;


top:0;
margin-bottom: 3rem;
padding: 5px;
z-index:5;
`

const ImageWrapper = styled.div`
display:flex;
width: 100%;
height: 100%;
margin-bottom: 2rem;

`

const BackgroundImage = styled(Image)`
position: absolute;
width: 100%;
height: 100%;
object-fit: contain;
z-index: -1;
margin-top:0rem;
bottom:0;


`



const Main = styled.div`
display: flex;
position: relative;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
margin-top: 5rem;
overflow-y: scroll;

`

const Points = styled.p`
position: fixed;
top: 1.5rem;
width: 100%;
height: 2rem;
margin-bottom:0;
background-color: rgba(39, 236, 245, 0.5);
padding: 5px;
z-index:5;
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
 <ImageWrapper>
  <BackgroundImage src = "/assets/back.jpg" fill={true} alt ="back" />
  <Points>Points: {gamePoints}</Points>
 <Navigation>
  <button onClick={()=> setGame("TicTacToe")} className={game === "TicTacToe" ? "navbutton active" : "navbutton"} type="button">TicTacToe</button>
  <button onClick={()=> setGame("Memory")} className={game === "Memory" ? "navbutton active" : "navbutton"} type="button">Memory</button>
  <button onClick={()=> setGame("StoneRockScissors")} className={game === "StoneRockScissors" ? "navbutton active" : "navbutton"} type="button">Roshambo</button>
 </Navigation>

 <Main>
  {game==="TicTacToe" && <TicTacToe setGamePoints={setGamePoints} />}
  {game==="Memory" && <Memory setGamePoints={setGamePoints} />}
  {game==="StoneRockScissors" && <StoneRockScissors setGamePoints={setGamePoints} />}
    
  </Main>
  
  </ImageWrapper>
 
    <a target="_blank" href="https://profile-room.vercel.app/"> &copy; BenRodProd</a>
  
 </>
  )
}
