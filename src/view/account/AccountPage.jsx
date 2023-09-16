import { Button, Row, Typography, notification } from "antd";
import React, { useEffect, useState } from "react";
import accountService from "../../api/account.api";
import usePagination from "../../hook/usePagination";
import AccountTable from "./AccountTable";
import AddAccountModal from "./AddAccountModal";
import UpdateAccountModal from "./UpdateAccountModal";

// const data = [
//   {
//     email: "a@gmail.com",
//     role: ROLES.ADMIN,
//   },
//   {
//     email: "b@gmail.com",
//     role: ROLES.DOCTOR,
//   },
//   {
//     email: "c@gmail.com",
//     role: ROLES.CUSTOMER,
//   },
// ];

const AccountPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updatingAccount, setUpdatingAccount] = useState();
  const [accountList, setAccountList] = useState([]);
  const { PaginationComponent, paginationOptions, setPaginationOptions } =
    usePagination({
      onChange: (page) => {
        fetchList(page);
      },
    });

  const handleRemove = async (account) => {
    try {
      await accountService.remove({ accountId: account.id });
      notification.success({ message: "Removed" });
      fetchList();
    } catch (error) {
      console.error(error);
      notification.error({ message: "Error" });
    }
  };

  async function fetchList(page) {
    try {
      const response = await accountService.getList({
        page: page ?? paginationOptions.page,
        limit: paginationOptions.limit,
      });
      const { results, ...others } = response.data;
      setPaginationOptions(others);
      setAccountList(results || []);
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
        <Typography.Title level={3}>Account Management</Typography.Title>
        <div style={{ margin: "16px 0px" }}>
          <Button type="primary" onClick={() => setAddModalOpen(true)}>
            Add New
          </Button>
        </div>
        <AccountTable
          onUpdate={setUpdatingAccount}
          onRemove={handleRemove}
          list={accountList}
          offset={paginationOptions.limit * (paginationOptions.page - 1)}
        />
        <Row justify="end" style={{ marginTop: 20 }}>
          {PaginationComponent}
        </Row>
      </div>
      {addModalOpen && (
        <AddAccountModal onCancel={() => setAddModalOpen(false)} />
      )}
      {updatingAccount && (
        <UpdateAccountModal
          account={updatingAccount}
          onCancel={() => setUpdatingAccount(undefined)}
          onSuccess={() => fetchList()}
        />
      )}
    </>
  );
};

export default AccountPage;
