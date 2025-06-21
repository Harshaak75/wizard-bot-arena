import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { motion, AnimatePresence } from "framer-motion";
import BotDisplay from "../components/game/BotDisplay";
import DuelAnimation from "../components/game/DuelAnimation";
import MintCardModal from "../components/game/MintCardModal";
import MagicalButton from "../components/ui/MagicalButton";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";

interface Bot {
  name: string;
  power: number;
  defense: number;
  img: string;
  staticImg:string;
  spells: string[];
}

const bots: Bot[] = [
    {
    name: "Harry Potter",
    power: 99,
    defense: 95,
    staticImg:"https://sm.ign.com/t/ign_in/cover/h/harry-pott/harry-potter-the-series_598w.600.jpg",
    img:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGZndHZ0Z2p4OGs1MndxdnBkcDIxZDBkczQ3cGt2b2FlYXNlbjRraiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.gif",
    spells: ["Phoenix Fire", "Elder Wand Strike", "Serpent Strike"],
  },
  {
    name: "VoldBot",
    img:"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm4xMW84dXBuaGE2OHFhdXdnZzF5MnZnbGVxeG95a3d1dzhkYXBpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DEx5GZXKckaKk/giphy.gif",
    staticImg:"https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg",
    power: 98,
    defense: 85,
    spells: ["Avada Kedavra", "Horcrux Shield", "Serpent Strike"],
  },
  {
    name: "HermionaBot",
    power: 89,
    staticImg:"https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/c/1c/c1c30cf0-7e02-11e7-8808-1b9c7ccfc7d0/598cb51832d12.image.jpg?resize=1200%2C925",
    img:"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm40cWY2eWNlNGNsOWV5c2tpeGQ2Zmx4c201dzNlaXIzdzF1MDJyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11vJvF868vno7S/giphy.gif",
    defense: 91,
    spells: ["Time Turner", "Stupefy", "Alohomora"],
  },
  {
    name: "SnapeBot",
    power: 92,
    staticImg:"https://i.insider.com/6789412d8951662c9f208aeb?width=700",
    img:"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcThkdmtlYnR3Y3FzdWNnd2l4ZzBlNHJxMWJ4bjk4b3V6cW05dDNiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AisOYaOZdrS1i/giphy.gif",
    defense: 90,
    spells: ["Sectumsempra", "Occlumens Shield", "Poison Cloud"],
  },
  {
    name: "DracoBot",
    power: 86,
    staticImg:"https://i2-prod.mylondon.news/whats-on/whats-on-news/article31799983.ece/ALTERNATES/s615/0_Undated-handout-photo-issued-by-BoneauBryan-Brown-of-Tom-Felton-as-Draco-Malfoy-in-Harry-Potter-and-the-Cursed-Child.jpg",
    img:"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Zmd3NiOG8zemwzcDcweDhxMWhtMjBrajRxdzA5dGl3MjBuZmg0OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ygx8EYsdRkNpu/giphy.gif",
    defense: 84,
    spells: ["Serpensortia", "Expelliarmus", "Invisibility Mist"],
  },
  {
    name: "LunaBot",
    power: 87,
    img:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpsNW5xb3VwZHhuYmJseWxjNDFrcGtkNjJkanpnbXg5ZnAweXo5YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m0Z1LPu6flQDS/giphy.gif",
    staticImg:"https://contentful.harrypotter.com/usf1vwtuqyxm/7EZWkwOXSNzlnf5Vt1Clwq/abf4deae5f916a5a62a85dd4c2c0ff91/HP-F5-order-of-the-phoenix-luna-bridge-smiling-web-landscape?q=75&fm=jpg&w=2560",
    defense: 95,
    spells: ["Spectrespecs Beam", "Wit-Shield", "Levitation Charm"],
  },
  {
    name: "SiriusBot",
    power: 91,
    staticImg:"https://contentful.harrypotter.com/usf1vwtuqyxm/1rDt6sbCaazd6HdREpDR89/1c0fef1570094aadd4fb87230218db07/sirius-black_2_1800x1248.png?q=75&fm=jpg&w=600&h=416&fit=pad",
    img:"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa293dmNxMHQ5dXd5cjZzZ2Z2eXFqZGRhZmhjNWFnamRmbm1ocnZxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sphuNGBpAqY6c/giphy.gif",
    defense: 89,
    spells: ["Animagus Rage", "Fang Strike", "Loyalty Bond"],
  },
  {
    name: "BellatrixBot",
    power: 94,
    staticImg:"https://i.insider.com/62421833a2e45b001950cb2c?width=800&format=jpeg&auto=webp",
    img:"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGo1aGRmeTVlNTV3cXB0b3MyZnpyaTg2bzJ5eWMyNGgxbmVlcDhvaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PnsQHKyp3APailXnMO/giphy.gif",
    defense: 83,
    spells: ["Cruciatus Curse", "Dark Web", "Blood Pact"],
  },
  {
    name: "DobbyBot",
    power: 79,
    staticImg:"https://contentful.harrypotter.com/usf1vwtuqyxm/6miaYuD2i4wemokq8Q02Uo/ba922817407a667349ae64c8e334d3b6/Dobby_WB_F2_DobbyClickingFingersCastingSpell_Still_080615_Land.jpg?q=75&fm=jpg&w=2560",
    img:"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZlNzEyaTJpNGloZjU3cWZlOW85aTFkNDIxcGQ4b3RmcjBla291aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7zoOcZshec8nqdFKeG/giphy.gif",
    defense: 98,
    spells: ["Elf Blink", "Sock Blast", "Free Will"],
  },
  {
    name: "MoodyBot",
    power: 88,
    staticImg:"https://static1.srcdn.com/wordpress/wp-content/uploads/2019/01/Mad-Eye-Moody-Teaching-in-Harry-Potter.jpg",
    img:"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHk2YTJ5MmRhdHA5M3NjZjd1cGdncTRrOXhwdndha3J2OGdmdW52MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JpkSHfHfn4KJqn6kHn/giphy.gif",
    defense: 93,
    spells: ["Constant Vigilance", "Polyjuice Shock", "Eye of Truth"],
  },
];


type GameState = "betting" | "dueling" | "result";

const metadataURIs = [
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata1.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata2.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata3.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata4.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata5.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata6.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata7.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata8.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata9.json",
  "https://gateway.pinata.cloud/ipfs/bafybeiewic5qosqz3abk2yoi5vhk745lcmbdbkt5mgf3m7gaavsbws6bay/metadata10.json",
];

const Game: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string>("");
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>("betting");
  const [winner, setWinner] = useState<Bot | null>(null);
  const [userWon, setUserWon] = useState<boolean>(false);
  const [showMintModal, setShowMintModal] = useState<boolean>(false);
  const [winningSpell, setWinningSpell] = useState<string>("");

  useEffect(() => {
    const initWeb3 = async () => {
      if ((window as any).ethereum) {
        const w3 = new Web3((window as any).ethereum);
        setWeb3(w3);
        const accounts = await w3.eth.requestAccounts();
        setAddress(accounts[0]);
      } else {
        alert("🦊 Please install MetaMask!");
      }
    };
    initWeb3();
  }, []);

  const handleBotSelect = (bot: Bot) => {
    if (gameState === "betting") {
      setSelectedBot(bot);
    }
  };

  const handleStartDuel = () => {
    if (selectedBot && betAmount > 0) {
      setGameState("dueling");
    }
  };

  const handleDuelComplete = (winningBot: Bot) => {
    setWinner(winningBot);
    setUserWon(selectedBot?.name === winningBot.name);
    setWinningSpell(
      winningBot.spells[Math.floor(Math.random() * winningBot.spells.length)]
    );
    setGameState("result");
  };

  const handleNewGame = () => {
    setSelectedBot(null);
    setBetAmount(0);
    setGameState("betting");
    setWinner(null);
    setUserWon(false);
    setShowMintModal(false);
    setWinningSpell("");
  };

  const handleMintCard = async () => {
    if (!web3 || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    const randomURI =
      metadataURIs[Math.floor(Math.random() * metadataURIs.length)];

    try {
      const contract = new web3.eth.Contract(
        CONTRACT_ABI as any,
        CONTRACT_ADDRESS
      );
      const tx = await contract.methods.mint(randomURI).send({ from: address });
      const tokenId = tx.events.Transfer.returnValues.tokenId;

      console.log("🎉 Minted Token ID:", tokenId);
      alert(`🎉 Minted NFT with Token ID: ${tokenId}`);
      setShowMintModal(true);
    } catch (err: any) {
      console.error("Minting failed:", err);
      alert(`❌ Mint failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="font-cinzel font-bold text-4xl md:text-5xl magical-text-gradient mb-4">
            ⚔️ Magical Bot Arena ⚔️
          </h1>
          <p className="text-purple-200 font-lato text-lg">
            Choose your champion, place your bet, and witness the magical duel!
          </p>
        </motion.div>

        {gameState === "betting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Bot Selection */}
            <div>
              <h2 className="font-cinzel font-bold text-2xl text-yellow-400 mb-6 text-center">
                Choose Your Champion
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {bots.map((bot) => (
                  <BotDisplay
                    key={bot.name}
                    bot={bot}
                    isSelected={selectedBot?.name === bot.name}
                    onSelect={() => handleBotSelect(bot)}
                  />
                ))}
              </div>
            </div>

            {/* Betting Controls */}
            <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="font-cinzel font-bold text-xl text-yellow-400 mb-4 text-center">
                Place Your Bet
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-purple-300 font-lato mb-2">
                    Bet Amount (Simulated)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={betAmount || ""}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    placeholder="Enter amount..."
                  />
                </div>

                {selectedBot && (
                  <div className="text-center p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                    <span className="text-purple-200">Betting on: </span>
                    <span className="text-yellow-400 font-bold">
                      {selectedBot.name}
                    </span>
                  </div>
                )}

                <MagicalButton
                  onClick={handleStartDuel}
                  disabled={!selectedBot || betAmount <= 0}
                  size="lg"
                  className="w-full"
                >
                  🎯 Start Duel
                </MagicalButton>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "result" && winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            {/* Result Display */}
            <div className="max-w-2xl mx-auto">
              {userWon ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="text-8xl mb-4">🎉</div>
                  <h2 className="font-cinzel font-bold text-4xl text-green-400 mb-4">
                    YOU WON!
                  </h2>
                  <p className="text-xl text-white mb-2">
                    <span className="text-yellow-400 font-bold">
                      {winner.name}
                    </span>{" "}
                    emerged victorious!
                  </p>
                  <p className="text-lg text-purple-300">
                    Your champion won with{" "}
                    <span className="text-yellow-400 italic">
                      "{winningSpell}"
                    </span>
                  </p>
                  <p className="text-green-300 font-bold text-lg">
                    You won {betAmount * 1.8} tokens! 💰
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <MagicalButton onClick={handleMintCard} size="lg">
                      🎴 Mint Magic Card
                    </MagicalButton>
                    <MagicalButton
                      onClick={handleNewGame}
                      variant="secondary"
                      size="lg"
                    >
                      🎮 New Game
                    </MagicalButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="text-8xl mb-4">💀</div>
                  <h2 className="font-cinzel font-bold text-4xl text-red-400 mb-4">
                    YOU LOST
                  </h2>
                  <p className="text-xl text-white mb-2">
                    <span className="text-yellow-400 font-bold">
                      {winner.name}
                    </span>{" "}
                    emerged victorious!
                  </p>
                  <p className="text-lg text-purple-300">
                    The winner cast{" "}
                    <span className="text-yellow-400 italic">
                      "{winningSpell}"
                    </span>
                  </p>
                  <p className="text-red-300 font-bold text-lg">
                    You lost {betAmount} tokens 💸
                  </p>

                  <MagicalButton onClick={handleNewGame} size="lg">
                    🎮 Try Again
                  </MagicalButton>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Duel Animation Overlay */}
        <AnimatePresence>
          {gameState === "dueling" && (
            <DuelAnimation
              bot1={selectedBot}
              bot2={bots.filter(bot => bot.name !== selectedBot?.name)[Math.floor(Math.random() * bots.length - 1)]}
              onComplete={handleDuelComplete}
            />
          )}
        </AnimatePresence>

        {/* Mint Card Modal */}
        {winner && winningSpell && (
          <MintCardModal
            isOpen={showMintModal}
            onClose={() => setShowMintModal(false)}
            winningBot={{ ...winner, spell: winningSpell }}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
