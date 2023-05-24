import { useQuery } from "@tanstack/react-query";
import { axiosInstance} from "@/config/axios";

type CurrencyInfo = {
  name: string;
  market_data: {
    current_price: {
      bmd: number;
    },
    ath: {
      bmd: number;
    },
    market_cap: {
      bmd: number;
    },
    market_cap_rank: number;
  }
}

const queryKeys = {
  CURRENCY: "currency"
}

const fetchCurrency = async (id: string): Promise<CurrencyInfo> => {
  const currencyResponse =  await axiosInstance.get(`/coins/${id}`);
  return currencyResponse.data;
}

const useCurrency = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.CURRENCY, id],
    queryFn: () => fetchCurrency(id),
  })
}

export { fetchCurrency, useCurrency, queryKeys }
