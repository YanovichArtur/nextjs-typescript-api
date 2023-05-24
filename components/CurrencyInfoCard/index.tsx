import React from "react";
import Image from "next/image";

type CurrencyInfoCardProps = {
  image: string;
  currencyName: string;
  currentPrice: number;
  ath: number;
  marketCap: number;
  marketCapRank: number
}

export const CurrencyInfoCard: React.FC<CurrencyInfoCardProps> = ({ image, currencyName, currentPrice, ath, marketCap, marketCapRank }) => {
  return (
    <div className="flex flex-col rounded border-2 border-border-gray pt-4 max-w-md my-8">
      <div className="flex justify-center">
        <Image
          src={image}
          alt={currencyName}
          width={200}
          height={200}
          className="object-cover object-center rounded"
          priority={false}
        />
      </div>
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
