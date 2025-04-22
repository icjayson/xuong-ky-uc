import { ColorSchemeColors } from "@/components/ui/color-selector";
import React from "react";

export type MemoryContextType = {
  refetchMemories: () => void;
  setIsLoading: (isLoading: boolean) => void;
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
};

export const MemoryContext = React.createContext<MemoryContextType>({
  refetchMemories: () => {},
  setIsLoading: () => {},
  isCreating: false,
  setIsCreating: () => {}
});

export type Person = {
  name: string;
  nickname: string;
  dob: Date;
  zodiac: string;
  description: string;
  avatar: File | string;
};

export type SettingContextType = {
  person1: Person;
  setPerson1: (person: Person) => void;
  person2: Person;
  setPerson2: (person: Person) => void;
  previewData: Data;
  setPreviewData: (data: Data) => void;
};

export const SettingContext = React.createContext<SettingContextType>({
  person1: {
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  },
  person2: {
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  },
  setPerson1: () => {},
  setPerson2: () => {},
  previewData: {} as Data,
  setPreviewData: () => {}
});

export type Data = {
  title: string | null;
  avatar_1_url: string | File;
  avatar_2_url: string | File;
  clock_type: number | null;
  color_scheme: {
    [key: string]: ColorSchemeColors;
  } | null;
  created_at: string;
  font: string | null;
  id: string;
  is_sharing: boolean;
  user_id: string;
  person1_name: string | null;
  person1_nickname: string | null;
  person1_dob: string | null;
  person1_description: string | null;
  person1_zodiac: string | null;
  person2_name: string | null;
  person2_nickname: string | null;
  person2_dob: string | null;
  person2_description: string | null;
  person2_zodiac: string | null;
  start_date_of_love: string | null;
};

export type Memories = {
  id: number;
  image_url: string;
  location: string;
  memory_date: string;
  description: string;
};

type MainPageContextType = {
  data: Data;
  memories: Memories[];
  isLoading: boolean;
  color: ColorSchemeColors;
  colorKey: string;
  isBelongsToUser: boolean;
  isNotSharing: boolean;
};

export const MainPageContext = React.createContext<MainPageContextType>({
  data: {} as Data,
  memories: [] as Memories[],
  isLoading: false,
  color: {} as ColorSchemeColors,
  colorKey: "",
  isBelongsToUser: true,
  isNotSharing: false
});
