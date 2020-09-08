import { Phone } from "./phone";
import { Email } from "./email";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  twitter_username: string;
  phones: Phone[];
  emails: Email[]
}