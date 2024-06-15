import { useGame } from "@/providers/GameProvider"
import { useEthersSigner } from "@/hooks/useEthersSigner"
import WalletConnectButton from "@/components/WalletConnectButton"
import ConnectButton from "@/components/ConnectButton"
import Lever from "./Lever"
import { RabbitHead } from "./RabbitHead"
import { Darkness } from "./Darkness"
import PlayerMovement from "./PlayerMovement"
import { RabbitTail } from "./RabbitTail"
import StatusTable from "./StatusTable"

const Total = () => {
  const { phase, players, onChangeSpeed, userSpeed, playGame, playing, initGame, initializing } =
    useGame()
  const signer = useEthersSigner()

  return (
    <div className="w-screen h-screen flex flex-col jusitfy-center items-center relative">
      <StatusTable />
      <div className="h-[25vh]" />
      <div className="tunnel relative !w-full mt-[15vh] samsungS8:mt-[15vh] md:mt-[60px]">
        {players?.length > 0 && <PlayerMovement phase={phase} players={players} />}
        <Darkness phase={phase} />
        <RabbitHead phase={phase} />
        <RabbitTail phase={phase} />
      </div>

      <div className="control-panels mt-[13vh] md:mt-[60px]">
        <Lever />
        <div className="panel">
          <input
            className="w-full m-[4.8px] 3md:m-[8px] p-[2.4px_1.8px_2.8px_6.6px] sm:p-[4px_3px_4px_11px]
                      rounded-[3.6px] sm:rounded-[6px] 
                      outline-0 !focus:border-green !ring-0 appearance-none
                      text-sm md:text-base
              transition duration-[300ms] hover:scale-[1.01] disabled"
            type="number"
            placeholder="None"
            onChange={onChangeSpeed}
            min={1}
            max={10}
            value={userSpeed}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-[10px] mt-[10vh]">
        <button
          type="button"
          className={`shadow-md 
          ${
            players?.length < 3 || initializing
              ? "bg-white_3 text-white_4 cursor-not-allowed"
              : "cursor-pointer bg-green text-white"
          }
          p-[4px_15px] rounded-[5px] 
          !border-0 !outline-0 !ring-0
          transition duration-[300ms] hover:scale-[1.05]`}
          onClick={initGame}
          disabled={players?.length < 3 || initializing}
        >
          {initializing ? "Initializing..." : "Init Game"}
        </button>

        {!signer && (
          <WalletConnectButton>
            <ConnectButton />
          </WalletConnectButton>
        )}
        {signer && (
          <button
            type="button"
            className="shadow-md p-[4px_15px] rounded-[5px] 
            !border-0 !outline-0 !ring-0
            transition duration-[300ms] hover:scale-[1.05]
               cursor-pointer bg-green text-white"
            onClick={playGame}
            // disabled={players?.length < 3 || playing}
          >
            {playing ? "Playing..." : "Start Game"}
          </button>
        )}
      </div>
      <div />
    </div>
  )
}

export default Total
