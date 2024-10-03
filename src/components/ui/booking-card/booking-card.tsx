import { useState, FC } from 'react';
import * as Icon from 'phosphor-react';
import { BookingCardProps } from './booking-card.type';
import { getCityByCode } from '@/utils/getCityByCode';
import { getAirlineCompanyNameByCode } from '@/utils/getAirlineCompanyNameByCode';
import { generateSlug } from '@/utils/generateSlug';
import { errorNotify, successNotify } from '@/utils/notification';
import useFormattedDate from '@/hooks/useFormattedDate';
import useDurationFromISO from '@/hooks/useDurationFromISO';
import cx from 'classnames';

import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import './booking-card.scss';

const BookingCard: FC<BookingCardProps> = ({
  data,
  isBookFlightButtonActive = true,
  isCheckDetailsButtonActive = true,
}) => {
  const { id, takeOff, landing, airlineCompanyCode, price, scheduleDateTime } = data;
  const takeOffTime = useFormattedDate(takeOff.time);
  const landingTime = useFormattedDate(landing.time);
  const totalTime = useDurationFromISO(takeOff.time, landing.time);
  const airlineCompanyLogo = `/airline-logos/${generateSlug(getAirlineCompanyNameByCode(airlineCompanyCode))}.png`;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBookFlight = () => {
    setIsLoading(true);
    fetch(
      `${import.meta.env.VITE_PROXY_URL}/${import.meta.env.VITE_DATABASE_API_BASE_URL}/book-flight`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: localStorage.getItem('uid'),
          flightId: id,
          takeOff,
          landing,
          scheduleDateTime,
          airlineCompanyCode,
          price,
        }),
      },
    )
      .then((res) => {
        return res.json();
      })
      .then((data: any) => {
        if (!data) return errorNotify('An error occurred while booking the flight.');

        if (data.status === 'error') {
          errorNotify(data.message);
        } else if (data.status === 'success') {
          successNotify(
            `Successfully booked this flight: ${getCityByCode(takeOff.airport)} - ${getCityByCode(landing.airport)}`,
          );
        }

        setIsLoading(false);
      })
      .catch((err) => {
        errorNotify(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="booking-card">
      <div className="booking-card__inner">
        <div className="booking-card__header">
          <span className="booking-card__title">
            {getCityByCode(takeOff.airport)} - {getCityByCode(landing.airport)}
          </span>
        </div>

        <div className="booking-card__main">
          <div className="row g-4">
            <div className="col-4 col-sm-4 col-md-4 col-lg-4 booking-card__item spacing spacing--small">
              <div className="d-flex align-items-center mb-1">
                <div className="booking-card__icon me-1">
                  <Icon.AirplaneTakeoff weight="bold" />
                </div>

                <p className="booking-card__text booking-card__text--medium">Departure</p>
              </div>

              <p className="booking-card__text booking-card__text--big text-semibold text-black">
                {takeOffTime}
              </p>
              <p className="booking-card__text booking-card__text--medium">
                Airport: {takeOff.airport}
              </p>
            </div>

            <div className="col-4 col-sm-4 col-md-4 col-lg-4 booking-card__item spacing spacing--small align-items-center text-center">
              {airlineCompanyCode ? (
                <div className="booking-card__airline-company-logo">
                  <img
                    src={airlineCompanyLogo}
                    alt={getAirlineCompanyNameByCode(airlineCompanyCode)}
                    className="booking-card__airline-company-logo-img"
                  />
                </div>
              ) : (
                <p className="booking-card__text booking-card__text--medium">-</p>
              )}

              <div className="booking-card__icon booking-card__icon--rotated text-primary">
                <Icon.Airplane weight="fill" fontSize={22} />
              </div>

              <p className="booking-card__text booking-card__text--medium">{totalTime} (Nonstop)</p>
            </div>

            <div className="col-4 col-sm-4 col-md-4 col-lg-4 booking-card__item spacing spacing--small align-items-end text-right">
              <div className="d-flex align-items-center mb-1">
                <div className="booking-card__icon me-1">
                  <Icon.AirplaneLanding weight="bold" />
                </div>

                <p className="booking-card__text booking-card__text--medium">Arrival</p>
              </div>

              <p className="booking-card__text booking-card__text--big text-semibold text-black">
                {landingTime}
              </p>
              <p className="booking-card__text booking-card__text--medium">
                Airport: {landing.airport}
              </p>
            </div>
          </div>
        </div>

        <div className="booking-card__footer spacing spacing--small">
          <span className="booking-card__text booking-card__text--big text-primary text-semibold">
            Price: ${price}
          </span>
          <p className="booking-card__text booking-card__text--medium">Round Trip</p>

          {isBookFlightButtonActive && (
            <Button
              onClick={handleBookFlight}
              theme="primary"
              className={cx('booking-card__book-flight-button text-semibold', {
                'button--theme-gray': isLoading,
              })}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span className="ms-1">Booking..</span>
                </>
              ) : (
                'Book Flight'
              )}
            </Button>
          )}
        </div>
      </div>

      {isCheckDetailsButtonActive && (
        <Button theme="primary-ghost" size="small" className="booking-card__check-details-button">
          Check the Details
        </Button>
      )}
    </div>
  );
};

export default BookingCard;
