import React from "react";
import InformationFormItem from "./information-form-item";

const InformationForm = () => {
  return (
    <div className="flex flex-col gap-3">
      <InformationFormItem title="Thông tin cá nhân 1" />
      <InformationFormItem title="Thông tin cá nhân 2" />
    </div>
  );
};

export default InformationForm;
