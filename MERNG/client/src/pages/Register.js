import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react'
// import gql from 'graphql-tag'
import { gql,  useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'

function Register(props) {
        const context = useContext(AuthContext)

        const [errors, setErrors] = useState({});

        const { onChange, onSubmit, values } = useForm( registerUser, { 
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        
        const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
            update(_, result) {
                context.login(result.datas.register)
                props.history.push('/')
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.errors)
            },
            variables: {
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
                email: values.email,
            }
        })

        function registerUser() {
            addUser();
        }
        
        return (
            <div className="form-container">
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <h1>Register</h1>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}/>
                    <Form.Input
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        error={errors.email ? true : false}
                        value={values.email}
                        onChange={onChange}
                    />
                    <Form.Input
                        type="password"
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        error={errors.password ? true : false}
                        value={values.password}
                        onChange={onChange}/>
                    <Form.Input
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm password..."
                        name="confirmPassword"
                        value={values.confirmPassword }
                        error={errors.confirmPassword ? true : false}
                        onChange={onChange}/>
                        <Button type="submit" primary>
                            Register
                        </Button>
                </Form>
                {Object.keys(errors).length > 0  && (
                    <div className="error ui message">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(registerInput: { username: $username, password: $password, confirmPassword: $confirmPassword,  email: $email,}) {
            id email username token createdAt
        }
    }
`

export default Register;