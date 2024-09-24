import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/utils/hooks';
import { setFlights } from '@/slices/flightsSlice';
import { useFetch } from '@/hooks/useFetch';
import { getRandomMultipleOfFive } from '@/utils/getRandomMultipleOfFive';
import * as Icon from 'phosphor-react';

import BookingWidget from '@/components/ui/booking-widget';
import BookingCard from '@/components/ui/booking-card';
import SelectMenu from '@/components/ui/select-menu';
import Radio from '@/components/ui/radio';
import AlertBox from '@/components/ui/alert-box';
import Card from '@/components/ui/card';
import Loader from '@/components/ui/loader';

import carRentalsBgImage from '@/assets/images/card-rentals-bg-image.jpg';
import hotelsBgImage from '@/assets/images/hotels-bg-image.jpg';
import travelPackagesBgImage from '@/assets/images/travel-packages-bg-image.jpg';
import './home.scss';

const cardsData = [
  {
    backgroundImage: carRentalsBgImage,
    icon: <Icon.Car />,
    text: 'Car Rentals',
    href: '#',
    isLink: true,
  },
  {
    backgroundImage: hotelsBgImage,
    icon: <Icon.Buildings />,
    text: 'Hotels',
    href: '#',
    isLink: true,
  },
  {
    backgroundImage: travelPackagesBgImage,
    icon: <Icon.Umbrella />,
    text: 'Travel Packages',
    href: '#',
    isLink: true,
  },
];

const Home = () => {
  const dispatch = useAppDispatch();
  const flights = useAppSelector((state) => state.flights.flights);
  const [filteredFlights, setFilteredFlights] = useState<any>(flights);
  const { data, isLoading, error } = useFetch({
    url: '/flights?includedelays=false&page=0&sort=%2BscheduleTime',
    isBaseUrl: true,
    options: {
      headers: {
        app_id: import.meta.env.VITE_API_APP_ID,
        app_key: import.meta.env.VITE_API_APP_KEY,
        ResourceVersion: import.meta.env.VITE_API_RESOURCE_VERSION,
      },
    },
  });
  const [sortByData, setSortByData] = useState([
    {
      name: 'Newest',
      value: 'newest',
      isSelected: true,
    },
    {
      name: 'Lowest Price',
      value: 'lowest-price',
    },
    {
      name: 'Highest Price',
      value: 'highest-price',
    },
  ]);

  const filterFlights = (filter: string) => {
    const updatedFlights = [...flights];

    if (filter == 'newest') {
      updatedFlights.sort((a: any) => a.scheduleDateTime - new Date().getTime());
    } else if (filter == 'lowest-price') {
      updatedFlights.sort((a: any, b: any) => a.price - b.price);
    } else if (filter == 'highest-price') {
      updatedFlights.sort((a: any, b: any) => b.price - a.price);
    }

    setFilteredFlights(updatedFlights);
  };

  useEffect(() => {
    if (!data) return;

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

    dispatch(setFlights(formattedData));
    setFilteredFlights(formattedData);
  }, [data, dispatch]);

  useEffect(() => {
    const selectedSortByFilter = sortByData.find((item) => item.isSelected);

    if (selectedSortByFilter?.value === 'newest') {
      filterFlights('newest');
    } else if (selectedSortByFilter?.value === 'lowest-price') {
      filterFlights('lowest-price');
    } else if (selectedSortByFilter?.value === 'highest-price') {
      filterFlights('highest-price');
    }
  }, [sortByData]);

  useEffect(() => {
    if (!flights) return;

    setFilteredFlights(flights);
  }, [flights]);

  return (
    <section className="home-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-9">
            <div className="home-section__left-side">
              <BookingWidget />

              <div className="row g-4">
                <div className="col-lg-9 spacing spacing--medium">
                  {isLoading ? (
                    <Loader text="Flights are loading.." />
                  ) : (
                    <>
                      {error ? (
                        <AlertBox status="error" text={error} />
                      ) : (
                        <>
                          {flights.length > 0 ? (
                            <>
                              {filteredFlights.length > 0 ? (
                                <>
                                  {filteredFlights.map((flight: any) => (
                                    <BookingCard data={flight} key={flight.id} />
                                  ))}
                                </>
                              ) : (
                                <AlertBox status="error" text="Filtered flights are not found." />
                              )}
                            </>
                          ) : (
                            <AlertBox status="error" text="Flights are not found." />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="col-lg-3">
                  <div className="home-section__filter">
                    <div className="home-section__filter-item">
                      <div className="home-section__filter-item-header">
                        <span className="section-text text-semibold">Filter the Flights</span>
                      </div>
                    </div>

                    <div className="home-section__filter-item">
                      <div className="home-section__filter-item-header">
                        <span className="section-text text-semibold">Sort by</span>
                      </div>

                      <div className="home-section__filter-item-main">
                        <SelectMenu options={sortByData} setOptions={setSortByData} />
                      </div>
                    </div>

                    <div className="home-section__filter-item">
                      <div className="home-section__filter-item-header">
                        <span className="section-text text-semibold">Arrival Time</span>
                      </div>

                      <div className="home-section__filter-item-main">
                        <Radio text="5:00 AM - 11:59 AM" name="arrival-time" />
                        <Radio text="12:00 PM - 5:59 PM" name="arrival-time" />
                      </div>
                    </div>

                    <div className="home-section__filter-item">
                      <div className="home-section__filter-item-header">
                        <span className="section-text text-semibold">Stops</span>
                      </div>

                      <div className="home-section__filter-item-main">
                        <Radio text="Nonestop" name="stops" />
                        <Radio text="1 Stop" name="stops" />
                        <Radio text="2+ Stops" name="stops" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 hidden--mobile-or-tablet">
            <div className="home-section__right-side spacing spacing--medium">
              {cardsData.map((item, index) => (
                <Card data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
