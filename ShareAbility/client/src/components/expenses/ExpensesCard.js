import { Button } from 'reactstrap';
import React from 'react';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteExpense } from '../../modules/expensesManager';

const ExpensesCard = ({expense}) => {
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteExpense(expense.id).then(() => history.push(`/expenses`))
        }
    }

    return (
        <Card>
            <CardTitle>
                {expense.name}
            </CardTitle>

            <CardText>
                {expense.price}
                {expense.DatePurchased}
                {expense.reimbursable}
               
            </CardText>
        </Card>
    )
}
export default ExpensesCard;