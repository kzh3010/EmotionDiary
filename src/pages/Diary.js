import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import { getFormattedDate } from "../util";
import Viewer from "../component/Viewer";
const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navaigate = useNavigate();

  const goBack = () => {
    navaigate(-1);
  };

  const goEdit = () => {
    navaigate(`/edit/${id}`);
  };

  if (!data) {
    // !undefined === True
    return <div>데이터를 불러오고 있습니다</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
          rightChild={<Button text={"수정하기"} onClick={goEdit} />}
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};

export default Diary;
