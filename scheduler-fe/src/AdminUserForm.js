import React from 'react';
import { Form, Container, Header, Segment } from 'semantic-ui-react';

const provinces = [
  { key : 'ON', text: 'Ontario', value: 'ON' },
  { key : 'QC', text: 'Quebec', value: 'QC' },
  { key : 'MB', text: 'Manitoba', value: 'MB' },
  { key : 'AB', text: 'Alberta', value: 'AB' },
  { key : 'SK', text: 'Saskatchewan', value: 'SK' },
  { key : 'BC', text: 'British Columbia', value: 'BC' },
  { key : 'NS', text: 'Nova Scotia', value: 'NS' },
  { key : 'NL', text: 'Newfoundland', value: 'NL' },
  { key : 'PE', text: 'Prince Edward Island', value: 'PE' },
  { key : 'YT', text: 'Yukon', value: 'YT' },
  { key : 'NT', text: 'Northwest Territories', value: 'NT' },
  { key : 'NU', text: 'Nunavut', value: 'NU' }
];

const statuses = [
  { key : 'active', text: 'Active', value: 'active' },
  { key : 'inactive', text: 'Disabled', value: 'inactive' }
];

const roles = [
  { key : 'user', text: 'User', value: 'user' },
  { key : 'admin', text: 'Administrator', value: 'admin' },
  { key : 'inst', text: 'Instructor', value: 'inst' }
];

const AdminUserForm = ({
  onInputChange,
  onGenderChange,
  onActiveStatusChange,
  onRoleChange,
  onProvinceChange,
  onSubmit,
  errors,
  fname,
  lname,
  username,
  status,
  email,
  phone,
  role,
  customerID,
  city,
  province,
  street,
  postal
 }) => (

     <Form>
       <Container>
         <Header
           block
           as='h2'
           attached='top'
           color='blue'
           content='User Information'
         />
         <Segment basic attached>
           <Form.Group>
             <Form.Input
               fluid
               label='First Name'
               placeholder="First Name"
               name="fname"
               onChange={onInputChange}
               error={errors.fname}
               value={fname}
               width={5}
             />

             <Form.Input
               fluid
               label="Last Name"
               placeholder="Last Name"
               name="lname"
               onChange={onInputChange}
               error={errors.lname}
               value={lname}
               width={5}
             />

             <Form.Input
               disabled
               fluid
               label="User Name"
               placeholder="User Name"
               name="username"
               onChange={onInputChange}
               error={errors.lname}
               value={username}
               width={2}
             />
           </Form.Group>
           <Form.Group>
             <Form.Input
               fluid
               label="Customer ID"
               placeholder="Customer ID"
               name="customerID"
               onChange={onInputChange}
               error={errors.customerID}
               value={customerID}
               width={5}
             />

             <Form.Select
               fluid
               label="Status"
               placeholder="Status"
               name="status"
               onChange={onActiveStatusChange}
               options={statuses}
               value={status}
               width={5}
             />

             <Form.Select
               fluid
               label="Role"
               placeholder="Role"
               name="role"
               onChange={onRoleChange}
               options={roles}
               value={role}
               width={2}
             />
           </Form.Group>
           <br />
           <Form.Group>
             <Form.Input
               fluid
               label="Email"
               placeholder="Email"
               name="email"
               type="email"
               onChange={onInputChange}
               error={errors.email}
               value={email}
               width={5}
             />

             <Form.Input
               fluid
               label="Phone Number"
               placeholder="Phone Number"
               name="phone"
               onChange={onInputChange}
               error={errors.phone}
               value={phone}
               width={5}
             />
           </Form.Group>
           <br />

           <Form.Input
             fluid
             label="Street Address"
             placeholder="Street Address"
             name="street"
             onChange={onInputChange}
             error={errors.street}
             value={street}
           />
           <Form.Group>
             <Form.Input
               fluid
               label="City"
               placeholder="City"
               name="city"
               onChange={onInputChange}
               error={errors.city}
               value={city}
               width={5}
             />

             <Form.Select
               fluid
               label="Province"
               placeholder="Province"
               name="province"
               onChange={onProvinceChange}
               options={provinces}
               value={province}
               width={5}
             />

             <Form.Input
               fluid
               label="Postal Code"
               placeholder="Postal Code"
               name="postal"
               onChange={onInputChange}
               error={errors.postal}
               value={postal}
               width={2}
             />
           </Form.Group>

           <Form.Button
             content="Submit"
             color="blue"
             onClick={onSubmit}
           />
         </Segment>

       </Container>
     </Form>

)

export default AdminUserForm;
