"use client";

import createCoworkingspace from "@/libs/Coworkingspace/createCoworkingspace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCoworkingSpaceForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");
  const [picture, setPicture] = useState("https://drive.google.com/uc?id=1jit7S4cRATEfDi64YjjK1ur2jGlZYs2e");
  const [errors, setErrors] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const validateForm = () => {
    const validationErrors: string[] = [];

    if (name.length < 3) validationErrors.push("Name must be at least 3 characters long.");
    if (address.length < 3) validationErrors.push("Address must be at least 3 characters long.");
    if (!province) validationErrors.push("Province is required.");
    if (!/^\d{5}$/.test(postalCode)) validationErrors.push("Postal Code must be a 5-digit number.");
    if (!/^\d{10}$/.test(tel)) validationErrors.push("Telephone number must be 10 digits.");
    if (!/^https?:\/\/\S+$/.test(picture)) validationErrors.push("Picture must be a valid URL.");
    if (startHours && endHours && startHours >= endHours) {
      validationErrors.push("Start hours must be earlier than end hours.");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const clearForm = () => {
    setName("");
    setAddress("");
    setStartHours("");
    setEndHours("");
    setProvince("");
    setPostalCode("");
    setTel("");
    setPicture("");
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (session?.user?.token) {
      try {
        const newCoworkingspace = await createCoworkingspace(
          name,
          address,
          `${startHours} - ${endHours}`,
          province,
          postalCode,
          tel,
          picture,
          session.user.token
        );
        if (newCoworkingspace.success) {
          router.push("/coworkingspace");
        }
      } catch (error) {
        console.error("Failed to create new coworking space:", error);
      } finally {
        clearForm();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Add New Coworking Space</h2>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
            <ul className="list-disc ml-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
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
            <div className="flex space-x-4">
              <input
                type="time"
                value={startHours}
                onChange={(e) => setStartHours(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="time"
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
}
