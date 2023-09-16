import { Pagination } from "antd";
import { useState } from "react";

/**
 * limit: number,
 * page: number,
 * totalPages: number,
 * totalResults: number,
 */

//   onChange(page: any, pageSize?: number): void,
//   defaultOptions?: ,
//   paginationProps?: PaginationProps,

const usePagination = ({
  onChange,
  defaultOptions = {},
  paginationProps = {},
}) => {
  const [paginationOptions, setPaginationOptions] = useState({
    limit: defaultOptions.limit ?? 10,
    page: defaultOptions.page ?? 1,
    totalPages: defaultOptions.totalPages ?? 1,
    totalResults: defaultOptions.totalResults ?? 1,
  });

  const PaginationComponent = (
    <Pagination
      current={paginationOptions.page}
      total={paginationOptions.totalResults}
      onChange={onChange}
      {...paginationProps}
    />
  );
  return {
    paginationOptions,
    setPaginationOptions,
    PaginationComponent,
  };
};

export default usePagination;
