// import React, {Component} from 'react';
// import {CSSTransitionGroup} from 'react-transition-group';
// // import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import GetActions_mongo from '../../queries/GetActions_mongo';
// import {graphql} from 'react-apollo';
// import {connect} from 'react-redux';
// import ActionCard from './ActionCard';
// import {IsSpam} from '../utils/IsSpam';
// import {IsFiltered} from '../utils/IsFiltered';
// import {IsSearched} from '../utils/IsSearched';

// import {
//   setLiveActions,
//   setIsRefetch,
//   setIsButtonLoading,
//   setIsMore,
//   setIsAntiSpam,
//   setRefetchFunc,
//   setActionChecking,
//   setIsSettingOpen,
//   setActionsLength
// } from '../../actions/eosActions';

// let action_digests_tmp = '';

// const ActionsCardLoading = () => {
//   return (
//     <div>
//       <div className="card-block pt-1 pb-0 pr-1 pl-1 ">
//         <div className="text-center align-middle pd-vi">
//           <i className="fa fa-spinner fa-spin text-info fa-2x" />
//         </div>
//       </div>
//     </div>
//   );
// };

// class ActionsCardBodyMongo extends Component {
//   renderLoadMoreBtn(fetchMore) {
//     if (!this.props.eosActions.islive) {
//       if (!this.props.eosActions.ismore) {
//         return (
//           <button type="button" className="btn btn-outline-info text-light w-100" disabled>
//             Fetch more
//           </button>
//         );
//       } else {
//         if (!this.props.eosActions.isbuttonloading) {
//           return (
//             <button
//               type="button"
//               className="btn btn-outline-info w-100"
//               onClick={() => {
//                 this.props.setIsButtonLoading(true);

//                 fetchMore({
//                   variables: {
//                     skip: this.props.eosActions.actionsLength,
//                     limit: Number(this.props.eosActions.limit)
//                   },
//                   updateQuery: (prev, {fetchMoreResult}) => {
//                     if (!fetchMoreResult) {
//                       this.props.setIsButtonLoading(false);
//                       return prev;
//                     }

//                     this.props.setActionsLength(
//                       Number(this.props.eosActions.actionsLength) + Number(this.props.eosActions.limit)
//                     );
//                     this.props.setIsButtonLoading(false);

//                     if (fetchMoreResult.mongo_actions.actions.length == 0) {
//                       this.props.setIsMore(false);
//                     } else {
//                       this.props.setIsMore(true);
//                     }

//                     return Object.assign(
//                       {},
//                       {
//                         chain: fetchMoreResult.chain,
//                         mongo_actions: {
//                           actions: [...prev.mongo_actions.actions, ...fetchMoreResult.mongo_actions.actions],
//                           __typename: 'MongoActionsType'
//                         }
//                       }
//                     );
//                   }
//                 }).catch((error) => {
//                   this.props.setIsButtonLoading(false);
//                   return true;
//                 });
//               }}
//             >
//               Fetch more
//             </button>
//           );
//         } else
//           return (
//             <div className="w-100 text-center">
//               <i className="fa fa-spinner fa-spin text-info fa-2x" />
//             </div>
//           );
//       }
//     } else
//       return (
//         <button type="button" className="btn btn-outline-info text-light w-100" disabled>
//           Fetch more
//         </button>
//       );
//   }
//   componentDidMount() {
//     this.props.setRefetchFunc(this.props.data.refetch);
//   }
//   componentWillMount() {
//     this.props.setLiveActions(this.props.isLive);
//     this.props.setIsSettingOpen(false);
//     this.props.setActionsLength(Number(this.props.eosActions.actionsLength) + Number(this.props.eosActions.limit));
//   }

//   render() {
//     //const {loading, error, data, fetchMore, refetch} = this.props.data;
//     if (this.props.data.loading) return <ActionsCardLoading />;
//     const {data, eosActions, account_name, setIsSettingOpen, isDarkMode} = this.props;

//     const {fetchMore} = this.props.data;
//     const {
//       isAntiSpamed,
//       isFilterOthers,
//       isFilterSmartContract,
//       isFilterResources,
//       isFilterSendReceiveTokens,
//       isFilterSendReceiveEOS,
//       memoTags,
//       isSettingOpen,
//       actionsLength
//     } = eosActions;
//     if (data.error) return <ActionsCardLoading />;
//     let items = [];

//     if (data && data.mongo_actions && data.chain) {
//       action_digests_tmp = '';

//       data.mongo_actions.actions.map((action) => {
//         if (
//           action.receipt.act_digest !== action_digests_tmp &&
//           !IsSpam(action, isAntiSpamed) &&
//           IsFiltered(
//             action,
//             isFilterOthers,
//             isFilterSmartContract,
//             isFilterResources,
//             isFilterSendReceiveTokens,
//             isFilterSendReceiveEOS
//           ) &&
//           IsSearched(action, memoTags)
//         ) {
//           action_digests_tmp = action.receipt.act_digest;
//           items.push(
//             <ActionCard
//               key={action.receipt.global_sequence}
//               action_trace={action}
//               block_time={action.block_time}
//               block_num={action.block_num}
//               last_irreversible_block={data.chain.last_irreversible_block}
//               head_block_num={data.chain.head_block_num}
//               account_name={account_name}
//               get_block_status={false}
//               trx_id={action.trx_id}
//               isDarkMode={isDarkMode}
//             />
//           );
//         }
//       });
//       if (items.length > 0) {
//         return (
//           <div className={`pb-0 ${isDarkMode ? 'bg-action-dark' : 'bg-actions'}  `} style={{padding: 2}}>
//             <CSSTransitionGroup
//               component="div"
//               transitionName="example"
//               transitionEnterTimeout={100}
//               transitionLeaveTimeout={50}
//             >
//               {items}
//             </CSSTransitionGroup>
//             {this.renderLoadMoreBtn(fetchMore)}
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <div className="pt-1 pb-0">
//               <div className="ftz-11 text-danger p-2">
//                 Oops! No action found! Do you want to "Fetch more" or change actions view settings
//                 <button
//                   type="button"
//                   className="btn btn-light btn-pill p-0"
//                   data-toggle="collapse"
//                   data-target="#collapseExample"
//                   aria-expanded="false"
//                   aria-controls="collapseExample"
//                   onClick={() => {
//                     setIsSettingOpen(!isSettingOpen);
//                   }}
//                 >
//                   {!isSettingOpen ? (
//                     <i className="fa fa-cog fa-lg text-info" />
//                   ) : (
//                     <i className="fa fa-chevron-circle-up fa-lg text-success" />
//                   )}
//                 </button>
//               </div>
//               {this.renderLoadMoreBtn(fetchMore, actionsLength)}
//             </div>
//           </div>
//         );
//       }
//     } else return <ActionsCardLoading />;
//   }
// }
// function mapStateToProps({eosActions, antispam}) {
//   return {eosActions, antispam};
// }
// export default connect(
//   mapStateToProps,
//   {
//     setLiveActions,
//     setIsRefetch,
//     setIsButtonLoading,
//     setIsMore,
//     setIsAntiSpam,
//     setRefetchFunc,
//     setActionChecking,
//     setIsSettingOpen,
//     setActionsLength
//   }
// )(
//   graphql(GetActions_mongo, {
//     options: ({account_name, eosActions}) => {
//       return {
//         variables: {
//           account_name: account_name,
//           skip: 0,
//           limit: eosActions.islive ? 25 : Number(eosActions.limit)
//         },
//         pollInterval: eosActions.islive ? 5000 : 0
//       };
//     }
//   })(ActionsCardBodyMongo)
// );
