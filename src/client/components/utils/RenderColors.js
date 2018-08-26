import React from 'react';
import Odometer from 'react-odometerjs';
import NumberEasing from 'che-react-number-easing';

var tmp_ram = 0;

var tmp_ram_price = 0;

var tmp_eos_price = 0;

var tmp_total_balance_ramincluded = 0;

var tmp_to_fiat = 0;

const renderToFiatColor = (to_fiat) => {
  if (to_fiat > tmp_to_fiat && tmp_to_fiat > 0) {
    tmp_to_fiat = to_fiat;
    return (
      <span className="text-success">
        <Odometer value={to_fiat} format="(,ddd).dd" />
      </span>
    );
  } else if (to_fiat == tmp_to_fiat || tmp_to_fiat == 0) {
    tmp_to_fiat = to_fiat;
    return (
      <span className="text-secondary">
        <Odometer value={to_fiat} format="(,ddd).dd" />
      </span>
    );
  } else if (to_fiat < tmp_to_fiat) {
    tmp_to_fiat = to_fiat;
    return (
      <span className="text-danger">
        <Odometer value={to_fiat} format="(,ddd).dd" />
      </span>
    );
  }
};

const renderBlockNum = (block_num) => {
  return <NumberEasing value={block_num} ease="backIn" precision={0} speed={500} trail={true} useLocaleString={true} />;
};

const renderTotalBalanceRAMColor = (total_balance_ramincluded) => {
  if (total_balance_ramincluded > tmp_total_balance_ramincluded && tmp_total_balance_ramincluded > 0) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className="text-success">
        <Odometer value={total_balance_ramincluded} format="(,ddd).dddd" />
      </span>
    );
  } else if (total_balance_ramincluded == tmp_total_balance_ramincluded || tmp_total_balance_ramincluded == 0) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className="text-secondary">
        <Odometer value={total_balance_ramincluded} useLocaleString={true} />
      </span>
    );
  } else if (total_balance_ramincluded < tmp_total_balance_ramincluded) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className="text-danger">
        <Odometer value={total_balance_ramincluded} format="(,ddd).dddd" />
      </span>
    );
  }
};

const renderRamColor = (eos_ram_equivalent) => {
  if (eos_ram_equivalent > tmp_ram && tmp_ram > 0) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-success">
        <Odometer value={eos_ram_equivalent} format="(,ddd).dddd" />
      </span>
    );
  } else if (eos_ram_equivalent == tmp_ram || tmp_ram == 0) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-secondary">
        <Odometer value={eos_ram_equivalent} format="(,ddd).dddd" />
      </span>
    );
  } else if (eos_ram_equivalent < tmp_ram) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-danger">
        <Odometer value={eos_ram_equivalent} format="(,ddd).dddd" />
      </span>
    );
  }
};

const renderRamPriceColor = (ram_price) => {
  if (ram_price > tmp_ram_price && tmp_ram_price > 0) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-success">
        <Odometer value={ram_price} format="(,ddd).dddddd" />
      </span>
    );
  } else if (ram_price == tmp_ram_price) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-secondary">
        <Odometer value={ram_price} format="(,ddd).dddddd" />
      </span>
    );
  } else if (ram_price < tmp_ram_price || tmp_ram_price == 0) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-danger">
        <Odometer value={ram_price} format="(,ddd).dddddd" />
      </span>
    );
  }
};

const renderEOSPriceColor = (eos_price) => {
  if (eos_price > tmp_eos_price && tmp_eos_price > 0) {
    tmp_eos_price = eos_price;
    return (
      <span className="text-success">
        <Odometer value={eos_price} format="(,ddd).dd" />
      </span>
    );
  } else if (eos_price == tmp_eos_price || tmp_eos_price == 0) {
    tmp_eos_price = eos_price;
    return (
      <span className="text-secondary">
        <Odometer value={eos_price} format="(,ddd).dd" />
      </span>
    );
  } else if (eos_price < tmp_eos_price) {
    tmp_eos_price = eos_price;
    return (
      <span className="text-danger">
        <Odometer value={eos_price} format="(,ddd).dd" />
      </span>
    );
  }
};
const renderPercentColor = (percent_24) => {
  if (Number(percent_24) >= 0) {
    return <span className="text-success" style={{fontSize: '10px'}}>{`   ${percent_24}%`}</span>;
  } else {
    return <span className="text-danger" style={{fontSize: '10px'}}>{`  ${percent_24}%`}</span>;
  }
};

const renderPPColor = (percent_24) => {
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
  renderPPColor,
  renderTotalBalanceRAMColor,
  renderToFiatColor,
  renderBlockNum
};
