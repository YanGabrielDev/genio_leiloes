// src/components/Template.tsx

import { Header } from "../Header";


interface TemplateProps {
  children: React.ReactNode;
  handleChangeSearch?: (search: string) => void;
    search?: string;
  cityFilterOptions?:{
    value: string;
    label: string;
}[];
}

export const Template = ({
  children,
  handleChangeSearch,
  search,
  cityFilterOptions,
}: TemplateProps) => {
  return (
    <main className="bg-blue-100 flex flex-col min-h-screen">
      <Header
        handleChangeSearch={handleChangeSearch}
        search={search}
        cityFilterOptions={cityFilterOptions}
      />
      {children}
    </main>
  );
};