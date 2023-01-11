import { ProMaF } from "./ProMaF";

function highest(rolls, qty=1) {
    let places = Array.from(Array(rolls.length).keys()).slice(rolls.length-qty);
    return specified(rolls, places);
}

function lowest(rolls, qty=1) {
    let places = Array.from(Array(rolls.length).keys()).slice(0, qty);
    return specified(rolls, places)
}

function specified(rolls, places) {
    //Will want this to be a promise, given time scaling of outerProduct
    const select = (values, places) => {
        let sortedValues = values.sort((a,b)=>a-b);
        return sortedValues.filter((val, i) => places.includes(i)).reduce((x,y) => x+y);
    }
    const outerProduct = (...v) => v.reduce((a,b) => a.flatMap(c => b.map(d => [c,d].flat())));

    const valueCombos = outerProduct(...rolls.map(roll => roll.values));
    const computedValues = valueCombos.map(combo => select(combo, places));
    return new ProMaF(computedValues);
}

export { highest, lowest, specified }