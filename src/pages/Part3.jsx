import Missile from '../components/Missile';
import MissileStats from '../components/MissileStats';
import Error from '../components/Error';
import { MissileSimulation } from '../MissileSimulation';
import React, { useState } from 'react';
import Playbutton from '../components/Playbutton';
import '../App.css';
import InputBox from '../components/InputBox';
import Laser from '../components/Laser';

function Part3() {
    const [playState, setPlayState] = useState('stopped');
    const [startTime, setStartTime] = useState(null);
    const [inputTime, setTime] = useState("");
    const [teamname, setTeamname] = useState("");
    const [xPos, setX] = useState("");
    const [yPos, setY] = useState("");
    const { missile, distance } = MissileSimulation(playState, setPlayState, startTime, setStartTime, teamname, inputTime, xPos, yPos);

    const handlePlay = (e) => {
        setPlayState('running_3');
        e.stopPropagation();
    };

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
            <Error distance={distance} decimals={5} />
            <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
                Teamname: <InputBox inputText={teamname} setText={setTeamname}/><br/>
                Enter your time (ms): <InputBox inputText = {inputTime} setText = {setTime}/><br/>
                Enter your x and y positions: (<InputBox inputText = {xPos} setText = {setX}/>, <InputBox inputText = {yPos} setText = {setY}/>)
            </div>
            <Laser state = {playState} time = {inputTime} bottom={yPos} left={xPos}/>
        </>
    );
}

export default Part3;
