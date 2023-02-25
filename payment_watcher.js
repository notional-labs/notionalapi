/**
 * There are 2 ways to implement:
 * 1) pooling to api/lcd: /cosmos/tx/v1beta1/txs
 * 2) scan block by block
 *
 * pooling is easier however pagination.key, and pagination.offset dont work, so we'll implement using `scan block by block`
 */

const { IndexedTx, StargateClient } = require('@cosmjs/stargate');
const { Tx } = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const { MsgSend } = require("cosmjs-types/cosmos/bank/v1beta1/tx");
const { sha256 } = require("@cosmjs/crypto");
const { toHex } = require("@cosmjs/encoding");
const { Uint53 } = require("@cosmjs/math");

const WATCH_ADDR = 'osmo1038lvdayf3c96lpu05c09rf3jua2jhycvcavw5';
const WATCH_DENOM = 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858';


sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

main = async () => {
  const client = await StargateClient.connect("https://rpc-osmosis-archive-ia.cosmosia.notional.ventures/")

  const block = await client.getBlock(7883467);
  // console.log(block);
  const {txs} = block;

  for (const tx of txs) {
    // console.log(tx);

    const txHash = toHex(sha256(Buffer.from(tx,'base64')));
    // console.log(txHash);

    const decodedTx = Tx.decode(tx);
    // console.log("DecodedTx:", decodedTx);
    const {memo, messages} = decodedTx.body;
    // console.log("Decoded messages:", messages);
    for (const msg of decodedTx.body.messages) {
      if (msg.typeUrl == '/cosmos.bank.v1beta1.MsgSend') {
        const sendMessage = MsgSend.decode(msg.value);
        console.log("Sent message:", sendMessage, " with memo ", memo);
        const {fromAddress, toAddress, amount} = sendMessage;

        // {
        //   fromAddress: 'osmo1tl9nq9e7jle92cxeas9c4qcaqnvdguwx9ue3qu',
        //   toAddress: 'osmo1038lvdayf3c96lpu05c09rf3jua2jhycvcavw5',
        //   amount: [
        //     {
        //       denom: 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858',
        //       amount: '3000000000'
        //     }
        //   ]
        // }

        const amount_number = Uint53.fromString(amount[0].amount).toNumber();
        console.log("amount_number:", amount_number);

        if ((toAddress == WATCH_ADDR) && (amount.denom === WATCH_DENOM) && (amount_number > 0)) {
          // TODO: insert to db for processing

        }
      }
    }
  }


  // while (true) {
  //   console.log("...");
  //   await sleep(1000);
  // }
}


(async () => {
  await main();
})();
