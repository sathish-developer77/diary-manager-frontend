import { useState } from "react";
import { IconButton } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export function Events({ eve, events, setEvents }) {
  const [show, setShow] = useState(false);
  const eventdataStyles = { display: show ? "block" : "none" };

  const removeitem = (date) => {
    setEvents(events.filter((item) => item.date !== date));
  };
  return (
    <div key={eve.date} className="events">
      <h4
      style={{marginLeft:"10px"}}
      >{eve.eventname}</h4>
      <h5
      style={{alignItems:"flex-start"}}
      
      >{eve.date}</h5>
      <div>
        <IconButton
          onClick={() => setShow(!show)}
          className="movie-show-button"
          aria-label="hide"
          color="primary"
        >
          {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        <IconButton
          variant="text"
          color="inherit"
          onClick={() => removeitem(eve.date)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <p style={eventdataStyles}>{eve.eventdata}</p>
    </div>
  );
}
