import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { PageHeader, CurrencyListCard, Error, Loading } from "@/components";
import { fetchCurrencies, useCurrencies, queryKeys } from "@/hooks/useCurrencies";

type CurrencyItem = {
  id: string;
  high_24h: number;
  low_24h: number;
  image: string;
  current_price: number;
  name: string;
}

const Home: NextPage = () => {
  const { data, isLoading, error } = useCurrencies();
  const [cards, setCards] = useState<Array<CurrencyItem>>([]);

  useEffect(() => {
    if (data) {
      const resultCardsArray = [...cards, ...data].reduce((result, item) => {
        if (result.findIndex((resultItem: CurrencyItem) => { return resultItem.id === item.id }) === -1) {
          result.push(item);
        }
        return result;
      }, []);
      setCards(resultCardsArray);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>CoinGecko Market Pairs (USD)</title>
      </Head>
      <main>
        <PageHeader />
        <div>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-10">
            {isLoading ? <Loading /> : null}
            {error ? <Error message="An error occurred while getting the list of currencies"/> : null}
            {data ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards.map((card) => (
                  <CurrencyListCard
                    key={card.id}
                    image={card.image}
                    currencyName={card.name}
                    currentPrice={card.current_price}
                    high24h={card.high_24h}
                    low24h={card.low_24h}
                    id={card.id}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.CURRENCIES_LIST],
    queryFn: () => fetchCurrencies(),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home;
