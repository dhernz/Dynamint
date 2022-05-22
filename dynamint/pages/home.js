import {
  Header,
  Text,
  Container,
  Title,
  Timeline,
  Group,
  Button,
} from "@mantine/core";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

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
          src="/logo-dynamint-white.png"
          alt="With default placeholder"
          withplaceholder
        />
      </Header>

      <Container size="xl" py={100}>
        <Title order={1} align="center">
          $500
        </Title>
      </Container>

      <Container py={20}>
        <Group position="center" grow>
          <Link href="/pay">
            <Button variant="outline">Pay</Button>
          </Link>

          <Button variant="outline">Request</Button>
        </Group>
      </Container>

      <Container py={20}>
        <Timeline>
          <Timeline.Item title="Default bullet" bulletSize={24}>
            <Text color="dimmed" size="sm">
              Default bullet without anything
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Default bullet" bulletSize={24}>
            <Text color="dimmed" size="sm">
              Default bullet without anything
            </Text>
          </Timeline.Item>
        </Timeline>
      </Container>

      {/* <main className={styles.main}></main>

      <footer className={styles.footer}></footer> */}
    </div>
  );
}
