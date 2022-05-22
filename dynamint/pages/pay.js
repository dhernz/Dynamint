process.env["REACT_APP_CLUSTER"] = "testnet";

import {
  Header,
  Text,
  Container,
  Title,
  Timeline,
  Group,
  Button,
  MultiSelect,
  NumberInput,
  Select,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import Link from "next/link";

import { contractTransfer } from "../wormhole/wormhole-wrapper/index";

import {
  C3RequestOp,
  C3Sdk,
  CEDepositRequest,
  connectC3,
} from "../c3-sdk/src/C3Sdk";
import { Signer } from "../c3-sdk/src/Signer";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const data = [
  { value: "yasmeen", label: "yasmeen" },
  { value: "doris", label: "doris" },
  { value: "olivia", label: "olivia" },
  { value: "karla", label: "karla" },
  { value: "lena", label: "lena" },
  { value: "daphne", label: "daphne" },
  { value: "serena", label: "serena" },
];

const chains = [
  { value: "algorand", label: "algorand" },
  { value: "avalanche", label: "avalanche" },
  { value: "ethereum", label: "ethereum" },
  { value: "near", label: "near" },
  { value: "solana", label: "solana" },
];

const tokens = [
  { value: "ALGO", label: "ALGO" },
  { value: "ETH", label: "ETH" },
  { value: "NEAR", label: "NEAR" },
  { value: "SOL", label: "SOL" },
  { value: "USDC", label: "USDC" },
];

const sendToC3 = (values) => {
    const signer = new Signer();
    // const userMnemonic = "expand multiply humble vault pulp priority size project dish bamboo hard eternal duty beyond undo below trigger paddle minimum soap quality oval laptop ability toddler"
    const userMnemonic = "use visit potato calm foster walk virus series garlic pill symbol joy current scissors axis ankle sauce truly obey ignore sense install grit able stereo"
    const userWallet = signer.addFromMnemonic(userMnemonic)

    const sdk = await connectC3(
        "https://beta-api.c3.io/",
        "http://51.210.214.25", 8002, "30F57B65916305B7761149D46E0E8D548A9123383E87A28341517F6C39CF20C7",
        // "https://node.testnet.algoexplorerapi.io", 443, "",
        signer.callback,
        signer.tealCallback)

    const userProxy = await sdk.createUserProxy(userWallet)
    console.log("User Proxy Address: ", userProxy.address())

    const isOptedIn = await sdk.isOptedIn(userProxy.address())
    console.log("Is User Proxy Opted In: ", isOptedIn)

    const depositRequest = {
        op: C3RequestOp.CE_Deposit,
        performOptIn: !isOptedIn,
        assetId: 0,
        amount: BigInt(values.amount)
    }

    try {
        const depositResult = await sdk.performC3Op(depositRequest, userProxy)
        console.log("Deposit Result: ", depositResult)
    } catch(error) {
        console.log("Error while depositing, please try again.", error)
    }
}

const handleSubmit = (values) => {
  console.log(values);
  console.log("call wormhole");
  await contractTransfer(
    BigInt(0),
    BigInt(values.amount),
    BigInt(89737126),
    values.fromChain,
    values.toChain,
    new Uint8Array(Buffer.from("Testing123"))
  );
  console.log("call c3");
  sendToC3(values);
};

export default function Home() {
  const form = useForm({
    initialValues: {
      recipients: [],
      fromChain: "algorand",
      toChain: "solana",
      amount: 0,
      token: "ALGO",
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamint</title>
        <meta name="description" content="multi-chain venmo for crypto" />
        <link rel="icon" href="/favicon-dynamint.png" />
      </Head>

      <Header height={60} p="md">
        <Image height={39} width={244.5} src="/logo-dynamint-white.png" />
      </Header>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Container py={10}>
          <MultiSelect
            label="Recipient(s)"
            placeholder="Search"
            searchable
            nothingFound="No options"
            data={data}
            py={10}
            required
            {...form.getInputProps("recipients")}
          />

          {/* <Button variant="outline" py={10} fullWidth="True">
          Scan QR
        </Button> */}

          <Group spacing="xs" grow>
            <Select
              label="From Chain"
              placeholder="Algorand"
              searchable
              nothingFound="No options"
              data={chains}
              py={10}
              required
              {...form.getInputProps("fromChain")}
            />
            <Select
              label="To Chain"
              placeholder="Solana"
              searchable
              nothingFound="No options"
              data={chains}
              py={10}
              required
              {...form.getInputProps("toChain")}
            />
          </Group>

          <NumberInput
            defaultValue={1}
            placeholder="Amount"
            label="Amount"
            variant="default"
            required
            hideControls
            max={1000000000000}
            min={0}
            {...form.getInputProps("amount")}
          />

          <Select
            label="Token"
            placeholder="ALGO"
            searchable
            nothingFound="No options"
            data={tokens}
            py={10}
            required
            {...form.getInputProps("token")}
          />
        </Container>

        <Container py={50}>
          {/* <Link href="/confirm?"> */}
          <Button fullWidth variant="outline" type="submit">
            SEND
          </Button>
          {/* </Link> */}
        </Container>
      </form>
    </div>
  );
}
