import Missile from '../components/Missile';
import { randomLaunch, travelTime, getClickDistance, travelTimeSeconds } from '../Calculations';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';

function Part1() {

    const startTime = useMemo(() => Date.now());
    const [x, y, root, peak] = useMemo(() => randomLaunch(), []);
    const time2 = travelTimeSeconds / 16 * 10**3;
    const time3 = travelTimeSeconds / 8 * 10**3;
    const delta = 0.001;

    const [missile, setMissile] = useState({
        x: x(0),
        y: y(0),
        transform: `rotate(${90 - Math.atan((y(delta) - y(0)) / (x(delta) - x(0))) * 180 / Math.PI}deg) translate(50%, 50%)`,
    });

    const moveMissile = (time, opacity=1) => {
        setMissile({
            x: x(time),
            y: y(time),
            transform: `rotate(${90 - Math.atan((y(time+delta) - y(time)) / (x(time+delta) - x(time))) * 180 / Math.PI}deg) translate(50%, 50%)`,
            opacity: opacity,
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            moveMissile(time2);
        }, time2);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            moveMissile(time3);
        }, time3);
        return () => clearTimeout(timer);
    }, []);

    // mount onclick event listener
    useEffect(() => {
        window.addEventListener('click', (e) => {
            const clickLocation = [e.clientX, window.innerHeight - e.clientY];
            const clickTime = Date.now();
            if (clickTime - startTime < time3) return;
            console.log(`distance: ${getClickDistance(clickLocation, clickTime - startTime, [x, y, root, peak])}`);
            moveMissile(clickTime - startTime, 0.5);
        });
    }
    , []);

    return <>
        {
            missile &&
            <Missile style={{
                position: 'absolute',
                bottom: `${missile.y}px`,
                left: `${missile.x}px`,
                transform: missile.transform,
                opacity: missile.opacity,
            }}/>
        }
    </>;
}

export default Part1;
