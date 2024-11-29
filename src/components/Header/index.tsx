import { cities } from "@/mock/cities.mock";
import { DropdownFilter } from "../DropdownFilter";
import { Input } from "../ui/input";
import { memo, useMemo } from "react";

interface HeaderProps {
  search: string;
  cityFilterOptions: {
    value: string;
    label: string;
  }[];
  handleChangeSearch: (search: string) => void;
}
export const Header = ({
  handleChangeSearch,
  search,
  cityFilterOptions,
}: HeaderProps) => {

  const cityOptions = useMemo(() => {
    return cities.map((city) => ({
      label: city,
      value: city,
    }));
  }, [cities]);

  return (
    <header className="bg-white px-12 w-full flex flex-col gap-4 py-4">
      <span className="text-blue-600 font-semibold text-2xl flex items-center">
        Busca leilões
      </span>
      <div className="flex gap-1 items-center w-full">
        <div className="md:w-1/3 w-full">
          <Input
            placeholder="Buscar veiculo"
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              handleChangeSearch(value);
            }}
          />
        </div>
        <div className="relative">
          <DropdownFilter
            emptyList="Cidade não encontrada"
            label="Selecione um estado"
            options={cityOptions}
          />
        </div>
      </div>
    </header>
  );
};
