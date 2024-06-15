import Layout from "@/components/Layout"
import SeoHead from "@/components/SeoHead"
import GameProvider from "@/providers/GameProvider"
import Total from "./Total/Total"

const LandingPage = () => (
  <Layout type="base">
    <SeoHead />
    <div className="w-full bg-white_1">
      <GameProvider>
        <Total />
      </GameProvider>
    </div>
  </Layout>
)

export default LandingPage
