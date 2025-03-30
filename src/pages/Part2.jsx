import Missile from '../components/Missile';
import MissileStats from '../components/MissileStats';
import Error from '../components/Error';
import { MissileSimulation } from '../MissileSimulation';
import React, { useState } from 'react';
import Playbutton from '../components/Playbutton';
import '../App.css';

function Part2() {
    const [playState, setPlayState] = useState('stopped');
    const { missile, distance } = MissileSimulation(playState, setPlayState);

    const handlePlay = (e) => {
        setPlayState('running');
        e.stopPropagation();
    };

    return (
        <>
            {missile && (
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
            <button className="playbutton" onClick={(e) => handlePlay(e)}>
                <Playbutton />
            </button>
            <MissileStats missile={missile} />
            <Error distance={distance} />
        </>
    );
}

export default Part2;
