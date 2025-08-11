import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
          Your Dream JOb Is Right Here!!
        </h2>

        {/* Subheading */}
        <p className="mb-8 max-w-2xl mx-auto text-sm sm:text-base font-light px-5">
          Your Next Big Career Move Starts Right Here – Explore The Best Job
          Opportunities And Take The First Step Toward Your Future!
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg max-w-3xl mx-auto overflow-hidden">
          {/* Job search */}
          <div className="flex items-center gap-2 px-4 border-r border-gray-300 flex-1">
            <img src={assets.search_icon} alt="search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-sm text-gray-700 p-3 outline-none w-full"
              ref={titleRef}
            />
          </div>

          {/* Location */}
            <div className="flex items-center gap-2 px-4 border-r border-gray-300 flex-1">
            <img
              src={assets.location_icon}
              alt="location"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Location"
              className="text-sm text-gray-700 p-3 outline-none w-full"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 font-medium rounded-full"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap ">
          <p className="font-medium">Trusted By</p>
          <img className="h-6" src={assets.microsoft_logo} alt="" />
          <img className="h-6" src={assets.walmart_logo} alt="" />
          <img className="h-6" src={assets.accenture_logo} alt="" />
          <img className="h-6" src={assets.samsung_logo} alt="" />
          <img className="h-6" src={assets.amazon_logo} alt="" />
          <img className="h-6" src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
