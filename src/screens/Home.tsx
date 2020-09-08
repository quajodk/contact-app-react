import React from 'react';
import { Layout, Card, Icon, Avatar, Col, Button, Row, Spin, Alert, notification } from 'antd/es';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Contact } from '../models/contact';
import { Link } from 'react-router-dom'
import { FETCH_CONTACTS } from '../queries';
import { DELETE_CONTACT } from '../mutations';

const Home: React.FC = () => {
  const { loading, data, error } = useQuery(FETCH_CONTACTS);
  const [ deleteContact ] = useMutation(DELETE_CONTACT, {
    refetchQueries: [{ query: FETCH_CONTACTS }]
  });

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

  return (
    <Layout.Content style={{ padding: '20px 50px' }}>
      <Row gutter={[16, 16]}>
        {data.contacts.map((contact: Contact) => (
          <Col key={contact.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              actions={[
                <Link to={`/view/${contact.id}`}><Icon type="eye" key="eye" /></Link>,
                <Link to={`/edit/${contact.id}`}><Icon type="edit" key="edit" /></Link>,
                <Icon
                  type="delete"
                  style={{ color: 'red' }}
                  onClick={e => {
                    deleteContact({ variables: { id: contact.id } })
                    .catch(error => {
                      notification.error({
                        message: error.name,
                        description: error.message
                      });
                    });
                  }}
                  key="delete" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={
                  contact.twitter_username ?
                  `https://twitter.com/${contact.twitter_username}/profile_image?size=original` :
                  `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png`
                }/>}
                title={`${contact.first_name} ${contact.last_name}`}
                description={contact.twitter_username ?
                <a href={`https://twitter.com/${contact.twitter_username}`} target="blank">{contact.twitter_username}</a> :
                'Set Twitter Username'}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/add">
      <Button
        style={{position: 'absolute', bottom: '50px', right: '50px'}}
        type="danger"
        shape="circle"
        icon="plus"
        size="large"
      />
      </Link>
    </Layout.Content>
  );
}

export default Home;
