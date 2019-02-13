const axios = require('axios');

const Voter = require('../models/voter');

async function getVoters() {
  try {
    let more = true;
    let lower_bound = null;
    while (more) {
      let data = await axios.post('https://publicapi-mainnet.eosauthority.com/v1/chain/get_table_rows', {
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
      data.data.rows.map((row) => {
        Voter.update({owner: row.owner}, row, {upsert: true}, () => {});
      });

      //   Voter.insertMany(data.data.rows)
      //     .then(() => {
      //       console.log('OK');
      //     })
      //     .catch((err) => console.log(err));
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = getVoters;
