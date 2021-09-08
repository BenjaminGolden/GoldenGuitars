import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addExpense } from '../../modules/expensesManager';
import { Button, FormGroup, Form, Row, Input, Label } from 'reactstrap';

const NewExpense = () => {
    const [expense, setExpense] = useState({
        name: '',
        price: 0,
        reimbursable: '',
        datePurchased: ''
    })

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (evt) => {

        const value = evt.target.value;
        const key = evt.target.id;
        const newExpense = { ...expense }
        
        newExpense[key] = value;
        setExpense(newExpense)
    }

    const handleSave = (evt) => {
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
         <Form className="container w-75 opacity">
                <h2 className="font">Add Expense</h2>
                <FormGroup>
                    
                    <Input type="text" name="name" id="name" placeholder="Expense Name"
                        value={expense.name}
                        onChange={handleInputChange} />
                </FormGroup>

                <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
                <Button className="btn btn-primary" onClick={() => history.push(`/`)}>Cancel</Button>
                
            </Form>
        </>
    )
}

export default NewExpense;