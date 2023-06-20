import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import React, { useReducer, useRef, useEffect, useState } from "react";

/////// 가상의 데이터 MOCK //////// 함수 외부에 넣는게 좋다.
const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

/////////////////////////////////////////////////////////////////

function App() {
  // 데이터 로딩 상태
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0); // 고유한 key를 부여하기 위해

  // onCreate - 새로운 일기 생성
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(), // 매개변수 date
        content,
        emotionId,
      },
    });
    idRef.current += 1; // 다음 일기를 생성할 때 고유 아이디가 겹치지 않도록
  };

  // UPDATE 기능
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  // DELETE 기능
  const onDelete = (targetId) => {
    //매개변수 targetId = 삭제 대상
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  function reducer(state, action) {
    switch (action.type) {
      ///////// mock ////////
      case "INIT": {
        return action.data;
      }

      ///////// create ////////
      case "CREATE": {
        return [action.data, ...state];
      }

      ///////// update ////////
      case "UPDATE": {
        // 조건에 맞으면 변화된 액션 값을 it의 해당 인덱스에 집어 넣고
        // 부합하지 않으면 it 값을 그대로 그냥 해당 인덱스에 집어 넣는다
        return state.map((it) =>
          String(it.id) === String(action.data.id) ? { ...action.data } : it
        );
      }

      ///////// delete ////////
      case "DELETE": {
        // filter 해당 조건에 부합한 경우에만 it을 가지고 온다
        // action의 targetId와 같지 않은 것만 나열한다.
        return state.filter((it) => String(it.id) !== String(action.targetId));
      }

      default: {
        return state;
      }
    }
  }

  // useEffect
  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    // 데이터 로딩 상태
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
export default App;
