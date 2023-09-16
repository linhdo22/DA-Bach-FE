import { Button, Form, Input, Typography, notification } from "antd";
import { defaultColors } from "../../common/color";
import authService from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await authService.login(values);
      const { account, tokens } = response.data;
      dispatch(authActions.setToken(tokens));
      dispatch(authActions.setAccount(account));
      navigate(ROUTE_PATH.HOME);
    } catch (error) {
      console.log(error);
      notification.error("Something wrong!");
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
          height: 300,
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
          Welcome
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
          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 24 }}
            rules={[{ required: true, type: "string", min: 6 }]}
          >
            <Input type="password" />
          </Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: 16 }}
            htmlType="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
