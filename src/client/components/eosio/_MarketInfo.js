// import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import {Query} from 'react-apollo';
// import {renderRamPriceColorM, renderEOSPriceColorM, renderPercentColor} from '../utils/RenderColors';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import GetMarKetInfo from '../../queries/GetMarketInfo';

// var ram_price, eosio_ram, eos_price, percent_change_24h, eos_volume;

// const MarketInfoLoading = () => {
//   return (
//     <div className="card sameheight-item stats mb-1" data-exclude="xs">
//       <div className="card-header shadow-sm bg-white">
//         <div className="header-block pl-2">
//           <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
//           <h1 className="title text-info">Market info</h1>
//         </div>
//       </div>
//       <div className="card-block">
//         <div className="text-center align-middle overlay pd-mi">
//           <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
//         </div>
//         <div className="row row-sm stats-container m-0">
//           <div className="col-12 col-sm-6  stat-col p-1">
//             <div className="stat-icon">
//               <FontAwesomeIcon icon="chart-bar" />
//             </div>
//             <div className="stat">
//               <div className="value" />
//               <div className="name"> RAM Price (EOS/KB) </div>
//             </div>
//             <div className="progress stat-progress">
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: '0%'
//                 }}
//               />
//             </div>
//           </div>
//           <div className="col-12 col-sm-6  stat-col p-1">
//             <div className="stat-icon">
//               <FontAwesomeIcon icon="coins" />
//             </div>
//             <div className="stat">
//               <div className="value" />
//               <div className="name">eosio.ram</div>
//             </div>
//             <div className="progress stat-progress">
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: '0%'
//                 }}
//               />
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 stat-col p-1">
//             <div className="stat-icon">
//               <FontAwesomeIcon icon="dollar-sign" />
//             </div>
//             <div className="stat">
//               <div className="value" />
//               <div className="name"> EOS Price (USD) </div>
//             </div>
//             <div className="progress stat-progress">
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: '0%'
//                 }}
//               />
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 stat-col p-1">
//             <div className="stat-icon">
//               <FontAwesomeIcon icon="coins" />
//             </div>
//             <div className="stat">
//               <div className="value" />
//               <div className="name"> 24h Volume (USD) </div>
//             </div>
//             <div className="progress stat-progress">
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: '0%'
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// class MarketInfo extends Component {
//   render() {
//     return (
//       <Query query={GetMarKetInfo} pollInterval={0}>
//         {({loading, error, data}) => {
//           if (loading) return <MarketInfoLoading />;
//           if (error) return <MarketInfoLoading />;
//           const {cmc, eosioram, global_data, table_rows} = data;
//           if (table_rows && global_data && cmc && eosioram) {
//             ram_price =
//               Number(
//                 (
//                   Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
//                   Number(table_rows.rows[0].base.balance.split(' ')[0])
//                 ).toFixed(8)
//               ) * 1024;

//             eosio_ram = Number(eosioram.core_liquid_balance.split(' ')[0]).toLocaleString('en', {
//               maximumFractionDigits: 0
//             });

//             eos_price = Number(cmc.EOS.quote.USD.price);
//             percent_change_24h = cmc.EOS.quote.USD.percent_change_24h;
//             eos_volume = Number(cmc.EOS.quote.USD.volume_24h).toLocaleString('en', {maximumFractionDigits: 0});

//             return (
//               <div className="card sameheight-item stats mb-1 d-none d-xl-block" data-exclude="xs">
//                 <div className="card-header shadow-sm bg-white">
//                   <div className="header-block pl-2">
//                     <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
//                     <h1 className="title text-info">Market info</h1>
//                   </div>
//                 </div>
//                 <div className="card-block">
//                   <div className="row row-sm stats-container m-0">
//                     <div className="col-12 col-sm-6  stat-col p-1">
//                       <div className="stat-icon">
//                         <FontAwesomeIcon icon="chart-line" />
//                       </div>
//                       <div className="stat">
//                         <div className="value">{renderRamPriceColorM(ram_price)}</div>
//                         <div className="name"> RAM Price (EOS/KB) </div>
//                       </div>
//                       <div className="progress stat-progress">
//                         <div
//                           className="progress-bar"
//                           style={{
//                             width: '0%'
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12 col-sm-6  stat-col p-1">
//                       <div className="stat-icon">
//                         <FontAwesomeIcon icon="coins" />
//                       </div>
//                       <div className="stat">
//                         <div className="value">{eosio_ram}</div>
//                         <div className="name">
//                           <Link to={`/account/eosio.ram`}>eosio.ram</Link>
//                         </div>
//                       </div>
//                       <div className="progress stat-progress">
//                         <div
//                           className="progress-bar"
//                           style={{
//                             width: '0%'
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12 col-sm-6 stat-col p-1">
//                       <div className="stat-icon">
//                         <FontAwesomeIcon icon="dollar-sign" />
//                       </div>
//                       <div className="stat">
//                         <div className="value">
//                           {renderEOSPriceColorM(eos_price)}
//                           {renderPercentColor(percent_change_24h)}
//                         </div>
//                         <div className="name"> EOS Price (USD) </div>
//                       </div>
//                       <div className="progress stat-progress">
//                         <div
//                           className="progress-bar"
//                           style={{
//                             width: '0%'
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-12 col-sm-6 stat-col p-1">
//                       <div className="stat-icon">
//                         <FontAwesomeIcon icon="coins" />
//                       </div>
//                       <div className="stat">
//                         <div className="value">{eos_volume}</div>
//                         <div className="name"> 24h Volume (USD) </div>
//                       </div>
//                       <div className="progress stat-progress">
//                         <div
//                           className="progress-bar"
//                           style={{
//                             width: '0%'
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           } else {
//             return <MarketInfoLoading />;
//           }
//         }}
//       </Query>
//     );
//   }
// }

// export default MarketInfo;
