import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OfficeCard from "../components/OfficeCard";
import type { City } from "../types/type";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CityDetails() {
  const { slug } = useParams<{ slug: string }>();

  const [city, setCity] = useState<City | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  console.log("City data:", city);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/city/${slug}`, {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        setCity(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Loading....</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Error loading data: {error}
      </p>
    );
  }

  const baseURL = "http://127.0.0.1:8000/storage";

  return (
    <>
      <Navbar />
      <header className="flex flex-col w-full">
        <section
          id="Hero-Banner"
          className="relative flex h-[434px] max-md:h-auto max-md:flex-col"
        >
          {/* Hero Text - Desktop tetap seperti semula, Mobile responsive */}
          <div
            id="Hero-Text"
            className="relative flex flex-col w-full max-w-[650px] max-md:max-w-full h-fit rounded-[30px] max-md:rounded-[20px] border border-[#E0DEF7] p-10 max-md:p-6 gap-[30px] max-md:gap-5 bg-white mt-[70px] max-md:mt-8 ml-[calc((100%-1130px)/2)] max-md:ml-0 max-md:mx-4 z-10"
          >
            <h1 className="font-extrabold text-[50px] max-md:text-3xl leading-[60px] max-md:leading-tight">
              Great Office in <br />{" "}
              <span className="text-[#0A2463]">{city?.name} City </span>
            </h1>
            <p className="text-lg max-md:text-base leading-8 max-md:leading-7 text-[#000929]">
              Kantor yang tepat dapat memberikan impact pekerjaan menjadi lebih
              baik dan sehat dalam tumbuhkan karir.
            </p>
          </div>

          {/* Hero Image - Desktop tetap absolute*/}
          <div
            id="Hero-Image"
            className="hidden md:block absolute right-0 w-[calc(100%-((100%-1130px)/2)-305px)] h-[434px] rounded-bl-[40px] overflow-hidden max-md:relative max-md:w-full max-md:h-[200px] max-md:rounded-bl-none max-md:rounded-[20px] max-md:mx-4 max-md:mt-4"
          >
            <img
              src={`${baseURL}/${city?.photo}`}
              className="w-full h-full object-cover"
              alt="hero background"
            />
          </div>

          {/* Mobile Hero Image - Shown only on mobile */}
          <div className="block md:hidden w-full px-4 mt-4">
            <img
              src={`${baseURL}/${city?.photo}`}
              className="w-full h-[200px] object-cover rounded-[20px]"
              alt="hero background"
            />
          </div>
        </section>
      </header>

      <section
        id="Fresh-Space"
        className="flex flex-col gap-[30px] max-md:gap-6 w-full max-w-[1130px] max-md:max-w-full mx-auto mt-[70px] max-md:mt-10 mb-[120px] max-md:mb-16 max-md:px-4"
      >
        <h2 className="font-bold text-[32px] max-md:text-2xl leading-[48px] max-md:leading-9 text-nowrap max-md:text-wrap">
          Browse Offices
        </h2>

        {/* Grid - Desktop 3 kolom tetap, Mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-1 gap-[30px] max-md:gap-5">
          {city?.officeSpaces?.map((office) => (
            <Link key={office.id} to={`/office/${office.slug}`}>
              <OfficeCard office={office} />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
