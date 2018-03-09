import React from 'react';
import { Form, Segment, Container, Header } from 'semantic-ui-react';

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

const ProfileForm = ({
  onSubmit,
  onChange,
  errors,
  fname,
  lname,
  city,
  street,
  province,
  postal,
  phone,
  email,
  onProvinceChange
 }) => (
   <Container>

     <Form>
       <Header block as='h2' attached='top' color='blue' >
         Profile
       </Header>
       
       <Segment attached raised >
         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label='First Name'
             placeholder="First Name"
             name="fname"
             onChange={onChange}
             error={errors.fname}
             value={fname}

           />

           <Form.Input
             fluid
             label="Last Name"
             placeholder="Last Name"
             name="lname"
             onChange={onChange}
             error={errors.lname}
             value={lname}

           />
         </Form.Group>
         <br />

         <Form.Input
           fluid
           label="Street Address"
           placeholder="Street Address"
           name="street"
           onChange={onChange}
           error={errors.street}
           value={street}
         />
         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label="City"
             placeholder="City"
             name="city"
             onChange={onChange}
             error={errors.city}
             value={city}
           />

           <Form.Select
             fluid
             label="Province"
             placeholder="Province"
             name="province"
             onChange={onProvinceChange}
             options={provinces}
             value={province}
           />
         </Form.Group>
         <Form.Input
           fluid
           label="Postal Code"
           placeholder="Postal Code"
           name="postal"
           onChange={onChange}
           error={errors.postal}
           value={postal}
           width={4}
         />
         <br />
         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label="Phone Number"
             placeholder="Phone Number"
             name="phone"
             onChange={onChange}
             error={errors.phone}
             value={phone}
           />

           <Form.Input
             fluid
             label="Email"
             placeholder="Email"
             name="email"
             type="email"
             onChange={onChange}
             error={errors.email}
             value={email}
           />
         </Form.Group>
         <div >
           <Form.Button
             content="Submit"
             color="blue"
             onClick={onSubmit}
           />
       </div>
     </Segment>
   </Form>
   </Container>

     )

     export default ProfileForm;
