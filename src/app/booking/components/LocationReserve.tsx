"use client"
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function LocationReserve({ locations , onLocationChange} : { locations : CoWorkingSpace[],onLocationChange : Function}){
    const [selectCoworkingspace,setSelectCoworkingspace] = useState<string>("Chulalongkorn Coworkingspace")
    return(
        <Select
              variant="standard"
              name="Coworkingspace"
              id="Coworkingspace"
              className="h-[2em] w-full"
              value={selectCoworkingspace}
              onChange={(event) => {
                const selectedValue = event.target.value as string;
                setSelectCoworkingspace(selectedValue);
                onLocationChange(selectedValue);
              }}
        >
            {locations.map((location) => {
              return <MenuItem value={location.id}>{location.name}</MenuItem>
            })}
        </Select>
    );
}