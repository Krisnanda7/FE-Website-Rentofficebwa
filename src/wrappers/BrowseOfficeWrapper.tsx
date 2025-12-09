import { useEffect, useState } from "react";
import axios from "axios";
import type { Office } from "../types/type";
import OfficeCard from "../components/OfficeCard";
import { Link } from "react-router-dom";

export default function BrowseOfficeWrapper() {
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

  const [offices, setOffices] = useState<Office[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/offices", {
        headers: {
          "X-API-KEY": "wkwkwkwkjj0901",
        },
      })
      .then((response) => {
        setOffices(response.data.data);
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
    <section
      id="Fresh-Space"
      className="flex flex-col gap-6 md:gap-[30px] w-full max-w-[1130px] mx-auto mt-8 md:mt-12 lg:mt-[100px] mb-8 md:mb-12 lg:mb-[120px] px-4 sm:px-6 md:px-8 lg:px-0"
    >
      {/* Title Section */}
      <div className="text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[32px] leading-tight sm:leading-[40px] md:leading-[48px]">
          Browse Our Fresh Space.
          <br />
          For Your Better Productivity.
        </h2>
      </div>

      {/* Grid Section - All offices shown at once */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[30px]">
        {offices.map((office) => (
          <Link
            key={office.id}
            to={`/office/${office.slug}`}
            className="transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <OfficeCard office={office} />
          </Link>
        ))}
      </div>
    </section>
  );
}
