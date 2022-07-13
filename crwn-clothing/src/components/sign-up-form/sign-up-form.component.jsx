import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.scss"
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",

}




const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;



    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("password doesn't match")
            return
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password)



            await createUserDocumentFromAuth(user, { displayName })
            resetFormField();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use')
                alert("cannot create user ,email already in use")

            else
                console.log("user creation encountered an error", error)

        }


    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }




    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    required={true}

                />

                <FormInput
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required={true}

                />

                <FormInput
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required={true}

                />

                <FormInput
                    label="ConfirmPassword"
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    required={true}

                />


                <Button type="submit">Sign Up</Button>
            </form>

        </div>
    );
}

export default SignUpForm;