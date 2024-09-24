import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/utils/hooks';
import { useFetch } from '@/hooks/useFetch';
import { setMyFlights } from '@/slices/flightsSlice';

import SelectMenu from '@/components/ui/select-menu';
import BookingCard from '@/components/ui/booking-card';
import AlertBox from '@/components/ui/alert-box';
import Loader from '@/components/ui/loader';

import './my-flights.scss';

const MyFlights = () => {
  const dispatch = useAppDispatch();
  const myFlights = useAppSelector((state) => state.flights.myFlights);
  const { data, isLoading, error } = useFetch({
    url: `${import.meta.env.VITE_PROXY_URL}/${import.meta.env.VITE_DATABASE_API_BASE_URL}/my-flights`,
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: localStorage.getItem('uid'),
      }),
    },
  });
  const [sortByData, setSortByData] = useState([
    {
      name: 'Newest',
      value: 'newest',
      isSelected: true,
    },
    {
      name: 'Lowest',
      value: 'lowest',
    },
  ]);

  useEffect(() => {
    if (!data) return;

    dispatch(setMyFlights(data));
  }, [data, dispatch]);

  return (
    <section className="my-flights">
      <div className="container">
        <div className="my-flights__header">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="section-title section-title--big text-primary">My Flights</span>
            </div>

            {myFlights.length > 0 && (
              <div className="col-lg-6 d-flex justify-content-end align-items-center">
                <p className="section-text me-2">Sort by:</p>
                <SelectMenu options={sortByData} setOptions={setSortByData} />
              </div>
            )}
          </div>
        </div>

        <div className="my-flights__main spacing spacing--medium">
          {isLoading ? (
            <Loader text="Your flights are loading.." />
          ) : (
            <>
              {error ? (
                <AlertBox status="error" text={error} />
              ) : (
                <>
                  {myFlights.length > 0 ? (
                    <>
                      {myFlights.map((flight: any) => (
                        <BookingCard
                          data={flight}
                          key={flight.flightId}
                          isBookFlightButtonActive={false}
                          isCheckDetailsButtonActive={false}
                        />
                      ))}
                    </>
                  ) : (
                    <AlertBox status="warning" text="You haven't any booking flights." />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyFlights;
