/**
 *Submitted for verification at Etherscan.io on 2024-05-02
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
    ██████╗  █████╗ ██████╗ ██████╗ ██╗████████╗██████╗ ██╗  ██╗ ██████╗ ██╗     ███████╗
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██║  ██║██╔═══██╗██║     ██╔════╝
    ██████╔╝███████║██████╔╝██████╔╝██║   ██║   ██████╔╝███████║██║   ██║██║     █████╗  
    ██╔══██╗██╔══██║██╔══██╗██╔══██╗██║   ██║   ██╔═══╝ ██╔══██║██║   ██║██║     ██╔══╝  
    ██║  ██║██║  ██║██████╔╝██████╔╝██║   ██║   ██║     ██║  ██║╚██████╔╝███████╗███████╗
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
*/
/// @notice
contract RabbitHole {
    struct Player {
        address player;
        uint256 fuel;
        uint256 speed;
        bool alive;
    }

    Player[] public players;

    mapping(address => uint256) public playersExists;

    /// @notice There are two bots
    constructor() {
        Player memory bot = Player(address(this), 50, 5, true);
        players.push(bot);
        bot = Player(address(this), 50, 6, true);
        players.push(bot);
    }

    function playGame(uint256 speed) public {
        require(speed <= 10, "Speed must be at least 10");

        uint256 playerIndex = playersExists[msg.sender];
        if (playerIndex == 0) {
            // Player doesn't exist, initialize a new player
            Player memory newPlayer = Player(msg.sender, 50, speed, true);
            players.push(newPlayer);
            playerIndex = players.length - 1;
            playersExists[msg.sender] = playerIndex;
        } else {
            // Player exists, update the player's speed
            players[playerIndex].speed = speed;
        }
        for (uint256 i = 0; i < players.length; i++) {
            players[i].fuel -= players[i].speed;
        }
    }

    function initPlayers() public {
        for (uint256 i = 2; i < players.length; i++) {
            playersExists[players[i].player] = 0;
        }

        delete players;
        Player memory bot = Player(address(this), 50, 5, true);
        players.push(bot);
        bot = Player(address(this), 50, 6, true);
        players.push(bot);
    }

    function getPlayers() public view returns (Player[] memory) {
        return players;
    }
}