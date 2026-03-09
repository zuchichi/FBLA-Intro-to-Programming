export default function Button({children, bgColor = "c0453a", textColor="#FFFFF" }) {
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
            backgroundColor: bgColor,
            color: textColor,

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
          onMouseEnter={e => e.target.style.filter = "brightness(90%)"}
          onMouseLeave={e => e.target.style.filter = "none"}
        >
          {children}
        </button>
      </div>
    </>
  );
}