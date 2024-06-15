import { getPublicClient } from "@/lib/clients"
import { BOT_PFP, CHAIN_ID, PLAYER_PFP, RABBIT_CONTRACT_ADDRESS } from "@/lib/consts"
import { useCallback, useEffect, useState } from "react"
import abi from "@/lib/abi/rabbit-abi.json"
import { useAccount } from "wagmi"

const usePlayerInfo = () => {
  const [players, setPlayers] = useState([])
  const { address } = useAccount()

  const getPlayers = useCallback(async () => {
    if (!address) return
    const publicClient = getPublicClient(CHAIN_ID)

    const response = (await publicClient.readContract({
      address: RABBIT_CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: "getPlayers",
    })) as any

    const botPlayers = response.slice(0, 2).map((player, i) => ({
      name: `Bot ${i + 1}`,
      id: player.player,
      src: BOT_PFP,
      playerPosition: i + 1,
      ...player,
    }))

    const me = response.filter(
      (player: any) => player.player.toLowerCase() === address.toLowerCase(),
    )
    if (me.length > 0) {
      me[0] = {
        name: "Player",
        ...me[0],
        id: me[0].player,
        src: PLAYER_PFP,
        playerPosition: 3,
      }
    }
    const formattedPlayers = [...botPlayers, ...me]
    setPlayers(formattedPlayers)
  }, [address])

  useEffect(() => {
    getPlayers()
  }, [getPlayers])

  return {
    players,
    getPlayers,
  }
}

export default usePlayerInfo
