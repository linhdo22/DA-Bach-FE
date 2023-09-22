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
  Upload,
} from "antd";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import drugService from "../../api/drug.api";
import { UploadOutlined } from "@ant-design/icons";

const UpdateDiagnoseModal = ({ isOpen, diagnosis, onCancel, onSubmit }) => {
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

  useEffect(() => {
    async function fetch() {
      if (diagnosis) {
        const { drugs, ...values } = diagnosis;
        await Promise.all(
          drugs.map((d, index) => {
            return search(d.name, index);
          })
        );
        form.setFieldsValue({ ...values, drugs });
      }
    }
    fetch();
  }, [diagnosis, isOpen, form]);

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
        <Form.Item name="file" label="Upload">
          <Upload
            maxCount={1}
            action="http://localhost:3000/api/booking/upload"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Typography.Title
          level={5}
          onClick={() => console.log(form.getFieldsValue())}
        >
          Drugs
        </Typography.Title>
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
                  <Badge
                    count={
                      options[key]?.find(
                        (op) => op.value === drugsWatch?.[key]?.id
                      )?.stock
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "count"]}
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
                      <InputNumber controls={false} />
                    </Form.Item>
                  </Badge>
                  <Button
                    style={{ marginLeft: 20 }}
                    danger
                    onClick={() => remove(name)}
                  >
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

export default UpdateDiagnoseModal;
