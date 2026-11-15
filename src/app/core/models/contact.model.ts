export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  online: boolean;
  isSelf?: boolean;
}
