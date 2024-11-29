export interface Vehicles {
  id: number;
  lote: null | string;
  condicao: string;
  chassi: string;
  placa: string;
  marca_modelo: string;
  motor: string;
  cor: string;
  ano: number;
  avaliacao: string;
  tipo: string;
  is_sucata: boolean;
  created_at: string;
  updated_at: string;
  leilao: {
    nome: string;
    estado: string;
    cidade: string;
  };
}
