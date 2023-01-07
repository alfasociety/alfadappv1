import React from 'react';
import DangerousHTML from 'dangerous-html/react';
import { Helmet } from 'react-helmet';
import Arbdrop from '../components/Arbdrop/Arbdrop';
import Metadrop from '../components/Metadrop/Metadrop';

import './Home.css';

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>alfa dapp</title>
        <meta property="og:title" content="alfa dapp" />
      </Helmet>
      <section className="home-hero">
        <div className="home-menu">
          <div id="mobile-menu" className="home-mobile-navigation">
            <img
              alt="pastedImage"
              src="https://play.teleporthq.io/static/svg/placeholders/no-image.svg"
              className="home-logo"
            />
            <div className="home-links">
              <span className="Link">Solutions</span>
              <span className="Link">How it works</span>
              <span className="Link">Prices</span>
            </div>
            <div id="close-mobile-menu" className="home-close-mobile-menu">
              <svg viewBox="0 0 804.5714285714286 1024" className="home-icon">
                <path d="M741.714 755.429c0 14.286-5.714 28.571-16 38.857l-77.714 77.714c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-168-168-168 168c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-77.714-77.714c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l168-168-168-168c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l168 168 168-168c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857s-5.714 28.571-16 38.857l-168 168 168 168c10.286 10.286 16 24.571 16 38.857z"></path>
              </svg>
            </div>
          </div>
          <div className="home-desktop-navigation">
            <nav className="home-centered">
              <div className="home-left">
                <img
                  alt="pastedImage"
                  src="/playground_assets/alfa_logo-1500h.png"
                  className="home-logo1"
                />
                <div className="home-links1">
                  <span className="home-text03 Link active">
                    alfa.airdropbot
                  </span>
                  <span className="home-text04 Link">alfa.walletduster</span>
                </div>
              </div>
              <div className="home-right">
                <div id="open-mobile-menu" className="home-burger-menu"></div>
                <div className="home-container1">
                  <span className="home-text05 Link">0x1d..2345</span>
                </div>
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  className="home-icon02"
                >
                  <path d="M877.714 512c0 241.714-197.143 438.857-438.857 438.857s-438.857-197.143-438.857-438.857c0-138.857 64-266.857 175.429-350.286 32.571-24.571 78.286-18.286 102.286 14.286 24.571 32 17.714 78.286-14.286 102.286-74.286 56-117.143 141.143-117.143 233.714 0 161.143 131.429 292.571 292.571 292.571s292.571-131.429 292.571-292.571c0-92.571-42.857-177.714-117.143-233.714-32-24-38.857-70.286-14.286-102.286 24-32.571 70.286-38.857 102.286-14.286 111.429 83.429 175.429 211.429 175.429 350.286zM512 73.143v365.714c0 40-33.143 73.143-73.143 73.143s-73.143-33.143-73.143-73.143v-365.714c0-40 33.143-73.143 73.143-73.143s73.143 33.143 73.143 73.143z"></path>
                </svg>
              </div>
            </nav>
          </div>
          <div>
            <DangerousHTML
              html={`<script>
/*
Mobile menu - Code Embed
*/

// Mobile menu
const mobileMenu = document.querySelector("#mobile-menu")

// Buttons
const closeButton = document.querySelector("#close-mobile-menu")
const openButton = document.querySelector("#open-mobile-menu")

// On openButton click, set the mobileMenu position left to -100vw
openButton.addEventListener("click", function() {
    mobileMenu.style.transform = "translateX(0%)"
})

// On closeButton click, set the mobileMenu position to 0vw
closeButton.addEventListener("click", function() {
    mobileMenu.style.transform = "translateX(100%)"
})
</script>`}
            ></DangerousHTML>
          </div>
        </div>
        <div className="home-container2">
          <div className="home-links2">
            <span className="active home-text06">alfa.airdropbot</span>
            <span className="home-text07">alfa.walletduster</span>
          </div>
        </div>
        <div className="home-cards">
          <div className="home-container3">
            <div className="home-schedule card">
              <img
                alt="pastedImage"
                src="/playground_assets/arbitrum_symbol-full-color-white-background-200w.png"
                className="home-icon04"
              />
              <span className="home-text08">Arbitrum</span>
              <span className="home-text09">
                The Arbitrum network is a layer-2 functionality, developed by
                the New York-based company Offchain Labs, which seeks to solve
                the congestion that the Ethereum network has been experiencing
                by improving how smart contracts are validated.
              </span>
              <a
                href="https://arbitrum.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link Link"
              >
                More info
              </a>
              <Arbdrop rootClassName="component1-root-class-name"></Arbdrop>
            </div>
            <div className="home-schedule1 card">
              <img
                alt="pastedImage"
                src="/playground_assets/optimism.caeb9392.svg"
                className="home-icon05"
              />
              <span className="home-text10">Optimism 2nd airdrop</span>
              <span className="home-text11">
                <span className="home-text12">
                  Optimism is an Ethereum Layer 2 scaling solution powered by a
                  technology called Optimistic rollups, designed to utilize the
                  strong security guarantees of Ethereum while reducing its cost
                  and latency.
                </span>
                <br></br>
                <span>The Optimism Foundation will distribute...</span>
                <br></br>
              </span>
              <a
                href="https://www.optimism.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link1 Link"
              >
                More info
              </a>
              <button className="themebutton hidebutton button">Coming </button>
            </div>
          </div>
          <div className="home-container4">
            <div className="home-schedule2 card">
              <img
                alt="pastedImage"
                src="/playground_assets/metamask_fox.svg%20%5B1%5D-200h.png"
                className="home-icon06"
              />
              <span className="home-text16">Metamask</span>
              <span className="home-text17">
                Available as a browser extension and as a mobile app, MetaMask
                equips you with a key vault, secure login, token wallet, and
                token exchange—everything you need to manage your digital
                assets. MetaMask provides the simplest yet most secure way...
              </span>
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link2 Link"
              >
                More info
              </a>
              <Metadrop rootClassName="component1-root-class-name"></Metadrop>
            </div>
            <div className="home-schedule3 card">
              <img
                alt="pastedImage"
                src="/playground_assets/logo-no-letters.svg"
                className="home-icon07"
              />
              <span className="home-text18">zkSYNC</span>
              <span className="home-text19">
                zkSync is built on ZK Rollup architecture. ZK Rollup is an L2
                scaling solution in which all funds are held by a smart contract
                on the mainchain, while computation and storage are performed
                off-chain. For every Rollup block, a state transition
                zero-knowledge proo...
              </span>
              <a
                href="https://zksync.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link3 Link"
              >
                More info
              </a>
              <button className="home-button2 themebutton hidebutton button">
                Collect
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="home-action-bar">
        <footer className="home-learn-more">
          <div className="home-banner">
            <h2 className="home-text20">
              <span>Learn more about alfa.dapp</span>
              <br className="home-text22"></br>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </h2>
            <div className="home-container6">
              <a
                href="https://alfa-society.gitbook.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="home-link4 themebutton button"
              >
                Knowledgebase
              </a>
            </div>
          </div>
        </footer>
      </section>
      <section className="home-action-bar1">
        <footer className="home-footer">
          <img
            alt="logo"
            src="/playground_assets/alfa_logo-1500h.png"
            className="home-image"
          />
          <div className="home-container7">
            <span className="home-text24">Copyright © alfa.society 2023</span>
          </div>
          <div className="home-icon-group">
            <a
              href="https://t.me/AlfaSociety"
              target="_blank"
              rel="noreferrer noopener"
              className="home-link5"
            >
              <svg viewBox="0 0 1024 1024" className="home-icon08">
                <path d="M679.429 746.857l84-396c7.429-34.857-12.571-48.571-35.429-40l-493.714 190.286c-33.714 13.143-33.143 32-5.714 40.571l126.286 39.429 293.143-184.571c13.714-9.143 26.286-4 16 5.143l-237.143 214.286-9.143 130.286c13.143 0 18.857-5.714 25.714-12.571l61.714-59.429 128 94.286c23.429 13.143 40 6.286 46.286-21.714zM1024 512c0 282.857-229.143 512-512 512s-512-229.143-512-512 229.143-512 512-512 512 229.143 512 512z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/theALFAcoinETH"
              target="_blank"
              rel="noreferrer noopener"
              className="home-link6"
            >
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon10">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Home;
