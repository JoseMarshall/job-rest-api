export interface Message {
  content: string;
}

export interface Consumer {
  queue: string;
  fn: (message: Message) => Promise<void>;
}
