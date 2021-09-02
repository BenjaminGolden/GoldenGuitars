import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addExpense } from '../../modules/expensesManager';
import { Form, Row, Input, Label } from 'reactstrap';

const NewExpense = () => {
    const [expense, setExpense] = useState({
        name: '',
        price: 0,
        reimbursable: '',
        datePurchased: ''
    })

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    handleInputChange = (evt) => {
        const newExpense = { ...expense }
        let selectedVal = evt.target.value
        if (evt.target.id.includes('Id"')) {
            selectedVal = parseInt(selectedVal)
        }
        newExpense[evt.target.id] = selectedVal
        setExpense(newExpense)
    }

    handleSave = (evt) => {
        evt.preventDefault()
        setIsLoading(true)

        const name = expense.name
        const price = expense.price
        const reimbursable = expense.reimbursable 
        const date = expense.datePurchased 

        if (name === '' || price === 0 || reimbursable === '' || date === ''){
            window.alert("please fill in all values")
            setExpense({
                name: '',
                price: 0,
                reimbursable: '',
                datePurchased: ''
            })
            return history.push('/expenses')
        }
        else {
            addExpense(expense)
            .then(() => history.push('/'))
        }
    }

    return (
        <>
        <Form>       
                <Row>
                <Label>Name </Label>
                <Input type='name' id='name' onChange={handleInputChange} placeholder='name' value={expense.name}/>
                </Row>
        </Form>
        </>
    )
}

export default NewExpense;