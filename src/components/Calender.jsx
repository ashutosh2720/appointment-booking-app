import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calender.css";
import { FaRegCheckCircle } from "react-icons/fa";

import CustomSelect from "./CostumSelect";
import Conferm from "./Conferm";

const CustomCalendar = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfermed, setIsConfermed] = useState(false);

  useEffect(() => {
    const fetchTimeslots = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2025-12-30`
        );

        console.log(response.data);
        setTimeslots(response.data);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeslots();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when changing the date
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayHasSlots = timeslots.some((day) =>
        moment(day.date).isSame(date, "day")
      );
      return dayHasSlots && <div className="dot" />;
    }
    return null;
  };

  const getTimeslotsForSelectedDate = () => {
    if (!selectedDate) return null;

    const selectedDay = timeslots.find((day) =>
      moment(day.date).isSame(selectedDate, "day")
    );

    return selectedDay ? selectedDay.slots : [];
  };

  const handleTimeChange = (slot) => {
    setSelectedSlot(slot); // Set the selected slot
    console.log("Slot Selected:", slot);
  };


  const handleBooking = ()=>{

  }

  return (
    <div className="custom-calendar-container" style={{ zIndex: 2 }}>
      <div
        className="bg"
        style={{ position: "fixed", right: "0", bottom: "80px", zIndex: "-1" }}
      ></div>

      <div
        className="bg"
        style={{
          position: "fixed",
          left: "-120px",
          bottom: "80px",
          zIndex: "-1",
          opacity: "100px",
        }}
      ></div>
      {loading && (
        <img
          src="https://cdn.dribbble.com/users/1415337/screenshots/10781083/media/0466184625e53796cfeb7d5c5918dec8.gif"
          alt=""
        />
      )}
      {!loading && (
        <div className="custom-calendar">
          <div className="custom-date-picker">
            <h2 style={{ width: "90%", textAlign: "left" }}>Test Service</h2>
            <p
              style={{ width: "90%", textAlign: "left", marginBottom: "20px" }}
            >
              Timezone asia/calcutta
            </p>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              minDate={moment(timeslots[0]?.date).toDate()}
              maxDate={moment(timeslots[timeslots.length - 1]?.date).toDate()}
            />
          </div>

          {selectedDate ? (
            <div className="custom-timeslots">
              <p style={{ width: "70%", textAlign: "left", fontSize: "17px" }}>
                Select from variants
              </p>
              <CustomSelect />
              <hr style={{ width: "70%" }} />

              {getTimeslotsForSelectedDate().map((slot) => (
                <div
                  key={slot.start_time}
                  className={`timeslot ${
                    selectedSlot === slot ? "selected" : ""
                  }`}
                  onClick={() => handleTimeChange(slot)}
                >
                  {`${moment(slot.start_time).format("LT")} - ${moment(
                    slot.end_time
                  ).format("LT")}`}
                  <div className={selectedSlot === slot ? "check" : "uncheck"}>
                    <FaRegCheckCircle />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="custom-timeslots" style={{ color: "green" }}>
              please select the date
            </h3>
          )}
        </div>
      )}

      {!loading && (
        <div className="calender-footer" style={{ fontSize: "10px" }}>
          <p>Powered by Appointin</p>
          {selectedDate && (
            <button
              onClick={() => setIsConfermed(true)}
              className={selectedSlot ? "show" : "hide"}
            >
              Next <p>&gt;</p>
            </button>
          )}
        </div>
      )}

      {isConfermed && (
        <Conferm selectedSlot={selectedSlot}/>
      )}
    </div>
  );
};

export default CustomCalendar;
