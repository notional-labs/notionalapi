const { IndexedTx, StargateClient } = require('@cosmjs/stargate');
const { Tx } = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const { MsgSend } = require("cosmjs-types/cosmos/bank/v1beta1/tx");


// const FOO = 'bar';


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
    const decodedTx = Tx.decode(tx);
    // console.log("DecodedTx:", decodedTx);
    const {memo, messages} = decodedTx.body;
    // console.log("Decoded messages:", messages);
    for (const msg of decodedTx.body.messages) {
      if (msg.typeUrl == '/cosmos.bank.v1beta1.MsgSend') {
        const sendMessage = MsgSend.decode(msg.value);
        console.log("Sent message:", sendMessage, " with memo ", memo);
        const {fromAddress, toAddress, amount} = sendMessage;

        if ((toAddress == 'osmo1038lvdayf3c96lpu05c09rf3jua2jhycvcavw5') &&
          (amount.denom === 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858')) {

          // TODO: check amount here
          // do the logic

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
