import React, { useState } from 'react';

function Stopwatch({ startTime }) {
    const [time, setTime] = useState(0);
    setInterval(() => {
        setTime(Date.now() - startTime);
    }
    , 10);
    return (
        <div className="stopwatch">
            <span>{ new Date(time).toISOString().slice(11, -1) }</span>
        </div>
    );
}

export default Stopwatch;
