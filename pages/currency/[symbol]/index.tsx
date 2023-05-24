import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { CurrencyInfoCard, Error, Loading, PageHeader } from "@/components";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCurrency, queryKeys, useCurrency } from "@/hooks/useCurrency";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from "next/link";

const CurrencyInformation: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useCurrency(Array.isArray(router.query.symbol) ? router.query.symbol[0] : (router.query.symbol || ""));
  return (
    <>
      <Head>
        <title>CoinGecko Market Pair Information of {data?.name}</title>
      </Head>
      <main>
        <PageHeader />
        <div>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <div>
              <Link href="/" className="py-4 px-2 text-blue-700 flex items-center w-fit">
                <ArrowLeftIcon className="h-4 w-4 text-blue-700" />
                Home
              </Link>
              {isLoading ? <Loading /> : null}
              {error ? <Error message="An error occurred while getting information about currency" /> : null}
              {data ? (
                <CurrencyInfoCard
                  image={data?.image.large}
                  currencyName={data.name}
                  currentPrice={data.market_data.current_price.bmd}
                  ath={data.market_data.ath.bmd}
                  marketCap={data.market_data.market_cap.bmd}
                  marketCapRank={data.market_data.market_cap_rank}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.CURRENCY],
    queryFn: () => fetchCurrency(Array.isArray(context.query.symbol) ? context.query.symbol[0] : (context.query.symbol || "")),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default CurrencyInformation;
