import React, { useState, useEffect } from 'react';

function Stopwatch({ startTime }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }
    , [startTime]);
    return (
        <div className="stopwatch">
            <span>{ new Date(time).toISOString().slice(11, -1) }</span>
        </div>
    );
}

export default Stopwatch;
