import React from "react";

var tmp_ram = 0,
  tmp_ram_price = 0,
  tmp_eos_price = 0;

const renderRamColor = eos_ram_equivalent => {
  if (eos_ram_equivalent > tmp_ram) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-success">
        {eos_ram_equivalent.toLocaleString("en", {
          maximumSignificantDigits: 14
        })}
      </span>
    );
  } else if (eos_ram_equivalent == tmp_ram) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-secondary">
        {eos_ram_equivalent.toLocaleString("en", {
          maximumSignificantDigits: 14
        })}
      </span>
    );
  } else if (eos_ram_equivalent < tmp_ram) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-danger">
        {eos_ram_equivalent.toLocaleString("en", {
          maximumSignificantDigits: 14
        })}
      </span>
    );
  }
};

const renderRamPriceColor = ram_price => {
  if (ram_price > tmp_ram_price) {
    tmp_ram_price = ram_price;
    return <span className="text-success">{ram_price}</span>;
  } else if (ram_price == tmp_ram_price) {
    tmp_ram_price = ram_price;
    return <span className="text-secondary">{ram_price}</span>;
  } else if (ram_price < tmp_ram_price) {
    tmp_ram_price = ram_price;
    return <span className="text-danger">{ram_price}</span>;
  }
};

const renderEOSPriceColor = eos_price => {
  if (eos_price > tmp_eos_price) {
    tmp_eos_price = eos_price;
    return <span className="text-success">{eos_price.toFixed(2)}</span>;
  } else if (eos_price == tmp_eos_price) {
    tmp_eos_price = eos_price;
    return <span className="text-secondary">{eos_price.toFixed(2)}</span>;
  } else if (eos_price < tmp_eos_price) {
    tmp_eos_price = eos_price;
    return <span className="text-danger">{eos_price.toFixed(2)}</span>;
  }
};
const renderPercentColor = percent_24 => {
  if (Number(percent_24) >= 0) {
    return (
      <span
        className="text-success"
        style={{ fontSize: "10px" }}
      >{`   ${percent_24}%`}</span>
    );
  } else {
    return (
      <span
        className="text-danger"
        style={{ fontSize: "10px" }}
      >{`  ${percent_24}%`}</span>
    );
  }
};

const renderPPColor = percent_24 => {
  if (Number(percent_24) >= 0) {
    return <span className="text-success">{`${percent_24}%`}</span>;
  } else {
    return <span className="text-danger">{`${percent_24}%`}</span>;
  }
};

export {
  renderRamColor,
  renderRamPriceColor,
  renderEOSPriceColor,
  renderPercentColor,
  renderPPColor
};
