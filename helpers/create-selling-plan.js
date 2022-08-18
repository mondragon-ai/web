import { Shopify } from "@shopify/shopify-api";

export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`

export default async function sellingPlanCreator(session, count = DEFAULT_PRODUCTS_COUNT) {
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  
    // TODO: create request to 
    await client.query({
        data: {
            query: CREATE_PRODUCTS_MUTATION,
            variables: {
            input: {
                title: `${randomTitle()}`,
                variants: [{ price: randomPrice() }],
            },
            },
        },
    });
}