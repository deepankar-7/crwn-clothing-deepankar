import { useState } from "react"
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.scss";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: "",
    password: "",

}




const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;



    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const signInwithGoogle = async () => {
        await signInWithGooglePopup();

    }


    const handleSubmit = async (event) => {
        event.preventDefault()


        try {
            await signInAuthUserWithEmailAndPassword(email, password)


            resetFormField();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password")
                    break;
                case 'auth/user-not-found':
                    alert("incorrect email")
                    break;
                default:
                    console.log(error)
            }

        }


    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }




    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>

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
                <div className="buttons-Container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInwithGoogle}>Google sign in</Button>
                </div>

            </form>

        </div>
    );
}

export default SignInForm;