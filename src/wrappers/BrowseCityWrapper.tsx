import { Swiper, SwiperSlide } from "swiper/react";
import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import type { City } from "../types/type";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrowseCityWrapper() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/cities", {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Eror loading data: {error}</p>;
  }

  return (
    <section id="Cities" className="flex flex-col gap-[30px] mt-[100px]">
      {/* Header - Responsif */}
      <div
        id="citybrowse"
        className="w-full max-w-[1130px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-0"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-center sm:text-left">
          You Can Choose <br />
          Our Favorite Cities
        </h2>
        <a
          href="#"
          className="rounded-full py-3 px-5 bg-white font-bold hover:text-[#0A2463] transition-colors"
        >
          Explore All City
        </a>
      </div>

      {/* Swiper Container - Responsif */}
      <div className="swiper w-full">
        <div className="swiper-wrapper">
          <Swiper
            direction={"horizontal"}
            slidesPerView={"auto"}
            spaceBetween={16}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
            breakpoints={{
              320: {
                spaceBetween: 16,
                slidesOffsetBefore: 16,
                slidesOffsetAfter: 16,
              },
              640: {
                spaceBetween: 20,
                slidesOffsetBefore: 24,
                slidesOffsetAfter: 24,
              },
              768: {
                spaceBetween: 24,
                slidesOffsetBefore: 32,
                slidesOffsetAfter: 32,
              },
              1024: {
                spaceBetween: 30,
                slidesOffsetBefore: 30,
                slidesOffsetAfter: 30,
              },
              1280: {
                spaceBetween: 30,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            }}
          >
            {cities.map((city) => (
              <SwiperSlide
                key={city.id}
                className="!w-fit xl:first-of-type:pl-[calc((100%-1130px-60px)/2)] xl:last-of-type:pr-[calc((100%-1130px-60px)/2)]"
              >
                <Link to={`/city/${city.slug}`}>
                  <CityCard city={city} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
