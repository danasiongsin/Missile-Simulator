import Missile from '../components/Missile';
import MissileStats from '../components/MissileStats';
import Error from '../components/Error';
import { MissileSimulation } from '../MissileSimulation';
import React, { useState } from 'react';
import Playbutton from '../components/Playbutton';
import Stopwatch from '../components/Stopwatch';
import '../App.css';
import InputBox from '../components/InputBox';
import CursorLocation from '../components/CursorLocation';

function Part2() {
    const [playState, setPlayState] = useState('stopped');
    const [startTime, setStartTime] = useState(null);
    const [text, setText] = useState("");
    const { missile, distance } = MissileSimulation(playState, setPlayState, startTime, setStartTime, text);

    const handlePlay = (e) => {
        setPlayState('running_2');
        e.stopPropagation();
    };

    // console.log(missile);

    return (
        <>
            {missile.map(missile =>
                <Missile
                    style={{
                        position: 'absolute',
                        bottom: `${missile.y}px`,
                        left: `${missile.x}px`,
                        transform: missile.transform,
                        opacity: missile.opacity,
                    }}
                />
            )}
            {missile.slice(0, 3).map(missile =>
                <MissileStats
                    missile={missile}
                    style={{
                        position: 'absolute',
                        bottom: `${missile.y}px`,
                        left: `${missile.x}px`,
                        transform: 'translate(50px,50%)',
                    }}
                />
            )}
            <button className="playbutton" onClick={(e) => handlePlay(e)}>
                <Playbutton />
            </button>
            <Error distance={distance} />
            <Stopwatch startTime={startTime} playState={playState} />
            <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
                Teamname: <InputBox inputText={text} setText={setText}/>
            </div>
            <CursorLocation />
        </>
    );
}

export default Part2;
