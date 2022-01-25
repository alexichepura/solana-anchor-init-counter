import * as anchor from "@project-serum/anchor"
import { Program } from "@project-serum/anchor"
import * as assert from "assert"
import { SolanaAnchorInit } from "../target/types/solana_anchor_init"
const { SystemProgram } = anchor.web3
const { BN } = anchor

type TCounterProgram = Program<SolanaAnchorInit>

describe("solana-anchor-init", () => {
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.SolanaAnchorInit as TCounterProgram
  const counter = anchor.web3.Keypair.generate()

  it("Creates a counter", async () => {
    await program.rpc.initialize(new BN(0), {
      accounts: {
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [counter],
    })
  })

  it("Increments a coutner", async () => {
    await program.rpc.increment({
      accounts: {
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      },
    })
    const account = await program.account.counter.fetch(counter.publicKey)
    assert.ok(account.count.toNumber() === 1)
    assert.ok(account.authority.equals(provider.wallet.publicKey))
  })
})
