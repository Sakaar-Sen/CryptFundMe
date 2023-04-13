import React, { useEffect } from 'react';
import styles from '../styles/fundprompt.module.css';
import Select from 'react-select';
import { useState } from 'react';
import {
    Web3Button,
    useAddress,
    useContract,
    useContractWrite,
} from "@thirdweb-dev/react";
import { ABI, ADDRESS } from '../../constants/constants';
import { ethers } from 'ethers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Spacer , Button} from "@geist-ui/core";

const contract_address = ADDRESS;

export default () => {
    const [options, setOptions] = useState([]);

    //get all projects from deployed_contract_by_ui.json
    const notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const notifyFail = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const fillOptions = async () => {
        if (options.length > 0) return;
        const res = await fetch("/api/get");
        const data = await res.json();
        const newOptions = data.map(d => ({ value: d.name, label: d.name }));
        setOptions(newOptions);
        console.log("options changed.");
    }


    const [Cname, setCname] = useState("");
    const [amount, setAmount] = useState(0);

    const [thirdwebProvider, setThirdwebProvider] = useState(null);
    useEffect(() => {

        fillOptions();
    }, []);

    var connected = false;

    const [fundBtnError, setFundBtnError] = useState("");
    const [fundBtnErrorData, setFundBtnErrorData] = useState("");
    const [withdrawBtnError, setWithdrawBtnError] = useState("");
    useEffect(() => {
        if (window.ethereum) {
            connected = true
            setThirdwebProvider(window.ethereum);
            console.log("thirdweb provider set");
        }

        console.log("amount changed: " + amount);
        console.log("cname changed: " + Cname);
        console.log("fundBtnError changed: " + fundBtnError);
        console.log("funeBtnErrorData changed: " + fundBtnErrorData);
        if (fundBtnError.includes("user rejected transaction")) {
            notifyFail("Unable to Fund. User rejected transaction.");
            setFundBtnError("");
        }
        if (fundBtnErrorData.includes("insufficient balance for transfer")) {
            notifyFail("Unable to Fund. Insufficient balance for transfer.");
            setFundBtnErrorData("");
        }
        if (fundBtnError.includes("You are not the owner of this contract")) {
            console.log("fundBtnError includes You are not the owner of this contract");
        }
        if (withdrawBtnError.includes("You are not the owner of this contract")) {
            notifyFail("Unable to withdraw. You are not the owner of this contract.");
            setWithdrawBtnError("");
        }

    }, [amount, Cname, fundBtnError, withdrawBtnError, fundBtnErrorData]);


    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    async function fundContract() {
        const provider = new ethers.providers.Web3Provider(thirdwebProvider);
        var signer = provider.getSigner();
        const contract = new ethers.Contract(contract_address, ABI, signer);
        document.getElementById("fundBtn").disabled = true;

        try {
            notify("Funding Contract...");
            const tx = await contract.fundContract(Cname, { value: ethers.utils.parseEther(amount) });
            await tx.wait();
            console.log("waiting");
            notify("Contract Successfully Funded!");
        } catch (e) {
            setFundBtnError(e.message);
            try {
                setFundBtnErrorData(e.data.message);
            } catch (e) {
                console.log("error in error data");
            }

        }
        document.getElementById("fundBtn").disabled = false;
    }

    async function withdrawContract() {
        const provider = new ethers.providers.Web3Provider(thirdwebProvider);
        var signer = provider.getSigner();
        const contract = new ethers.Contract(contract_address, ABI, signer);
        notify("Withdrawing...");
        try {
            const tx = await contract.withdrawFromContract(Cname);
            await tx.wait();
            console.log("withdrawing");
            notify("Withdraw Successful!");
        } catch (e) {
            // setFundBtnError(e.message);
            // setFundBtnErrorData(e.data.message);
            // console.log(e.data.message)
            // console.log(e.message)
            setWithdrawBtnError(e.message);
        }
    }


    return (
        <div>
            {/* <ToastContainer
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
            /> */}
            <div className={styles.outer}>
                <h1>Choose project to fund</h1>
                <Select
                    className="basic-single"
                    id={styles.selector}
                    instanceId="basic-single"
                    classNamePrefix="select"
                    defaultValue={options[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={options}
                    onChange={(e) => setCname(e.value)}
                />
                <h1>Amount</h1>
                {/* <Input type="number" min="0.1" placeholder="0.00" onChange={(e) => setAmount(e.target.value)} ></Input> */}
                <br></br>
                <Input scale={1.3}  labelRight="FTM" type="secondary" onChange={(e) => setAmount(e.target.value)} placeholder=''></Input>
                {/* connected ? <button onClick={fundContract} >Fund! </button> : <button onClick={fundContract}disabled>Fund!</button> */}
                <Spacer  h={3}/>
                <Button id='fundBtn' type="secondary"  onClick={fundContract} >Fund </Button>
                <Spacer h={2} />
                <Button  placeholder="Geist UI"  type="secondary"  onClick={withdrawContract}> Withdraw</Button>
            </div>
            <h1 className={styles.hidden}>e</h1>
        </div>
    );
}

