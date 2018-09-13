import { Field } from './field';

export class Contact {
  id: string;
  title: string;
  content: string;
  subject: string;
  fields: Field[];
  alias: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  lastUpdate: string;
}