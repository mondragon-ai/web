import { Shopify } from "@shopify/shopify-api";

export const AppInstallations = {
  includes: async function (shopDomain) {
    const shopSessions = await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);

    const s = shopSessions[0]

    console.log("7: - App install.js -  SHop Session -- \n", typeof s);

    console.log("7: SHop Session -- \n", shopSessions[0].isActive());

    if (shopSessions?.length > 0) {
      for (const session of shopSessions) {
        console.log("ANSWER: ", session.accessToken);
        if (session.accessToken) return true;
      }
    }

    return false;
  },

  delete: async function (shopDomain) {
    const shopSessions = await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    if (shopSessions.length > 0) {
      await Shopify.Context.SESSION_STORAGE.deleteSessions(shopSessions.map((session) => session.id));
    }
  },
};
