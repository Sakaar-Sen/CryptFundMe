import Head from "next/head";
import Header from "@/components/Header";
import styles from "../styles/docs.module.css";
import { Collapse, Text } from "@geist-ui/core";

export default function Docs() {
  return (
    <div className={styles.docsOuter}>
      <Head>
        <title>Docs</title>
        <meta name="description" content="Create" />
      </Head>
      <Header activeNav="docs" />

      {/* <h3>Documentation</h3>
      <p>
        CryptFund Me is a decentralized platform that allows anyone to create a
        contract with a name and description and enables others to fund it
        without any fees. This is made possible through the use of Solidity and
        Web3.
      </p>
      <br></br>
      <p>
        The main purpose of this project is to provide a transparent and
        accessible way for people to raise funds for their projects or
        initiatives, without having to go through traditional fundraising
        channels that may come with fees or other restrictions e.g. web2
        platforms like GoFundMe, which charge a 5% fee on all donations. By
        leveraging the power of blockchain technology, we allow users to create
        contracts and receive funding from anyone, anywhere in the world,
        without the need for intermediaries.
      </p>
      <br></br>

      <p>
        The website for CryptFund Me is user-friendly and intuitive, with a
        simple interface that allows users to easily create and fund contracts.
        The contracts themselves are displayed on a public ledger, providing
        transparency and accountability for all parties involved. So if you're
        looking to raise funds for a project or become an investor, CryptFund Me
        is the place to be!
      </p> */}

      <Collapse.Group style={{ width:"60%", margin:"auto auto "}}>
        <Collapse title="Introduction">
          <Text>
          CryptFund Me is a decentralized platform that allows anyone to create a
        contract with a name and description and enables others to fund it
        without any fees. This is made possible through the use of Solidity and
        Web3.
          </Text>
        </Collapse>
        <Collapse title="What makes this different from traditional ways of raising capital?">
          <Text>
          The main purpose of this project is to provide a transparent and
        accessible way for people to raise funds for their projects or
        initiatives, without having to go through traditional fundraising
        channels that may come with fees or other restrictions e.g. web2
        platforms like GoFundMe, which charge a 5% fee on all donations. By
        leveraging the power of blockchain technology, we allow users to create
        contracts and receive funding from anyone, anywhere in the world,
        without the need for intermediaries.
          </Text>
        </Collapse>
        <Collapse title="TLDR;">
          <Text>
          CryptFund Me is a decentralized platform that allows anyone to create a
        contract with a name and description and enables others to fund it
        without any fees. This is made possible through the use of Solidity and
        Web3.
          </Text>
        </Collapse>
      </Collapse.Group>
    </div>
  );
}
