import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import { getCategoryServices } from "../../services/category";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import { JalaliConvertDate } from "../../utils/JalaliConvertDate";

const CategoryTable = () => {
  const params = useParams();
  const [data, setData] = useState([]);

  const handleGetCategories = async () => {
    try {
      const res = await getCategoryServices(params.categoryId);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetCategories();
  }, [params]);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "price", title: "قیمت محصول" },
    { field: "parent_id", title: "والد" },
  ];

  const additionField = [
    {
      title: "تاریخ",
      elements: (rowData) => JalaliConvertDate(rowData.created_at),
    },

    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },

    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  return (
    <>
      <Outlet />
      {data.length ? (
        <PaginatedTable
          data={data}
          dataInfo={dataInfo}
          additionField={additionField}
          searchParams={searchParams}
          numOfPage={3}
        >
          <AddCategory />
        </PaginatedTable>
      ) : (
        <h5 className="text-center my-5 text-danger">هیچ دسته بندی یافت نشد</h5>
      )}
    </>
  );
};

export default CategoryTable;
