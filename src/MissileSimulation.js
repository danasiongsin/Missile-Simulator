import { useState, useEffect } from 'react';
import { randomLaunch, getClickDistance, travelTimeSeconds, getMilesPerPixel } from './Calculations';

export function MissileSimulation(playState, setPlayState, startTime, setStartTime, seed, inputTime, xPos, yPos) {
    const [path, setPath] = useState([null, null, null, null]);
    const [distance, setDistance] = useState(null);
    const [missile, setMissile] = useState([]);

    const time2 = (travelTimeSeconds / 16) * 10**3;
    const time3 = (travelTimeSeconds / 8) * 10**3;
    const delta = 0.001;
    const resetSimulation = () => {
        setMissile([]);
        setDistance(null);
        setStartTime(Date.now());
        setPath(randomLaunch(seed));
    };

    useEffect(() => {
        if (playState.startsWith('running')) resetSimulation();
    }, [playState]);

    const moveMissile = (time, opacity = 1) => {
        const [x, y] = path;
        if (typeof x !== 'function' || typeof y !== 'function') return;

        if (playState === 'running_1') {
            setMissile([{
                time: time,
                x: x(time),
                y: y(time),
                velocity: getMilesPerPixel(path) * Math.sqrt((x(time + delta) - x(time))**2 + (y(time + delta) - y(time))**2) / delta,
                angle: 90 - Math.atan((y(time + delta) - y(time)) / (x(time + delta) - x(time))) * 180 / Math.PI,
                transform: `rotate(${90 - Math.atan((y(time + delta) - y(time)) / (x(time + delta) - x(time))) * 180 / Math.PI}deg) translate(50%, 50%)`,
                opacity: opacity,
            }]);
        } else {
            setMissile((prevMissile) => [...prevMissile, {
                time: time,
                x: x(time),
                y: y(time),
                velocity: getMilesPerPixel(path) * Math.sqrt((x(time + delta) - x(time))**2 + (y(time + delta) - y(time))**2) / delta,
                angle: 90 - Math.atan((y(time + delta) - y(time)) / (x(time + delta) - x(time))) * 180 / Math.PI,
                transform: `rotate(${90 - Math.atan((y(time + delta) - y(time)) / (x(time + delta) - x(time))) * 180 / Math.PI}deg) translate(50%, 50%)`,
                opacity: opacity,
            }]);
        }
    };

    useEffect(() => {
        if (path.includes(null) || !(playState.startsWith('running'))) return;

        if (missile.length === 0) {
            moveMissile(0);
        }
        const timer1 = setTimeout(() => moveMissile(time2), time2);
        let timer2;
        if (playState === 'running_3') {
            timer2 = setTimeout(() => {
                moveMissile(time3);
                setPlayState('stopped');
            }
            , time3);
        } else {
            timer2 = setTimeout(() => moveMissile(time3), time3);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [path, playState]);

    useEffect(() => {
        if (path.includes(null)) return;
        if (playState === 'running_3') return;

        const handleClick = (e) => {
            if (!playState.startsWith('running')) return;
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

    useEffect(() => {
        if (path.includes(null)) return;

        if (playState === 'running_3' && parseInt(inputTime) >= time3 + 500) {
            setTimeout(() => {
                const [x, y, root, peak] = path;
                const clickDist = getClickDistance([xPos, yPos], parseInt(inputTime), [x, y, root, peak]);

                setDistance(clickDist);
                moveMissile(parseInt(inputTime), 0.5);

                setPlayState('stopped');
            }, parseInt(inputTime));
        }
    }
    , [path, playState]);

    return { missile, distance };
}
