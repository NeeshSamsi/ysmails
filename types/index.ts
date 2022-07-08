export interface Recepient {
  firstName: string
  lastName?: string
  email: string
}

export interface EmailLog extends Recepient {
  status: EmailStatus
  error?: any
}

export interface Attachment {
  filename: string
  path: string
}

export interface MailOptions {
  to: string
  from: string
  subject: string
  text?: string
  html?: string
  attachments?: Attachment[]
}

export interface EmailFormData {
  subject: string
  message: string
  messageType: MessageType
  // recepients: Recepient[]
  recepients: string
}

export interface SendEmailData {
  subject: string
  message: string
  messageType: MessageType
  recepients: Recepient[]
}

export enum MessageType {
  HTML = "HTML",
  TEXT = "Text",
}

export enum EmailStatus {
  SUCCESS = "Success",
  ERROR = "Error",
}
