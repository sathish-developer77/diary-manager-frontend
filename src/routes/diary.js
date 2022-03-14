import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";

export function Diary() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  if (isMyTokenExpired) {
    alert("Need to login first");
    history.push("/login");
  }

  // const [diaryData, setData] = useState({});
  const [diary, setDiary] = useState([]);
  const id = myDecodedToken.id;

  const getData = () => {
    fetch(`https://diary-manager-by-vrushabh.herokuapp.com/diary/${id}`)
      .then((data) => data.json())
      .then((data) => {
        const array = JSON.stringify(data);
        const array1 = JSON.parse(array);
        // setData(array1);
        setDiary(array1.diary);
      });
  };
  useEffect(getData, [id]);

  return (
    
    <div className="list-cont">
     <Button
            color="inherit"
            variant="primary"
            sx={{ marginLeft: 1 }}
            onClick={() =>  history.push("/add")}
          >
            Write what you did today...
          </Button>
      <div className="data-cont">
        {diary.map((eve) => (
          <div key={eve.date} className="events">
            <p>{eve.diary}</p>
            <p>Date: {eve.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
