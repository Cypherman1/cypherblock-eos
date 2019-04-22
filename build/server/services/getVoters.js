const axios = require('axios');

const Voter = require('../models/voter');

async function getVoters() {
  try {
    let more = true;
    let lower_bound = null;
    let data = null;
    let uresult = null;
    while (more) {
      data = await axios.post('https://publicapi-mainnet.eosauthority.com/v1/chain/get_table_rows', {
        json: true,
        code: 'eosio',
        scope: 'eosio',
        table: 'voters',
        limit: '-1',
        lower_bound: lower_bound
      });

      more = data.data.more;
      lower_bound = data.data.rows[data.data.rows.length - 1].owner;
      console.log(lower_bound);
      //   try {
      //     uresult = await Voter.bulkWrite(
      //       data.data.rows.map((obj) => {
      //         // console.log(obj);
      //         const {owner, ...update} = obj;
      //         return {
      //           updateOne: {
      //             filter: {
      //               owner: owner
      //             },
      //             update: {
      //               $setOnInsert: {owner: owner},
      //               $set: update
      //             },
      //             upsert: true
      //           }
      //         };
      //       })
      //     );
      //   } catch (err) {}

      //   for (let i = 0; i < data.data.rows.length; i++) {
      //     try {
      //       uresult = await Voter.update({owner: data.data.rows[i].owner}, data.data.rows[i], {upsert: true}, () => {});
      //     } catch (err) {}
      //   }

      //   Voter.insertMany(data.data.rows)
      //     .then(() => {
      //       console.log('OK');
      //     })
      //     .catch((err) => console.log(err));
    }
    console.log('finish!');
  } catch (e) {
    console.log(e);
  }
}

module.exports = getVoters;
