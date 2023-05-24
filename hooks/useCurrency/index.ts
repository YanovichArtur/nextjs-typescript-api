import { useQuery } from "@tanstack/react-query";
import { axiosInstance} from "@/config/axios";

const queryKeys = {
  CURRENCY: "currency"
}

const fetchCurrency = async (id: string) => {
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
