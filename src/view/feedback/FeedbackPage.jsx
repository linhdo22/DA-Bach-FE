import { Col, Divider, Input, List, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ratingService from "../../api/rating.api";

const FeedbackPage = () => {
  const account = useSelector((state) => state.authentication.account);
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchList = async () => {
    const response = await ratingService.getList({ doctorId: account?.id });
    setFeedbackList(response.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <Typography.Title level={3}>Feedback</Typography.Title>
        <Divider />
        <Typography.Title level={5}>Feedback List</Typography.Title>

        <List
          itemLayout="horizontal"
          dataSource={feedbackList}
          renderItem={(item) => {
            return (
              <List.Item
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  padding: "10px 10px",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <Row style={{ width: "100%" }}>
                  <Col span={8}>
                    <Typography.Paragraph style={{ margin: 0 }}>
                      Name:{" "}
                      <Typography.Text strong>
                        {item.customer?.name}
                      </Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ margin: 0 }}>
                      Email:{" "}
                      <Typography.Text strong>
                        {item.customer?.email}
                      </Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ margin: 0 }}>
                      Phone:{" "}
                      <Typography.Text strong>
                        {item.customer?.phone}
                      </Typography.Text>
                    </Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Typography.Paragraph style={{ margin: 0 }}>
                      Rate:{" "}
                      <Typography.Text strong>{item.rate}</Typography.Text>
                    </Typography.Paragraph>

                    <Typography.Paragraph style={{ margin: 0 }}>
                      Feedback:
                    </Typography.Paragraph>
                    <Input.TextArea
                      readOnly
                      style={{ minHeight: 60, width: "100%" }}
                      value={item.feedback}
                    />
                  </Col>
                </Row>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default FeedbackPage;
