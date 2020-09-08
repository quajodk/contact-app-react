import { gql } from 'apollo-boost';

export const FETCH_CONTACTS = gql`
query {
  contacts(order_by: {first_name: asc}) {
    id
    first_name
    last_name
    twitter_username
  }
}
`;

export const FETCH_CONTACT = gql`
query fetchContact($id: Int!) {
  contacts_by_pk(id: $id) {
    id
    first_name
    last_name
    twitter_username
    emails {
      id
      address
    }
    phones {
      id
      number
    }
  }
}
`;