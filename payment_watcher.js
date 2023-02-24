

sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

main = async () => {
  while (true) {
    console.log("...");
    await sleep(1000);
  }
}


(async () => {
  await main();
})();
