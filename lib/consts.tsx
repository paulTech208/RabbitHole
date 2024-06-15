import { mainnet, sepolia } from "viem/chains"

export const SEO_TITLE = "Rabbit-Hole"
export const SEO_DESCRIPTION = "Rabbit Hole Game"
export const SEO_IMAGE = "/images/rabbit.png"

export const IS_TESTNET = process.env.NEXT_PUBLIC_TESTNET === "true"
export const CHAIN = IS_TESTNET ? sepolia : mainnet
export const CHAIN_ID = CHAIN.id
export const RABBIT_CONTRACT_ADDRESS = "0x84a228cD7A9860bbcA8Bea5F94AcDA854Fa042ba"

export const BOT_PFP = "https://i.ibb.co/SN7JyMF/sheeepy.png"
export const PLAYER_PFP = "https://i.ibb.co/vXGDsDD/blacksheep.png"
