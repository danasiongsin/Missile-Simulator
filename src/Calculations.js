function randomLaunch() {
    const launchLoc = [100, 100]
    // get page width and height
    const width = window.innerWidth;
    const height = window.innerHeight;
    // select random 2nd root from 1.25w to 2.25w
    const root = Math.floor(Math.random() * width) + 1.25 * width;
    // select random peak from 0.75h to 1.75h
    const peak = Math.floor(Math.random() * height) + 0.75 * height;
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

const travelTimeSeconds = 20;

export { randomLaunch, travelTimeSeconds, getClickDistance };
