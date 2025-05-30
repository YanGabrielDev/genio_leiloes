import { cities } from "@/mock/cities.mock";
import { DropdownFilter } from "../DropdownFilter";
import { Input } from "../ui/input";
import { useMemo } from "react";
import { AuthButton } from "./auth-button";
import { useUserProfile } from "@/context/user-profile.context";
import { VehicleFilters } from "../VehicleFilters";

interface HeaderProps {
  search?: string;
  cityFilterOptions?: {
    value: string;
    label: string;
  }[];
  handleChangeSearch?: (search: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header = ({
  handleChangeSearch,
  search,
  onLogin,
  onLogout,
}: HeaderProps) => {
  const { userProfile } = useUserProfile()
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null;  
  //   const cityOptions = useMemo(() => {
  //   return cities.map((city) => ({
  //     label: city,
  //     value: city,
  //   }));
  // }, [cities]);
console.log({userProfile});

  return (
    <header className="bg-white px-12 w-full flex flex-col gap-4 py-4  border-b-primary border-b">
      <div className="flex justify-between items-center">
        <span className="text-primary font-semibold text-2xl flex items-center">
          Busca leilões
        </span>
        
        <AuthButton
          user={user}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      </div>

      {handleChangeSearch && (
        <div className="flex gap-1 items-start w-full md:flex-row flex-col ">
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
            
            {/* <DropdownFilter
              emptyList="Cidade não encontrada"
              label="Selecione um estado"
              options={cityOptions}
            /> */}
            <VehicleFilters/>
          </div>
        </div>
      )}
    </header>
  );
};