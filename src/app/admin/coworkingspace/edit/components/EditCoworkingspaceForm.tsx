"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/interfaces/Authentication";
import updateCoworkingspace from "@/libs/Coworkingspace/updateCoworkingspace";

interface EditCoworkingspaceFormProps {
  initialData: {
    name: string;
    address: string;
    operatingHours: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
  };
  coworkingspaceId: string;
}

export default function EditCoworkingspaceForm({
  initialData,
  coworkingspaceId,
}: EditCoworkingspaceFormProps) {
  const [formData, setFormData] = useState(initialData);
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(session?.user){
      const userSession : SessionUser = session
      const userToken =userSession?.user?.token
      if(userToken){
        try{
          await updateCoworkingspace(
            coworkingspaceId,
            formData.name,
            formData.address,
            formData.operatingHours,
            formData.province,
            formData.postalcode,
            formData.tel,
            formData.picture,
            userToken
          );
        }catch(e){
          throw new Error("Failed to update Coworking space")
        }
      }
    }
  };

  return (
    <div
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      {/* Name */}
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Address */}
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Operating Hours */}
      <TextField
        label="Operating Hours"
        name="operatingHours"
        value={formData.operatingHours}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Province */}
      <TextField
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Postal Code */}
      <TextField
        label="Postal Code"
        name="postalcode"
        value={formData.postalcode}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Telephone */}
      <TextField
        label="Telephone"
        name="tel"
        value={formData.tel}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Picture URL */}
      <TextField
        label="Picture URL"
        name="picture"
        value={formData.picture}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="px-6 py-2"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
