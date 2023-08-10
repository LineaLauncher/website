"use client"

import { createIcon } from "@download/blockies"
import { AvatarComponent, Theme, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { lineaTestnet } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { injectedWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"

import "@rainbow-me/rainbowkit/styles.css"
import merge from "lodash.merge"
import Image from "next/image"

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    return ensImage ? (
        <Image src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} alt="ENS Profile Photo" />
    ) : (
        <Image
            src={createIcon({
                seed: address.toLowerCase(),
                size: 8,
                scale: 16,
            }).toDataURL("image/png")}
            width={size}
            height={size}
            style={{ borderRadius: 999 }}
            alt="Blockies Profile Photo"
        />
    )
}

type WalletProviderProps = {
    fontFamily: string
    children: React.ReactNode
}

export default function EthereumProvider({ fontFamily, children }: WalletProviderProps) {
    const { chains, publicClient } = configureChains(
        [lineaTestnet],
        [
            jsonRpcProvider({
                rpc: _ => ({
                    http: "https://rpc.goerli.linea.build",
                }),
            }),
        ]
    )

    const connectors = connectorsForWallets([
        {
            groupName: "Recommended",
            wallets: [
                injectedWallet({ chains }),
                walletConnectWallet({
                    chains,
                    projectId: "cb3ea95f0e9511709ac378bf1341ed38",
                }),
            ],
        },
    ])

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
    })

    const theme = merge(darkTheme(), {
        colors: {
            accentColor: "#000000",
        },
        fonts: {
            body: fontFamily,
        },
    } as Theme)

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={theme} avatar={CustomAvatar} modalSize="compact">
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
