import React from 'react'

function GameInfo(props) {
  return (
    <div className='infoContainer flex justify-between text-xl font-sans'>
        <span className="players">Player X : {props.xWin}</span>
        <span className="players">Player O : {props.oWin}</span>
    </div>
  )
}

export default GameInfo
