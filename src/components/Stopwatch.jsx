import React, { useState, useEffect } from 'react';

function Stopwatch({ startTime, playState }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (playState === 'running_2') {
            setTime(Date.now() - startTime);
            interval = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }

        return () => {
            clearInterval(interval);
        };
    }
    , [startTime, playState]);
    return (
        <div className="stopwatch">
            <span style={{ paddingRight: '5px' }}>Time:</span>
            <span>{ new Date(time).toISOString().slice(14, -1) }</span>
        </div>
    );
}

export default Stopwatch;
