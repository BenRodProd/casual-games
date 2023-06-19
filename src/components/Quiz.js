import Image from "next/image"
import { useEffect, useState } from "react"
import styled from "styled-components"
import {englishQuiz} from "@/lib/englishQuiz"
import {germanQuiz} from "@/lib/germanQuiz"

const FlagWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 1rem;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin:auto;
`

const Card = styled.div`
    display: flex;
    position:relative;
    flex-direction: column;
    justify-content: center;
   margin-right:0;
    
    align-items: center;
    width: 90%;
    height: 70%;
    border: 3px solid white;
`

const CardBackground = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index:-1;
   
`

const Popup = styled.div`
display:flex;
position:absolute;
justify-content: center;
align-items: center;
font-size: 30px;
text-align: center;
width: 100%;
height: 100%;
max-width: 520px;
background-color: rgba(0, 0, 0, 0.9);
border: 3px solid white;
z-index:20;
`

const ChooseAnswer = styled.button`
    background-color: transparent;
    border: 3px solid white;
    color: white;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin: 10px;
    z-index:2;
    `

const Question = styled.p`
font-size: 20px;
background-color: rgba(39, 106, 245, 0.9);
`
const GameWrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
max-width: 500px;
justify-self: center;

    `
export default function Quiz({setGamePoints}) {
    const [cards, setCards] = useState(englishQuiz.sort(() => Math.random() - 0.5))
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [currentCard, setCurrentCard] = useState(cards[currentCardIndex])
    const [language, setLanguage] = useState("english")
    const [chosenAnswer, setChosenAnswer] = useState(null)
    const [popup, setPopup] = useState(false)
    const [popupMessage , setPopupMessage] = useState("")
    useEffect(() => {
        if (language==="english") {
            setCards(englishQuiz.sort(() => Math.random() - 0.5))
            setCurrentCard(cards[0])
        }  else if (language==="german") {
            setCards(germanQuiz.sort(() => Math.random() - 0.5))
            setCurrentCard(cards[0])
        }
    },[language, setCurrentCard, setCards, cards])


    function handleAnswer(index) {
        console.log(chosenAnswer, currentCard.correctAnswerIndex)
        if (index === currentCard.correctAnswerIndex) {
            handleRightAnswer()
            
        } else {
            handleWrongAnswer()
        }
    }
function handleRightAnswer() {
    setGamePoints((prev) => prev +3)
    setCurrentCardIndex ((prev) => prev +1)
    setCurrentCard(cards[currentCardIndex])
    if (language==="english") {
    setPopupMessage("Correct!")
} else if (language==="german") {
    setPopupMessage("Richtig!")
}
    setPopup(true)
    
}
function handleWrongAnswer() {
 setGamePoints((prev) => prev-3)
 setCurrentCardIndex ((prev) => prev +1)
 setCurrentCard(cards[currentCardIndex])
 if (language==="english") {
 setPopupMessage(`Wrong! The correct answer is "${currentCard.answers[currentCard.correctAnswerIndex]}"`)
} else if (language==="german") {
 setPopupMessage(`Falsch! Die richtige Antwort ist "${currentCard.answers[currentCard.correctAnswerIndex]}"`)}
 setPopup(true)

}
function handleNextQuestion() {
    setChosenAnswer(null)
    setPopup(false)
    
}

    return (
        <>
        <GameWrapper>
        <FlagWrapper>
        <Image src="/assets/english.png" alt="English" width={100} height={60} onClick={() => setLanguage("english")}/>
        <Image src="/assets/german.png" alt="German" width={100} height={60} onClick={() => setLanguage("german")} />
        </FlagWrapper>
        <Card>
            <CardBackground src={`/assets/quiz/${currentCard.topic}.jpg`} alt={currentCard.topic} width={200} height={100}/>
            <Question>{currentCard.question}</Question>
            {currentCard.answers.map((answer, index) => {
                return <ChooseAnswer key={index} onClick={()=> handleAnswer(index)}>{answer}</ChooseAnswer>
            })}
        </Card>
        {popup && <Popup onClick={() => handleNextQuestion()}>{popupMessage}</Popup>}
        </GameWrapper>
        </>
    )


}