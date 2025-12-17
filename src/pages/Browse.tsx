import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BrowseCityWrapper from "../wrappers/BrowseCityWrapper";
import BrowseOfficeWrapper from "../wrappers/BrowseOfficeWrapper";
import Footer from "../components/Footer";

export default function Browse() {
  const [filters, setFilters] = useState({
    price: "all",
    rating: "all",
    sortBy: "popular",
    location: "all",
    type: "all",
  });

  const [additionalFilters, setAdditionalFilters] = useState({
    available: false,
    wifi: false,
    parking: false,
    coffee: false,
  });

  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-fade-in-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    // Update active filters
    if (value !== "all" && !activeFilters.includes(filterType)) {
      setActiveFilters([...activeFilters, filterType]);
    } else if (value === "all" && activeFilters.includes(filterType)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== filterType));
    }
  };

  const handleAdditionalFilterChange = (filterType) => {
    setAdditionalFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const applyFilters = () => {
    setIsFilterApplied(true);
    // Scroll ke section offices
    const officesSection = document.getElementById("Fresh-Space");
    if (officesSection) {
      officesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resetFilters = () => {
    setFilters({
      price: "all",
      rating: "all",
      sortBy: "popular",
      location: "all",
      type: "all",
    });
    setAdditionalFilters({
      available: false,
      wifi: false,
      parking: false,
      coffee: false,
    });
    setActiveFilters([]);
    setIsFilterApplied(false);
  };

  const removeFilter = (filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: "all",
    }));
    setActiveFilters(activeFilters.filter((filter) => filter !== filterType));
  };

  const getFilterLabel = (filterType, value) => {
    const labels = {
      price: {
        cheap: "Termurah",
        medium: "Sedang",
        expensive: "Termahal",
        range1: "< 3 Juta",
        range2: "2-3 Juta",
        range3: "> 3 Juta",
      },
      rating: {
        5: "5 Bintang",
        4: "4 Bintang",
      },
      location: {
        jakarta: "Jakarta",
        surabaya: "Surabaya",
        bandung: "Bandung",
        bali: "Bali",
        yogyakarta: "Yogyakarta",
      },
      type: {
        private: "Private Office",
        coworking: "Co-working Space",
        meeting: "Meeting Room",
        virtual: "Virtual Office",
      },
    };

    return labels[filterType]?.[value] || value;
  };

  return (
    <>
      <Navbar />
      <header className="flex flex-col w-full">
        {/* Hero Banner Desktop */}
        <section
          id="Hero-Banner"
          className="hidden lg:flex relative h-[720px] -mb-[93px]"
        >
          <div
            id="Hero-Text"
            className="relative flex flex-col w-full max-w-[650px] h-fit rounded-[30px] border border-[#E0DEF7]
             p-10 gap-[30px] bg-white mt-[70px] ml-[calc((100%-1130px)/2)] z-10 animate-fade-slide-up"
          >
            <div className="flex items-center w-fit rounded-full py-2 px-4 gap-[10px] bg-[#000929]">
              <img
                src="assets/images/icons/crown-white.svg"
                className="w-5 h-5"
                alt="icon"
              />
              <span className="font-semibold text-white">
                Kami sudah terpercaya oleh banyak perusahaan, mari bergabung!
              </span>
            </div>
            <h1 className="font-extrabold text-[50px] leading-[60px]">
              All Great Offices.
              <br />
              Grow Your Business.
            </h1>
            <p className="text-lg leading-8 text-[#000929]">
              Kantor yang tepat dapat memberikan impact pekerjaan menjadi lebih
              baik dan sehat dalam tumbuhkan karir.
            </p>
            <div className="flex items-center gap-5 animate-fade-in">
              <a
                href="#Filter-Section"
                className="flex items-center rounded-full p-[20px_26px] gap-3 bg-[#0A2463] hover:bg-[#0A2463]/90 transition-colors"
              >
                <img
                  src="assets/images/icons/slider-horizontal-white.svg"
                  className="w-[30px] h-[30px]"
                  alt="icon"
                />
                <span className="font-bold text-xl leading-[30px] text-[#F7F7FD]">
                  Explore Now
                </span>
              </a>
              <a
                href="#fresh-space"
                className="flex items-center rounded-full border border-[#000929] p-[20px_26px] gap-3 bg-white hover:bg-gray-50 transition-colors"
              >
                <img
                  src="assets/images/icons/video-octagon.png"
                  className="w-[30px] h-[30px]"
                  alt="icon"
                />
                <span className="font-semibold text-xl leading-[30px]">
                  Watch Story
                </span>
              </a>
            </div>
          </div>
          <div
            id="Hero-Image"
            className="absolute right-0 w-[calc(100%-((100%-1130px)/2)-305px)] h-[720px] rounded-bl-[40px] overflow-hidden animate-fade-in"
          >
            <img
              src="assets/images/backgrounds/banner.png"
              className="w-full h-full object-cover"
              alt="hero background"
            />
          </div>
        </section>

        {/* Hero Banner Mobile */}
        <section
          id="Hero-Banner-Mobile"
          className="flex lg:hidden flex-col w-full"
        >
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            <img
              src="assets/images/backgrounds/banner.png"
              className="w-full h-full object-cover"
              alt="hero background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
          </div>

          <div className="relative w-full px-4 md:px-8 -mt-12 md:-mt-16">
            <div className="container mx-auto max-w-2xl">
              <div className="bg-white rounded-2xl md:rounded-[30px] border border-[#E0DEF7] p-6 md:p-8 space-y-6 md:space-y-8 shadow-xl">
                <div className="inline-flex items-center rounded-full py-2 px-3 md:px-4 gap-2 bg-[#000929]">
                  <img
                    src="assets/images/icons/crown-white.svg"
                    className="w-4 h-4 md:w-5 md:h-5"
                    alt="icon"
                  />
                  <span className="font-semibold text-xs md:text-sm text-white">
                    Kami sudah terpercaya oleh banyak perusahaan, mari
                    bergabung!
                  </span>
                </div>

                <h1 className="font-extrabold text-3xl md:text-4xl leading-tight md:leading-[50px]">
                  All Great Offices.
                  <br />
                  Grow Your Business.
                </h1>

                <p className="text-base md:text-lg leading-relaxed md:leading-7 text-[#000929]">
                  Kantor yang tepat dapat memberikan impact pekerjaan menjadi
                  lebih baik dan sehat dalam tumbuhkan karir.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#Filter-Section"
                    className="flex items-center justify-center rounded-full p-4 md:p-[16px_20px] gap-2 md:gap-3 bg-[#0A2463] hover:bg-[#0A2463]/90 transition-colors"
                  >
                    <img
                      src="assets/images/icons/slider-horizontal-white.svg"
                      className="w-6 h-6 md:w-[26px] md:h-[26px]"
                      alt="icon"
                    />
                    <span className="font-bold text-lg md:text-xl text-[#F7F7FD]">
                      Explore Now
                    </span>
                  </a>
                  <a
                    href="#fresh-space"
                    className="flex items-center justify-center rounded-full border border-[#000929] p-4 md:p-[16px_20px] gap-2 md:gap-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="assets/images/icons/video-octagon.png"
                      className="w-6 h-6 md:w-[26px] md:h-[26px]"
                      alt="icon"
                    />
                    <span className="font-semibold text-lg md:text-xl">
                      Watch Story
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <div className="bg-[#0A2463]">
          {/* Desktop Version */}
          <div className="hidden lg:block">
            <div className="flex flex-col pt-[150px] pb-10 px-[120px] gap-10">
              <div className="logo-container flex items-center justify-center flex-wrap max-w-[1130px] h-[38px] mx-auto gap-[60px]">
                <img
                  src="assets/images/logos/TESLA.svg"
                  alt="clients logo"
                  className="h-[38px]"
                />
                <img
                  src="assets/images/logos/Libra 2.svg"
                  alt="clients logo"
                  className="h-[38px]"
                />
                <img
                  src="assets/images/logos/Binance logo.svg"
                  alt="clients logo"
                  className="h-[38px]"
                />
                <img
                  src="assets/images/logos/Facebook 7.svg"
                  alt="clients logo"
                  className="h-[38px]"
                />
              </div>

              <div className="flex justify-center gap-[50px]">
                <div className="flex flex-col gap-[2px] text-center">
                  <p className="text-xl leading-[30px] text-[#F7F7FD]">
                    Comfortable Space
                  </p>
                </div>
                <div className="flex flex-col gap-[2px] text-center">
                  <p className="text-xl leading-[30px] text-[#F7F7FD]">
                    Startups Succeed
                  </p>
                </div>
                <div className="flex flex-col gap-[2px] text-center">
                  <p className="text-xl leading-[30px] text-[#F7F7FD]">
                    Countries
                  </p>
                </div>
                <div className="flex flex-col gap-[2px] text-center">
                  <p className="text-xl leading-[30px] text-[#F7F7FD]">
                    Supportive Events
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="block lg:hidden">
            <div className="flex flex-col w-full pt-12 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 md:px-8 gap-6 md:gap-8">
              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Trusted by Leading Companies
                </h3>
                <p className="text-sm md:text-base text-white/80 mt-1">
                  Bergabung dengan perusahaan-perusahaan terbaik
                </p>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
                  {[
                    { src: "TESLA.svg", alt: "Tesla" },
                    { src: "Libra 2.svg", alt: "Libra" },
                    { src: "Binance logo.svg", alt: "Binance" },
                    { src: "Facebook 7.svg", alt: "Facebook" },
                  ].map((logo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 w-full"
                    >
                      <img
                        src={`assets/images/logos/${logo.src}`}
                        alt={logo.alt}
                        className="w-full h-auto max-h-6 md:max-h-8 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                        style={{
                          maxWidth: "100px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { title: "Comfortable Space", description: "1000+ Spaces" },
                    { title: "Startups Succeed", description: "500+ Startups" },
                    { title: "Countries", description: "50+ Countries" },
                    { title: "Supportive Events", description: "200+ Events" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center group hover:scale-105 transition-transform duration-300"
                    >
                      <div className="bg-white/10 rounded-xl p-3 md:p-4">
                        <p className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                          {stat.title}
                        </p>
                        <p className="text-sm md:text-base text-white/80">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section
        id="Benefits"
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-[1015px] 
        mx-auto gap-8 lg:gap-[100px] mt-12 sm:mt-16 lg:mt-[100px] px-6 sm:px-8 lg:px-4 animate-fade-in-scroll"
      >
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-[32px] leading-9 sm:leading-[42px] lg:leading-[48px] text-center lg:text-left lg:text-nowrap">
          We Might Good <br />
          For Your Business
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[30px] w-full">
          {[
            {
              icon: "security-user.png",
              title: "Privacy-First Design",
              desc: "Privasi yang terjaga dengan baik dapat membantu Anda fokus bekerja",
            },
            {
              icon: "group.png",
              title: "Easy Move Access",
              desc: "Mudah berpindah tempat tanpa repot dan biaya tinggi",
            },
            {
              icon: "3dcube.png",
              title: "Flexibility Spaces",
              desc: "Ruang kerja yang fleksibel sesuai kebutuhan bisnis Anda",
            },
            {
              icon: "cup.png",
              title: "Top-Rated Office",
              desc: "Kantor dengan rating terbaik untuk kenyamanan Anda",
            },
            {
              icon: "coffee.png",
              title: "Extra Snacks Available",
              desc: "Camilan tambahan untuk menemani hari kerja Anda",
            },
            {
              icon: "home-trend-up.png",
              title: "Sustain for Business",
              desc: "Mendukung bisnis Anda untuk tumbuh lebih baik dan berkelanjutan",
            },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-center shrink-0 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-[20px] sm:rounded-[23px] bg-white overflow-hidden shadow-sm">
                <img
                  src={`assets/images/icons/${benefit.icon}`}
                  className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px]"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-[5px]">
                <p className="font-bold text-base sm:text-lg leading-6 sm:leading-[27px]">
                  {benefit.title}
                </p>
                <p className="text-xs sm:text-sm leading-5 sm:leading-[24px]">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section
        id="Filter-Section"
        className="w-full max-w-[1130px] mx-auto mt-12 md:mt-16 lg:mt-[100px] px-4 sm:px-6 md:px-8 lg:px-0 scroll-mt-20"
      >
        <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E0DEF7] p-4 md:p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-bold text-xl md:text-2xl ">Filter & Sort</h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Temukan kantor yang sesuai dengan kebutuhan Anda
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base hover:bg-gray-50 transition-colors"
              >
                Reset Filter
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-[#0A2463] text-white rounded-lg text-sm md:text-base hover:bg-[#0A2463]/90 transition-colors flex items-center gap-2"
              >
                <span>Terapkan</span>
                {activeFilters.length > 0 && (
                  <span className="bg-white text-[#0A2463] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] text-sm md:text-base"
              >
                <option value="all">Semua Harga</option>
                <option value="cheap">Termurah</option>
                <option value="medium">Sedang</option>
                <option value="expensive">Termahal</option>
                <option value="range1">Dibawah 3 Juta</option>
                <option value="range2">2-3 Juta</option>
                <option value="range3">Diatas 3 Juta</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] text-sm md:text-base"
              >
                <option value="all">Semua Rating</option>
                <option value="5">5 Bintang</option>
                <option value="4">4 Bintang</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutkan
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] text-sm md:text-base"
              >
                <option value="popular">Terpopuler</option>
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2463] text-sm md:text-base"
              >
                <option value="all">Semua Lokasi</option>
                <option value="jakarta">Jakarta</option>
                <option value="surabaya">Surabaya</option>
                <option value="bandung">Bandung</option>
                <option value="bali">Bali</option>
                <option value="yogyakarta">Yogyakarta</option>
                <option value="magelang">Magelang</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">
              Filter Aktif:
            </span>
            {Object.entries(filters).map(
              ([key, value]) =>
                value !== "all" &&
                key !== "sortBy" && (
                  <span
                    key={key}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                    {getFilterLabel(key, value)}
                    <button
                      onClick={() => removeFilter(key)}
                      className="hover:text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </span>
                )
            )}
          </div>
        )}
      </section>

      <BrowseCityWrapper />
      <BrowseOfficeWrapper
        filters={filters}
        isFilterApplied={isFilterApplied}
      />
      <Footer />
    </>
  );
}
