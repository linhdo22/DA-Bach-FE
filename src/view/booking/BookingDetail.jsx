import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookingService from "../../api/booking.api";
import { Col, Divider, Row, Tag, Typography } from "antd";
import moment from "moment";

const UserInfo = ({ info }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Name:</Typography.Text>
        <Typography.Text>{info.name}</Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Email:</Typography.Text>
        <Typography.Text>{info.email}</Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Phone:</Typography.Text>
        <Typography.Text>{info.phone}</Typography.Text>
      </div>
    </>
  );
};

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();

  useEffect(() => {
    async function getBooking() {
      const response = await bookingService.getById(id);
      console.log(response.data);
      setBooking(response.data);
    }
    getBooking();
  }, []);
  if (!booking) {
    return;
  }
  return (
    <div style={{ padding: 20, paddingTop: 0 }}>
      <Typography.Title level={3}>Booking</Typography.Title>
      <Divider style={{ margin: "5px 0px" }} />
      <Row>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography.Text strong>Status:</Typography.Text>
            {booking.isFinished ? (
              <Tag color="success">Finished</Tag>
            ) : moment(booking.start).isBefore(moment(), "day") &&
              !booking.isFinished ? (
              <Tag color="error">Missed</Tag>
            ) : (
              <Tag color="processing">Booked</Tag>
            )}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography.Text strong>Start time:</Typography.Text>
            <Typography.Text>
              {moment(booking.start).format("YYYY-MM-DD hh:mm")}
            </Typography.Text>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography.Text strong>End time::</Typography.Text>
            <Typography.Text>
              {moment(booking.end).format("YYYY-MM-DD hh:mm")}
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: "20px 0px 0px" }} />
      <Row gutter={[40]}>
        <Col span={12}>
          <Typography.Title level={5}> Doctor Info</Typography.Title>
          <UserInfo info={booking.doctor} />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}> Customer Info</Typography.Title>
          <UserInfo info={booking.customer} />
        </Col>
      </Row>
    </div>
  );
};

export default BookingDetail;
