import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  return (
    <Page >
      <TitleBar title="VIP Club" primaryAction={null} />
      <Layout>
        <Layout.Section>

          <Stack
            wrap={true}
            spacing="extraTight"
            distribution="equalSpacing"
            alignment="center"
          >
            <Stack.Item>

              <Card sectioned>
                <div style={{ padding: "5% 20px 0 0" }}>
                  <TextContainer>
                      <h1 style={{fontSize: "50px"}}>50</h1>
                      <Heading>Todays Subscription</Heading>
                      <p>30,000 total active subscriptions</p>
                  </TextContainer>
                </div>
              </Card>
            </Stack.Item>
            <Stack.Item>
              <Card sectioned>
                <div style={{ padding: "5% 20px 0 0" }}>
                  <TextContainer>
                      <h1 style={{fontSize: "50px"}}>50</h1>
                      <Heading>Todays Subscription</Heading>
                      <p>30,000 total active subscriptions</p>
                  </TextContainer>
                </div>
              </Card>
            </Stack.Item>
            <Stack.Item>
              <Card sectioned>
                <div style={{ padding: "5% 20px 0 0" }}>
                  <TextContainer>
                      <h1 style={{fontSize: "50px"}}>50</h1>
                      <Heading>Todays Subscription</Heading>
                      <p>30,000 total active subscriptions</p>
                  </TextContainer>
                </div>
              </Card>
            </Stack.Item>
          </Stack>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
