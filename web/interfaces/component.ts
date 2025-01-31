// sidebar Navigation, from https://github.com/hauptrolle/chakra-templates

export interface Category {
  name: string;
  subLabel: string;
  id: string;
  children?: SubCategory[];
}

export interface SubCategory {
  name: string;
  id: string;
  description?: string;
  children?: Template[];
}

export interface Template {
  name: string;
  segment: string;
  tags?: string[];
}
