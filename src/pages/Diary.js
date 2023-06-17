import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <div>{id}번 일기</div>
      <div>다이어리 페이지 입니다</div>
    </div>
  );
};

export default Diary;
