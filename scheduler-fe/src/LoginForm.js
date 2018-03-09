import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  email,
  password
}) => (
  <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>

        <Header as='h1' color='blue' textAlign='center'>
          {' '}Champion Swimming
        </Header>

        <Form size='large' action='/' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Email Address'
              value={email}
              name='email'
              onChange={onChange}
              error={errors.email}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              name='password'
              onChange={onChange}
              error={errors.password}
            />

            <Button
              color='blue'
              fluid size='large'
              type='submit'
            >Login
            </Button>
            <br />
            <p style={{textAlign: 'center'}}>Don't have an account? <Link to={'/registration'}>Create one</Link></p>
            <p style={{textAlign: 'center'}}><Link to={'/recovery'}>Forgot your password?</Link></p>
          </Segment>
          {errors.summary && <Message style={{textAlign: 'center', color: 'red'}} className="error-message">{errors.summary}</Message>}
        </Form>

      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm
