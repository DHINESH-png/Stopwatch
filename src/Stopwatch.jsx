import React, {useState, useEffect, useRef} from 'react'

function Stopwatch() {

    const [isRunning, setisRunning]=useState(false);
    const [elapsedTime, setElapsedTime]=useState(0);
    const intervalId = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=>{

            if(isRunning){
                intervalId.current=setInterval(()=>{
                    setElapsedTime(Date.now()-startTimeRef.current)
                },10);
            }

            return ()=>{
                clearInterval(intervalId.current)
            }
        
    },[isRunning])

    function start(){
            setisRunning(true);
            startTimeRef.current=(Date.now()-elapsedTime);
    }

    function stop(){
        setisRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setisRunning(false);
    }

    function formatTime(){
        let hours =Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes =Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds =Math.floor(elapsedTime / (1000) % 60)
        let milliseconds =Math.floor((elapsedTime % 1000) / 10)
        
        hours =String(hours).padStart(2,"0");
        minutes =String(minutes).padStart(2,"0");
        seconds =String(seconds).padStart(2,"0");
        milliseconds =String(milliseconds).padStart(2,"0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

  return (
    <div className='stopwatch'>
        <div className='display'>{formatTime()}</div>
        <button className='start-btn' onClick={start}>START</button>
        <button className='stop-btn' onClick={stop}>STOP</button>
        <button className='reset-btn' onClick={reset}>RESET</button>
    </div>
)
}

export default Stopwatch