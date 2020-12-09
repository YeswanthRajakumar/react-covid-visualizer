import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core/'
// import CountUp from 'react-countup';

function InfoBox(props) {
    return (
        <div>
            <Card>
                <CardContent>
                {/* Title */}
                <Typography color="textSecondary">
                    {props.title}
                </Typography>
                  {/* Title */}

                  <h2>
                    {props.no_of_cases}
                </h2>

                <Typography color="textSecondary">
                    {props.total}
                </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
