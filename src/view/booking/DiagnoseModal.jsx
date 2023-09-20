import {
  Badge,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Typography,
} from "antd";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import drugService from "../../api/drug.api";

const DiagnoseModal = ({ isOpen, onCancel, onSubmit }) => {
  const [options, setOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const drugsWatch = Form.useWatch(["drugs"], form);

  const search = useCallback(async (text, key) => {
    try {
      setIsLoading(true);
      const response = await drugService.search({ name: text });
      setOptions((prev) => ({
        ...prev,
        [key]: response.data.map((d) => ({
          label: d.name,
          value: d.id,
          stock: d.stock,
        })),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const debouncedSearch = debounce(search, 500);

  return (
    <Modal
      open={isOpen}
      title="Diagnose issue"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name="content" required>
          <Input.TextArea
            cols={3}
            placeholder="Fill some issues about customer"
          />
        </Form.Item>
        <Typography.Title level={5}>Drugs</Typography.Title>
        <Form.List name="drugs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: "flex", columnGap: 10 }}>
                  <Form.Item
                    {...restField}
                    name={[name, "id"]}
                    style={{ flexGrow: 1 }}
                    rules={[{ required: true }]}
                  >
                    <Select
                      showSearch
                      filterOption={false}
                      onSearch={(text) => debouncedSearch(text, key)}
                      notFoundContent={isLoading ? <Spin size="small" /> : null}
                      options={options[key]}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "count"]}
                    style={{ marginRight: 20 }}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Invalid value");
                          }
                          const maxStock = options[key]?.find(
                            (op) => op.value === drugsWatch?.[key]?.id
                          )?.stock;
                          if (maxStock && value > maxStock) {
                            return Promise.reject("Check stock");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Badge
                      count={
                        options[key]?.find(
                          (op) => op.value === drugsWatch?.[key]?.id
                        )?.stock
                      }
                    >
                      <InputNumber />
                    </Badge>
                  </Form.Item>
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={() => add()}>Add drug</Button>
            </>
          )}
        </Form.List>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button type="primary" htmlType="submit">
            Finish
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DiagnoseModal;
