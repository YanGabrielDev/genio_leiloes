import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import type { HTMLAttributes } from "react";

interface NoVehiclesFoundProps extends HTMLAttributes<HTMLDivElement> {}

export const NoVehiclesFound = ({ className, ...props }: NoVehiclesFoundProps) => {
  return (
    <div
      className={cn(
        "col-span-12 flex flex-col items-center justify-center gap-4 text-center py-16",
        className
      )}
      {...props}
    >
      <div className="rounded-full border border-dashed border-gray-300 p-4">
        <SearchX className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-800">
        Nenhum veículo encontrado
      </h2>
      <p className="max-w-md text-gray-500">
        Tente ajustar ou limpar os filtros de busca para ver mais resultados.
      </p>
    </div>
  );
};
