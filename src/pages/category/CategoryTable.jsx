import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import { getCategoriesService } from "../../services/category";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/ShowInMenu";
import { JalaliConvertDate } from "../../utils/JalaliConvertDate";

const CategoryTable = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesService(params.categoryId);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [params, forceRender]);

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

      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        searchParams={searchParams}
        numOfPAge={8}
        loading={loading}
      >
        <AddCategory setForceRender={setForceRender} />
      </PaginatedTable>
    </>
  );
};

export default CategoryTable;
