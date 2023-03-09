import aiMints from "./AiMints.json";
import whitelist from "./Whitelist.json";
const AiMintsContractAddress = "0xF1E6c87E864892a744f5C888b86Ef5Bf5CA642f0";
const WhitelistContractAddress = "0xEBda97C5AcD474E36359854172C318d720a1AAe1";
const AiMintsContractAbi = aiMints.abi;
const WhitelistContractAbi =  whitelist.abi;

export { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }