import {
  Header,
  Text,
  Container,
  Title,
  Timeline,
  Group,
  Button,
  Space,
  Divider,
} from "@mantine/core";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import main from "./main.js";

export default function Home() {
  const { activate, deactivate } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "dynamint",
    supportedChainIds: [1, 3, 4, 5, 42],
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

      <Container py={30}>
        <Group position="center" spacing="xl">
          <Title order={4}>Connect Wallet</Title>
          {/* <Link href="/cbw"> */}
          <Image
            onClick={() => {
              activate(CoinbaseWallet);
            }}
            height={30}
            width={30}
            src="/coinbase-wallet.png"
          ></Image>
          {/* </Link> */}
          <Link href="https://wallet.testnet.near.org/profile">
            <Image height={30} width={30} src="/near-wallet.jpeg"></Image>
          </Link>
        </Group>
      </Container>

      <Container py={80} align="center">
        <label for="input-money">Amount:</label>
        <Title order={2} align="center">
          <input type="text" id="input-money" name="input-money" />
        </Title>

        <Container align="center" py={15}>
          <Link href="https://staging-global.transak.com/?apiKey=dcdb1074-98e2-40d7-a5d4-9983774ba3c3&cryptoCurrencyList=USDC,NEAR,SOL">
            <Button variant="outline">Add Funds</Button>
          </Link>
        </Container>
      </Container>
      <Divider />
      <Container py={20}>
        <Group position="center" grow>
          <Link href="/pay">
            <Button variant="outline">Pay</Button>
          </Link>

          <Link href="/pay">
            <Button variant="outline">Request</Button>
          </Link>
        </Group>
      </Container>
      <Divider />

      <Container py={20}>
        <Title order={2}>Transactions</Title>
        <Space h="md" />
        <Timeline>
          <Timeline.Item title="TO: doris" bulletSize={24}>
            <Text color="dimmed" size="sm">
              5 ALGO ??????> SOL
            </Text>
          </Timeline.Item>
          <Timeline.Item title="FROM: olivia" bulletSize={24}>
            <Text color="dimmed" size="sm">
              1 SOL ??????> NEAR
            </Text>
          </Timeline.Item>
        </Timeline>
      </Container>
    </div>
  );
}
