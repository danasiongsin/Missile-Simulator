import React, { useState, useEffect } from 'react';

export default function CursorLocation() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y + 10}px`,
                left: `${position.x + 10}px`,
                padding: '5px 10px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                borderRadius: '5px',
                pointerEvents: 'none',
            }}
        >
            X: {position.x}, Y: {window.innerHeight - position.y}
        </div>
    );
}
