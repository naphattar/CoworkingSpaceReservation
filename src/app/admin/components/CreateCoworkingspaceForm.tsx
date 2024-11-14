"use client";
import createCoworkingspace from "@/libs/Coworkingspace/createCoworkingspace";
import { useState } from "react";

export default function CreateCoworkingSpaceForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");
  const [picture, setPicture] = useState("");

  const checkOperatingHoursError = () =>{
    if(startHours !== "" && endHours !== "" && startHours > endHours){
        return true
    }
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCoworkingspace(
        name,
        address,
        `${startHours} - ${endHours}`,
        province,
        postalCode,
        tel,
        picture
    );
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Add New Coworking Space</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Operating Hours</label>
            {checkOperatingHoursError() && <p className="text-red-500 text-sm mt-1">{"End hours should be after start hours."}</p>}
            <div className="flex space-x-4">
              <input
                type="time"
                placeholder="Start Hours"
                value={startHours}
                onChange={(e) => setStartHours(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="time"
                placeholder="End Hours"
                value={endHours}
                onChange={(e) => setEndHours(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Province</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Telephone</label>
            <input
              type="text"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Picture URL</label>
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Coworking Space
          </button>
        </form>
      </div>
    </div>
  );
};
