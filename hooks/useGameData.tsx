import { useState } from "react"
import usePlayerInfo from "./usePlayerInfo"
import { useAccount, useWalletClient } from "wagmi"
import abi from "@/lib/abi/rabbit-abi.json"
import { CHAIN, CHAIN_ID, RABBIT_CONTRACT_ADDRESS } from "@/lib/consts"
import { getPublicClient } from "@/lib/clients"
import handleTxError from "@/lib/handleTxError"

const useGameData = () => {
  const [phase, setPhase] = useState("Default")
  const [userSpeed, setUserSpeed] = useState(1)
  const playerInfos = usePlayerInfo()
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const [playing, setPlaying] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const [isOpenChannel, setIsOpenChannel] = useState(true)

  const TunnelChange = (setPhase) => {
    setPhase("CloseTunnel") // Close tunnel: Head moves to swallow everything. Open tunnel: cars get out
    setTimeout(() => setPhase("OpenTunnel"), 7000)
    setTimeout(() => setPhase("Reset"), 18000)
  }

  const onCloseTunnel = (setPhase) => {
    setPhase("CloseTunnel")
  }

  const onResetTunnel = (setPhase) => {
    setTimeout(() => setPhase("OpenTunnel"), 5000)
    setTimeout(() => setPhase("Reset"), 16000)
  }

  const initGame = async () => {
    setInitializing(true)
    try {
      const hash = await walletClient?.writeContract({
        address: RABBIT_CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "initPlayers",
        account: address as `0x${string}`,
        chain: CHAIN,
      })

      await getPublicClient(CHAIN_ID).waitForTransactionReceipt({
        hash,
      })

      await playerInfos.getPlayers()
    } catch (error) {
      handleTxError(error)
    }
    setInitializing(false)
  }

  const playGame = async () => {
    setIsOpenChannel(true)
    try {
      const hash = await walletClient?.writeContract({
        address: RABBIT_CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "playGame",
        account: address as `0x${string}`,
        chain: CHAIN,
        args: [parseInt(userSpeed.toString(), 10)],
      })
      // TunnelChange(setPhase)
      onCloseTunnel(setPhase)
      setPlaying(true)
      // return [
      //   {
      //     player: "0x5EfC0A9bd5D894e60005aF4aFC6DF3F1E483304D",
      //     fuel: "40",
      //     speed: "5",
      //     alive: true,
      //   },
      //   {
      //     player: "0x5EfC0A9bd5D894e60005aF4aFC6DF3F1E483304D",
      //     fuel: "38",
      //     speed: "6",
      //     alive: true,
      //   },
      //   {
      //     player: "0xEe348e257A5e30F08Bc8a74d5dA18254B2424BA6",
      //     fuel: "36",
      //     speed: "9",
      //     alive: true,
      //   },
      // ]
      await getPublicClient(CHAIN_ID).waitForTransactionReceipt({
        hash,
      })
      await playerInfos.getPlayers()
    } catch (error) {
      handleTxError(error)
    }
    onResetTunnel(setPhase)
    console.log("ZIAD info", playerInfos)
    setPlaying(false)
    setIsOpenChannel(false)
  }

  const onChangeSpeed = (e) => {
    const speed = parseInt(e.target.value, 10) || 1
    setUserSpeed(speed > 9 ? 9 : speed)
  }

  return {
    phase,
    setPhase,
    userSpeed,
    setUserSpeed,
    TunnelChange,
    ...playerInfos,
    onChangeSpeed,
    playGame,
    playing,
    initGame,
    initializing,
    isOpenChannel,
    setIsOpenChannel,
  }
}

export default useGameData
