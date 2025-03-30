import Missile from '../components/Missile';
import { randomLaunch, travelTime, getClickDistance, travelTimeSeconds } from '../Calculations';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Playbutton from '../components/Playbutton';
import '../App.css';

function Part1() {
    const [started, setStarted] = useState(false);
    const startTime = useMemo(() => Date.now(), [started]);
    const [x, y, root, peak] = useMemo(() => randomLaunch(), [started]);
    const time2 = travelTimeSeconds / 16 * 10**3;
    const time3 = travelTimeSeconds / 8 * 10**3;
    const delta = 0.001;
    const [distance, setDistance] = useState(null);

    const [missile, setMissile] = useState(null
        );

    const moveMissile = (time, opacity=1) => {
        setMissile({
            x: x(time),
            y: y(time),
            transform: `rotate(${90 - Math.atan((y(time+delta) - y(time)) / (x(time+delta) - x(time))) * 180 / Math.PI}deg) translate(50%, 50%)`,
            opacity: opacity,
        });
    }

    useEffect(() => {
        if (!started) return;
        setMissile({
          x: x(0),
          y: y(0),
          transform: `rotate(${90 - Math.atan((y(delta) - y(0)) / (x(delta) - x(0))) * 180 / Math.PI}deg) translate(50%, 50%)`,
          opacity:1,
        })

        const timer1 = setTimeout(() => {
            moveMissile(time2);
        }, time2);

        const timer2= setTimeout(() => {
            moveMissile(time3);
        }, time3);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        }
    }, [started]);

    // mount onclick event listener
    useEffect(() => {
        if (!started) return;
        const handleClick= (e) => {
            const clickLocation = [e.clientX, window.innerHeight - e.clientY];
            const clickTime = Date.now();
            if (clickTime - startTime < time3) return;
            const clickDist = getClickDistance(clickLocation, clickTime - startTime, [x, y, root, peak]);
            console.log(`distance: ${clickDist}`);
            setDistance(clickDist);
            moveMissile(clickTime - startTime, 0.5);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }
    , [started, startTime]);

    return ( <>
        {missile && (
            <Missile style={{
                position: 'absolute',
                bottom: `${missile.y}px`,
                left: `${missile.x}px`,
                transform: missile.transform,
                opacity: missile.opacity,
            }}/> )}
            <button className="playbutton" onClick={() => setStarted(true)}>
              <Playbutton />
            </button>
            <div className = "dist">
              <li className='stats-list'>Error: {distance}</li>
            </div>
        </>
    );

}

export default Part1;
