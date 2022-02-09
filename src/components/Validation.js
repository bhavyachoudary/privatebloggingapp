import React, { useState } from 'react';
const Validation = (callback) => {

    //Form values
    const [values, setValues] = useState({});

    //Errors
    const [errors, setErrors] = useState({});

    // Regex for user input fields
    const regForName = /^[a-zA-Z]{3,100}$/;
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regForPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/);
    const regForTitle = /^[a-zA-Z]{3,100}$/;
    const regForDescription = RegExp(/^([A-Za-z]|[0-9]|[\w\s])+$/);
    const regForTags = /^[a-zA-Z]$/;

    const validate = (event, name, value) => {

        //A function to validate each input values
        switch (name) {
            case "name":
                errors.name = regForName.test(value)
                    ? ""
                    : "FistName should be atleast have 3 characters";
                break;

            case "lname":
                errors.lname = regForName.test(value)
                    ? ""
                    : "LastName should be atleast have 3 characters";
                break;

            case "email":
                errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
                break;

            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Please enter 8 digit password with special characters";
                break;

            case "confirmpassword":
                errors.confirmpassword =
                    document.getElementById("password").value === value
                        ? ""
                        : "Password and confirm password should be same";
                break;

            case "title":
                errors.title = regForTitle.test(value) ? "" : "Title should be required";
                break;

            case "tags":
                errors.tags = regForTags.test(value)
                    ? " "
                    : "Enter unique tags";
                break;


            default:
                alert("Fill proper details")
        }
    }

    //checking errors
    const validating_error = (errors) => {
        let valid = true;
        Object.values(errors).forEach((values) => values.length > 0 && (valid = false));
        return valid;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (validating_error(errors)) {
            callback();
            console.log("Hello")
        }
        else {
            alert("There is an error")
        }
    }

    //A method to handle form inputs
    const handler = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val)
        //Let's set these values in state
        setValues({
            ...values,
            [name]: val,
        })
    }

    return {
        values,
        errors,
        handler,
        handleSubmit
    }
}

export default Validation