import { Qa } from './qa';

export class Faq {
  id: string;
  title: string;
  content: string;
  qas: Qa[];
  alias: string;
  lastUpdate: string;
}