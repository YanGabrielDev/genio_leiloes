import './App.css';
import { Input } from './components/ui/input';
import { auctionMock } from './mock/auction';

function App() {
  const initialVisibility = auctionMock.flatMap((auction) => auction.veiculos);

  return (
    <main className="bg-blue-100 flex flex-col min-h-screen">
      <header className="bg-white px-12 w-full items-center flex flex-col gap-4 py-4">
        <span className="text-blue-600 font-semibold text-2xl flex items-center">
          Auction Shopping
        </span>
        <Input placeholder='Buscar veiculo' />
      </header>
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {initialVisibility.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <span className="text-xs text-gray-600">{item.tipo}</span>
            <span className="text-slate-950 font-medium mb-2">{item.nome}</span>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <span className="text-xs text-gray-600">Lance inicial</span>

                <strong>R$ {item.lance_inicial}</strong>
              </div>
              <div className='flex flex-col gap-1'>
                <span className="text-xs text-gray-600">Tabela Fipe</span>

                <strong>R$ {item.tabela_fipe}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
