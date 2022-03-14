import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";

export function AddToDiary() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  if (isMyTokenExpired) {
    alert("Need to login first");
    history.push("/login");
  }

  const [data, setData] = useState("");
  console.log(data);
  const id = myDecodedToken.id;
  console.log(id)

  const Add = async (data) => {
    const response = await fetch(`https://diary-manager-by-vrushabh.herokuapp.com/diary`, {
      method: "POST",
      body: JSON.stringify({
        userId: id,
        diarydata: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      history.push("/diary");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="main-cont">
      <div className="event-container">
        <TextField
          label="Write what you did today..."
          value={data}
          onChange={(event) => setData(event.target.value)}
          multiline={true}
          rows={15}
          style={{
            width: 600,
            minWidth: 200,
            marginTop: 10,
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => Add(data)}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
