import { Button, Form, Input, InputNumber, Modal, notification } from "antd";
import React from "react";
import drugService from "../../api/drug.api";

const AddDrugModal = ({ onCancel, onSuccess }) => {
  const handleSubmit = async (values) => {
    try {
      await drugService.create(values);
      notification.success({ message: "Tao thanh cong" });
      onSuccess();
    } catch (error) {
      console.error(error);
      notification.error({ message: "Loi" });
    }
  };

  return (
    <Modal open onCancel={onCancel} title="Add new drug" footer={null}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          labelCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          labelCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <Input.TextArea cols={3} />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Initial Stock"
          labelCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <div style={{ display: "flex", width: "100%", columnGap: 16 }}>
          <Button style={{ flexGrow: 1 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button style={{ flexGrow: 1 }} type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddDrugModal;
