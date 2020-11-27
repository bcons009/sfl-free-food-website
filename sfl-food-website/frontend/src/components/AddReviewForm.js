import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
//import RatingComponent from '@cogent-labs/react-rating-component';


export  class AddReviewForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            user: "",
            name: "",
            description: "",
            rating: 1,
            
        }
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    validateInputs = () => {
        const { name, description, rating } = this.state;
        if (!name || !description || !rating) {
            return false;
        }
        else {
            return true;
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }


    onSubmit = e => {
        e.preventDefault();

        if (this.validateInputs()) {
            this.setState({is_loading: true});
            this.setState({hover: false});

            let { user } = this.props.auth;
            user = user.id
            this.setState({user: user});
        }
        else {
            alert("Please make sure to fill out all fields before submitting.");
        }            
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }  

   render() {
    const { isAuthenticated } = this.props.auth;
    const { name, description,rating } = this.state;   

    const toggleHover = () => {
        this.setState({hover: !this.state.hover})

        if (this.state.hover) {
            styles.submitStyle = {
                width: "100%",
                margin: "0 auto 30px",
                borderColor: "#4286f4",
                color: "white",
                backgroundColor: "#4286f4",
                transition: "color 0.3s, background-color 0.3s"
            }
        }
        else {
            styles.submitStyle = {
                width: "100%",
                margin: "0 auto 30px",
                borderColor: "#4286f4",
                color: "#4286f4",
                backgroundColor: "white",
                transition: "color 0.3s, background-color 0.3s"
            }
        }
    }

    let submitButton = this.state.is_loading ? (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : (
        <input 
            type="submit" 
            value="Submit"
            style={styles.submitStyle}
            onMouseEnter={toggleHover} 
            onMouseLeave={toggleHover}
        />
    );


    const loggedIn = (
        <div style={styles.outerDivStyle}>
            <form style={styles.formStyle} onSubmit={this.onSubmit}>
                <label style={styles.labelStyle}>
                    <h1 style={styles.headerStyle}>Add Review</h1>
                </label>
                <label style={styles.labelStyle}>
                    Review Title:
                    <br />
                    <input 
                        type="text" 
                        name="name" 
                        maxLength="100" 
                        style={styles.inputStyle}
                        value={name}
                        onChange={this.onChange}
                        required
                    />
                    <br />
                </label>
                <label style={styles.labelStyle}>
                    Review:
                    <br />
                    <textarea 
                        name="description" 
                        rows="8" 
                        cols="55"
                        style={styles.descriptionStyle}
                        value={description}
                        onChange={this.onChange}
                        required
                    />
                    <br />
                </label>/*
               <label style={styles.labelStyle}>
               Rating
               </label>
                <label style={styles.bottomLabelStyle}>
                    {submitButton}
                </label>
            </form>
        </div>
    );

    /*
    <RatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
               />
    */ 

    const notLoggedIn = (
        <Redirect to='/login' />
    );

    return (
        <div>
            { isAuthenticated ? loggedIn : notLoggedIn }
        </div>            
    )
}
}

const styles = {
    outerDivStyle: {
        width: "60%",
        height: "90%",
        margin: "50px auto",
        backgroundColor: "#F5F5F5",
        border: "3px solid #4286f4",
        borderRadius: "10px"
    },
    formStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    labelStyle: {
        width: "60%",
        height: "100%",
        margin: "30px auto 0px",
        fontSize: "1.2em"
    },
    bottomLabelStyle: {
        width: "60%",
        height: "100%",
        margin: "30px auto"
    },
    inputStyle: {
        margin: "10px 0",
        width: "100%"
    },
    descriptionStyle: {
        margin: "10px 0",
        width: "100%",
        resize: "none"
    },
    timeDivStyle: {
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0 0",
    },
    startTimeDivStyle: {
        width: "90%",
        margin: "0 10px 0 0",
        fontSize: "0.8em"
    },
    endTimeDivStyle: {
        width: "90%",
        margin: "0 0 0 10px",
        fontSize: "0.8em"
    },
    timeStyle: {
        width: "100%",
        margin: "0"
    },
    submitStyle: {
        width: "100%",
        margin: "0 auto 30px",
        borderColor: "#4286f4",
        color: "white",
        backgroundColor: "#4286f4",
        transition: "color 0.3s, background-color 0.3s"
    },
    headerStyle: {
        margin: "0"
    },
    addressDivStyle: {
        fontSize: "0.8em"
    },
    stateDivStyle: {
        fontSize: "1.2em",
        fontWeight: "bold",
        margin: "10px 0"
    }
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(AddReviewForm);