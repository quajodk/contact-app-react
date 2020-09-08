import React from "react";
import {
  Layout,
  Form,
  Input,
  Icon,
  Button,
  Row,
  Col,
  Spin,
  Alert,
} from "antd/es";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory, useParams } from "react-router";
import { EDIT_CONTACT } from "../mutations";
import { FETCH_CONTACTS, FETCH_CONTACT } from "../queries";
import { Contact } from "../models/contact";

const EditContact: React.FC = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(FETCH_CONTACT, {
    variables: { id },
  });

  const firstNameEl = React.useRef(null);
  const lastNameEl = React.useRef(null);
  const twitterUsernameEl = React.useRef(null);

  const [editContact] = useMutation(EDIT_CONTACT, {
    refetchQueries: [{ query: FETCH_CONTACTS }],
  });

  if (loading) {
    return (
      <div className="App App-header">
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", margin: "100px 100px" }}>
        <Alert type="error" message={error.message} />
      </div>
    );
  }

  const contact: Contact = data.contacts_by_pk;

  return (
    <Layout.Content style={{ padding: "20px 50px", textAlign: "center" }}>
      <Row>
        <Col sm={12} offset={6}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              editContact({
                variables: {
                  id: id,
                  first_name: ((firstNameEl.current as unknown) as Input).state
                    .value,
                  last_name: ((lastNameEl.current as unknown) as Input).state
                    .value,
                  twitter_username: ((twitterUsernameEl.current as unknown) as Input)
                    .state.value,
                },
              })
                .catch(console.log)
                .finally(() => history.replace("/"));
            }}
            className="login-form"
          >
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="First Name"
                required
                defaultValue={contact.first_name}
                ref={firstNameEl}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Last Name"
                required
                defaultValue={contact.last_name}
                ref={lastNameEl}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="twitter" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Twitter Username"
                defaultValue={contact.twitter_username}
                ref={twitterUsernameEl}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Edit Contact
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default EditContact;
