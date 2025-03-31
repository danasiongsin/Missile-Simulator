import Missile from '../components/Missile';
import MissileStats from '../components/MissileStats';
import Error from '../components/Error';
import { MissileSimulation } from '../MissileSimulation';
import React, { useState } from 'react';
import Playbutton from '../components/Playbutton';
import Stopwatch from '../components/Stopwatch';
import '../App.css';

function Part2() {
    const [playState, setPlayState] = useState('stopped');
    const [startTime, setStartTime] = useState(null);
    const { missile, distance } = MissileSimulation(playState, setPlayState, startTime, setStartTime);

    const handlePlay = (e) => {
        setPlayState('running_2');
        e.stopPropagation();
    };

    console.log(missile);

    return (
        <>
            {missile.map(missile =>
                <>
                    <Missile
                        style={{
                            position: 'absolute',
                            bottom: `${missile.y}px`,
                            left: `${missile.x}px`,
                            transform: missile.transform,
                            opacity: missile.opacity,
                        }}
                    />
                    <MissileStats
                        missile={missile}
                        style={{
                            position: 'absolute',
                            bottom: `${missile.y}px`,
                            left: `${missile.x}px`,
                            transform: 'translate(50px,50%)',
                        }}
                    />
                </>
            )}
            <button className="playbutton" onClick={(e) => handlePlay(e)}>
                <Playbutton />
            </button>
            <Error distance={distance} />
            <Stopwatch startTime={startTime} playState={playState} />
        </>
    );
}

export default Part2;
