import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import { createElement, useEffect } from "react";
import FundPrompt from "@/components/fundPrompt";
import { ABI, ADDRESS } from "../../constants/constants.js";
import { ethers } from "ethers";
import { useState } from "react";
import Footer from "@/components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Card} from "@geist-ui/core";

export default function Home() {
  //call api to get data and log it
  var file_read = false;

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const getData = async () => {
    if (file_read) {
      return 0;
    }
    file_read = true;
    const res = await fetch("/api/get");
    const data = await res.json();
    console.log(data);
    var feed = document.getElementById("explore-feed");

    for (var i = 0; i < data.length; i++) {
      var name = data.at(i).name;
      var desc = data.at(i).description;
      var balance = await getBalance(name);
      balance = ethers.utils.formatEther(balance);
      feed.innerHTML += `<div> <h2> ${name} </h2> <p> ${desc} </p> <p class=${styles.totalFunds}>Total Funds in Contract: ${balance} FTM </p>  </div>`;
    //   feed.innerHTML += `<Card style={{ width:"300px", height:"300px"}}>
    //   <h2>${name}</h1>
    //   <p>${desc}</p>
    // </Card>`
    }
  };
  const [provider, setProvider] = useState(null);

  const getBalance = async (name) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ADDRESS, ABI, signer);
    const balance = await contract.getBalanceFromContract(name);
    console.log(balance);
    return balance;
  };

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      notify("Please install MetaMask first.");
      return;
    }
    getData();
    console.log("running once.");
  }, [file_read]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
      <Header activeNav="index" />
      {/* <h1 className={styles.indexHeading}>Explore Page</h1> */}
      <h1 className={styles.explore}>Explore</h1>
      <FundPrompt />
      <div id="explore-feed" className={styles.exploreFeed}></div>
      
      <Footer />



      {/* <Card hoverable style={{ width:"300px", height:"300px"}}>
        <h1>Card</h1>
        <p>Content</p>
      </Card> */}
    </div>
  );
}
