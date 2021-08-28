import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useParams, useHistory } from "react-router";
import { getAllExpenses } from "../../modules/expensesManager";
import ExpensesCard from "./ExpensesCard";

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);

    const getExpenses = () => {
        getAllExpenses()
        .then((response) => setExpenses(response))
    };

    useEffect(() => {
        getExpenses();
    }, [])

    return (
        <div>
            <Card>
                <CardBody>
                    {expenses.Name}
                </CardBody>
            </Card>
           <div >{expenses.map((expense) => <ExpensesCard expense={expense} key={expense.id} />)}
           </div>
        </div>
    )

}

export default ExpensesList;