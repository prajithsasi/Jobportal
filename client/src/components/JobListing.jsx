import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { list } from "postcss";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (Category) => {
    setSelectedCategories((prev) =>
      prev.includes(Category)
        ? prev.filter((c) => c !== Category)
        : [...prev, Category]
    );
  };
  const handleLocationsChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };
  useEffect(() => {
  const matchesCategory = (job) =>
    selectedCategories.length === 0 ||
    selectedCategories.some(
      (cat) => cat.toLowerCase() === job.category?.toLowerCase()
    );

  const matchesLocation = (job) =>
    selectedLocations.length === 0 ||
    selectedLocations.some(
      (loc) => loc.toLowerCase() === job.location?.toLowerCase()
    );

  const matchesTitle = (job) =>
    searchFilter.title === "" ||
    job.title?.toLowerCase().includes(searchFilter.title.toLowerCase());

  const matchesSearchLocation = (job) =>
    searchFilter.location === "" ||
    job.location?.toLowerCase().includes(searchFilter.location.toLowerCase());

  const newFilteredJobs = jobs
    .slice()
    .reverse()
    .filter(
      (job) =>
        matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitle(job) &&
        matchesSearchLocation(job)
    );

  setFilteredJobs(newFilteredJobs);
  setCurrentPage(1);
}, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search filter from hero component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
                {/* Title Filter */}
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 bg-blue-100 px-4 py-1.5 rounded-full text-sm">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer w-4 h-4"
                      src={assets.cross_icon}
                      alt="Remove title filter"
                    />
                  </span>
                )}

                {/* Location Filter */}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2 bg-red-100 px-4 py-1.5 rounded-full text-sm">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer w-4 h-4"
                      src={assets.cross_icon}
                      alt="Remove location filter"
                    />
                  </span>
                )}
              </div>
            </>
          )}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>
        {/*catogory filter*/}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search By Categories</h4>
          <ul className="space-y-4 text-gray-600 ">
            {JobCategories.map((Category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(Category)}
                  checked={selectedCategories.includes(Category)}
                />
                {Category}
              </li>
            ))}
          </ul>
        </div>
        {/*location filter*/}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search By Location</h4>
          <ul className="space-y-4 text-gray-600 ">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/*job listing*/}
      <section className="w-full lg:w3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2 " id="job-list">
          {" "}
          Latest Jobs
        </h3>
        <p className="mb-8">Get the desired job from the top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {" "}
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
