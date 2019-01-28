import React from 'react';
import Odometer from 'react-odometerjs';
import NumberEasing from './NumberEasing';

var tmp_ram = 0;

var tmp_ram_price = 0;

var tmp_eos_price = 0;

var tmp_ram_price_m = 0;

var tmp_eos_price_m = 0;

var tmp_total_balance_ramincluded = 0;

var tmp_to_fiat = 0;

var tmp_eos_staked = 0;

let isDarkMode = null;

const renderEOSStaked = (eos_staked, isDarkMode) => {
  if (eos_staked > tmp_eos_staked && tmp_eos_staked > 0) {
    tmp_eos_staked = eos_staked;
    return (
      <span className="text-success">
        <NumberEasing value={eos_staked} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  } else if (eos_staked == tmp_eos_staked || tmp_eos_staked == 0) {
    tmp_eos_staked = eos_staked;
    return (
      <span className={`${isDarkMode ? 'text-cypher' : ''}`}>
        <NumberEasing value={eos_staked} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  } else if (eos_staked < tmp_eos_staked) {
    tmp_eos_staked = eos_staked;
    return (
      <span className="text-danger">
        <NumberEasing value={eos_staked} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  }
};

const renderToFiatColor = (to_fiat, isDarkMode) => {
  if (to_fiat > tmp_to_fiat && tmp_to_fiat > 0) {
    tmp_to_fiat = to_fiat;
    return (
      <span className="text-success">
        <NumberEasing value={to_fiat} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  } else if (to_fiat == tmp_to_fiat || tmp_to_fiat == 0) {
    tmp_to_fiat = to_fiat;
    return (
      <span className={` ${isDarkMode ? 'text-cypher' : ''}`}>
        <NumberEasing value={to_fiat} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  } else if (to_fiat < tmp_to_fiat) {
    tmp_to_fiat = to_fiat;
    return (
      <span className="text-danger">
        <NumberEasing value={to_fiat} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  }
};

const renderProRank = (index) => {
  if (Number(index) <= 21) return <span className="text-success"> {index} </span>;
  return <span className="text-secondary"> {index} </span>;
};

const renderBlockNum = (block_num) => {
  isDarkMode = localStorage.getItem('isDarkMode') == 'true';
  return (
    <NumberEasing
      value={block_num}
      ease="backIn"
      precision={0}
      speed={500}
      trail={true}
      useLocaleString={true}
      className={`font-weight-acttype  ${isDarkMode ? 'linkcolor-dark' : ''} `}
    />
  );
};

const renderConfNum = (conf_num) => {
  return <NumberEasing value={conf_num} ease="backIn" precision={0} speed={500} trail={true} useLocaleString={true} />;
};

const renderStake2Vote = (stake2vote, last_vote_weight, isDarkMode) => {
  if (Number(stake2vote) > Number(last_vote_weight)) {
    return (
      <span className="text-success">
        <NumberEasing value={stake2vote} ease="backIn" precision={0} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  } else {
    return (
      <span className={`${isDarkMode ? 'text-cypher' : ''}`}>
        <NumberEasing value={stake2vote} ease="backIn" precision={0} speed={500} trail={true} useLocaleString={true} />
      </span>
    );
  }
};

const renderDecayedPercent = (stake2vote, last_vote_weight) => {
  if (Number(stake2vote) > Number(last_vote_weight)) {
    return (
      <span className="text-danger">
        {(((Number(stake2vote) - Number(last_vote_weight)) / Number(stake2vote)) * 100).toFixed(2)} %
      </span>
    );
  } else if (Number(stake2vote).toFixed(0) == Number(last_vote_weight).toFixed(0)) {
    return <span className="text-success">0.00 %</span>;
  } else {
    return (
      <span className="text-success">
        {(((Number(stake2vote) - Number(last_vote_weight)) / Number(stake2vote)) * 100).toFixed(2)} %
      </span>
    );
  }
};

const renderDecayedPercentProxy = (stake2vote, last_vote_weight, proxied_vote_weight) => {
  if (stake2vote > last_vote_weight - proxied_vote_weight) {
    return (
      <span className="text-danger">
        {(((stake2vote - (last_vote_weight - proxied_vote_weight)) / stake2vote) * 100).toFixed(2)} %
      </span>
    );
  } else if (stake2vote == last_vote_weight - proxied_vote_weight) {
    return <span className="text-success">0.00 %</span>;
  } else {
    return (
      <span className="text-success">
        {(((stake2vote - (last_vote_weight - proxied_vote_weight)) / stake2vote) * 100).toFixed(2)} %
      </span>
    );
  }
};

const renderEOSNum = (eos_num) => {
  return <NumberEasing value={eos_num} ease="backIn" precision={4} speed={500} trail={true} useLocaleString={true} />;
};

const renderHeadBlockTime = (head_block_time) => {
  return <Odometer value={head_block_time} />;
};

const renderTotalBalanceRAMColor = (total_balance_ramincluded, isDarkMode) => {
  if (total_balance_ramincluded > tmp_total_balance_ramincluded && tmp_total_balance_ramincluded > 0) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className="text-success">
        <NumberEasing
          value={total_balance_ramincluded}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  } else if (total_balance_ramincluded == tmp_total_balance_ramincluded || tmp_total_balance_ramincluded == 0) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className={` ${isDarkMode ? 'text-cypher' : ''}`}>
        <NumberEasing
          value={total_balance_ramincluded}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  } else if (total_balance_ramincluded < tmp_total_balance_ramincluded) {
    tmp_total_balance_ramincluded = total_balance_ramincluded;
    return (
      <span className="text-danger">
        <NumberEasing
          value={total_balance_ramincluded}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  }
};

const renderRamColor = (eos_ram_equivalent, isDarkMode) => {
  if (eos_ram_equivalent > tmp_ram && tmp_ram > 0) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-success">
        <NumberEasing
          value={eos_ram_equivalent}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  } else if (eos_ram_equivalent == tmp_ram || tmp_ram == 0) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className={` ${isDarkMode ? 'text-cypher' : ''} `}>
        <NumberEasing
          value={eos_ram_equivalent}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  } else if (eos_ram_equivalent < tmp_ram) {
    tmp_ram = eos_ram_equivalent;
    return (
      <span className="text-danger">
        <NumberEasing
          value={eos_ram_equivalent}
          ease="backIn"
          precision={4}
          speed={500}
          trail={true}
          useLocaleString={true}
        />
      </span>
    );
  }
};

const renderRamPriceColor = (ram_price) => {
  if (ram_price > tmp_ram_price && tmp_ram_price > 0) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-success">
        <Odometer value={ram_price} format="(,ddd).dddd" />
      </span>
    );
  } else if (ram_price == tmp_ram_price || tmp_ram_price == 0) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-dark">
        <Odometer value={ram_price} format="(,ddd).dddd" />
      </span>
    );
  } else if (ram_price < tmp_ram_price) {
    tmp_ram_price = ram_price;
    return (
      <span className="text-danger">
        <Odometer value={ram_price} format="(,ddd).dddd" />
      </span>
    );
  }
};
//for mobile
const renderRamPriceColorM = (ram_price) => {
  if (ram_price > tmp_ram_price_m && tmp_ram_price_m > 0) {
    tmp_ram_price_m = ram_price;
    return (
      <span className="text-success">
        <Odometer value={ram_price} format="(,ddd).dddd" />
      </span>
    );
  } else if (ram_price == tmp_ram_price_m || tmp_ram_price_m == 0) {
    tmp_ram_price_m = ram_price;
    return (
      <span className="text-dark">
        <Odometer value={ram_price} format="(,ddd).dddd" />
      </span>
    );
  } else if (ram_price < tmp_ram_price_m) {
    tmp_ram_price_m = ram_price;
    return (
      <span className="text-danger">
        <Odometer value={ram_price} format="(,ddd).dddd" />
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
      <span className="text-dark">
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

//for mobile
const renderEOSPriceColorM = (eos_price) => {
  if (eos_price > tmp_eos_price_m && tmp_eos_price_m > 0) {
    tmp_eos_price_m = eos_price;
    return (
      <span className="text-success">
        <Odometer value={eos_price} format="(,ddd).dd" />
      </span>
    );
  } else if (eos_price == tmp_eos_price_m || tmp_eos_price_m == 0) {
    tmp_eos_price_m = eos_price;
    return (
      <span className="text-dark">
        <Odometer value={eos_price} format="(,ddd).dd" />
      </span>
    );
  } else if (eos_price < tmp_eos_price_m) {
    tmp_eos_price_m = eos_price;
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
  if (percent_24) {
    if (Number(percent_24) >= 0) {
      return <span className="text-success float-right">{`${Number(percent_24).toFixed(2)}%`}</span>;
    } else {
      return <span className="text-danger float-right">{`${Number(percent_24).toFixed(2)}%`}</span>;
    }
  } else return null;
};

export {
  renderRamColor,
  renderRamPriceColor,
  renderEOSPriceColor,
  renderPercentColor,
  renderPPColor,
  renderTotalBalanceRAMColor,
  renderToFiatColor,
  renderBlockNum,
  renderEOSNum,
  renderEOSStaked,
  renderEOSPriceColorM,
  renderRamPriceColorM,
  renderProRank,
  renderHeadBlockTime,
  renderStake2Vote,
  renderDecayedPercent,
  renderDecayedPercentProxy,
  renderConfNum
};
