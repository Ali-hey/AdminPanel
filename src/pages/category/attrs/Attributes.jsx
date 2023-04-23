import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginatedTable from "../../../components/PaginatedTable";
import PrevPageButton from "../../../components/PrevPageButton";
import {
  deleteCategoryAttrService,
  getCategoryAttrsService,
} from "../../../services/categoryAttr";
import { Alert, Confirm } from "../../../utils/alerts";
import AttrAction from "./AttrAction";
import ShowInFilter from "./ShowInFilter";
import AddAttr from "./AddAttr";

const Attributes = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attrToEdit, setAttrToEdit] = useState(null);
  const [reInitValues, setReinitValues] = useState(null);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "unit", title: "واحد" },
  ];

  const additionField = [
    {
      title: "نمایش در فیلتر",
      elements: (rowData) => <ShowInFilter rowData={rowData} />,
    },

    {
      title: "عملیات",
      elements: (rowData) => (
        <AttrAction
          rowData={rowData}
          attrToEdit={attrToEdit}
          setAttrToEdit={setAttrToEdit}
          handleDeleteCategoryAttr={handleDeleteCategoryAttr}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetCategoryAttr = async () => {
    setLoading(true);

    try {
      const res = await getCategoryAttrsService(location.state.categoryData.id);
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      Alert("متاسفم", error.message, "warning");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategoryAttr = async (attr) => {
    if (
      await Confirm(`حذف ${attr.title}`, "آیا از حذف این رکورد مطمئن هستید؟")
    ) {
      try {
        const res = await deleteCategoryAttrService(attr.id);
        if (res.status === 200) {
          Alert(
            `${attr.title} با موفقیت حذف گردید`,
            res.data.message,
            "success"
          );
          setData((lastData) => [...lastData].filter((d) => d.id !== attr.id));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    handleGetCategoryAttr();
  }, []);

  useEffect(() => {
    if (attrToEdit)
      setReinitValues({
        title: attrToEdit.title,
        unit: attrToEdit.unit,
        in_filter: attrToEdit.in_filter ? true : false,
      });
    else setReinitValues(null);
  }, [attrToEdit]);

  return (
    <>
      <h4 className="text-center my-4">مدیریت ویژگی های دسته بندی</h4>
      <h6 className="text-center my-4">
        ویژگی های:
        <span className="text-primary">
          {location.state.categoryData.title}
        </span>
      </h6>
      <div className="container">
        <div className="row justify-content-center">
          <AddAttr
            reInitValues={reInitValues}
            location={location}
            setData={setData}
            attrToEdit={attrToEdit}
            setAttrToEdit={setAttrToEdit}
          />

          <hr />

          <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionField={additionField}
            searchParams={searchParams}
            numOfPAge={8}
            loading={loading}
          >
            <PrevPageButton />
          </PaginatedTable>
        </div>
      </div>
    </>
  );
};

export default Attributes;
