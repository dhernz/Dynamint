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

import Link from "next/link";

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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamint</title>
        <meta name="description" content="multi-chain venmo for crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header height={60} p="md">
        <Image height={39} width={244.5} src="/logo-dynamint-white.png" />
      </Header>

      <Container py={10}>
        <MultiSelect
          label="Recipient(s)"
          placeholder="Search"
          searchable
          nothingFound="No options"
          data={data}
          py={10}
          required
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
          />
          <Select
            label="To Chain"
            placeholder="Solana"
            searchable
            nothingFound="No options"
            data={chains}
            py={10}
            required
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
        />

        <Select
          label="Token"
          placeholder="ALGO"
          searchable
          nothingFound="No options"
          data={tokens}
          py={10}
          required
        />
      </Container>

      <Container py={50}>
        <Link href="/confirm">
          <Button fullWidth variant="outline">
            SEND
          </Button>
        </Link>
      </Container>
    </div>
  );
}
