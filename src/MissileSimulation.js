import { useState, useEffect } from 'react';
import { randomLaunch, getClickDistance, travelTimeSeconds } from './Calculations';

export function MissileSimulation(playState, setPlayState) {
    const [startTime, setStartTime] = useState(null);
    const [path, setPath] = useState([null, null, null, null]);
    const [distance, setDistance] = useState(null);
    const [missile, setMissile] = useState(null);

    const time2 = (travelTimeSeconds / 16) * 10**3;
    const time3 = (travelTimeSeconds / 8) * 10**3;
    const delta = 0.001;

    const resetSimulation = () => {
        setMissile(null);
        setDistance(null);
        setStartTime(Date.now());
        setPath(randomLaunch());
    };

    useEffect(() => {
        if (playState === 'running') resetSimulation();
    }, [playState]);

    const moveMissile = (time, opacity = 1) => {
        const [x, y] = path;
        if (typeof x !== 'function' || typeof y !== 'function') return;

        setMissile({
            x: x(time),
            y: y(time),
            velocity: Math.sqrt((x(time + delta) - x(time))**2 + (y(time + delta) - y(time))**2) / delta,
            transform: `rotate(${90 - Math.atan((y(time + delta) - y(time)) / (x(time + delta) - x(time))) * 180 / Math.PI}deg) translate(50%, 50%)`,
            opacity: opacity,
        });
    };

    useEffect(() => {
        if (path.includes(null) || playState !== 'running') return;

        moveMissile(0);
        const timer1 = setTimeout(() => moveMissile(time2), time2);
        const timer2 = setTimeout(() => moveMissile(time3), time3);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [path, playState]);

    useEffect(() => {
        if (path.includes(null)) return;

        const handleClick = (e) => {
            if (playState !== 'running') return;
            const clickLocation = [e.clientX, window.innerHeight - e.clientY];
            const clickTime = Date.now();
            if (clickTime - startTime < time3) return;

            const [x, y, root, peak] = path;
            const clickDist = getClickDistance(clickLocation, clickTime - startTime, [x, y, root, peak]);

            setDistance(clickDist);
            moveMissile(clickTime - startTime, 0.5);

            setPlayState('stopped');
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [path, playState]);

    return { missile, distance };
}
