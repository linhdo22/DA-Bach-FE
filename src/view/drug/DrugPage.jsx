import { Button, Input, Row, Typography, notification } from "antd";
import React, { useEffect, useState } from "react";
import usePagination from "../../hook/usePagination";
import DrugTable from "./DrugTable";
import drugService from "../../api/drug.api";
import AddDrugModal from "./AddDrugModal";
import UpdateDrugModal from "./UpdateDrugModal";

const DrugPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updatingDrug, setUpdatingDrug] = useState();
  const [searchText, setSearchText] = useState("");
  const [drugList, setDrugList] = useState([]);
  const { PaginationComponent, paginationOptions, setPaginationOptions } =
    usePagination({
      onChange: (page) => {
        fetchList(page);
      },
    });

  const handleRemove = async (drug) => {
    try {
      await drugService.remove({ id: drug.id });
      notification.success({ message: "Removed" });
      fetchList();
    } catch (error) {
      console.error(error);
      notification.error({ message: "Error" });
    }
  };

  const handleCreateSuccess = () => {
    setAddModalOpen(false);
    fetchList();
  };
  const handleUpdateSuccess = () => {
    setUpdatingDrug(undefined);
    fetchList();
  };

  async function fetchList(page) {
    try {
      const response = await drugService.getList({
        page: page ?? paginationOptions.page,
        limit: paginationOptions.limit,
        name: searchText,
      });
      const { results, ...others } = response.data;
      setPaginationOptions(others);
      setDrugList(results || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <Typography.Title level={3}>Drug Management</Typography.Title>
        <div style={{ margin: "16px 0px" }}>
          <Button type="primary" onClick={() => setAddModalOpen(true)}>
            Add New
          </Button>
        </div>
        <div style={{ width: 450, margin: "14px 0px" }}>
          <Input.Search
            onSearch={() => fetchList(1)}
            placeholder="Filter by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <DrugTable
          onUpdate={setUpdatingDrug}
          onRemove={handleRemove}
          list={drugList}
          offset={paginationOptions.limit * (paginationOptions.page - 1)}
        />
        <Row justify="end" style={{ marginTop: 20 }}>
          {PaginationComponent}
        </Row>
      </div>
      {addModalOpen && (
        <AddDrugModal
          onCancel={() => setAddModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
      {updatingDrug && (
        <UpdateDrugModal
          drug={updatingDrug}
          onCancel={() => setUpdatingDrug(undefined)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default DrugPage;
