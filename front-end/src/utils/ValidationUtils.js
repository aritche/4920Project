import { BUDGET } from '../constants';

export function isInteger(value) {
    return /^[0-9]*$/g.exec(value);
}

export function validBudget(value) {
    return isInteger(value) && value >= BUDGET.MIN && value <= BUDGET.MAX;
}