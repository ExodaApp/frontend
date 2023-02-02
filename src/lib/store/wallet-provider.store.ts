import { type Writable, writable } from "svelte/store";
import type { Web3Provider } from "@ethersproject/providers";

export const walletProvider: Writable<Web3Provider | null> = writable()
