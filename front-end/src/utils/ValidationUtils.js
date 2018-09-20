import { BUDGET } from '../constants';

// Returns true for 0
export function isPositiveInteger(value) {
    return /^[0-9]+$/g.exec(value) !== null;
}

export function isZero(value) {
    return /^0*\.?0+$/g.exec(value) !== null;
}

export function validBudget(value) {
    return isPositiveInteger(value) && value >= BUDGET.MIN && value <= BUDGET.MAX;
}