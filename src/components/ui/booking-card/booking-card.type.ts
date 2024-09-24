export type dataType = {
  id: number;
  takeOff: {
    airport: string;
    time: string;
  };
  landing: {
    airport: string;
    time: string;
  };
  scheduleDateTime: string;
  airlineCompanyCode: string;
  price: string;
};

export interface BookingCardProps {
  data: dataType;
  isBookFlightButtonActive?: boolean;
  isCheckDetailsButtonActive?: boolean;
}
