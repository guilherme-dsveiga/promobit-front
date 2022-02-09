import React, { useState } from "react";
import Image from "next/image";
import RemoveIcon from "../../assets/remove-icon.svg";

function Filter({ allFilters, setFilter, selectedFilter }) {
  const [isFilter, setIsFilter] = useState(false);
  const handleClick = (e) => {
    setFilter(e);
    setIsFilter(true);
  };
  const handleRemoveFilter = () => {
    setFilter([]);
    console.log(selectedFilter);
    setIsFilter(false);
  };
  return (
    <div className="flex flex-wrap md:justify-center md:items-center font-roboto">
      {allFilters
        ? allFilters.map((filter, key) => (
            <a
              key={key}
              className={`cursor-pointer bg-white rounded mb-3 mr-3 text-black text-sm font-bold py-2 ${
                selectedFilter == filter.id ? "px-2 bg-orange-400" : "px-5"
              } gap-2 flex items-center justify-between `}
            >
              <div onClick={() => handleClick(filter.id)}>{filter.name}</div>
              {isFilter ? (
                selectedFilter == filter.id ? (
                  <button
                    className="flex justify-center items-center"
                    onClick={handleRemoveFilter}
                  >
                    <Image
                      src={RemoveIcon}
                      width="20px"
                      height="20px"
                      alt="Ícone de remover"
                    />
                  </button>
                ) : null
              ) : null}
            </a>
          ))
        : null}
    </div>
  );
}

export default Filter;
