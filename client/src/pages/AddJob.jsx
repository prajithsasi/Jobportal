import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Senior Level");
  const [salary, setSalary] = useState("");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type here",
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description: quillRef.current.root.innerHTML,
      category,
      location,
      level,
      salary,
    });
  };

  return (
    <form className="p-6 w-full max-w-4xl" onSubmit={handleSubmit}>
      {/* Job Title */}
      <div className="mb-4">
        <p className="mb-1 font-medium">Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <p className="mb-1 font-medium">Job Description</p>
        <div
          ref={editorRef}
          className="bg-white border rounded min-h-[150px]"
        ></div>
      </div>

      {/* Category, Location, Level */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="mb-1 font-medium">Job Category</p>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Programming</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-medium">Job Location</p>
          <select
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Remote</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-medium">Job Level</p>
          <select
            className="w-full border rounded px-3 py-2"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Intern</option>
            <option>Junior Level</option>
            <option>Intermediate</option>
            <option>Senior Level</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div className="mb-4 w-32">
        <p className="mb-1 font-medium">Salary</p>
        <input
          type="number"
          placeholder="0"
          className="w-full border rounded px-3 py-2"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;
