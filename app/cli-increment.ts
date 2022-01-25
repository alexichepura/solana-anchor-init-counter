import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import { SolanaAnchorInit } from "../target/types/solana_anchor_init"
// const { SystemProgram } = anchor.web3
// const { BN } = anchor
type TCounterProgram = Program<SolanaAnchorInit>

const provider = anchor.Provider.env()
anchor.setProvider(provider)
const program = anchor.workspace.SolanaAnchorInit as TCounterProgram
const counter = anchor.web3.Keypair.generate()

const increment = async () => {
  await program.rpc.increment({
    accounts: {
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    },
  })
}

increment()
