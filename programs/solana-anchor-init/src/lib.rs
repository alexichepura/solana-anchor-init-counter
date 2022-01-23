use anchor_lang::prelude::*;

declare_id!("FSqRiRgnHcTVR6Wa3TMKysWdGSMEbhpAiYjTcuQkgATz");

#[program]
pub mod solana_anchor_init {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, start: u64) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.authority = ctx.accounts.authority.key();
        counter.count = start;
        Ok(())
    }
    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 48)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}

// use anchor_lang::prelude::*;

// declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// #[program]
// mod basic_2 {
//     use super::*;

//     pub fn create(ctx: Context<Create>, authority: Pubkey) -> ProgramResult {
//         let counter = &mut ctx.accounts.counter;
//         counter.authority = authority;
//         counter.count = 0;
//         Ok(())
//     }

//     pub fn increment(ctx: Context<Increment>) -> ProgramResult {
//         let counter = &mut ctx.accounts.counter;
//         counter.count += 1;
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Create<'info> {
//     #[account(init, payer = user, space = 8 + 40)]
//     pub counter: Account<'info, Counter>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct Increment<'info> {
//     #[account(mut, has_one = authority)]
//     pub counter: Account<'info, Counter>,
//     pub authority: Signer<'info>,
// }

// #[account]
// pub struct Counter {
//     pub authority: Pubkey,
//     pub count: u64,
// }
