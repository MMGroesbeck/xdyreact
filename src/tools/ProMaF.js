// Probability Mass Function

import * as Roll from './Roll';

export class ProMaF {
    constructor(values) {
        // TODO: add expectation value, median, mode
        // TODO: add cumulative mass object
        this.mass = {};
        this.cumuMass = {};
        this.values = typeof values === values.sort((a,b)=>(a-b));
        this.valuesSet = new Set();
        this.total = 0;
        this.values.forEach((value, i) => {
            this.mass[value] = (value in this.mass ? this.mass[value]+1 : 1);
            // this.cumuMass[value] = (value in this.cumuMass ? this.cumuMass[value]+1 : )
            if (value in this.cumuMass) {
                this.cumuMass[value] += 1;
            } else {
                this.cumuMass[value] = i === 0 ? 1 : this.cumuMass[this.values[i-1]]+1;
            }
            this.valuesSet.add(value);
            this.total++;
        });
        this.uniqueValues = Array.from(this.valuesSet).sort((a,b)=>(a-b));
    }

    lessThan(threshold) {
        let i=0;
        while (this.uniqueValues[i] < threshold) {
            i++;
        };
        if (i === 0) {
            return (0, this.total);
        } else {
            return (this.cumuMass[this.uniqueValues[i-1]], this.total);
        }
    }

    atMost(threshold) {
        let i=0;
        while (this.uniqueValues[i] <= threshold) {
            i++;
        };
        if (i === 0) {
            return (0, this.total);
        } else {
            return (this.cumuMass[this.uniqueValues[i-1]], this.total);
        }
    }

    greaterThan(threshold) {
        let i=0;
        while (this.uniqueValues[i] <= threshold) {
            i++;
        };
        if (i === 0) {
            return (0, this.total);
        } else {
            return (this.total - this.cumuMass[this.uniqueValues[i-1]], this.total);
        }
    }

    atLeast(threshold) {
        let i=0;
        while (this.uniqueValues[i] < threshold) {
            i++;
        };
        if (i === 0) {
            return (0, this.total);
        } else {
            return (this.total - this.cumuMass[this.uniqueValues[i-1]], this.total);
        }
    }

    equals(target) {
        return (this.mass[target] || 0, this.total);
    }

    between(min, max, excl=false) {
        let numerator = 0;
        this.uniqueValues.forEach(val => {
            if(excl){
                numerator += val > min && val < max ? this.mass[val] : 0;
            } else {
                numerator += val >= min && val <= max ? this.mass[val] : 0;
            }
        });
        return (numerator, this.total);
    }

    values() {
        return this.values;
    }

    uniqueValues() {
        return this.uniqueValues;
    }

    negated() {
        return new ProMaF(this.values.map(a => -a));
    }

    plusK(k) {
        return new ProMaF(this.values.map(a => a+k));
    }

    sum(addend) {
        //May need to be a promise?
        let values = [];
        this.values.forEach(value => {
            addend.values().forEach(addendValue => {
                values.push(value + addendValue);
            })
        });
        return new ProMaF(values);
    }

    product(factor) {
        //May need to be a promise?
        //ProMaF of product of this * factor
        let values = [];
        this.values.forEach(value => {
            factor.values().forEach(addendValue => {
                values.push(value * addendValue);
            })
        });
        return new ProMaF(values);
    }

    times(conseq) {
        // Should be promise resolving to a ProMaF
        // Total ProMaF if conseq is rolled this times (conditional)
        let values = [];
        this.uniqueValues.forEach(val => {
            values.push(...Array(this.mass[val]).fill(...Roll.yXTimes(val, conseq)));
        })
        return new ProMaF(values);
    }
}