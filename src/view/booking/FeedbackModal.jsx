import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const FeedbackModal = ({ isOpen, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const options = [1, 2, 3, 4, 5].map((v) => ({
    value: v,
    label: v,
  }));

  return (
    <Modal open={isOpen} title="Feedback" onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name="rate" label="Rate" labelCol={{ span: 24 }}>
          <Select options={options} />
        </Form.Item>
        <Form.Item name="feedback" required>
          <Input.TextArea cols={3} placeholder="Feedback" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            FeedBack
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;
