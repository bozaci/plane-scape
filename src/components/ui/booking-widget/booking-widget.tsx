import { useState, useEffect } from 'react';
import { errorNotify, successNotify } from '@/utils/notification';
import { getCodeByCity } from '@/utils/getCodeByCity';
import { useAppDispatch } from '@/utils/hooks';
import { getRandomMultipleOfFive } from '@/utils/getRandomMultipleOfFive';
import { setFlights } from '@/slices/flightsSlice';
import * as Icon from 'phosphor-react';
import cx from 'classnames';

import Button from '@/components/ui/button';
import ButtonGroup from '@/components/ui/button-group';
import Input from '@/components/ui/input';
import InputGroup from '@/components/ui/input-group';
import DatePicker from '@/components/ui/date-picker';
import Loader from '@/components/ui/loader';

import './booking-widget.scss';

const defaultRange = {
  from: '',
  to: '',
};

const BookingWidget = () => {
  const dispatch = useAppDispatch();
  const [takeOff, setTakeOff] = useState<string>('');
  const [landing, setLanding] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedDayRange, setSelectedDayRange] = useState<any>(defaultRange);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('round-trip');

  const handleShowFlights = () => {
    if (tab === 'round-trip' && (!takeOff || !landing || !startDate || !endDate))
      return errorNotify('All fields must be filled in to list the flights. round-trip');

    if (tab === 'one-way' && (!takeOff || !startDate || !endDate))
      return errorNotify('All fields must be filled in to list the flights. one-way');

    const formattedTakeOff = getCodeByCity(takeOff);
    const formattedLanding = getCodeByCity(landing);
    const formattedStartDate = startDate;
    const formattedEndDate = endDate;

    setIsLoading(true);
    fetch(
      `${import.meta.env.VITE_PROXY_URL}/${import.meta.env.VITE_API_BASE_URL}/flights?fromDateTime=${formattedStartDate}T00:00:00&toDateTime=${formattedEndDate}T00:00:00`,
      {
        method: 'GET',
        headers: {
          app_id: import.meta.env.VITE_API_APP_ID,
          app_key: import.meta.env.VITE_API_APP_KEY,
          ResourceVersion: import.meta.env.VITE_API_RESOURCE_VERSION,
        },
      },
    )
      .then((res) => {
        return res.json();
      })
      .then((data: any) => {
        if (!data) return errorNotify('An error occurred while showing the flights.');

        const formattedData: {
          id: any;
          takeOff: { airport: string; time: string };
          landing: { airport: string; time: string };
          scheduleDateTime: string;
          airlineCompanyCode: string;
          price: string;
        }[] = [];
        data.flights.forEach((item: any) => {
          formattedData.push({
            id: item.id,
            takeOff: {
              airport: item.prefixICAO,
              time: item.scheduleDateTime,
            },
            landing: {
              airport: item.route.destinations[0],
              time: item.expectedTimeOnBelt ? item.expectedTimeOnBelt : item.lastUpdatedAt,
            },
            scheduleDateTime: item.scheduleDateTime,
            airlineCompanyCode: item.prefixIATA,
            price: `${getRandomMultipleOfFive()}`,
          });
        });
        const filteredData: any = [...formattedData].filter(
          (flight: any) =>
            flight.takeOff.airport === formattedTakeOff ||
            flight.landing.airport === formattedLanding,
        );

        if (data?.flights.length > 0) {
          dispatch(setFlights(filteredData));
          successNotify('Flights matching your selected criteria have been found.');
        } else {
          errorNotify('No flights matching your search criteria were found.');
          dispatch(setFlights([]));
        }
      })
      .catch((err) => {
        errorNotify(err);
        dispatch(setFlights([]));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const formattedStartDate = `${selectedDayRange.from?.year}-${String(selectedDayRange.from?.month).padStart(2, '0')}-${String(selectedDayRange.from?.day).padStart(2, '0')}`;
      const formattedEndDate = `${selectedDayRange.to?.year}-${String(selectedDayRange.to?.month).padStart(2, '0')}-${String(selectedDayRange.to?.day).padStart(2, '0')}`;

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    }
  }, [selectedDayRange]);

  return (
    <div className="booking-widget">
      <div className="booking-widget__header">
        <div className="row g-2 g-lg-4">
          <div className="col-sm-6 col-md-6 col-lg-6 d-flex align-items-center">
            <div className="booking-widget__icon booking-widget__icon--rotated me-1">
              <Icon.Airplane weight="fill" />
            </div>

            <span className="section-title text-uppercase">Book Your Flight</span>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6 d-flex justify-content-start justify-content-sm-end align-items-center">
            <ButtonGroup radiusType="rounded">
              <Button
                theme="default"
                onClick={() => setTab('round-trip')}
                className={cx({
                  'button--theme-primary': tab == 'round-trip',
                  'button--theme-primary-ghost': tab !== 'round-trip',
                })}
                disabled={tab == 'round-trip'}
              >
                Round trip
              </Button>
              <Button
                theme="default"
                onClick={() => setTab('one-way')}
                className={cx({
                  'button--theme-primary': tab == 'one-way',
                  'button--theme-primary-ghost': tab !== 'one-way',
                })}
                disabled={tab == 'one-way'}
              >
                One way
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="booking-widget__main">
        <div className="row g-3">
          <div className="col-lg-6">
            {tab === 'round-trip' && (
              <>
                <InputGroup>
                  <Input
                    value={takeOff}
                    onChange={(e: any) => setTakeOff(e.target.value)}
                    icon={<Icon.AirplaneTakeoff weight="fill" />}
                    placeholder="Example: London"
                  />
                  <Input
                    value={landing}
                    onChange={(e: any) => setLanding(e.target.value)}
                    icon={<Icon.AirplaneLanding weight="fill" />}
                    placeholder="Example: London"
                  />
                </InputGroup>
              </>
            )}
            {tab === 'one-way' && (
              <Input
                value={takeOff}
                onChange={(e: any) => setTakeOff(e.target.value)}
                icon={<Icon.AirplaneTakeoff weight="fill" />}
              />
            )}
          </div>

          <div className="col-lg-6">
            <DatePicker
              selectedDayRange={selectedDayRange}
              setSelectedDayRange={setSelectedDayRange}
            >
              <InputGroup>
                <Input
                  defaultValue={startDate}
                  icon={<Icon.Calendar weight="fill" />}
                  type="text"
                />
                <Input defaultValue={endDate} icon={<Icon.Calendar weight="fill" />} type="text" />
              </InputGroup>
            </DatePicker>
          </div>
        </div>
      </div>

      <div className="booking-widget__footer">
        <Button
          onClick={handleShowFlights}
          theme="default"
          className={cx({
            'button--theme-primary': !isLoading,
            'button--theme-gray': isLoading,
          })}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader />
              <span className="ms-1">Loading..</span>
            </>
          ) : (
            <>Show flights</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingWidget;
