import { useState } from "react";
import Navbar from "../components/Navbar";
import { BookingDetails } from "../types/type";
import type z from "zod";
import { viewBookingSchema } from "../types/validationBooking";
import axios from "axios";
import Footer from "../components/Footer";

export default function CheckBooking() {
  const [formData, setFormData] = useState({
    phone_number: "",
    booking_trx_id: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const baseURL = "http://127.0.0.1:8000/storage";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Validating form Data...");
    const validation = viewBookingSchema.safeParse(formData);

    if (!validation.success) {
      console.error("Validation errors:", validation.error.issues);
      setFormErrors(validation.error.issues);
      return;
    }

    console.log("Form data is valid. Submitting...", formData);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/check-transaction",
        {
          ...formData,
        },
        {
          headers: {
            "X-API-KEY": "wkwkwkwkjj0901",
          },
        }
      );

      console.log("we are checking your booking:", response.data);
      setBookingDetails(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error submiting form:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Desktop Banner */}
      <div
        id="Banner"
        className="hidden lg:flex relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]"
      >
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">
          View Your Booking Details
        </h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img
          src="assets/images/thumbnails/thumbnail-details-5.png"
          className="absolute w-full h-full object-cover object-top"
          alt=""
        />
      </div>

      {/* Mobile Banner */}
      <div className="lg:hidden">
        <div className="relative w-full h-[180px] md:h-[200px] overflow-hidden">
          <img
            src="assets/images/thumbnails/thumbnail-details-5.png"
            className="w-full h-full object-cover object-top"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center font-extrabold text-2xl md:text-3xl text-white px-4">
              View Your Booking Details
            </h1>
          </div>
        </div>
      </div>

      <section
        id="Check-Booking"
        className="relative flex flex-col w-full max-w-[1130px] lg:w-[930px] shrink-0 gap-[30px] mx-auto mb-[100px] z-20 px-4 sm:px-6 md:px-8 lg:px-0 mt-6 lg:mt-0"
      >
        {/* Form Section */}
        <div className="bg-white rounded-2xl md:rounded-[20px] border border-[#E0DEF7] p-4 md:p-[30px] shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-end lg:items-center gap-6"
          >
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm md:text-base">
                Booking TRX ID
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-4 md:px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img
                  src="assets/images/icons/receipt-text-black.svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  alt="icon"
                />
                <input
                  type="text"
                  name="booking_trx_id"
                  onChange={handleChange}
                  value={formData.booking_trx_id}
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929] text-sm md:text-base"
                  placeholder="Write your booking trx id"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("booking_trx_id")
              ) && (
                <p className="text-red-500 text-sm">
                  Booking TRX ID is required
                </p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm md:text-base">
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-4 md:px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img
                  src="assets/images/icons/call-black.svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  alt="icon"
                />
                <input
                  type="tel"
                  name="phone_number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929] text-sm md:text-base"
                  placeholder="Write your valid number"
                />
              </div>
              {formErrors.find((error) =>
                error.path.includes("phone_number")
              ) && (
                <p className="text-red-500 text-sm">Phone number is required</p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="flex items-center justify-center rounded-full p-[12px_30px] gap-3 bg-[#0A2463] font-bold text-[#F7F7FD]"
            >
              <span className="text-nowrap">
                {isLoading ? "Loading..." : "Check Booking"}
              </span>
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {bookingDetails && (
          <div id="Result" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Desktop and Mobile */}
            <div className="bg-white rounded-2xl md:rounded-[20px] border border-[#E0DEF7] p-4 md:p-[30px] shadow-lg">
              {/* Property Info */}
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-[30px]">
                <div className="flex shrink-0 w-24 h-16 md:w-[140px] md:h-[100px] rounded-xl md:rounded-[20px] overflow-hidden">
                  <img
                    src="assets/images/thumbnails/thumbnail-details-4.png"
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="font-bold text-lg md:text-xl leading-[26px] md:leading-[30px]">
                    {bookingDetails.officeSpace.name}
                  </p>
                  <div className="flex items-center gap-1 md:gap-[6px]">
                    <img
                      src="assets/images/icons/location.png"
                      className="w-4 h-4 md:w-6 md:h-6"
                      alt="icon"
                    />
                    <p className="font-semibold text-sm md:text-base">
                      {bookingDetails.officeSpace.city.name}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-[#F6F5FD] my-4 md:my-6" />

              {/* Customer Details */}
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-lg md:text-xl">
                  Customer Details
                </h2>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">
                      Full Name
                    </h3>
                    <div className="flex items-center rounded-full px-4 md:px-5 py-2 md:py-3 gap-2 md:gap-[10px] bg-[#F7F7FD]">
                      <img
                        src="assets/images/icons/security-user-black.svg"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="icon"
                      />
                      <p className="font-semibold text-sm md:text-base">
                        {bookingDetails.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">
                      Phone Number
                    </h3>
                    <div className="flex items-center rounded-full px-4 md:px-5 py-2 md:py-3 gap-2 md:gap-[10px] bg-[#F7F7FD]">
                      <img
                        src="assets/images/icons/call-black.svg"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="icon"
                      />
                      <p className="font-semibold text-sm md:text-base">
                        {bookingDetails.phone_number}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">
                      Started At
                    </h3>
                    <div className="flex items-center rounded-full px-4 md:px-5 py-2 md:py-3 gap-2 md:gap-[10px] bg-[#F7F7FD]">
                      <img
                        src="assets/images/icons/calendar-black.svg"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="icon"
                      />
                      <p className="font-semibold text-sm md:text-base">
                        {bookingDetails.started_at}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-2">
                      Ended At
                    </h3>
                    <div className="flex items-center rounded-full px-4 md:px-5 py-2 md:py-3 gap-2 md:gap-[10px] bg-[#F7F7FD]">
                      <img
                        src="assets/images/icons/calendar-black.svg"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="icon"
                      />
                      <p className="font-semibold text-sm md:text-base">
                        {bookingDetails.ended_at}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[#F6F5FD] my-4 md:my-6" />

              {/* Security Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src="assets/images/icons/shield-tick.png"
                  className="w-6 h-6 md:w-[30px] md:h-[30px]"
                  alt="icon"
                />
                <p className="font-semibold text-sm md:text-base leading-relaxed">
                  Privasi Anda aman bersama kami.
                </p>
              </div>
            </div>

            {/* Right Column - Desktop and Mobile */}
            <div className="bg-white rounded-2xl md:rounded-[20px] border border-[#E0DEF7] p-4 md:p-[30px] shadow-lg">
              <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-[30px]">
                Order Details
              </h2>

              <div className="space-y-4 md:space-y-5 mb-6 md:mb-[30px]">
                {/* Payment Status */}
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm md:text-base">
                    Status Pembayaran
                  </p>
                  {bookingDetails.is_paid ? (
                    <span className="rounded-full w-fit px-3 py-1 md:p-[6px_16px] bg-[#0D903A] font-bold text-xs md:text-sm text-white">
                      SUCCESS
                    </span>
                  ) : (
                    <span className="rounded-full w-fit px-3 py-1 md:p-[6px_16px] bg-[#FF852D] font-bold text-xs md:text-sm text-white">
                      PENDING
                    </span>
                  )}
                </div>

                {/* Booking TRX ID */}
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm md:text-base">
                    Booking TRX ID
                  </p>
                  <p className="font-bold text-sm md:text-base">
                    {bookingDetails.booking_trx_id}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm md:text-base">Duration</p>
                  <p className="font-bold text-sm md:text-base">
                    {bookingDetails.duration}
                  </p>
                </div>

                {/* Total Amount */}
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm md:text-base">
                    Total Amount
                  </p>
                  <p className="font-bold text-lg md:text-[22px] text-[#0D903A]">
                    {bookingDetails.total_amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <hr className="border-[#F6F5FD] my-4 md:my-6" />

              {/* Bonus Packages */}
              <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-[30px]">
                Bonus Packages For You
              </h2>

              <div className="grid grid-cols-2 gap-4 md:flex md:justify-between mb-6 md:mb-[30px]">
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    src="assets/images/icons/coffee.png"
                    className="w-6 h-6 md:w-[34px] md:h-[34px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0 md:gap-[2px]">
                    <p className="font-bold text-sm md:text-base">
                      Extra Snacks
                    </p>
                    <p className="text-xs md:text-sm">Work-Life Balance</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    src="assets/images/icons/group.png"
                    className="w-6 h-6 md:w-[34px] md:h-[34px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-0 md:gap-[2px]">
                    <p className="font-bold text-sm md:text-base">Free Move</p>
                    <p className="text-xs md:text-sm">Anytime 24/7</p>
                  </div>
                </div>
              </div>

              <hr className="border-[#F6F5FD] my-4 md:my-6" />

              {/* Customer Service Button */}
              <a
                href="tel:+6281234567890"
                className="flex items-center justify-center w-full rounded-full border border-[#000929] p-3 md:p-[12px_20px] gap-2 md:gap-3 bg-white hover:bg-gray-50 transition-colors font-semibold text-sm md:text-base"
              >
                <img
                  src="assets/images/icons/call-black.svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  alt="icon"
                />
                <span>Call Customer Service</span>
              </a>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
