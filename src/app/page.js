"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Memory from "@/components/Memory";
import useLocalStorage from "use-local-storage";
import TicTacToe from "@/components/Tictactoe";
import styled from "styled-components";
import StoneRockScissors from "@/components/StoneRockSissors";
import Quiz from "@/components/Quiz";

const Navigation = styled.div`
display: flex;
justify-content: space-evenly;

background-color: rgba(39, 236, 245, 0.5);
position: absolute;
width: 100%;
left:50%;
transform: translateX(-50%);
max-width:520px;

top:0;
margin-bottom: 3rem;
padding: 0;
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
const StyledButton = styled.button`
background-color: transparent;
border: 3px solid white;
color: white;
padding: 10px;
font-size: 12px;
font-weight: bold;
cursor: pointer;
margin: 10px;
z-index:2;
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
position: absolute;

top: 2.2rem;
width: 100%;
height: 2rem;
left:50%;
transform: translateX(-50%);
margin-bottom:0;
background-color: rgba(39, 236, 245, 0.8);
padding: 5px;
z-index:15;
max-width: 520px;
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
  <StyledButton onClick={()=> setGame("TicTacToe")} className={game === "TicTacToe" ? "navbutton active" : "navbutton"} type="button">TicTacToe</StyledButton>
  <StyledButton onClick={()=> setGame("Memory")} className={game === "Memory" ? "navbutton active" : "navbutton"} type="button">Memory</StyledButton>
  <StyledButton onClick={()=> setGame("StoneRockScissors")} className={game === "StoneRockScissors" ? "navbutton active" : "navbutton"} type="button">Roshambo</StyledButton>
  <StyledButton onClick={()=> setGame("Quiz")} className={game === "Quiz" ? "navbutton active" : "navbutton"} type="button">Quiz</StyledButton> 
 </Navigation>

 <Main>
  {game==="TicTacToe" && <TicTacToe setGamePoints={setGamePoints} />}
  {game==="Memory" && <Memory setGamePoints={setGamePoints} />}
  {game==="StoneRockScissors" && <StoneRockScissors setGamePoints={setGamePoints} />}
  {game==="Quiz" && <Quiz setGamePoints={setGamePoints} />} 
  </Main>
 
  </ImageWrapper>
  <a target="_blank" href="https://profile-room.vercel.app/"> &copy; BenRodProd</a>
 
    
  
 </>
  )
}
