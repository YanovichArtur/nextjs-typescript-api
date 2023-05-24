import React from "react";
import Image from "next/image";
import Link from "next/link";

type CurrencyListCardProps = {
  image: string;
  currencyName: string;
  currentPrice: number;
  high24h: number;
  low24h: number;
  id: string;
}

export const CurrencyListCard: React.FC<CurrencyListCardProps> = ({ image, currencyName, currentPrice, high24h, low24h, id }) => {
  return (
    <div className="flex flex-col rounded border-2 border-border-gray pt-4">
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
          <li>24h High: {high24h}</li>
          <li>24h Low: {low24h}</li>
        </ul>
      </div>
      <div className="p-4">
        <Link href={`/currency/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            More
        </Link>
      </div>
    </div>
  );
}
