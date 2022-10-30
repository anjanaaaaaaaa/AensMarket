import {
  BrowserWindowMessageConnection,
  walletDetector,
} from "@aeternity/aepp-sdk";
import { aeSdk } from "./StoreAeSdkPlugin";

export async function scanForWallets() {
  console.log("Reached the method");
  return new Promise((resolve) => {
    console.log("Reached the Promise");

    const handleWallets = async ({ wallets, newWallet }) => {
      let newWallet2 = newWallet || Object.values(wallets)[0];
      console.log(newWallet);
      if (
        confirm(
          `Do you want to connect to wallet ${newWallet.info.name} with id ${newWallet.info.id}`
        )
      ) {
        console.log("newWallet", newWallet2);
        stopScan();

        const walletInfo = await aeSdk.connectToWallet(
          newWallet.getConnection()
        );
        let walletConnected = true;
        const {
          address: { current },
        } = await aeSdk.subscribeAddress("subscribe", "connected");
        // $store.commit("aeSdk/setAddress", Object.keys(current)[0]);
        console.log({ walletInfo, current, walletConnected });
        resolve();
      } else {
        console.log("Not connected");
      }
    };

    const scannerConnection = new BrowserWindowMessageConnection();
    const stopScan = walletDetector(scannerConnection, handleWallets);
  });
}
