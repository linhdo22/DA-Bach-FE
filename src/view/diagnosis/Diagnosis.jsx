import { Button, Divider, Input, List, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import bookingService from "../../api/booking.api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";

const DiagnosisPage = () => {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);

  const fetchList = async () => {
    const response = await bookingService.getList();
    setBookingList(response.data);
  };

  const handlePrintPDF = (booking) => {
    localStorage.setItem("drugs", JSON.stringify(booking.diagnosis.drugs));
    window.open(ROUTE_PATH.VIEW_PDF);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <Typography.Title level={3}>Diagnosis Page</Typography.Title>
        <Divider />
        <Typography.Title level={5}>Diagnosis List</Typography.Title>

        <List
          itemLayout="horizontal"
          dataSource={bookingList}
          renderItem={(item, index) => {
            return (
              <List.Item
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  padding: "10px 10px",
                  borderRadius: 10,
                  marginBottom: 20,
                  position: "relative",
                }}
              >
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    navigate(`${ROUTE_PATH.BOOKING}/${item.id}`);
                  }}
                  style={{ position: "absolute", top: 5, right: 5 }}
                >
                  View Detail
                </Button>
                <div style={{ width: "100%" }}>
                  {item.isFinished ? (
                    <Tag color="success">Finished</Tag>
                  ) : moment(item.start).isBefore(moment(), "day") &&
                    !item.isFinished ? (
                    <Tag color="error">Missed</Tag>
                  ) : (
                    <Tag color="processing">Booked</Tag>
                  )}
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Doctor:{" "}
                    <Typography.Text strong>
                      {item.doctor?.name}
                    </Typography.Text>
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    Date:{" "}
                    <Typography.Text strong>
                      {moment(item.start).format("MM-DD-YYYY hh:mm")}
                    </Typography.Text>
                  </Typography.Paragraph>
                  <Typography.Paragraph>Disagnosis:</Typography.Paragraph>
                  <Input.TextArea
                    readOnly
                    style={{ minHeight: 60, maxWidth: "70%" }}
                    value={item.diagnosis?.content}
                  />
                  {item.diagnosis?.drugs.length && (
                    <>
                      <Typography.Paragraph
                        style={{ marginTop: 10, marginBottom: 0 }}
                      >
                        Drugs
                      </Typography.Paragraph>
                      <ul>
                        {item.diagnosis?.drugs?.map((d) => (
                          <li key={d.name}>
                            {d.name}: {d.count}
                          </li>
                        ))}
                      </ul>
                      <Button
                        style={{ marginTop: 10 }}
                        size="small"
                        onClick={() => handlePrintPDF(item)}
                      >
                        Print drugs
                      </Button>
                    </>
                  )}
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default DiagnosisPage;
