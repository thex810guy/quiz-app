import { useState } from "react"
import questions from './assets/questions.json'

type Question = {
    pageIndex: number;
    pageContent: {
        question: string;
        options: string[];
        correctAnswers: boolean[];
    };
};

const typedQuestions: Question[] = questions as unknown as Question[];

function Starter() {
    const [hasStarted, start] = useState(false)
    const [currentPage, changePage] = useState(typedQuestions[0])
    const [score, setScore] = useState(0)
    const [selectedArray, setSelection] = useState([false, false, false, false])
    const [hasEnded, end] = useState(false)
    const [answerDisplay, setAnswerDisplay] = useState({
        isActive: false,
        correctAnswers: [] as boolean[]
    })

    const restart = () => {
        start(false)
        changePage(typedQuestions[0])
        setScore(0)
        setSelection([false, false, false, false])
        end(false)
        setAnswerDisplay({
            isActive: false,
            correctAnswers: []
        })
    }

    const evaluateAnswers = (trial: Boolean[], answers: Boolean[], commonEntries=4) => {
        let increment = 1

        for (let i = 0; i < commonEntries; i++) {
            if (trial[i] != answers[i]) {
                increment = 0
            }
        }

        setScore(score + increment)
    }

    const submit = () => {
        setAnswerDisplay({
            isActive: true,
            correctAnswers: currentPage.pageContent.correctAnswers
        })
        evaluateAnswers(selectedArray, currentPage.pageContent.correctAnswers)
    }

    const nextPage = () => {
        const nextPage = currentPage.pageIndex + 1

        setAnswerDisplay({
            isActive: false,
            correctAnswers: []
        })

        if (nextPage == 10) {
            end(true)
            return
        }

        changePage(typedQuestions[nextPage])
        setSelection([false, false, false, false])
    }

    const setAnswer = (index: number) => {
        let newArray: boolean[] = []
        
        selectedArray.forEach(element => {
            newArray.push(element)
        })

        newArray[index] = !newArray[index]
        setSelection(newArray)
    }

    if (hasEnded) {
        return (<div className="glass w-96 h-auto p-8 text-center">
            <h2 className="text-4xl font-bold">Quiz score:</h2>
            <br />
            <h1 className="text-9xl font-black">{score}</h1>
            <br />
            <button onClick={restart}>Restart</button>
        </div>)
    }

    if (hasStarted) {
        if (answerDisplay.isActive) {
            return (<div className="glass w-96 h-auto p-8 text-center">
                <h2 className="text-4xl font-bold">Question {currentPage.pageIndex + 1}</h2>
                <br />
                <h3>{currentPage.pageContent.question}</h3>
                <h3>Your points total is at {score}</h3>
                <br />
                <div className="flex flex-col items-start gap-4">
                    <button className={answerDisplay.correctAnswers[0] ? "green-button" : "red-button"} >{currentPage.pageContent.options[0]}</button>
                    <button className={answerDisplay.correctAnswers[1] ? "green-button" : "red-button"} >{currentPage.pageContent.options[1]}</button>
                    <button className={answerDisplay.correctAnswers[2] ? "green-button" : "red-button"} >{currentPage.pageContent.options[2]}</button>
                    <button className={answerDisplay.correctAnswers[3] ? "green-button" : "red-button"} >{currentPage.pageContent.options[3]}</button>
                </div>
                <br />
                <br />
                <div className="flex gap-4 items-center justify-center">
                    <button onClick={nextPage}>Continue</button>
                </div>
            </div>)
        }
        return (<div className="glass w-96 h-auto p-8 text-center">
            <h2 className="text-4xl font-bold">Question {currentPage.pageIndex + 1}</h2>
            <br />
            <h3>{currentPage.pageContent.question}</h3>
            <br />
            <div className="flex flex-col items-start gap-4">
                <button className={selectedArray[0] ? "selected-answer-button" : "answer-button"} onClick={() => setAnswer(0)}>{currentPage.pageContent.options[0]}</button>
                <button className={selectedArray[1] ? "selected-answer-button" : "answer-button"} onClick={() => setAnswer(1)}>{currentPage.pageContent.options[1]}</button>
                <button className={selectedArray[2] ? "selected-answer-button" : "answer-button"} onClick={() => setAnswer(2)}>{currentPage.pageContent.options[2]}</button>
                <button className={selectedArray[3] ? "selected-answer-button" : "answer-button"} onClick={() => setAnswer(3)}>{currentPage.pageContent.options[3]}</button>
            </div>
            <br />
            <br />
            <div className="flex gap-4 items-center justify-center">
                <button onClick={submit}>Submit</button>
                <button onClick={restart}>Restart</button>
            </div>
        </div>)
    }

    return (
    <div className="glass w-96 h-auto p-8 text-center">
        <h2 className="text-4xl font-bold">Diverse History Quiz</h2>
        <br />
        <h3>Take the test to discover your level in history now! Include 10 questions, multiple choices (or none). From the Ottoman Empire to WWI, put your historical knowledge to the test!</h3>
        <br />
        <br />
        <button onClick={() => start(true)}>Start</button>
    </div>
    ) 
}

export default Starter