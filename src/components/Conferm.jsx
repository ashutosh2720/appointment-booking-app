import React from "react";
import "../styles/Calender.css";
import { RxCrossCircled } from "react-icons/rx";

const Conferm = ({
  setIsConfermed,
  isConfermed,
  formattedDate,
  formattedSelectedSlot,
}) => {
  return (
    <div
      className="conferm"
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div className="booking-details">
        <div className="cross" onClick={() => setIsConfermed(false)}>
          <RxCrossCircled />
        </div>
        <div className="details">
          <p style={{ fontSize: "30px", fontWeight: "bold", color: "green" }}>
            Booking Confermed
          </p>
          <p>Booking Details</p>
          <p>
            <span style={{ fontWeight: "bold" }}> On the date</span> -{" "}
            {formattedDate}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> At</span>{" "}
            {formattedSelectedSlot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conferm;
