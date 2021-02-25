const baseUrl = "https://finnhub.io/api/v1";
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const createCompanyDetailsUrl = (symbol: string) => {
  return `${baseUrl}/stock/profile2?symbol=${symbol}&token=${token}`;
};

export const createQuoteUrl = (symbol: string) => {
  return `${baseUrl}/quote?symbol=${symbol}&token=${token}`;
};

export const createPeersUrl = (symbol: string) => {
  return `${baseUrl}/stock/peers?symbol=${symbol}&token=${token}`;
};

export const createGraphDataUrl = (
  symbol: string,
  from: number,
  to: number
) => {
  return `${baseUrl}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${token}`;
};

export const allStockSymbolsUrl = `${baseUrl}/stock/symbol?exchange=US&token=${token}`;
