type dataType = {
  backgroundImage: string;
  icon: any;
  text: string;
  href?: string;
  isLink?: boolean;
  as?: any;
};

export interface CardProps {
  data: dataType;
}
