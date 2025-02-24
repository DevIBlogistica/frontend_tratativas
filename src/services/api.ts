import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface DashboardStats {
  total: number;
  pendentes: number;
  concluidas: number;
  tempoMedio: string;
}

export interface Tratativa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  prioridade: 'baixa' | 'media' | 'alta';
  dataCriacao: string;
  dataAtualizacao: string;
  responsavel: string;
}

export interface CreateTratativaDTO {
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  responsavel: string;
}

export interface UpdateTratativaDTO extends Partial<CreateTratativaDTO> {
  status?: 'pendente' | 'em_andamento' | 'concluida';
}

export interface ApiError {
  message: string;
  code?: string;
}

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      message: 'Ocorreu um erro inesperado',
      code: 'UNKNOWN_ERROR'
    };

    if (error.response) {
      apiError.message = error.response.data.message || 'Erro na requisição';
      apiError.code = error.response.data.code;
    } else if (error.request) {
      apiError.message = 'Servidor não respondeu à requisição';
      apiError.code = 'SERVER_NO_RESPONSE';
    }

    return Promise.reject(apiError);
  }
);

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>('/dashboard/stats');
  return response.data;
}

export async function getTratativas(): Promise<Tratativa[]> {
  const response = await api.get<Tratativa[]>('/tratativas');
  return response.data;
}

export async function getTratativa(id: number): Promise<Tratativa> {
  const response = await api.get<Tratativa>(`/tratativas/${id}`);
  return response.data;
}

export async function createTratativa(data: CreateTratativaDTO): Promise<Tratativa> {
  const response = await api.post<Tratativa>('/tratativas', data);
  return response.data;
}

export async function updateTratativa(id: number, data: UpdateTratativaDTO): Promise<Tratativa> {
  const response = await api.patch<Tratativa>(`/tratativas/${id}`, data);
  return response.data;
}

export async function deleteTratativa(id: number): Promise<void> {
  await api.delete(`/tratativas/${id}`);
}

export default api; 