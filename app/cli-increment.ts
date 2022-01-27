import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import dotenv from "dotenv"
import { SolanaAnchorInit } from "../target/types/solana_anchor_init"
dotenv.config()
type TCounterProgram = Program<SolanaAnchorInit>

const provider = anchor.Provider.env()
anchor.setProvider(provider)
const program = anchor.workspace.SolanaAnchorInit as TCounterProgram
const authorityPublicKey = provider.wallet.publicKey

const counterKeypair = anchor.web3.Keypair.fromSecretKey(
  Buffer.from(JSON.parse(process.env.COUNTER_PROGRAM_SECRET))
)
const counterKeypairPublicKey = counterKeypair.publicKey

console.log("increment", counterKeypairPublicKey.toBase58(), authorityPublicKey.toBase58())

const increment = async () => {
  await program.rpc.increment({
    accounts: {
      counter: counterKeypairPublicKey,
      authority: authorityPublicKey,
    },
  })
}

increment()
