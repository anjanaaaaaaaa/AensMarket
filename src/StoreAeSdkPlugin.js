import { AeSdkAepp, Node } from "@aeternity/aepp-sdk";

const TESTNET_NODE_URL = "https://testnet.aeternity.io";
const MAINNET_NODE_URL = "https://mainnet.aeternity.io";
const COMPILER_URL = "https://compiler.aepps.com";

export const aeSdk = new AeSdkAepp({
  name: "Simple æpp",
  nodes: [
    { name: "testnet", instance: new Node(TESTNET_NODE_URL) },
    { name: "mainnet", instance: new Node(MAINNET_NODE_URL) },
  ],
  compilerUrl: COMPILER_URL,
  onNetworkChange: async ({ networkId }) => {
    const [{ name }] = (await aeSdk.getNodesInPool()).filter(
      (node) => node.nodeNetworkId === networkId
    );
    aeSdk.selectNode(name);
    commit("setNetworkId", networkId);
  },
  onAddressChange: ({ current }) =>
    commit("setAddress", Object.keys(current)[0]),
  onDisconnect: () => alert("Aepp is disconnected"),
});
