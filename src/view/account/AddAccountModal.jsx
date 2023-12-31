import { Button, Form, Input, Modal, Select, notification } from "antd";
import React from "react";
import accountService from "../../api/account.api";
import { ROLES } from "../../common/constant";

const AddAccountModal = ({ onCancel, onSucces }) => {
  const handleSubmit = async (values) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { email, password, role, confirmPassword, ...profileData } = values;
      await accountService.create({
        account: { email, password, role },
        profile: profileData,
      });
      notification.success({ message: "Tao thanh cong" });
      onSucces();
    } catch (error) {
      console.error(error);
      notification.error({ message: "Loi" });
    }
  };

  const options = [
    {
      label: "Admin",
      value: ROLES.ADMIN,
    },
    {
      label: "Doctor",
      value: ROLES.DOCTOR,
    },
    {
      label: "Customer",
      value: ROLES.CUSTOMER,
    },
  ];

  return (
    <Modal open onCancel={onCancel} title="Add new account" footer={null}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          labelCol={{ span: 24 }}
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          labelCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <Select options={options} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          labelCol={{ span: 24 }}
          rules={[{ required: true, min: 6 }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          labelCol={{ span: 24 }}
          rules={[
            { required: true, min: 6 },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item name="name" label="Name" labelCol={{ span: 24 }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          labelCol={{ span: 24 }}
          rules={[
            {
              validator: (_, value) => {
                if (value) {
                  if (!/^[0-9\-\+]{9,15}$/.test(value))
                    return Promise.reject("Khong chinh xac");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
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

export default AddAccountModal;
