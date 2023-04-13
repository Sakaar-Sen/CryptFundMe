import Head from "next/head";
import Header from "@/components/Header";
import styles from "../styles/create.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { ABI, ADDRESS } from "../../constants/constants.js";
import { ethers } from "ethers";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Spacer, Textarea } from "@geist-ui/core";

const contract_address = ADDRESS;

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

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

  const notifyFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    console.log("Name: " + name);
    console.log("Description: " + description);
    console.log("Status: " + status);

    if (error) {
      // notifyFail("Contract name already exists! Please try again.");
    }
    if (status === "Successfully Created Contract!") {
      // notify("Successfully Created Contract!");
      setStatus("");
    }
  }, [name, description, status]);

  const { contract } = useContract(contract_address);

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "deployContract"
  );

  const saveToDataBase = async (name, description) => {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
  };

  return (
    <>
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
        <title>Create</title>
        <meta name="description" content="Create" />
      </Head>
      <Header activeNav="create" />

      <div className={styles.createform}>
        <Input
          scale={3}
          placeholder="Name Of Contract"
          onChange={(e) => setName(e.target.value)}
          id="name-i"
          required
        />
        <Spacer h={2} />
        {/* <Input
                scale={2}

          placeholder="Contract Description"
          onChange={(e) => setDescription(e.target.value)}
          id="desc-i"
          className={styles.desc}
          required

        /> */}
        <Textarea
          scale={2.6}
          placeholder="Contract Description"
          onChange={(e) => setDescription(e.target.value)}
          id="desc-i"
          className={styles.desc}
          required
        />

        <Spacer h={1} />

        <Web3Button
          contractAddress={ADDRESS}
          contractAbi={ABI}

          action={() => {
            mutateAsync({ args: [name.toString()] });
          }}

          onError={(error) => {
            setStatus(error);
          }}

          onSuccess={(receipt) => {
            var r = receipt;
            console.log(`r is:`+ r);
            console.log("Successfully Created Contract!");
            // setStatus("Successfully Created Contract!");
            saveToDataBase(name, description);
          }}
          onSubmit={() => {
            console.log("Submitting...");
            // notify("Creating Contract...")
          }}
        >
          Create Contract
        </Web3Button>
      </div>

      <div className={styles.status}>
        <h1 className={styles.status} id="status"></h1>
      </div>
    </>
  );
}
