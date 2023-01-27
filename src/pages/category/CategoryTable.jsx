import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import { getCategoryServices } from "../../services/category";
import { Alert } from "../../utils/alerts";
import AddCategory from "./AddCategory";
import Actions from "./tableAdditions/Actions";
import ShowInMenu from "./tableAdditions/ShowInMenu";

const CategoryTable = () => {
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);

  const handleGetCategories = async () => {
    try {
      const res = await getCategoryServices(params.categoryId);
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        Alert("خطا!", res.data.message, "error");
      }
    } catch (error) {
      Alert("خطا!", "مشکلی از سمت سرور رخ داده ", "error");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [params]);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "price", title: "قیمت محصول" },
    { field: "parent_id", title: "والد" },
    { field: "created_at", title: "تاریخ" },
  ];

  const additionField = [
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
      {location.state ? (
        <h5 className="text-center">
          <span>زیر گروه:</span>
          <span className="text-info">{location.state.parentData.title}</span>
        </h5>
      ) : null}
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        searchParams={searchParams}
        numOfPage={3}
      >
        <AddCategory />
      </PaginatedTable>
    </>
  );
};

export default CategoryTable;
