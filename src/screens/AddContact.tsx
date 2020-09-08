import React from 'react';
import { Layout, Form, Input, Icon, Button, Row, Col } from 'antd/es';
import { useAuth0 } from '../auth/react-auth0-spa';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';
import { ADD_CONTACT } from '../mutations';
import { FETCH_CONTACTS } from '../queries';

const AddContact: React.FC = (props) => {
  const { user } = useAuth0();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [twitterUsername, setTwitterUsername] = React.useState('');

  const [ addContact ] = useMutation(ADD_CONTACT, {
    refetchQueries: [{ query: FETCH_CONTACTS }]
  });
  const history = useHistory();

  return (
    <Layout.Content style={{ padding: '20px 50px', textAlign: 'center' }}>
      <Row>
        <Col sm={12} offset={6}>
          <Form onSubmit={e => {
            e.preventDefault();
            addContact({
              variables: {
                user_id: user ? user.sub : null,
                first_name: firstName,
                last_name: lastName,
                twitter_username: twitterUsername
              }
            })
              .catch(console.log)
              .finally(() => history.replace('/'));
          }} className="login-form">
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Twitter Username"
                onChange={(e) => setTwitterUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">Add Contact</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default AddContact;
