import { airportCodes } from './constants';

const getCityByCode = (code: string) => {
  return airportCodes[code] ? airportCodes[code] : '-';
};

export { getCityByCode };
