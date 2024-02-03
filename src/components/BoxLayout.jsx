import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import GameInfo from './GameInfo'
import ReactDOM from 'react-dom/client'
import './BoxLayout.css'

let xLocation = []
let oLocation = []
function BoxLayout() {
    const flag = useRef(true)
    let [Box1, setBox1] = useState("")
    let [Box2, setBox2] = useState("")
    let [Box3, setBox3] = useState("")
    let [Box4, setBox4] = useState("")
    let [Box5, setBox5] = useState("")
    let [Box6, setBox6] = useState("")
    let [Box7, setBox7] = useState("")
    let [Box8, setBox8] = useState("")
    let [Box9, setBox9] = useState("")
    let [xWin, setXWin] = useState(0)
    let [oWin, setOWin] = useState(0)
    let [winnername, setWinnerName] = useState("Match draw")
    const turnNo = useRef(0)


    return (
        <div id='playGround'>
            <GameInfo xWin ={xWin} oWin={oWin} />
            <div className="restart">
                <h2>{winnername}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="restartbtn"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </div>
            <div className="rows flex">
                <div className="boxes" id="box1" onClick={() => {
                    if (Box1 == "") {
                        setBox1(currentTurn(turnNo, 1, flag))
                    }
                }
                }>{Box1}</div>
                <div className="boxes" id="box2" onClick={() => {
                    if (Box2 == "") {
                        setBox2(currentTurn(turnNo, 2, flag))
                    }
                }
                }>{Box2}</div>
                <div className="boxes" id="box3" onClick={() => {
                    if (Box3 == "") {
                        setBox3(currentTurn(turnNo, 3, flag))
                    }
                }
                }>{Box3}</div>
            </div>
            <div className="rows flex">
                <div className="boxes" id="box4" onClick={() => {
                    if (Box4 == "") {
                        setBox4(currentTurn(turnNo, 4, flag))
                    }
                }
                }>{Box4}</div>
                <div className="boxes" id="box5" onClick={() => {
                    if (Box5 == "") {
                        setBox5(currentTurn(turnNo, 5, flag))
                    }
                }
                }>{Box5}</div>
                <div className="boxes" id="box6" onClick={() => {
                    if (Box6 == "") {
                        setBox6(currentTurn(turnNo, 6, flag))
                    }
                }
                }>{Box6}</div>
            </div>
            <div className="rows flex">
                <div className="boxes" id="box7" onClick={() => {
                    if (Box7 == "") {
                        setBox7(currentTurn(turnNo, 7, flag))
                    }
                }
                }>{Box7}</div>
                <div className="boxes" id="box8" onClick={() => {
                    if (Box8 == "") {
                        setBox8(currentTurn(turnNo, 8, flag))
                    }
                }
                }>{Box8}</div>
                <div className="boxes" id="box9" onClick={() => {
                    if (Box9 == "") {
                        setBox9(currentTurn(turnNo, 9, flag))
                    }
                }
                }>{Box9}</div>
            </div>
        </div> 
    )

    function newGame() {
        let element = document.querySelectorAll('.boxes')
        for (let i = 0; i < element.length; i++) {
            setTimeout(() => {
                element[i].style.background = 'none'
            }, i * 50);
        }
        setBox1("")
        setBox2("")
        setBox3("")
        setBox4("")
        setBox5("")
        setBox6("")
        setBox7("")
        setBox8("")
        setBox9("")
        document.querySelector('.restart').style.display = 'none'
        turnNo.current = 0
        flag.current = true
        xLocation.length = 0
        oLocation.length = 0
        setWinnerName("Match draw")
    }

    function currentTurn(x, e, flag) {
        if (x.current % 2 == 0 && flag.current) {
            x.current = x.current + 1
            xLocation.push(e)
            setTimeout(() => {
                let win = checkWinner(xLocation)
                if (win != null) {
                    console.log(win, "X wins");
                    setXWin(xWin+1)
                    setWinnerName("Player X won the match")
                    flag.current = false
                    winAnime(win, "#0090ff")
                    setTimeout(() => {
                        document.querySelector('.restart').style.display = 'flex'
                        document.querySelector('.restartbtn').addEventListener("click", ()=> {
                            newGame();
                        })
                    }, 1000);
                } else if (x.current == 9) {
                    draw();
                }
            }, 0);
            return "X"
        } else if (x.current % 2 == 1 && flag.current) {
            x.current = x.current + 1
            oLocation.push(e)
            setTimeout(() => {
                let win = checkWinner(oLocation)
                if (win != null) {
                    console.log(win, "O wins");
                    setOWin(oWin+1)
                    setWinnerName("Player O won the match")
                    flag.current = false
                    winAnime(win, "#ff2700")
                    setTimeout(() => {
                        document.querySelector('.restart').style.display = 'flex'
                        document.querySelector('.restartbtn').addEventListener("click", ()=> {
                            newGame();
                        })
                    }, 1000);
                } else if (x.current == 9) {
                    draw();
                }
            }, 0);
            return "O"
        }
    }

    function draw() {
        let element = document.querySelectorAll('.boxes')
        for (let i = 0; i < element.length; i++) {
            setTimeout(() => {
                element[i].style.backgroundColor = '#62775b'
            }, i * 100);
        }
        setTimeout(() => {
            document.querySelector('.restart').style.display = 'flex'
            document.querySelector('.restartbtn').addEventListener("click", ()=> {
                newGame();
            })
        }, 1500);
    }

    function winAnime(win, color) {
        for (let i = 0; i < win.length; i++) {
            setTimeout(() => {
                document.querySelector(`#box${win[i]}`).style.backgroundColor = color;
            }, i * 200);
        }
    }



    function checkWinner(location) {
        if (location.length > 2) {
            let array = [
                [1, 2, 3],
                [1, 5, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 5, 7],
                [3, 6, 9],
                [4, 5, 6],
                [7, 8, 9]
            ]

            let lastTerm = location[location.length - 1]

            //check
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (array[i][j] == lastTerm) {
                        let count = 0
                        for (let a = 0; a < array[i].length; a++) {
                            for (let b = 0; b < location.length; b++) {
                                if (array[i][a] == location[b]) {
                                    count++
                                    if (count == 3) {
                                        return array[i]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    
}

export default BoxLayout
