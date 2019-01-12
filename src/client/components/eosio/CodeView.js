// import React from 'react';
// import {Query} from 'react-apollo';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import GetCode from '../../queries/GetCode';
// //require('codemirror/mode/javascript/javascript');

// import {UnControlled as CodeMirror} from 'react-codemirror2';
// import 'codemirror/theme/material.css';
// //import 'codemirror/mode/javascript/javascript';

// const CodeView = ({match}) => {
//   return (
//     <Query query={GetCode} variables={{account_name: match.params.account_name}}>
//       {({loading, error, data}) => {
//         if (loading)
//           return (
//             <article className="content dashboard-page">
//               <section className="section">
//                 <div className="text-center">
//                   <FontAwesomeIcon icon="spinner" spin className="text-info" />
//                 </div>
//               </section>
//             </article>
//             //   );
//           );

//         if (error)
//           return (
//             <article className="content dashboard-page">
//               <section className="section">
//                 <div className="text-center">
//                   <FontAwesomeIcon icon="spinner" spin className="text-info" />
//                 </div>
//               </section>
//             </article>
//           );
//         const {code} = data;
//         return (
//           <article className="content dashboard-page">
//             <section className="section">
//               {/* <div className="card sameheight-item stats" data-exclude="xs"> */}
//               <CodeMirror
//                 value={code.wast}
//                 options={{
//                   lineNumbers: true,
//                   readOnly: true,
//                   lineWrapping: true
//                 }}
//                 className="code-view-height"
//               />
//               {/* </div> */}
//             </section>
//           </article>
//         );
//       }}
//     </Query>
//   );
// };

// export default CodeView;
