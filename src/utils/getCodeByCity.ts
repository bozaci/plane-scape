import { airportCodes } from './constants';

const airportCodesReversed = Object.fromEntries(
  Object.entries(airportCodes).map(([code, city]) => [city, code]),
);

const getCodeByCity = (city: string) => {
  return airportCodesReversed[city] ? airportCodesReversed[city] : '';
};

export { getCodeByCity };
