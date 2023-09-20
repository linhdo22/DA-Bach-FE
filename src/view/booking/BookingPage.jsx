import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import bookingService from "../../api/booking.api";
import ViewDetailBookingModal from "./ViewDetailBookingModal";
import { useSelector } from "react-redux";
import { ROLES } from "../../common/constant";

const localizer = momentLocalizer(moment);

const BookingPage = () => {
  const account = useSelector((state) => state.authentication.account);
  const [bookingList, setBookingList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState();
  const isDoctor = account.role === ROLES.DOCTOR;

  const fetchList = async () => {
    const response = await bookingService.getList();
    setBookingList(response.data);
  };

  const events = bookingList.map((b) => ({
    start: moment(b.start).toDate(),
    end: moment(b.end).toDate(),
    title:
      b[isDoctor ? "customer" : "doctor"].name ||
      b[isDoctor ? "customer" : "doctor"].email,
    resource: b,
  }));

  useEffect(() => {
    fetchList(moment().startOf("month"), moment().endOf("month"));
  }, []);
  return (
    <>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <Typography.Title level={3}>Account Management</Typography.Title>
        <div style={{ margin: "16px 0px" }}>
          <Calendar
            onSelectEvent={(e) => setSelectedBooking(e.resource)}
            localizer={localizer}
            events={events}
            eventPropGetter={(event, start) => {
              const booking = event.resource;
              const style = {};
              if (booking.isFinished) {
                style.backgroundColor = "green";
              } else if (
                moment(start).isBefore(moment(), "day") &&
                !booking.isFinished
              ) {
                style.backgroundColor = "red";
              }
              return { style };
            }}
            style={{ height: 500 }}
          />
        </div>
      </div>
      {selectedBooking && (
        <ViewDetailBookingModal
          isDoctor={isDoctor}
          booking={selectedBooking}
          onCancel={() => setSelectedBooking(undefined)}
        />
      )}
    </>
  );
};

export default BookingPage;
