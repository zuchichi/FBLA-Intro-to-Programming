export default function Button({children}) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');`}</style>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 32px",
        borderRadius: "4px",
        width: "fit-content",
      }}>
        <button
          style={{
            backgroundColor: "#c0453a",
            color: "#d6cece",

            border: "none",
            outline: "none",
            borderRadius: "10px",
            padding: "11px 20px",

            fontSize: "22px",
            fontWeight: "700",
            fontFamily: "'Inter', sans-serif",

            cursor: "pointer",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#a83b31"}
          onMouseLeave={e => e.target.style.backgroundColor = "#c0453a"}
        >
          {children}
        </button>
      </div>
    </>
  );
}