import { Button, Table } from "antd";
import React from "react";

const DrugTable = ({ list, offset = 0, onUpdate, onRemove }) => {
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      width: "35%",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Actions",
      width: "200px",
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

export default DrugTable;
