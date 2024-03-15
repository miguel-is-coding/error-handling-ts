
interface Value {
    value: () => any
}

class StringValue implements Value {
    constructor(private _value: string) {}

    value() {
        return this._value
    }
}

class NumberValue implements Value {
    constructor(private _value: number) {}

    value() {
        return this._value
    }
}

class ValueList<T extends Value> {
    constructor(private _values: T[]) {}

    values() {
        return this._values
    }

    add(value: T) {
        this._values.push(value)
    }

    filter(predicate: (value: T) => boolean): ValueList<T> {
        return new ValueList(this._values.filter(predicate))
    }

    toString() {
        return this._values.map(value => value.value()).join(', ')
    }
}

const stringValue = new StringValue('Hello')
const stringValue1 = new StringValue('world')

const numberValue = new NumberValue(1)
const numberValue1 = new NumberValue(2)

const valueList = new ValueList([stringValue, stringValue1, numberValue, numberValue1])
valueList.add(new StringValue('foo'))

const numberValues = valueList.filter(value => value instanceof NumberValue)
const stringValues = valueList.filter(value => value instanceof StringValue)

console.log(valueList.toString())
console.log(numberValues.toString())
console.log(stringValues.toString())
