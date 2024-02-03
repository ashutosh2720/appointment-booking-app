import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calender.css";
import { FaRegCheckCircle } from "react-icons/fa";

import CustomSelect from "./CostumSelect";
import Conferm from "./Conferm";

const Calender = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfermed, setIsConfermed] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60);

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

  let formattedSelectedSlot = null;
  if (selectedSlot) {
    const startTime = moment(selectedSlot.start_time).format("LT");
    const endTime = moment(selectedSlot.end_time).format("LT");
    formattedSelectedSlot = `${startTime} - ${endTime}`;
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
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

    const adjustedSlots = selectedDay
      ? selectedDay.slots.map((slot) => ({
          ...slot,
          start_time: moment(slot.start_time).format("YYYY-MM-DDTHH:mm:ss"),
          end_time: getEndTimeForSelectedDuration(
            moment(slot.start_time).format("YYYY-MM-DDTHH:mm:ss")
          ),
        }))
      : [];

    return adjustedSlots;
  };

  const getEndTimeForSelectedDuration = (startTime) => {
    return moment(startTime)
      .add(selectedDuration, "minutes")
      .format("YYYY-MM-DDTHH:mm:ss");
  };

  const handleTimeChange = (slot) => {
    setSelectedSlot(slot);
    console.log("Slot Selected:", slot);
  };

  const design = (
    <svg
      width="286"
      height="225"
      viewBox="0 0 286 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M120 160.517L540 108V172L120 224.517V160.517Z" fill="#EDF9F1" />
      <path d="M0 125.808L612 49V113L0 189.808V125.808Z" fill="#CCE7E0" />
      <path d="M83 52.517L503 0V64L83 116.517V52.517Z" fill="#378760" />
    </svg>
  );

  const design2 = (
    <svg
      width="382"
      height="198"
      viewBox="0 0 382 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M-38 52.517L382 0V64L-38 116.517V52.517Z" fill="#CCE7E0" />
      <path
        d="M-190 135.506L230 82.9893V146.989L-190 199.506V135.506Z"
        fill="#EDF9F1"
      />
    </svg>
  );

  const formattedDate = moment(selectedDate).format("MMMM D - YYYY");

  return (
    <div className="custom-calendar-container" style={{ zIndex: 2 }}>
      <div
        className="bg"
        style={{
          position: "fixed",
          right: "0px",
          bottom: "80px",
          zIndex: "-1",
        }}
      >
        {design}
      </div>

      <div
        className="bg"
        style={{
          position: "fixed",
          left: "-10px",
          bottom: "-50px",
          zIndex: "-1",
        }}
      >
        {design2}
      </div>
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
              style={{
                width: "90%",
                textAlign: "left",
                marginBottom: "20px",
              }}
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
              <p
                style={{
                  width: "70%",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Select from variants
              </p>
              <CustomSelect
                setSelectedDuration={setSelectedDuration}
                selectedDuration={selectedDuration}
              />
              <hr style={{ width: "70%" }} />
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "start",
                  width: "70%",
                  fontWeight: "bold",
                }}
              >
                {formattedDate} Available Slots
              </p>

              {getTimeslotsForSelectedDate().map((slot) => (
                <div
                  key={slot.start_time}
                  className={`timeslot ${
                    selectedSlot && selectedSlot.start_time === slot.start_time
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleTimeChange(slot)}
                  style={{
                    backgroundColor: selectedSlot === slot ? "green" : "",
                  }}
                >
                  {`${moment(slot.start_time).format("LT")} - ${moment(
                    slot.end_time
                  ).format("LT")}`}
                  <div
                    className={
                      selectedSlot &&
                      selectedSlot.start_time === slot.start_time
                        ? "selected"
                        : "uncheck"
                    }
                  >
                    <FaRegCheckCircle />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="custom-timeslots" style={{ color: "green" }}>
              Please select the date
            </h3>
          )}
        </div>
      )}

      {!loading && (
        <div className="calender-footer" style={{ fontSize: "10px" }}>
          <p>Powered by Appointin</p>

          <button
            onClick={() => setIsConfermed(true)}
            className={selectedSlot ? "show" : "hide"}
          >
            Next <p>&gt;</p>
          </button>
        </div>
      )}

      {isConfermed && (
        <Conferm
          setIsConfermed={setIsConfermed}
          isConfermed={isConfermed}
          formattedDate={formattedDate}
          formattedSelectedSlot={formattedSelectedSlot}
        />
      )}
    </div>
  );
};

export default Calender;
