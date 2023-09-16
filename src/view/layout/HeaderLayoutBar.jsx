import { Button, Popover, Typography } from "antd";
import React from "react";
import { defaultColors } from "../../common/color";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authenticationSlice";

const HeaderLayoutBar = (props) => {
  const account = useSelector((state) => state.authentication.account);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        backgroundColor: defaultColors.primary,
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 14px",
        alignItems: "center",
      }}
    >
      <Typography.Title level={5} style={{ margin: 0, color: "white" }}>
        Clinic
      </Typography.Title>
      <Popover
        trigger={["click"]}
        placement="bottomRight"
        arrow={false}
        title={
          <div
            style={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              rowGap: 12,
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              {account?.name ?? account?.email}
            </Typography.Title>
            <Button
              type="primary"
              color="red"
              onClick={() => dispatch(authActions.authLogout())}
            >
              Logout
            </Button>
          </div>
        }
      >
        <Button style={{ minWidth: 150, textAlign: "left" }}>
          {account?.name ?? account?.email}
        </Button>
      </Popover>
    </div>
  );
};

export default HeaderLayoutBar;
