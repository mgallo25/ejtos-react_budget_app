import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { dispatch, budget, expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    const [budgetValue, setBudgetValue] = useState(budget);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (budgetValue > 20000) {
                alert('Budget cannot exceed 20,000');
                return
            }
            if (budgetValue < totalExpenses) {
                alert('Budget cannot be lower than amount already spent');
                return
            }
            dispatch({
                type: 'SET_BUDGET',
                payload: budgetValue,
            });
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [budgetValue]);
    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}
                <input
                    required='required'
                    type='number'
                    id='cost'
                    step="10"
                    value={budget}
                    style={{ width: '60%' , marginLeft: '0px'}}
                    onChange={(event) => {
                        const newBudget = parseInt(event.target.value);
                        setBudgetValue(newBudget);
                    }}>
                </input>
            </span>
        </div>
    );
};
export default Budget;
