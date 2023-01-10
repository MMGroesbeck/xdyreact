// Probability Mass Function

export class ProMaF {
    constructor(values) {
        this.mass = {};
        this.values = values.sort((a,b)=>(a-b));
        this.valuesSet = new Set();
        this.total = 0;
        values.forEach(value => {
            this.mass[value] = (value in this.mass ? this.mass[value]+1 : 1);
            this.valuesSet.add(value);
            this.total++;
        });
        this.uniqueValues = Array.from(this.valuesSet).sort((a,b)=>(a-b));
    }

    lessThan(threshold) {
        let numerator = 0;
        this.uniqueValues.forEach(val => {
            numerator += val < threshold ? this.mass[val] : 0;
        })
        return (numerator, this.total);
    }

    atMost(threshold) {
        let numerator = 0;
        this.uniqueValues.forEach(val => {
            numerator += val <= threshold ? this.mass[val] : 0;
        })
        return (numerator, this.total);
    }

    greaterThan(threshold) {
        let numerator = 0;
        this.uniqueValues.forEach(val => {
            numerator += val > threshold ? this.mass[val] : 0;
        })
        return (numerator, this.total);
    }

    atLeast(threshold) {
        let numerator = 0;
        this.uniqueValues.forEach(val => {
            numerator += val >= threshold ? this.mass[val] : 0;
        })
        return (numerator, this.total);
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
        let values = [];
        this.values.forEach(value => {
            addend.values().forEach(addendValue => {
                values.push(value + addendValue);
            })
        });
        return new ProMaF(values);
    }

    product(factor) {
        let values = [];
        this.values.forEach(value => {
            factor.values().forEach(addendValue => {
                values.push(value * addendValue);
            })
        });
        return new ProMaF(values);
    }
}