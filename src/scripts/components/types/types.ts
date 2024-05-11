export interface TagAttributes {
  name: string;
  value?: string;
}

export type BlockType =
  | 'header'
  | 'footer'
  | 'main'
  | 'aside'
  | 'nav'
  | 'article'
  | 'section'
  | 'div';

export type InputType = 'text' | 'submit' | 'button' | 'password' | 'radio' | 'checkbox' | 'reset';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
