import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react'
// import gql from 'graphql-tag'
import { gql,  useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks'

import { AuthContext } from '../context/auth'

function Login(props) {
        const context = useContext(AuthContext)

        const [errors, setErrors] = useState({});

        const initialState = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        const { onChange, onSubmit, values } = useForm( loginUserCallback, { 
            username: '',
            password: '',
        })
        
        const [loginUser, { data, loading, error }] = useMutation( LOGIN_USER, {
            update(_, result) {
                context.login(result.data.login)
                props.history.push('/')
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.errors)
            },
            variables: values
        })

        function loginUserCallback() {
            loginUser();
        }
        
        return (
            <div className="form-container">
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <h1>Login</h1>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}/>
                    <Form.Input
                        type="password"
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        error={errors.password ? true : false}
                        value={values.password}
                        onChange={onChange}/>
                    <Button type="submit" primary>
                        Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(username: $username, password: $password) {
            id email username token createdAt
        }
    }
`

export default Login;