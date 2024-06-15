//test/RabbitpHole.test.js
const RabbitHole = artifacts.require("RabbitHole");
const { assert } = require("chai");

require("chai").use(require("chai-as-promised")).should();

contract("RabbitHole Contract", async (deployers) => {
  let rabbitHole;
  const player = deployers[0];
  const noBotPlayer = deployers[1];

  beforeEach(async () => {
    rabbitHole = await RabbitHole.deployed();
  });

  it("2 players should be bot", async () => {
    const players = await rabbitHole.getPlayers();
    assert(players[0].speed === "5", "bot 1 speed is not 5");
    assert(players[1].speed === "6", "bot 2 speed is not 6");
  });

  it("should play game with the play have parm speed", async () => {
    await rabbitHole.playGame(5, { from: noBotPlayer });
    const players = await rabbitHole.getPlayers();
    assert(players.length === 3, "New player is playing");
  });

  it("player set up speed", async () => {
    await rabbitHole.playGame(9, { from: noBotPlayer });
    const players = await rabbitHole.getPlayers();
    console.log(players)
    console.log(players.length)
    // assert(players[2].speed === 8, "player seted up speed");
  });
  
});
