import React from "react";
import Image from "next/image";

type CurrencyInfoCardProps = {
  currencyName: string;
  currentPrice: number;
  ath: number;
  marketCap: number;
  marketCapRank: number
}

export const CurrencyInfoCard: React.FC<CurrencyInfoCardProps> = ({ currencyName, currentPrice, ath, marketCap, marketCapRank }) => {
  return (
    <div className="flex flex-col rounded border-2 border-border-gray pt-4 max-w-md my-8">
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-2">{currencyName}</h2>
        <ul className="list-disc pl-5">
          <li>Current Price: {currentPrice}</li>
          <li>All time high price: {ath}</li>
          <li>Market Cap: {marketCap}</li>
          <li>Market Cap Rank: {marketCapRank}</li>
        </ul>
      </div>
    </div>
  );
}
