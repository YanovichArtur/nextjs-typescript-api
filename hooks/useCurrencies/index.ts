import { useQuery } from "@tanstack/react-query";
import { axiosInstance} from "@/config/axios";

export type CurrencyItem = {
  id: string;
  high_24h: number;
  low_24h: number;
  image: string;
  current_price: number;
  name: string;
}

const queryKeys = {
  CURRENCIES_LIST: "currenciesList"
}

const fetchCurrencies = async (): Promise<CurrencyItem> => {
  const currenciesResponse =  await axiosInstance.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      per_page: 45,
      page: 1,
    }
  });
  return currenciesResponse.data;
}

const useCurrencies = () => {
  return useQuery({
    queryKey: [queryKeys.CURRENCIES_LIST],
    queryFn: () => fetchCurrencies(),
  })
}

export { fetchCurrencies, useCurrencies, queryKeys }
