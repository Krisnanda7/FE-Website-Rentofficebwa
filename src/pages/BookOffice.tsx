import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type z from "zod";
import type { Office } from "../types/type";
import { bookingSchema } from "../types/validationBooking";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookOffice() {
  const { slug } = useParams<{ slug: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    started_at: "",
    office_space_id: "",
    totalAmountWithUniqueCode: 0,
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqeCode, setUniqueCode] = useState<number>(0);
  const [totalAmountWithUniqueCode, setTotalAmountWithUniqueCode] =
    useState<number>(0);

  useEffect(() => {
    console.log("Fetching office data..");
    axios
      .get(`http://127.0.0.1:8000/api/office/${slug}`, {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        console.log("Office data fetched succesfully");
        setOffice(response.data.data);

        const officeSpaceId = response.data.data.id;
        const generatedUniqueCode = Math.floor(100 + Math.random() * 900);
        const grandtotal = response.data.data.price - generatedUniqueCode;

        setUniqueCode(generatedUniqueCode);
        setTotalAmountWithUniqueCode(grandtotal);

        setFormData((prevData) => ({
          ...prevData,
          office_space_id: officeSpaceId,
          total_amount: grandtotal,
        }));

        setLoading(false);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching office data:", error.message);
          setError(error.message);
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occured");
        }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("validating form data...");
    const validation = bookingSchema.safeParse(formData);

    if (!validation.success) {
      console.error("validation errors:", validation.error.issues);
      setFormErrors(validation.error.issues);
      return;
    }

    console.log("Form data is valid. submitting...", formData);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/office-space-transactions",
        {
          ...formData,
        },
        {
          headers: {
            "X-API-KEY": "wkwkwkwkjj0901",
          },
        }
      );

      console.log("Form submitted succesfully:", response.data);

      navigate("/succes-booking", {
        state: {
          office,
          booking: response.data.data,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(" Eror submiting form:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Banner Responsive */}
      <div
        id="Banner"
        className="
    relative w-full
    h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]
    flex items-center justify-center
    shrink-0 overflow-hidden
    -mb-[30px] sm:-mb-[40px] lg:-mb-[50px]
  "
      >
        <h1
          className="text-center mx-auto font-extrabold text-white z-20 px-4"
          style={{
            fontSize: window.innerWidth >= 1024 ? "64px" : "36px",
            lineHeight: window.innerWidth >= 1024 ? "80px" : "48px",
          }}
        >
          Start Booking Your Office
        </h1>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />

        <img
          src={`${baseURL}/${office?.thumbnail}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          alt="Office Thumbnail"
        />
      </div>

      {/* Form Desktop */}
      <form
        onSubmit={handleSubmit}
        className="hidden lg:flex relative justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20"
      >
        <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <img
                src={`${baseURL}/${office?.thumbnail}`}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">{office?.name}</p>
              <div className="flex items-center gap-[6px]">
                <img
                  src="/assets/images/icons/location.png"
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold">{office?.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Complete The Details</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Full Name
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img
                  src="/assets/images/icons/security-user-black.png"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  id="name"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your complete name"
                />
                {formErrors.find((error) => error.path.includes("name")) && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold">
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img
                  src="/assets/images/icons/call-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="tel"
                  name="phone_number"
                  onChange={handleChange}
                  value={formData.phone_number}
                  id="phone_number"
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  placeholder="Write your valid number"
                />
                {formErrors.find((error) =>
                  error.path.includes("phone_number")
                ) && <p className="text-red-500">phone_number is required</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-semibold">
                Started At
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] overflow-hidden">
                <img
                  src="/assets/images/icons/calendar-black.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
                <input
                  type="date"
                  name="started_at"
                  onChange={handleChange}
                  value={formData.started_at}
                  id="started_at"
                  className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                {formErrors.find((error) =>
                  error.path.includes("started_at")
                ) && <p className="text-red-500">started_at is required</p>}
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/icons/shield-tick.png"
              className="w-[30px] h-[30px]"
              alt="icon"
            />
            <p className="font-semibold leading-[28px]">
              Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat
              fokus bekerja
            </p>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-bold">Bonus Packages For You</h2>
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/icons/coffee.png"
                  className="w-[34px] h-[34px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">
                    Extra Snacks
                  </p>
                  <p className="text-sm leading-[21px]">Work-Life Balance</p>
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
          </div>
        </div>
        <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <h2 className="font-bold">Your Order Details</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Duration</p>
              <p className="font-bold">{office?.duration} Days Working</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Sub Total</p>
              <p className="font-bold">{office?.price.toLocaleString("id")}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Unique Code</p>
              <p className="font-bold text-[#FF2D2D]">-Rp {uniqeCode}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[22px] leading-[33px] text-[#0D903A]">
                Rp{" "}
                {totalAmountWithUniqueCode.toLocaleString("id", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white">
              <img
                src="/assets/images/icons/Polygon 1.svg"
                className="absolute -top-[15px] right-[10px] "
                alt=""
              />
              <p className="font-semibold text-sm leading-[24px] z-10">
                Tolong perhatikan kode unik berikut ketika melakukan pembayaran
                kantor
              </p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">Send Payment to</h2>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/bca.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">Krisnanda</p>
                  <img
                    src="/assets/images/icons/verify.png"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>8008129839</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img
                  src="/assets/images/logos/mandiri.svg"
                  className="w-full object-contain"
                  alt="bank logo"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">Krisnanda</p>
                  <img
                    src="/assets/images/icons/verify.png"
                    className="w-[18px] h-[18px]"
                    alt="icon"
                  />
                </div>
                <p>12379834983281</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0A2463] font-bold text-[#F7F7FD]"
          >
            <span>{isLoading ? "Loading..." : "i'allready paid"}</span>
          </button>
        </div>
      </form>

      {/* Form Mobile */}
      <form
        onSubmit={handleSubmit}
        className="block lg:hidden relative w-full px-4 sm:px-6 md:px-8 mb-12 sm:mb-16 z-20"
      >
        <div className="container mx-auto max-w-2xl space-y-4 sm:space-y-6">
          {/* Office Info Card Mobile */}
          <div className="flex flex-col rounded-2xl border border-[#E0DEF7] p-4 sm:p-6 gap-4 sm:gap-6 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex shrink-0 w-full sm:w-[120px] md:w-[140px] h-[160px] sm:h-[90px] md:h-[100px] rounded-2xl overflow-hidden">
                <img
                  src={`${baseURL}/${office?.thumbnail}`}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p className="font-bold text-lg sm:text-xl leading-6 sm:leading-[30px]">
                  {office?.name}
                </p>
                <div className="flex items-center gap-[6px]">
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
            </div>

            <hr className="border-[#F6F5FD]" />

            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-base sm:text-lg">
                Complete The Details
              </h2>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name-mobile"
                  className="font-semibold text-sm sm:text-base"
                >
                  Full Name
                </label>
                <div className="flex items-center rounded-full border border-[#000929] px-4 sm:px-5 gap-2 sm:gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                  <img
                    src="/assets/images/icons/security-user-black.png"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="icon"
                  />
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    id="name-mobile"
                    className="appearance-none outline-none w-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base placeholder:font-normal placeholder:text-[#000929]"
                    placeholder="Write your complete name"
                  />
                </div>
                {formErrors.find((error) => error.path.includes("name")) && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    Name is required
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone-mobile"
                  className="font-semibold text-sm sm:text-base"
                >
                  Phone Number
                </label>
                <div className="flex items-center rounded-full border border-[#000929] px-4 sm:px-5 gap-2 sm:gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                  <img
                    src="/assets/images/icons/call-black.svg"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="icon"
                  />
                  <input
                    type="tel"
                    name="phone_number"
                    onChange={handleChange}
                    value={formData.phone_number}
                    id="phone-mobile"
                    className="appearance-none outline-none w-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base placeholder:font-normal placeholder:text-[#000929]"
                    placeholder="Write your valid number"
                  />
                </div>
                {formErrors.find((error) =>
                  error.path.includes("phone_number")
                ) && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    Phone number is required
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date-mobile"
                  className="font-semibold text-sm sm:text-base"
                >
                  Started At
                </label>
                <div className="flex items-center rounded-full border border-[#000929] px-4 sm:px-5 gap-2 sm:gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] overflow-hidden">
                  <img
                    src="/assets/images/icons/calendar-black.svg"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="icon"
                  />
                  <input
                    type="date"
                    name="started_at"
                    onChange={handleChange}
                    value={formData.started_at}
                    id="date-mobile"
                    className="relative appearance-none outline-none w-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                </div>
                {formErrors.find((error) =>
                  error.path.includes("started_at")
                ) && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    Started date is required
                  </p>
                )}
              </div>
            </div>

            <hr className="border-[#F6F5FD]" />

            <div className="flex items-start sm:items-center gap-3">
              <img
                src="/assets/images/icons/shield-tick.png"
                className="w-6 h-6 sm:w-[30px] sm:h-[30px] shrink-0 mt-1 sm:mt-0"
                alt="icon"
              />
              <p className="font-semibold leading-6 sm:leading-[28px] text-sm sm:text-base">
                Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat
                fokus bekerja
              </p>
            </div>

            <hr className="border-[#F6F5FD]" />

            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-bold text-base sm:text-lg">
                Bonus Packages For You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src="/assets/images/icons/coffee.png"
                    className="w-7 h-7 sm:w-[34px] sm:h-[34px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold text-base sm:text-lg leading-5 sm:leading-[24px]">
                      Extra Snacks
                    </p>
                    <p className="text-xs sm:text-sm leading-5 sm:leading-[21px]">
                      Work-Life Balance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src="/assets/images/icons/group.png"
                    className="w-7 h-7 sm:w-[34px] sm:h-[34px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold text-base sm:text-lg leading-5 sm:leading-[24px]">
                      Free Move
                    </p>
                    <p className="text-xs sm:text-sm leading-5 sm:leading-[21px]">
                      Anytime 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Card Mobile */}
          <div className="flex flex-col rounded-2xl border border-[#E0DEF7] p-4 sm:p-6 gap-4 sm:gap-6 bg-white">
            <h2 className="font-bold text-base sm:text-lg">
              Your Order Details
            </h2>
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm sm:text-base">Duration</p>
                <p className="font-bold text-sm sm:text-base">
                  {office?.duration} Days Working
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm sm:text-base">Sub Total</p>
                <p className="font-bold text-sm sm:text-base">
                  {office?.price.toLocaleString("id")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm sm:text-base">
                  Unique Code
                </p>
                <p className="font-bold text-sm sm:text-base text-[#FF2D2D]">
                  -Rp {uniqeCode}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm sm:text-base">
                  Grand Total
                </p>
                <p className="font-bold text-lg sm:text-[22px] leading-6 sm:leading-[33px] text-[#0D903A]">
                  Rp{" "}
                  {totalAmountWithUniqueCode.toLocaleString("id", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="relative rounded-xl p-3 sm:p-[10px_20px] gap-[10px] bg-[#000929] text-white">
                <img
                  src="/assets/images/icons/Polygon 1.svg"
                  className="absolute -top-[12px] sm:-top-[15px] right-[10px] w-4 sm:w-auto"
                  alt=""
                />
                <p className="font-semibold text-xs sm:text-sm leading-5 sm:leading-[24px] z-10">
                  Tolong perhatikan kode unik berikut ketika melakukan
                  pembayaran kantor
                </p>
              </div>
            </div>

            <hr className="border-[#F6F5FD]" />

            <h2 className="font-bold text-base sm:text-lg">Send Payment to</h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-[60px] sm:w-[71px] flex shrink-0">
                  <img
                    src="/assets/images/logos/bca.svg"
                    className="w-full object-contain"
                    alt="bank logo"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm sm:text-base">
                      Krisnanda
                    </p>
                    <img
                      src="/assets/images/icons/verify.png"
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                      alt="icon"
                    />
                  </div>
                  <p className="text-sm sm:text-base">8008129839</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[60px] sm:w-[71px] flex shrink-0">
                  <img
                    src="/assets/images/logos/mandiri.svg"
                    className="w-full object-contain"
                    alt="bank logo"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm sm:text-base">
                      Krisnanda
                    </p>
                    <img
                      src="/assets/images/icons/verify.png"
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                      alt="icon"
                    />
                  </div>
                  <p className="text-sm sm:text-base">12379834983281</p>
                </div>
              </div>
            </div>

            <hr className="border-[#F6F5FD]" />

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full rounded-full p-3 sm:p-[16px_26px] gap-3 bg-[#0A2463] font-bold text-sm sm:text-base text-[#F7F7FD] hover:bg-[#0A2463]/90 transition-colors disabled:opacity-70"
            >
              <span>{isLoading ? "Loading..." : "I'already paid"}</span>
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
}
