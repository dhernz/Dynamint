import {
  Header,
  Text,
  Container,
  Title,
  Timeline,
  Group,
  Button,
  MultiSelect,
} from "@mantine/core";

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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamint</title>
        <meta name="description" content="multi-chain venmo for crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header height={60} p="md">
        <Image
          height={39}
          width={244.5}
          src="/logo-dynamint.png"
          alt="With default placeholder"
          withPlaceholder
        />
      </Header>

      <Container py={20}>
        <MultiSelect
          label="Recipient(s)"
          placeholder="Search"
          searchable
          nothingFound="No options"
          data={data}
          py={10}
        />

        <Button variant="outline" py={10} fullWidth="True">
          Scan QR
        </Button>
      </Container>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
