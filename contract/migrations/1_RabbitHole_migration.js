const RabbitHole = artifacts.require("RabbitHole");

module.exports = async function (deployer) {
    await deployer.deploy(RabbitHole);

    const rabbitHole =  await RabbitHole.deployed() ;

    console.log("RabbitHole Contract: ", rabbitHole.address) ;
}; 