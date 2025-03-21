// 進捗バーの代替
const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "8px", overflow: "hidden" }}>
      <div
        style={{
          width: `${value}%`,
          backgroundColor: "#FBBF24", // Tailwindのyellow-500相当
          height: "8px",
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
};
