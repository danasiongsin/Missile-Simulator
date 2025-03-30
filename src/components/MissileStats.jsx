const MissileStats = ({ missile, style }) => {
    return (
        <div className="stats" style={style}>
            <li className="stats-list">Time: {missile ? `${missile.time} ms` : 'N/A'}</li>
            <li className="stats-list">Position: {missile ? `(${missile.x.toFixed(5)}, ${missile.y.toFixed(5)})` : 'N/A'}</li>
            <li className="stats-list">Velocity: {missile ? `${missile.velocity.toFixed(8)} mi/ms` : 'N/A'}</li>
            <li className="stats-list">Angle: {missile ? `${missile.angle.toFixed(8)}°` : 'N/A'}</li>
        </div>
    );
};

export default MissileStats;
