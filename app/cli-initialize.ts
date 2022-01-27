import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import dotenv from "dotenv"
import { SolanaAnchorInit } from "../target/types/solana_anchor_init"
dotenv.config()
const { SystemProgram } = anchor.web3
const { BN } = anchor
type TCounterProgram = Program<SolanaAnchorInit>

const provider = anchor.Provider.env()
anchor.setProvider(provider)
const program = anchor.workspace.SolanaAnchorInit as TCounterProgram
const authorityPublicKey = provider.wallet.publicKey

// const counterKeypairPath = "./target/deploy/solana_anchor_init-keypair.json"
// const counterKeypairPath = process.env.ANCHOR_WALLET
// const counterKeypairJson = JSON.parse(require("fs").readFileSync(counterKeypairPath, "utf8"))
// const counterKeypair = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(counterKeypairJson))

const counterKeypair = anchor.web3.Keypair.fromSecretKey(
  Buffer.from(JSON.parse(process.env.COUNTER_PROGRAM_SECRET))
)
// const counterKeypair = anchor.web3.Keypair.generate()
const counterKeypairPublicKey = counterKeypair.publicKey

console.log("initialize", counterKeypairPublicKey.toBase58(), authorityPublicKey.toBase58())

const initialize = async () => {
  await program.rpc.initialize(new BN(0), {
    accounts: {
      counter: counterKeypairPublicKey,
      authority: authorityPublicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [counterKeypair],
  })
}

initialize()
