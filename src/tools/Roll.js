import { ProMaF } from "./ProMaF";

const oneD = (n) => {
    return new ProMaF([...Array(n+1).keys()].slice(1));
}

const xdy = (x, y) => {
    let soFar = oneD(y);
    for (let i=1; i<x; i++) {
        soFar = soFar.sum(oneD(y));
    }
    return soFar;
}

const yXTimes = (x, y) => {
    // x is a number, y is a ProMaF
    let soFar = new ProMaF(y.values());
    for (let i=1; i<x; i++) {
        soFar = soFar.sum(y);
    }
    return soFar;
}

const sum = (rolls) => {
    return rolls.reduce((total, thisRoll) => total.sum(thisRoll));
}

export { oneD, xdy, yXTimes, sum }