import { ProMaF } from "./ProMaF";

export function rollD(n) {
    return new ProMaF([...Array(n+1).keys()].slice(1));
}