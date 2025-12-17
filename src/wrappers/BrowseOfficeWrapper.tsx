import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OfficeCard from "../components/OfficeCard";
import type { Office } from "../types/type";

interface BrowseOfficeWrapperProps {
  filters: {
    price: string;
    rating: string;
    sortBy: string;
    location: string;
    type: string;
  };
  isFilterApplied: boolean;
}

export default function BrowseOfficeWrapper({
  filters,
  isFilterApplied,
}: BrowseOfficeWrapperProps) {
  const [offices, setOffices] = useState<Office[]>([]);
  const [filteredOffices, setFilteredOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch offices dari API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/offices", {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        setOffices(response.data.data);
        setFilteredOffices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever filters change or when isFilterApplied is true
  useEffect(() => {
    if (!isFilterApplied) return;

    let result = [...offices];

    // Filter by location
    if (filters.location !== "all") {
      result = result.filter((office) => {
        const cityName = office.city?.name?.toLowerCase() || "";
        return cityName.includes(filters.location.toLowerCase());
      });
    }

    // Filter by price
    if (filters.price !== "all") {
      result = result.filter((office) => {
        const price = office.price || 0;
        switch (filters.price) {
          case "cheap":
            return price < 1000000;
          case "medium":
            return price >= 1000000 && price <= 3000000;
          case "expensive":
            return price > 3000000;
          case "range1":
            return price < 1000000;
          case "range2":
            return price >= 1000000 && price <= 3000000;
          case "range3":
            return price > 3000000;
          default:
            return true;
        }
      });
    }

    // Filter by rating
    if (filters.rating !== "all") {
      const minRating = parseInt(filters.rating);
      result = result.filter((office) => {
        const rating = office.rating || 0;
        return rating >= minRating;
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
        break;
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popular":
      default:
        // Keep original order or sort by some popularity metric
        break;
    }

    setFilteredOffices(result);
  }, [filters, offices, isFilterApplied]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2463] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="Fresh-Space"
      className="flex flex-col gap-6 md:gap-[30px] mt-8 md:mt-12 lg:mt-[100px] px-4 sm:px-6 md:px-8 lg:px-0"
    >
      {/* Header */}
      <div className="w-full max-w-[1130px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight text-center sm:text-left">
            Explore Fresh Space
            <br />
            For Your Business
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2 text-center sm:text-left">
            {filteredOffices.length} kantor ditemukan
          </p>
        </div>
        <a
          href="#"
          className="rounded-full py-2 sm:py-3 px-4 sm:px-5 bg-white font-bold text-sm sm:text-base border hover:text-[#0A2463] transition-colors"
        >
          Explore All Offices
        </a>
      </div>

      {/* Offices Grid */}
      <div className="w-full max-w-[1130px] mx-auto">
        {filteredOffices.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tidak ada kantor ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah filter Anda untuk melihat lebih banyak hasil
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredOffices.map((office) => (
              <Link key={office.id} to={`/office/${office.slug}`}>
                <OfficeCard office={office} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
