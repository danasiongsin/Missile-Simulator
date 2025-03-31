const Error = ({ distance, decimals=2 }) => {
    return (
        <div className="error">
            Error: {distance?.toFixed(decimals) || '____'} miles { distance && distance < 0.00001 ? '✅' : '❌' }
        </div>
    );
}

export default Error;
