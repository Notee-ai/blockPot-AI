const hre = require("hardhat");

async function main() {
  const LogStorage = await hre.ethers.getContractFactory("LogStorage");
  const logStorage = await LogStorage.deploy();

  await logStorage.deployed();

  console.log("LogStorage deployed to:", logStorage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
