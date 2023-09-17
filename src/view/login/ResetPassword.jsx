import { Button, Form, Input, Typography, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../api/auth.api";
import { defaultColors } from "../../common/color";
import { ROUTE_PATH } from "../../common/constant";

function ForgotPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const handleFinish = async (values) => {
    try {
      await authService.resetPassword({
        email,
        token,
        password: values.password,
      });
      notification.success({
        message: `Success, redirecting to login...`,
      });
      setTimeout(() => {
        navigate(ROUTE_PATH.LOGIN);
      }, 4000);
    } catch (error) {
      console.log(error);
      notification.error({ message: "Something wrong" });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <div
        style={{
          width: 400,
          minHeight: 250,
          borderRadius: 20,
          backgroundColor: "white",
          border: `1px solid ${defaultColors.primary}`,
          padding: 24,
        }}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: "center", margin: "0 0 24px 0" }}
        >
          Reset password
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ textAlign: "center", margin: "0 0 24px 0" }}
        >
          Please create new password for account: {email}
        </Typography.Title>
        <Form onFinish={handleFinish}>
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
          <Button
            type="primary"
            style={{ width: "100%", marginTop: 16 }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
