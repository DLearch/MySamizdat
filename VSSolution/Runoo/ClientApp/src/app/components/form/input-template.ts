export class InputTemplate {
  name: string;
  tk: string;
  type?: 'text' | 'textarea' | 'email' | 'password' | 'select' | 'checkbox' = 'text';
  validators?: any[] = [];
  value?: any = '';
  selectElements?: { value: any, tk: string }[] = [];
  onChange?: Function;
}
