import { Button, Divider, Modal, Tag, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";

const ViewDetailBookingModal = ({ booking, onCancel, isDoctor }) => {
  const navigate = useNavigate();
  const { doctor, customer, start, end } = booking;
  return (
    <Modal open title="Booking detail" onCancel={onCancel} footer={null}>
      <Divider style={{ margin: "5px 0px" }} />
      <Typography.Title level={5} style={{ margin: 0 }}>
        {isDoctor ? "Customer" : "Doctor"} Info
      </Typography.Title>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Name:</Typography.Text>
        <Typography.Text>
          {isDoctor ? customer.name : doctor.name}
        </Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Email:</Typography.Text>
        <Typography.Text>
          {isDoctor ? customer.email : doctor.email}
        </Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong>Phone:</Typography.Text>
        <Typography.Text>
          {isDoctor ? customer.phone : doctor.phone}
        </Typography.Text>
      </div>
      {!isDoctor && (
        <div
          style={{
            display: "flex",
            marginTop: 5,
            justifyContent: "space-between",
          }}
        >
          <Typography.Text strong>Rate:</Typography.Text>
          <Typography.Text>{Number(doctor.rate)}/5</Typography.Text>
        </div>
      )}
      <Divider style={{ margin: "5px 0px" }} />
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
        ) : moment(start).isBefore(moment(), "day") && !booking.isFinished ? (
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
          {moment(start).format("YYYY-MM-DD hh:mm")}
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
          {moment(end).format("YYYY-MM-DD hh:mm")}
        </Typography.Text>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 16,
        }}
      >
        <Button
          style={{ marginRight: 8 }}
          type="primary"
          onClick={() => navigate(`${ROUTE_PATH.BOOKING}/${booking.id}`)}
        >
          View detail
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default ViewDetailBookingModal;
