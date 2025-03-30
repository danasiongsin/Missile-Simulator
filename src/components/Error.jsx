const Error = ({ distance }) => {
    return (
        <div className="error">
            Error: {distance?.toFixed(2) || '____'} miles
        </div>
    );
}

export default Error;
