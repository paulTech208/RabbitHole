import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getAlchemyRpcUrl = (chainId: number) =>
  `${getAlchemyBaseUrl(chainId)}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`

export default getAlchemyRpcUrl
