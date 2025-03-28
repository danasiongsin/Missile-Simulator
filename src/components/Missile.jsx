function Missile({ style }) {
    return (
        <div style={ style }>
            <svg
                width="50"
                height="100"
                viewBox="0 0 150 300"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M50 40 Q75 20 100 40 V200 Q75 225 50 200 Z" fill="black" stroke="black" stroke-width="3" />

                <polygon points="50,40 100,40 75,5" fill="black" stroke="black" stroke-width="3" />

                <polygon points="50,180 10,220 50,220" fill="black" stroke="black" stroke-width="3" />
                <polygon points="100,180 140,220 100,220" fill="black" stroke="black" stroke-width="3" />

                <path d="M50 220 Q75 290 100 220" fill="black" stroke="black" stroke-width="2" opacity="0.7" />
            </svg>
        </div>
    );
}

export default Missile;
