import React from 'react';
import { Segment, Form, Container, Rail, Divider, Header, Button, Checkbox, Table } from 'semantic-ui-react';

const AllUsersForm = ({
  handleRowClick,
  onChange,
  handleCheckChange,
  errors,
  users,
  checkValue,
  handleEditClick
 }) => (
    <Form>
      <Container>
        <Rail internal position='left'>
          <Segment>
            <Button
              fluid
              content='Edit User'
              icon='user'
              labelPosition='left'
              color='blue'
              onClick = {handleEditClick}
            />
            <Divider>Filters
            </Divider>
          </Segment>
        </Rail>

        <Header block as='h2' attached='top' color='blue' >
          All User Information
        </Header>

        <Segment basic attached>
          <Table celled definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>


            <Table.Body>
              {users.map(user => <Table.Row key={user.id} onClick = {handleRowClick.bind(this, user)}>
                <Table.Cell collapsing>
                  <Checkbox
                    name='checkboxGroup'
                    value={user.id}
                    checked={checkValue === user.id}
                    onChange={handleCheckChange}/>
                </Table.Cell>
                <Table.Cell
                  children = {user.fname}>
                </Table.Cell>
                <Table.Cell
                  children = {user.lname}>
                </Table.Cell>

              </Table.Row>)}
            </Table.Body>

          </Table>
        </Segment>
      </Container>
    </Form>

)

export default AllUsersForm;
