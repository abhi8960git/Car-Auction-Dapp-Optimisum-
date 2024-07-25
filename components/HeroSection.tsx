"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import { shortnetAddress } from '@/services/Services';
import DataTable from './DataTable';
const HeroSection = () => {

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [openBidSection, setOpenBidSection] = useState(false);

  const checkIfWalletConnected = async () => {
    try {

      if (!window.ethereum) return alert("No Account Found");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts.length) {
        setAddress(accounts[0]);

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);
      } else {
        alert("No Account Found")
      }

    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {

      if (!window.ethereum) return alert("No Account Found");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length) {
        setAddress(accounts[0]);

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);
      } else {
        alert("No Account Found")
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="mb-4 flex items-center justify-between py-4 md:py-8">
          {/* <!-- logo - start --> */}
          <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
            <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>

            WinBid
          </a>
          {/* <!-- logo - end --> */}

          {/* <!-- nav - start --> */}
          {/* <nav className="hidden gap-12 lg:flex">
            <a href="#" className="text-lg font-semibold text-indigo-500">Home</a>
            <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Features</a>
            <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Pricing</a>
            <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
          </nav> */}
          {/* <!-- nav - end --> */}

          {/* <!-- buttons - start --> */}
          <button onClick={connectWallet} className="rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block">{address ? shortnetAddress(address) : "ConnectWallet"}</button>

          {/* <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>

            Menu
          </button> */}
          {/* <!-- buttons - end --> */}
        </header>

        <section className={`min-h-96 relative overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-30 px-10 md:px-12   ${openBidSection ? "" : "min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48  "} `}>
          {/* <!-- image - start --> */}
          <img src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500" loading="lazy" alt="Photo by Fakurian Design" className="absolute inset-0 h-full w-full object-cover object-center" />
          {/* <!-- image - end --> */}

          {/* <!-- overlay - start --> */}
          <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply"></div>
          {/* <!-- overlay - end --> */}

          {/* <!-- text start --> */}
          {
            openBidSection ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {/* <!-- product - start --> */}
                <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg ">
                  {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-transparent opacity-50"></div> */}
                  <div className='mb-5 flex flex-col items-center justify-center'>
                    <div>
                      <label htmlFor="text" className="mb-2  inline-block text-sm text-gray-800 sm:text-base">Minimum Bid *</label>
                      <input
                        name="email"
                        className="w-full  rounded border border-gray-300 bg-gray-200 px-6 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                        Car Description *
                      </label>
                      <textarea
                        name="message"
                        className="h-20 w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      ></textarea>

                      <button className=" w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                        Create Auction
                      </button>
                    </div>
                  </div>

                </div>
                {/* <!-- product - end --> */}

                {/* <!-- product - start --> */}
                <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">

                  <div className='mb-36 flex flex-col items-center justify-center'>
                    <div>
                      <label htmlFor="text" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Bid Amount *</label>
                      <input
                        name="email"
                        className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      />
                    </div>
                    <button className=" w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                      Place Bid
                    </button>

                  </div>
                </div>
                {/* <!-- product - end --> */}
              </div>
            ) : (
              <>
                <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
                  <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">Very proud to introduce</p>
                  <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">Empowering Auctions with ERC20 Precision</h1>

                  <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                    <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base" onClick={() => setOpenBidSection(!openBidSection)}>Start now</a>

                    <a href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Take tour</a>
                  </div>
                </div>
              </>

            )
          }
          {/* <!-- text end --> */}

          <DataTable/>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
