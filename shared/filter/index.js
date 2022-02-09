import React, { useEffect, useState } from "react";
import Image from "next/image";
import RemoveIcon from "../../assets/remove-icon.svg";

function Filter({ allFilters, setFilter, setPage }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setFilter(selectedFilters);
  }, [selectedFilters]);

  const handleClick = (e, k) => {
    if (selectedFilters.includes(e) === false) {
      setSelectedFilters((prev) => [...prev, e]);
      setPage(1);
    }
  };

  const handleRemove = (e, k) => {
    let tempArrS = [...selectedFilters];
    let indexS = selectedFilters.indexOf(e);
    tempArrS.splice(indexS, 1);
    setSelectedFilters(tempArrS);
    setPage(1);
  };

  return (
    <div className="flex flex-wrap md:justify-center md:items-center font-roboto">
      {allFilters
        ? allFilters.map((filter, key) => (
            <a
              key={key}
              className={`cursor-pointer bg-white rounded mb-3 mr-3 px-5 text-black text-sm font-bold py-2 ${
                selectedFilters.length > 0
                  ? selectedFilters.includes(filter.id)
                    ? "px-2 bg-orange-400"
                    : "px-5"
                  : null
              } gap-2 flex items-center justify-between `}
            >
              <div onClick={() => handleClick(filter.id)}>{filter.name}</div>
              {selectedFilters.length > 0
                ? selectedFilters.map((f, k) => {
                    if (f === filter.id) {
                      return (
                        <div
                          className="flex justify-center items-center"
                          onClick={() => handleRemove(filter.id)}
                          key={k}
                        >
                          <Image
                            src={RemoveIcon}
                            width="20px"
                            height="20px"
                            alt="Ícone de remover"
                          />
                        </div>
                      );
                    }
                  })
                : null}
            </a>
          ))
        : null}
    </div>
  );
}

export default Filter;
