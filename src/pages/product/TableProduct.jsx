import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import PaginatedDataTable from "../../components/PaginatedDataTable";
import { getProductsService } from "../../services/products";
import Actions from "./tableAddition/Actions";

const TableProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [countOnPage, setCountOnPage] = useState(5); // product counts on each page
  const [pageCount, setPageCount] = useState(0); // count of all pages

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (rowData) => rowData.categories[0].title,
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  const handleGetProducts = async (page, count, char) => {
    setLoading(true);
    const res = await getProductsService(page, count, char);
    res && setLoading(false);
    if (res.status === 200) {
      setData(res.data.data);
      setPageCount(res.data.last_page);
    }
  };

  const handleSearch = (char) => {
    setSearchChar(char);
    handleGetProducts(1, countOnPage, char);
  };

  useEffect(() => {
    handleGetProducts(currentPage, countOnPage, searchChar);
  }, [currentPage]);

  return (
    <PaginatedDataTable
      tableData={data}
      dataInfo={dataInfo}
      searchParams={searchParams}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageCount={pageCount}
      handleSearch={handleSearch}
    >
      <AddProduct />
    </PaginatedDataTable>
  );
};

export default TableProduct;
