import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import QuizResult from "../../components/QuizResult/QuizResult";

class Quiz extends Component {
    state = {
        playHarryPotter: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' / 'error'
        quiz: [
            {
                id: 1,
                question: 'Ukraine\'s Independence Day',
                answers: [
                    {text: '24. 08. 1991', id: 1},
                    {text: '23. 06. 1990', id: 2},
                    {text: '24. 09. 1991', id: 3},
                    {text: '24. 08. 1992', id: 4},
                ],
                rightAnswerId: 1
            },
            {
                id: 2,
                question: 'Thanksgiving Day in the USA',
                answers: [
                    {text: 'July, 12', id: 1},
                    {text: 'November, 22', id: 2},
                    {text: 'August, 19', id: 3},
                    {text: 'September, 5', id: 4},
                ],
                rightAnswerId: 2
            },
            {
                id: 3,
                question: 'What is the name of the boy who survived?',
                answers: [
                    {text: 'Ron Weasley', id: 1},
                    {text: 'Draco Malfoy', id: 2},
                    {text: 'Neville Longbottom', id: 3},
                    {text: 'Harry Potter', id: 4},
                ],
                rightAnswerId: 4
            },
            {
                id: 4,
                question: 'Who is the best student of Hogwarts School',
                answers: [
                    {text: 'Draco Malfoy', id: 1},
                    {text: 'Hermione Granger', id: 2},
                    {text: 'Ron Weasley', id: 3},
                    {text: 'Luna Lovegood', id: 4},
                ],
                rightAnswerId: 2
            },
            {
                id: 5,
                question: 'St.Patrick \'s Day in the Ireland',
                answers: [
                    {text: 'September, 4', id: 1},
                    {text: 'April, 23', id: 2},
                    {text: 'March, 17', id: 3},
                    {text: 'July, 21', id: 4},
                ],
                rightAnswerId: 3
            },
        ],
        isFinished: false,
        results: {}, //[id]: success / error
    };


    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];// current question
        const results = this.state.results;

        if (question['id'] === 3) {
            this.setState({
                playHarryPotter: true
            })
        }

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);

            }, 1000);


        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {this.state.isFinished
                        ? <QuizResult
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <React.Fragment>
                            <h1>Please answer all questions</h1>
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                            />
                            {this.state.playHarryPotter ? <audio src={'/audio/harry-music.mp3'} autoPlay/> : null}
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;