import hre, { ethers } from "hardhat";
import { TradeLinkCCIPV2__factory } from "../typechain-types";
import addresses from "../utils/addressUtils";

// npx hardhat run scripts/deploy.ts --network bkc_test

const main = async () => {
  const [owner] = await ethers.getSigners();

  const deployTradeLink = [
    // {
    //   chainName: "sepolia",
    //   routerAddress: "0xd0daae2231e9cb96b94c8512223533293c3693bf",
    //   linkTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    //   selector: BigInt("16015286601757825753"),
    //   bnm: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
    //   lnm: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
    // },
    {
      chainName: "mumbai",
      routerAddress: "0x70499c328e1e2a3c41108bd3730f6670a44595d1",
      linkTokenAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      selector: BigInt("12532609583862916517"),
      bnm: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
      lnm: "0xc1c76a8c5bfde1be034bbcd930c668726e7c1987",
    },
    // {
    //   chainName: "fuji",
    //   routerAddress: "0x554472a2720e5e7d5d3c817529aba05eed5f82d8",
    //   linkTokenAddress: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    //   selector: BigInt("14767482510784806043"),
    //   bnm: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
    //   lnm: "0x70f5c5c40b873ea597776da2c21929a8282a3b35",
    // },
  ];

  const TradeLinkCCIP = (await ethers.getContractFactory(
    "TradeLinkCCIPV2",
    owner
  )) as TradeLinkCCIPV2__factory;

  const tk = await TradeLinkCCIP.deploy(
    deployTradeLink[0].routerAddress,
    deployTradeLink[0].selector,
    deployTradeLink[0].linkTokenAddress,
    deployTradeLink[0].bnm,
    deployTradeLink[0].lnm
  );

  await tk.waitForDeployment();
  const tkAddr = await tk.getAddress();
  console.log(`Deployed ${deployTradeLink[0].chainName} at ${tkAddr}`);
  await addresses.saveAddresses(hre.network.name, {
    [deployTradeLink[0].chainName]: tkAddr,
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// sepolia 0xB0fdbC9fcdd9b59dd478A228E55d1f21B27e81C1
// mumbai 0x379661D98224CCDE26d0277cF170839a5B6449De
