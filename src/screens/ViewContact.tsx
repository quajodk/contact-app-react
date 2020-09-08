import React from 'react';
import { Layout, Form, Input, Icon, Row, Col, List, Typography, Descriptions, Spin, Alert } from 'antd/es';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { ADD_PHONE, ADD_EMAIL, DELETE_PHONE, DELETE_EMAIL } from '../mutations';
import { FETCH_CONTACT } from '../queries';
import { Phone } from '../models/phone';
import { Email } from '../models/email';
import { Contact } from '../models/contact';

const ViewContact: React.FC = (props) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(FETCH_CONTACT, { variables: { id } });

  const [ addPhone ] = useMutation(ADD_PHONE, {
    refetchQueries: [{ query: FETCH_CONTACT, variables: { id } }]
  });

  const [ deletePhone ] = useMutation(DELETE_PHONE, {
    refetchQueries: [{ query: FETCH_CONTACT, variables: { id } }]
  });

  const [ addEmail ] = useMutation(ADD_EMAIL, {
    refetchQueries: [{ query: FETCH_CONTACT, variables: { id } }]
  });

  const [ deleteEmail ] = useMutation(DELETE_EMAIL, {
    refetchQueries: [{ query: FETCH_CONTACT, variables: { id } }]
  });

  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  if (loading) {
    return (
      <div className="App App-header">
        <Spin indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{textAlign: 'center', margin: '100px 100px'}}>
        <Alert type="error" message={error.message} />
      </div>
    );
  }

  const contact: Contact = data.contacts_by_pk;

  return (
    <Layout.Content style={{ padding: '20px 50px', textAlign: 'center' }}>
      <Row>
        <Col sm={12} offset={6}>
          <Descriptions style={{margin: '20px 0px'}} title="Contact Details">
            <Descriptions.Item label="First Name">{contact.first_name}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{contact.last_name}</Descriptions.Item>
          </Descriptions>
          <Form.Item>
            <Input.Search
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Add Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onSearch={value => {
                addPhone({
                  variables: {
                    contact_id: contact.id,
                    number: value
                  }
                })
                .catch(console.log)
                .finally(() => setPhone(''));
              }}
              enterButton={<Icon type="plus" />}
            />
          </Form.Item>
          <Form.Item>
            <List
              bordered
              dataSource={contact.phones}
              renderItem={(item: Phone) => (
                <List.Item
                  extra={
                    <Icon
                      type="delete"
                      style={{ color: 'red', position: 'absolute', right: '10px' }}
                      onClick={e => {
                        deletePhone({ variables: { id: item.id } })
                        .catch(console.log);
                      }}
                      key="delete" />
                  }>
                  <Typography.Text>{item.number}</Typography.Text>
                </List.Item>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Input.Search
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Add Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onSearch={value => {
                addEmail({
                  variables: {
                    contact_id: contact.id,
                    address: value
                  }
                })
                .catch(console.log)
                .finally(() => setEmail(''));
              }}
              enterButton={<Icon type="plus" />}
            />
          </Form.Item>
          <Form.Item>
            <List
              bordered
              dataSource={contact.emails}
              renderItem={(item: Email) => (
                <List.Item
                  extra={
                    <Icon
                      type="delete"
                      style={{ color: 'red', position: 'absolute', right: '10px' }}
                      onClick={e => {
                        deleteEmail({ variables: { id: item.id } })
                        .catch(console.log);
                      }}
                      key="delete" />
                  }>
                  <Typography.Text>{item.address}</Typography.Text>
                </List.Item>
              )}
            />
          </Form.Item>
          <Descriptions style={{margin: '20px 0px'}}>
            <Descriptions.Item label="Twitter Username">
              {contact.twitter_username ?
              <a href={`https://twitter.com/${contact.twitter_username}`} target="blank">{contact.twitter_username}</a> :
              'Set Twitter Username'}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ViewContact;
