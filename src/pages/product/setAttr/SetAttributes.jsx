import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import PrevPageButton from "../../../components/PrevPageButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SpinnerLoad from "../../../components/SpinnerLoad";
import { initializingData, onSubmit } from "./core";
import FormikError from "../../../components/form/FormikError";
import * as Yup from "yup";

const SetAttribute = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;

  const [attr, setAttr] = useState();
  const [initialValues, setInitialValues] = useState(null);
  const [validationSchema, setValidationSchema] = useState({});

  const handleGetAttributes = async () => {
    const { attrsVar, initials, rules } = await initializingData(
      selectedProduct
    );
    setAttr(attrsVar);
    setInitialValues(initials);
    setValidationSchema(Object.keys(initials).length > 0 ? Yup.object(rules) : {}) 
  };

  useEffect(() => {
    handleGetAttributes();
  }, []);

  return (
    <div className="container">
      <h4 className="text-center my-3">
        افزودن ویژگی محصول:{" "}
        <span className="text-primary">{selectedProduct.title}</span>
      </h4>
      <div className="text-left col-md-6 col-lg-8 m-auto my-3 ">
        <PrevPageButton />
      </div>
      <div className="row justify-content-center">
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) =>
              onSubmit(values, actions, selectedProduct.id)
            }
            validationSchema={validationSchema}
          >
            <Form>
              {attr.map((attr, index) => (
                <div
                  key={"group" + index}
                  className="row justify-content-center"
                >
                  <h6 className="text-center">گروه : {attr.groupTitle}</h6>
                  {attr.data.length > 0 ? (
                    attr.data.map((attrData) => (
                      <div
                        className="col-12 col-md-6 col-lg-8"
                        key={attrData.id}
                      >
                        <div className="input-group my-3 dir_ltr">
                          <span className="input-group-text w_6rem justify-content-center">
                            {" "}
                            {attrData.unit}{" "}
                          </span>
                          <Field
                            name={attrData.id}
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                          <span className="input-group-text w_8rem justify-content-center">
                            {attrData.title}
                          </span>
                        </div>
                        <ErrorMessage
                          name={attrData.id}
                          component={FormikError}
                        />
                      </div>
                    ))
                  ) : (
                    <small className="text-center text-danger ">
                      هیچ ویژگی برای گروه های این محصول ایجاد نشده است
                    </small>
                  )}
                </div>
              ))}

              <div className="btn-box text-center col-12 col-md-6 col-lg-8 mt-6 m-auto">
                <SubmitButton />
                <PrevPageButton className="me-2" />
              </div>
            </Form>
          </Formik>
        ) : (
          <SpinnerLoad />
        )}
      </div>
    </div>
  );
};

export default SetAttribute;
