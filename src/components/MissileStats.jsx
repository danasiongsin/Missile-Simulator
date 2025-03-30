const MissileStats = ({ missile }) => {
    return (
        <div className="stats">
            <li className="stats-list">Position: {missile ? `(${missile.x.toFixed(2)}, ${missile.y.toFixed(2)})` : 'N/A'}</li>
            <li className="stats-list">Velocity: {missile ? `${missile.velocity.toFixed(2)} px/s` : 'N/A'}</li>
        </div>
    );
};

export default MissileStats;
