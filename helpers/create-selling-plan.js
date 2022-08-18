import { Shopify } from "@shopify/shopify-api";

// export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_SELLING_PLAN_MUTATION = `
    mutation sellingPlanGroupCreate($input: ) {
        sellingPlanGroupCreate(input: $input) {
            sellingPlanGroup {
                name
                sellingPlans(first: 10) {
                    edges {
                        node {
                        name
                        options
                        }
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`

export default async function sellingPlanCreator(session, ) {
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  
    // TODO: create request to 
    await client.query({
        data: {
            query: CREATE_SELLING_PLAN_MUTATION,
            variables: {
                input: {
                    name: "Every month delivery",
                    options: ["Delivery Every"],
                    sellingPlansToCreate: {
                        name: "15th of the month",
                        options: ["15"],
                        deliveryPolicy: {
                            recurring: {
                                anchors: { day: 15, type: MONTHDAY },
                                preAnchorBehavior: ASAP,
                                intent: FULFILLMENT_BEGIN,
                                interval: MONTH,
                                intervalCount: 1
                            }
                        },
                        pricingPolicies: {
                            fixed: { adjustmentType: PERCENTAGE, adjustmentValue: { percentage: 10 } }
                        },
                        billingPolicy: {
                            recurring: {
                                interval: MONTH,
                                intervalCount: 1,
                                anchors: { day: 15, type: MONTHDAY }
                            }
                        }
                    }
                  },
                  resources: { productVariantIds: ["gid://shopify/ProductVariant/43400107360494"] }
            }

        },
    });
}