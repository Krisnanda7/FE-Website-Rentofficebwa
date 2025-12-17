import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Office } from "../types/type";
import axios from "axios";
import Footer from "../components/Footer";

export default function Details() {
  const { slug } = useParams<{ slug: string }>();

  const [office, setOffice] = useState<Office | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/office/${slug}`, {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        setOffice(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Eror loading data: {error}</p>;
  }

  const baseURL = "http://127.0.0.1:8000/storage";

  return (
    <>
      <Navbar />

      {/* Gallery Section - Desktop */}
      <section id="Gallery" className="hidden lg:block -mb-[50px]">
        <div className="swiper w-full">
          <div className="swiper-wrapper">
            <Swiper
              direction={"horizontal"}
              slidesPerView={"auto"}
              spaceBetween={10}
              slidesOffsetBefore={10}
              slidesOffsetAfter={10}
            >
              <SwiperSlide className="!w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                  <img
                    src={`${baseURL}/${office?.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              </SwiperSlide>
              {office?.photos?.map((photo) => (
                <SwiperSlide key={photo.id} className="!w-fit">
                  <div className="w-[700px] h-[550px] overflow-hidden">
                    <img
                      src={`${baseURL}/${photo.photo}`}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Gallery Section - Mobile */}
      <section id="Gallery-Mobile" className="block lg:hidden -mb-[50px]">
        <div className="swiper w-full">
          <div className="swiper-wrapper">
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              spaceBetween={10}
              slidesOffsetBefore={10}
              slidesOffsetAfter={10}
            >
              <SwiperSlide className="!w-fit">
                <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
                  <img
                    src={`${baseURL}/${office?.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              </SwiperSlide>
              {office?.photos?.map((photo) => (
                <SwiperSlide key={photo.id} className="!w-fit">
                  <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
                    <img
                      src={`${baseURL}/${photo.photo}`}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Details Section - Desktop */}
      <section
        id="Details"
        className="hidden lg:flex relative max-w-[1130px] mx-auto gap-[30px] mb-20 z-10"
      >
        <div className="flex flex-col w-full rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <p className="w-fit rounded-full p-[6px_16px] bg-[#0A2463] font-bold text-sm leading-[21px] text-[#F7F7FD]">
            Popular
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-extrabold text-[32px] leading-[44px]">
                {office?.name}
              </h1>
              <div className="flex items-center gap-[6px] mt-[10px]">
                <img
                  src="/assets/images/icons/location.png"
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold">{office?.city.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 1.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <img
                  src="/assets/images/icons/Star 5.svg"
                  className="w-5 h-5"
                  alt="star"
                />
              </div>
              <p className="font-semibold text-right">{office?.rating}</p>
            </div>
          </div>
          <p className="leading-[30px]">{office?.about}</p>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">You Get What You Need Most</h2>
          <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/security-user.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Privacy</p>
                <p className="text-sm leading-[21px]">For Yourself</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/cup.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Global Event</p>
                <p className="text-sm leading-[21px]">Startup Contest</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/home-trend-up.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">
                  Sustainbility
                </p>
                <p className="text-sm leading-[21px]">Long-term Goals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/coffee.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Extra Snacks</p>
                <p className="text-sm leading-[21px]">Work-Life Balance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/3dcube.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Compact</p>
                <p className="text-sm leading-[21px]">Good for Focus</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/icons/group.png"
                className="w-[34px] h-[34px]"
                alt="icon"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Free Move</p>
                <p className="text-sm leading-[21px]">Anytime 24/7</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[6px]">
            <h2 className="font-bold">Office Address</h2>
            <p>{office?.name}</p>
            <p>{office?.address}</p>
          </div>
          <div className="overflow-hidden w-full h-[280px]">
            <div
              id="my-map-display"
              className="h-full w-full max-w-[none] bg-none"
            >
              <iframe
                className="h-full w-full border-0"
                frameBorder={0}
                src={`https://www.google.com/maps/embed/v1/place?q=${office?.name},&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              />
            </div>
            <a
              className="from-embedmap-code"
              href="https://www.bootstrapskins.com/themes"
              id="enable-map-data"
            >
              premium bootstrap themes
            </a>
          </div>
        </div>
        <div className="w-[392px] flex flex-col shrink-0 gap-[30px]">
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
            <div>
              <p className="font-extrabold text-[32px] leading-[48px] text-[#0A2463]">
                Rp {office?.price.toLocaleString("id")}
              </p>
              <p className="font-semibold mt-1">
                For {office?.duration} days working
              </p>
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-5">
              {office?.benefits?.map((benefit) => (
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/images/icons/verify.png"
                    className="w-[30px] h-[30px]"
                    alt="icon"
                  />
                  <p className="font-semibold leading-[28px]">{benefit.name}</p>
                </div>
              ))}
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-[14px]">
              <Link to={`/office/${office?.slug}/book`}>
                <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0A2463] font-bold text-[#F7F7FD]">
                  <img
                    src="/assets/images/icons/slider-horizontal-white.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                  <span>Book This Office</span>
                </div>
              </Link>
              <button className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[16px_26px] gap-3 bg-white font-semibold">
                <img
                  src="/assets/images/icons/save-add.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <span>Save for Later</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[20px] bg-white">
            <h2 className="font-bold">Contact Our </h2>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/photo-1.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Krisnanda</p>
                    {/* <p className="text-sm leading-[21px]">Sales Manager</p> */}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="tel:6282144603278">
                    <img
                      src="/assets/images/icons/call.png"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="https://wa.me/6282144603278?text=hallo%20min,%20saya%20ada%20kendala">
                    <img
                      src="/assets/images/icons/chat.png"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              {/* <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src="/assets/images/photos/photo-2.png"
                      className="w-full h-full object-cover"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Tian Ortisan</p>
                    <p className="text-sm leading-[21px]">Sales Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img
                      src="/assets/images/icons/call-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/assets/images/icons/chat-green.svg"
                      className="w-10 h-10"
                      alt="icon"
                    />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Details Section - Mobile */}
      <section
        id="Details-Mobile"
        className="block lg:hidden relative w-full mx-auto px-4 mb-20 z-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-full rounded-2xl border border-[#E0DEF7] p-4 sm:p-6 gap-4 sm:gap-6 bg-white">
            <p className="w-fit rounded-full p-[6px_16px] bg-[#0A2463] font-bold text-xs sm:text-sm leading-[21px] text-[#F7F7FD]">
              Popular
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight">
                  {office?.name}
                </h1>
                <div className="flex items-center gap-[6px] mt-[10px]">
                  <img
                    src="/assets/images/icons/location.png"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="icon"
                  />
                  <p className="font-semibold text-sm sm:text-base">
                    {office?.city.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1">
                  <img
                    src="/assets/images/icons/Star 1.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt="star"
                  />
                  <img
                    src="/assets/images/icons/Star 1.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt="star"
                  />
                  <img
                    src="/assets/images/icons/Star 1.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt="star"
                  />
                  <img
                    src="/assets/images/icons/Star 1.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt="star"
                  />
                  <img
                    src="/assets/images/icons/Star 5.svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    alt="star"
                  />
                </div>
                <p className="font-semibold text-sm sm:text-base">
                  {office?.rating}
                </p>
              </div>
            </div>
            <p className="leading-[24px] sm:leading-[30px] text-sm sm:text-base">
              {office?.about}
            </p>
            <hr className="border-[#F6F5FD]" />
            <h2 className="font-bold text-lg sm:text-xl">
              You Get What You Need Most
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/security-user.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Privacy
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    For Yourself
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/cup.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Global Event
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    Startup Contest
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/home-trend-up.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Sustainability
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    Long-term Goals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/coffee.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Extra Snacks
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    Work-Life Balance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/3dcube.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Compact
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    Good for Focus
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/icons/group.png"
                  className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-base sm:text-lg leading-[24px]">
                    Free Move
                  </p>
                  <p className="text-xs sm:text-sm leading-[21px]">
                    Anytime 24/7
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-[6px]">
              <h2 className="font-bold text-lg sm:text-xl">Office Address</h2>
              <p className="text-sm sm:text-base">{office?.name}</p>
              <p className="text-sm sm:text-base">{office?.address}</p>
            </div>
            <div className="overflow-hidden w-full h-[200px] sm:h-[250px]">
              <div
                id="my-map-display"
                className="h-full w-full max-w-[none] bg-none"
              >
                <iframe
                  className="h-full w-full border-0"
                  frameBorder={0}
                  src={`https://www.google.com/maps/embed/v1/place?q=${office?.name},&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                />
              </div>
              <a
                className="from-embedmap-code"
                href="https://www.bootstrapskins.com/themes"
                id="enable-map-data"
              >
                premium bootstrap themes
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col rounded-2xl border border-[#E0DEF7] p-4 sm:p-6 gap-4 bg-white">
              <div>
                <p className="font-extrabold text-2xl sm:text-3xl leading-tight text-[#0A2463]">
                  Rp {office?.price.toLocaleString("id")}
                </p>
                <p className="font-semibold mt-1 text-sm sm:text-base">
                  For {office?.duration} days working
                </p>
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex flex-col gap-3">
                {office?.benefits?.map((benefit) => (
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/images/icons/verify.png"
                      className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]"
                      alt="icon"
                    />
                    <p className="font-semibold leading-[28px] text-sm sm:text-base">
                      {benefit.name}
                    </p>
                  </div>
                ))}
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex flex-col gap-[14px]">
                <Link to={`/office/${office?.slug}/book`}>
                  <div className="flex items-center justify-center w-full rounded-full p-[12px_20px] sm:p-[14px_24px] gap-2 bg-[#0A2463] font-bold text-sm sm:text-base text-[#F7F7FD]">
                    <img
                      src="/assets/images/icons/slider-horizontal-white.svg"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      alt="icon"
                    />
                    <span>Book This Office</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-[#E0DEF7] p-4 sm:p-6 gap-4 bg-white">
              <h2 className="font-bold text-lg sm:text-xl">Contact Our</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] rounded-full overflow-hidden">
                      <img
                        src="/assets/images/photos/photo-1.png"
                        className="w-full h-full object-cover"
                        alt="photo"
                      />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-bold text-sm sm:text-base">
                        Krisnanda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="tel:6282144603278">
                      <img
                        src="/assets/images/icons/call.png"
                        className="w-8 h-8 sm:w-9 sm:h-9"
                        alt="icon"
                      />
                    </a>
                    <a href="https://wa.me/6282144603278?text=hallo%20min,%20saya%20ada%20kendala">
                      <img
                        src="/assets/images/icons/chat.png"
                        className="w-8 h-8 sm:w-9 sm:h-9"
                        alt="icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
