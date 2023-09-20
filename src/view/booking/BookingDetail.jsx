import { Button, Col, Divider, Input, Row, Tag, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import bookingService from "../../api/booking.api";
import ratingService from "../../api/rating.api";
import { ROLES, ROUTE_PATH } from "../../common/constant";
import DiagnoseModal from "./DiagnoseModal";
import FeedbackModal from "./FeedbackModal";

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
  const account = useSelector((state) => state.authentication.account);
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRated, setIsRated] = useState();

  const handleFinish = async (values) => {
    try {
      const response = await bookingService.finish({
        ...values,
        customerId: booking.customer.id,
        bookingId: booking.id,
      });
      setBooking(response.data);
      setIsFinishModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintPDF = () => {
    localStorage.setItem("drugs", JSON.stringify(booking.diagnosis.drugs));
    window.open(ROUTE_PATH.VIEW_PDF);
  };

  const handleSubmitFeedback = async (values) => {
    try {
      await ratingService.create({
        ...values,
        doctorId: booking.doctor.id,
        customerId: booking.customer.id,
      });
      setIsFeedbackModalOpen(false);
      setIsRated(true);
      getBooking();
    } catch (error) {
      console.log(error);
    }
  };

  async function getBooking() {
    const response = await bookingService.getById(id);
    console.log(response.data);
    setBooking(response.data);
  }

  useEffect(() => {
    async function check() {
      try {
        const response = await ratingService.check({
          doctorId: booking.doctor.id,
          customerId: booking.customer.id,
        });
        setIsRated(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    check();
  }, [booking]);

  useEffect(() => {
    getBooking();
  }, []);
  if (!booking) {
    return null;
  }
  return (
    <div style={{ padding: 20, paddingTop: 0 }}>
      <DiagnoseModal
        isOpen={isFinishModalOpen}
        onSubmit={handleFinish}
        onCancel={() => setIsFinishModalOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onSubmit={handleSubmitFeedback}
        onCancel={() => setIsFeedbackModalOpen(false)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Typography.Title level={3}>Booking</Typography.Title>
        {account.role === ROLES.DOCTOR && !booking.isFinished && (
          <Button type="primary" onClick={() => setIsFinishModalOpen(true)}>
            Finish
          </Button>
        )}
      </div>
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
            <Typography.Text strong>End time:</Typography.Text>
            <Typography.Text>
              {moment(booking.end).format("YYYY-MM-DD hh:mm")}
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: "20px 0px 0px" }} />
      <Row gutter={[40]}>
        <Col span={12}>
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              {" "}
              Doctor Info
            </Typography.Title>
            {account.role === ROLES.CUSTOMER && booking.isFinished && (
              <Button
                size="small"
                disabled={isRated}
                onClick={() => setIsFeedbackModalOpen(true)}
              >
                Rate
              </Button>
            )}
          </div>
          <UserInfo info={booking.doctor} />
          {account.role === ROLES.CUSTOMER && (
            <div
              style={{
                display: "flex",
                marginTop: 5,
                justifyContent: "space-between",
              }}
            >
              <Typography.Text strong>Rate:</Typography.Text>
              <Typography.Text>{booking.doctor.rate}/5</Typography.Text>
            </div>
          )}
        </Col>
        <Col span={12}>
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              {" "}
              Customer Info
            </Typography.Title>
          </div>

          <UserInfo info={booking.customer} />
        </Col>
      </Row>
      <Divider style={{ margin: "20px 0px 0px" }} />
      <Row>
        <Col span={14}>
          <Typography.Title level={5}>Dignosis</Typography.Title>
          <b>- Doctor {booking.doctor.name}:</b>
          <Input.TextArea
            style={{ marginTop: 10, minHeight: 200 }}
            readOnly
            value={booking.diagnosis?.content}
          ></Input.TextArea>
        </Col>
        {booking.diagnosis?.drugs && (
          <Col span={8} offset={2}>
            <div
              style={{
                margin: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                Drugs
              </Typography.Title>
              {booking.isFinished && (
                <Button size="small" onClick={handlePrintPDF}>
                  Print PDF
                </Button>
              )}
            </div>
            {booking.diagnosis.drugs.map((drug) => (
              <li key={drug.id}>
                {drug.name}: {drug.count}
              </li>
            ))}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BookingDetail;
