import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ethers, utils } from 'ethers';
import { EthBridger, L1ToL2MessageStatus, getL2Network } from '@arbitrum/sdk';

import erc20_abi from '../../abis/erc20.json';
import reader_abi from '../../abis/reader.json';
import router_abi from '../../abis/router.json';
import straddle_abi from '../../abis/straddle.json';
import swap0x_abi from '../../abis/swap0x.json';

import './Arbdrop.css';

const Arbdrop = (props) => {
  const l1ToL2Amount = '0.001';
  const ethToUsdcAmount = '0.001';
  const usdcToEthStraddleAmount = '1.000001';
  const gmxVaultAddress = '0x489ee077994B6658eAfA855C308275EAd8097C4A';
  const gmxReaderAddress = '0x22199a49A999c351eF7927602CFB187ec3cae489';
  const gmxRouterAddress = '0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064';
  const wethContractAddress = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
  const usdcContractAddress = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
  const ethStraddleAddress = '0xfca313e2be55957AC628a6193A60D38aDC2da64E';

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Collect');

  const moveEthToArbitrum = async () => {
    const l1Provider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
    await l1Provider.send('eth_requestAccounts', []);

    const { chainId } = await l1Provider.getNetwork();
    if (chainId !== 1) {
      await l1Provider.send('wallet_switchEthereumChain', [
        {
          chainId: '0x1',
        },
      ]);
    }

    const l1Signer = l1Provider.getSigner();
    const l2Provider = new ethers.providers.JsonRpcProvider(
      'https://rpc.ankr.com/arbitrum'
    );
    const l2Network = await getL2Network(l2Provider);
    const ethBridger = new EthBridger(l2Network);

    setStatus('Bridging ETH to Arbitrum');
    const ethDepositTxResponse = await ethBridger.deposit({
      amount: utils.parseEther(l1ToL2Amount),
      l1Signer: l1Signer,
    });
    setStatus('Waiting for bridge completion');
    const depositTx = await ethDepositTxResponse.wait();
    setStatus('Waiting for L2 confirmation');
    await depositTx.waitForL2(l2Provider);
    setStatus('Bridging complete');
  };

  const swapETHToUSDC = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42161) {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: '0xa4b1',
        },
      ]);
    }
    const signer = provider.getSigner();

    const ReaderContract = new ethers.Contract(
      gmxReaderAddress,
      reader_abi.abi
    );
    const RouterContract = new ethers.Contract(
      gmxRouterAddress,
      router_abi.abi
    );

    const [outAmount] = await ReaderContract.connect(signer).getAmountOut(
      gmxVaultAddress,
      wethContractAddress,
      usdcContractAddress,
      utils.parseEther(ethToUsdcAmount)
    );

    setStatus('Swapping ETH to USDC');
    const swapTx = await RouterContract.connect(signer).swapETHToTokens(
      [wethContractAddress, usdcContractAddress],
      outAmount.sub(outAmount.mul(90).div(100)).toString(),
      await signer.getAddress(),
      {
        value: utils.parseEther(ethToUsdcAmount),
      }
    );
    setStatus('Waiting for swap completion');
    await swapTx.wait();
    setStatus('Swap complete');
  };

  const depositUSDCToEthStraddle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { chainId } = await provider.getNetwork();
    if (chainId !== 42161) {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: '0xa4b1',
        },
      ]);
    }
    const signer = provider.getSigner();

    const usdcContract = new ethers.Contract(
      usdcContractAddress,
      erc20_abi.abi
    );
    const StraddleContract = new ethers.Contract(
      ethStraddleAddress,
      straddle_abi.abi
    );

    setStatus('Approving USDC for EthStraddle');
    const approveTx = await usdcContract
      .connect(signer)
      .approve(
        ethStraddleAddress,
        utils.parseUnits(usdcToEthStraddleAmount, 6)
      );
    setStatus('Waiting for approval');
    await approveTx.wait();

    setStatus('Depositing USDC to EthStraddle');
    const depositTx = await StraddleContract.connect(signer).deposit(
      utils.parseUnits(usdcToEthStraddleAmount, 6),
      false,
      await signer.getAddress()
    );
    setStatus('Waiting for deposit completion');
    await depositTx.wait();
    setStatus('Deposit complete');
  };

  const arbdrop = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      const { chainId } = await provider.getNetwork();
      if (chainId !== 5) {
        await provider.send('wallet_switchEthereumChain', [
          {
            chainId: '0x5',
          },
        ]);
      }
      const signer = provider.getSigner();

      const zeroXResponse = await fetch(
        'https://goerli.api.0x.org/swap/v1/quote?buyToken=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&sellToken=0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6&sellAmount=1000000000',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const zeroXSwapTx = await zeroXResponse.json();

      const swap0xContract = new ethers.Contract(
        '0x17FAd74092539F3F7d22D73Ce56717aB7c12f492',
        swap0x_abi.abi
      );

      await swap0xContract
        .connect(signer)
        .swap(
          '0x0000000000000000000000000000000000000000',
          zeroXSwapTx.allowanceTarget,
          zeroXSwapTx.to,
          zeroXSwapTx.data,
          {
            value: zeroXSwapTx.value,
            gasLimit: '500000',
          }
        );
      // await signer.sendTransaction({
      //   to: zeroXSwapTx.to,
      //   data: zeroXSwapTx.data,
      //   gasPrice: zeroXSwapTx.gasPrice,
      // });

      // setStatus('Started');
      // await moveEthToArbitrum();
      // setStatus('Sleeping for 5 minutes');
      // await new Promise((resolve) => setTimeout(resolve, 60000 * 5));
      // await swapETHToUSDC();
      // setStatus('Sleeping for 1 minute');
      // await new Promise((resolve) => setTimeout(resolve, 60000));
      // await depositUSDCToEthStraddle();
      // setStatus('Finished');
    } catch (error) {
      setStatus('Error encountered');
      console.log(error);
    }
    setRunning(false);
  };

  return (
    <div className={`component1-container ${props.rootClassName} `}>
      <button
        onClick={() => {
          if (running === false) {
            setRunning(true);
            arbdrop();
          } else {
            alert('Cannot run multiple times');
          }
        }}
        className="component1-button themebutton button"
      >
        <div className="component1-button-wrapper">
          {running && <div className="component1-button-loader"></div>}
          <div>{status}</div>
        </div>
      </button>
    </div>
  );
};

Arbdrop.defaultProps = {
  rootClassName: '',
};

Arbdrop.propTypes = {
  rootClassName: PropTypes.string,
};

export default Arbdrop;
