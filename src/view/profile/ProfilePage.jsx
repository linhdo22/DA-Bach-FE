import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  notification,
} from "antd";
import moment from "moment";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountService from "../../api/account.api";
import { GENDER, ROLES } from "../../common/constant";
import { genderMapping, roleMapping } from "../../common/mapping";
import { authActions } from "../../store/authenticationSlice";

const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);

const ProfilePage = () => {
  const account = useSelector((state) => state.authentication.account);
  const dispatch = useDispatch();
  const [infoForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleChangeProfile = async (values) => {
    const { name, phone, gender, dateOfBirth } = values;
    if (!name && !phone) return;
    try {
      const response = await accountService.changeProfile({
        name,
        phone,
        gender,
        dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
      });
      dispatch(authActions.setAccount({ ...account, ...response.data }));
      notification.success({ message: "Success" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Something wrong" });
    }
  };

  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      const response = await accountService.changePassword({
        oldPassword,
        newPassword,
      });
      passwordForm.resetFields();
      notification.success({ message: "Success" });
    } catch (error) {
      notification.error({ message: "Something wrong" });
    }
  };

  const options = Object.values(ROLES).map((r) => ({
    label: roleMapping[r],
    value: r,
  }));

  const genderOption = Object.values(GENDER).map((g) => ({
    value: g,
    label: genderMapping[g],
  }));

  useEffect(() => {
    if (account) {
      const { dateOfBirth, ...values } = account;
      infoForm.setFieldsValue({ dateOfBirth: moment(dateOfBirth), ...values });
    }
  }, [account, infoForm]);

  if (!account) {
    return null;
  }
  return (
    <>
      <div style={{ padding: 20, paddingTop: 0, paddingBottom: 60 }}>
        <Typography.Title level={3}>Profile</Typography.Title>
        {/* info */}
        <Divider />
        <Typography.Title level={5}>Info</Typography.Title>
        <Form form={infoForm} onFinish={handleChangeProfile}>
          <Form.Item name="email" label="Email" labelCol={{ span: 24 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="Role" labelCol={{ span: 24 }}>
            <Select disabled options={options} />
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
          <Form.Item name="gender" label="Gender" labelCol={{ span: 24 }}>
            <Select options={genderOption} />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            labelCol={{ span: 24 }}
          >
            <MyDatePicker />
          </Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form>

        {/* password */}
        <Divider />
        <Typography.Title level={5}>Change password</Typography.Title>
        <Form form={passwordForm} onFinish={handleChangePassword}>
          <Form.Item
            name="oldPassword"
            label="Old Password"
            labelCol={{ span: 24 }}
            rules={[{ required: true, min: 6 }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
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
                  if (!value || getFieldValue("newPassword") === value) {
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
          <Button htmlType="submit">Save</Button>
        </Form>
      </div>
    </>
  );
};

export default ProfilePage;
