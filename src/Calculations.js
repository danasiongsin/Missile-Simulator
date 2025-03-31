import { type } from "@testing-library/user-event/dist/type";

function mulberry32(seed) { console.log(seed);
    return function() {
        seed = (seed + 0x6D2B79F5) | 0;
        let t = seed ^ seed >>> 15;
        t = (t + (t ^ 0x6B7A7C5) << 10) | 0;
        t = (t + (t ^ 0xB4D9E9B) >>> 7) | 0;
        return (t >>> 0) / 4294967296;
    }
}

function stringToHash(str) {
    let hash = 5381;  // Initial value
    let i = str.length;

    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);  // Hash calculation using char codes
    }

    return hash >>> 0;  // Convert to unsigned 32-bit integer
}

function randomLaunch(seed) {
    if (typeof seed === 'string') {
        seed = stringToHash(seed);
    }
    const random = mulberry32(seed);
    const launchLoc = [100, 100]
    // get page width and height
    const width = window.innerWidth;
    const height = window.innerHeight;
    // select random 2nd root from 1.25w to 4w
    const root = Math.floor(random() * 3 * width) + 1.25 * width;
    // select random peak from 0.5h to 1.75h
    const peak = Math.floor(random() * 1.25 * height) + 0.5 * height;
    const vyInitial = 9.8 / 2 * travelTimeSeconds;

    // make parametric equaions for x and y
    const x = (t) => launchLoc[0] + (root - launchLoc[0]) * (t / (10**3) / travelTimeSeconds);
    const y = (t) => launchLoc[1] + vyInitial * t / (10**3) - 0.5 * 9.8 * (t / 10**3) ** 2;

    return [x, y, root, peak];
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function getClickDistance(clickLocation, clickTime, eqs) {
    const [x, y, root, peak] = eqs;
    const milesPerPixel = 400 / (root - x(0));
    const missileLocation = [x(clickTime), y(clickTime)];
    return milesPerPixel * distance(clickLocation[0], clickLocation[1], missileLocation[0], missileLocation[1]);
}

function getMilesPerPixel(eqs) {
    const [x, y, root, peak] = eqs;
    return 400 / (root - x(0));
}

const travelTimeSeconds = 20;

export { randomLaunch, travelTimeSeconds, getClickDistance, getMilesPerPixel};
