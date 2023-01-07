import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/mIZDoDhki34XOzZnu0uUl0JRZ1LD3MXz',
      accounts: [
        'a6d9b3485f61f54071c5ea2d8743c77f3dea28a0569249a7616def3dbd646201',
      ],
    },
  },
};

export default config;
