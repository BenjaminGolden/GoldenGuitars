import React from 'react';
import { useState, useEffect } from 'react';
import { addExpense } from '../../modules/expensesManager';
import { useHistory } from 'react-router';
import { Card, CardTitle, CardBody, Row } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { deleteExpense } from '../../modules/expensesManager';

const ExpensesCard = ({ expense }) => {
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this comment?")) {
            deleteExpense(expense.id).then(() => history.push(`/expenses`))
        }
    }

    return (
        <>

            <Card>
                <Row>
                    <CardTitle>
                      <strong>Item: </strong>{expense.name}
                    </CardTitle>
                    </Row>
                    <Row>

                    <CardText>
                        Price: {expense.price}
                    </CardText>
                    <CardText>
                        Date Purchased: {expense.datePurchased}
                    </CardText>
                    <CardText>
                        Reimbursable: {expense.reimbursable}
                    </CardText>
                </Row>
            </Card>
        </>
    )
}
export default ExpensesCard;