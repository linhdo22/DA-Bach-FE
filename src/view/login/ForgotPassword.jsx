import { defaultColors } from "../../common/color";
import { Button, Form, Input, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";
import authService from "../../api/auth.api";

function ForgotPassword() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    console.log("123");
    try {
      await authService.forgotPassword({ email: values.email });
      notification.info({
        message: `Info have sent to email: ${values.email}`,
        duration: 10000,
      });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Invalid email" });
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
          Forgot password
        </Typography.Title>
        <Form onFinish={handleFinish}>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 24 }}
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: 16 }}
            htmlType="submit"
          >
            Request change password
          </Button>
        </Form>
        <Button type="link" onClick={() => navigate(ROUTE_PATH.LOGIN)}>
          Back to login
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
