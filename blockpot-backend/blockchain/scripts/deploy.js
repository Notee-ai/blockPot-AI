const fs = require("fs");

async function main() {
  const LogStorage = await ethers.getContractFactory("LogStorage");
  const logStorage = await LogStorage.deploy();
  await logStorage.deployed();

  console.log("LogStorage deployed to:", logStorage.address);

  // Save address to JSON file
  fs.writeFileSync(
    "./contractAddress.json",
    JSON.stringify({ address: logStorage.address }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
