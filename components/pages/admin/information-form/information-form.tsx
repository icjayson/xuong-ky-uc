import React, { useContext } from "react";
import InformationFormItem from "./information-form-item";
import { SettingContext } from "@/contexts/contexts";

const InformationForm = () => {
  const {
    person1,
    person2,
    setPerson1,
    setPerson2,
    previewData,
    setPreviewData
  } = useContext(SettingContext);

  return (
    <div className="flex flex-col gap-3">
      <InformationFormItem
        title="Thông tin cá nhân 1"
        name={person1.name}
        nickname={person1.nickname}
        dob={person1.dob}
        zodiac={person1.zodiac}
        description={person1.description}
        avatar={person1.avatar}
        onNameChange={(value) => {
          setPerson1({ ...person1, name: value });
          setPreviewData({ ...previewData, person1_name: value });
        }}
        onNicknameChange={(value) => {
          setPerson1({ ...person1, nickname: value });
          setPreviewData({ ...previewData, person1_nickname: value });
        }}
        onDobChange={(value) => {
          setPerson1({ ...person1, dob: value });
          setPreviewData({ ...previewData, person1_dob: value.toISOString() });
        }}
        onZodiacChange={(value) => {
          setPerson1({ ...person1, zodiac: value });
          setPreviewData({ ...previewData, person1_zodiac: value });
        }}
        onDescriptionChange={(value) => {
          setPerson1({ ...person1, description: value });
          setPreviewData({ ...previewData, person1_description: value });
        }}
        onAvatarChange={(value) => {
          setPerson1({ ...person1, avatar: value });
          setPreviewData({ ...previewData, avatar_1_url: value });
        }}
      />

      <InformationFormItem
        title="Thông tin cá nhân 2"
        name={person2.name}
        nickname={person2.nickname}
        dob={person2.dob}
        zodiac={person2.zodiac}
        description={person2.description}
        avatar={person2.avatar}
        onNameChange={(value) => {
          setPerson2({ ...person2, name: value });
          setPreviewData({ ...previewData, person2_name: value });
        }}
        onNicknameChange={(value) => {
          setPerson2({ ...person2, nickname: value });
          setPreviewData({ ...previewData, person2_nickname: value });
        }}
        onDobChange={(value) => {
          setPerson2({ ...person2, dob: value });
          setPreviewData({ ...previewData, person2_dob: value.toISOString() });
        }}
        onZodiacChange={(value) => {
          setPerson2({ ...person2, zodiac: value });
          setPreviewData({ ...previewData, person2_zodiac: value });
        }}
        onDescriptionChange={(value) => {
          setPerson2({ ...person2, description: value });
          setPreviewData({ ...previewData, person2_description: value });
        }}
        onAvatarChange={(value) => {
          setPerson2({ ...person2, avatar: value });
          setPreviewData({ ...previewData, avatar_2_url: value });
        }}
      />
    </div>
  );
};

export default InformationForm;
