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
  setPerson2: () => {}
});

export type Data = {
  title: string | null;
  avatar_1_url: string | null;
  avatar_2_url: string | null;
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
  isBelongsToUser: boolean;
  color: ColorSchemeColors;
  colorKey: string;
};

export const MainPageContext = React.createContext<MainPageContextType>({
  data: {} as Data,
  memories: [] as Memories[],
  isLoading: false,
  isBelongsToUser: true,
  color: {} as ColorSchemeColors,
  colorKey: ""
});
