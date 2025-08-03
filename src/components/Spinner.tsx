export default function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "2rem"}}>
      <div className="spinner">
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 5px solid white;
          border-top: 5px solid #333;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    </div>
  );
}