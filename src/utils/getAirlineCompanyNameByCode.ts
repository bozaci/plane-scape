import { airlineCompanyCodes } from './constants';

const getAirlineCompanyNameByCode = (code: string) => {
  return airlineCompanyCodes[code] ? airlineCompanyCodes[code] : '-';
};

export { getAirlineCompanyNameByCode };
