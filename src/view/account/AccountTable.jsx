import { Button, Table } from "antd";
import React from "react";

const AccountTable = ({ list, offset = 0, onUpdate, onRemove }) => {
  const dataSource = list.map((d, i) => ({
    ...d,
    index: offset + i + 1,
    key: d.email,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Button style={{ marginRight: 5 }} onClick={() => onUpdate?.(record)}>
            Update
          </Button>
          <Button danger onClick={() => onRemove?.(record)}>
            Remove
          </Button>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default AccountTable;
