import { ethers } from 'hardhat';

async function main() {
  const Swap0x = await ethers.getContractFactory('Swap0x');
  const swap0x = await Swap0x.deploy();

  await swap0x.deployed();
  console.log(`Swap0x deployed to ${swap0x.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
