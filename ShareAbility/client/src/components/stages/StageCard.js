import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";

    
const Stage = (stage) => {
        return (
            <Card className="m-2 p-2 w-50 mx-auto">
                <CardBody className="m-3">
                    <p>Steps: {stage.stepsId}</p>
                    <p>Status: {stage.StatusId}</p>
                    
                </CardBody>
            </Card>
        );
};

export default Stage;