
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useVehicleFilters } from '@/context/vehicle-filter.context';

export const SearchBar = () => {
  const { setVehicleFiltersState, vehicleFiltersState } = useVehicleFilters();
  const [localSearchTerm, setLocalSearchTerm] = useState(
    vehicleFiltersState.brandModelSearch
  );
  const debouncedSearchTerm = useDebounce(localSearchTerm, 1000);

  useEffect(() => {
    setVehicleFiltersState((prevState) => ({
      ...prevState,
      brandModelSearch: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm, setVehicleFiltersState]);

  return (
    <div className="relative flex-1 max-w-2xl min-w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        placeholder="Buscar por modelo ou marca"
        value={localSearchTerm}
        onChange={(event) => {
          setLocalSearchTerm(event.target.value);
        }}
        className="pl-10"
      />
    </div>
  );
};
