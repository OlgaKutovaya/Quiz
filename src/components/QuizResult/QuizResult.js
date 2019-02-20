import React from 'react';
import classes from './QuizResult.css';
import Button from "../UI/Button/Button";

const QuizResult = props => {
    let successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0);
    return (
        <div className={classes.QuizResult}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ];

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Right answers: {successCount} from {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type='primary'>Retry quiz</Button>
                {/*<Button type='success'>Open quiz list</Button>*/}
            </div>
        </div>
    )
};

export default QuizResult;
