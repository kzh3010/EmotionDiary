import "./Button.css";

const Button = ({ text, type, onClick }) => {
  // 버튼속 문자, 버튼 색깔, 이벤트 핸들러
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  console.log(text);
  console.log(type);
  console.log(typeof text);
  console.log(typeof type);
  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
