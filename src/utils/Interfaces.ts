export type DashboardBannerCardProps = {
  backgroundImage?: string;
  backgroundColor?: string;
  bgExtraClasses?: string;
  textContainerClasses?: string;
  text1?: string;
  text1ExtraClasses?: string;
  text2?: string;
  text2ExtraClasses?: string;
  text3?: string;
  text3ExtraClasses?: string;
  iconSize?: number;
  iconColor?: string;
  iconExtraClasses?: string;
  noShowRightIcon?: boolean;
  onClickText3?: any;
  onClickText4?: any;
  text3Link?: any;
  showWalletIcons?: boolean;
  showWalletFormat?: boolean;
  showDownload?: boolean;
  chefWallet?: any;
  restaurantWallet?: any;
};

export type CurrentEmployeeProps = {
  id: string | number;
  name: string;
  email: string;
  img: string;
};

export type ButtonProps = {
  title: any;
  showIcon?: boolean;
  extraClasses?: string;
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;
};

export type InputProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: any;
  onBlur?: any;
  password?: boolean;
  error?: any;
  extraClasses?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  accept?: any;
  ref?: any;
  onInput?: any;
  onClickPassword?: any;
  options?: any;
  onkeyup?: any;
  referralCodeError?: string;
  isReferralCodeLoading?: boolean;
  selectPlaceholder?: string;
  container?: string;
  touched?: any;
  multipleSelect?: boolean;
  newName?: string;
  radioSelected?: any;
  radioSetSelected?: any;
};

export type TextAreaProps = {
  placeholder: string;
  name: string;
  onChange: any;
  error?: any;
  extraClasses?: string;
  value?: string;
};

export type GoogleButtonProps = {
  extraClasses?: string;
};

export type FormInputType = {
  type: string;
  placeholder: string;
  name: string;
  password?: boolean;
  options?: any;
  selectPlaceholder?: string;
};

export type AuthProps = {
  pageTitle?: string;
  bannerImage: string;
  initialValues: object;
  validationSchema: object;
  formInputs: FormInputType[];
  buttonTitle: string;
  navigateTo: string;
  navigateMainTitle: string;
  navigateTitle: string;
  forgotPassword?: boolean;
  goToForgotPasswordLink?: string;
  url?: string;
  actionPath?: string;
  event?: boolean;
  navigateFrom?: string;
  selectPlaceholder?: string;
};

export type MenuItemProps = {
  icon: any;
  title: string;
  active?: boolean;
  to?: string | any;
  newTab?: boolean | any;
  beta?: boolean;
  pro?: boolean;
  coming?: boolean;
};

export type DashboardLayoutProps = {
  page?: string;
  children: any;
  kitchen?: any;
};

export type WalletItemProps = {
  transactionType: string;
  amount: string;
  time: string;
  date: string;
  status: string;
  source?: { image: string; name: string; email: string };
  showDetail?: boolean;
  onClickIconOpen?: any;
  onClickIconClose?: any;
  companyWallet?: boolean;
  recipient?: any;
  self?: any;
  selectedView?: string;
};

export type OrderItemProps = {
  id: string;
  order?: any;
  orders?: any;
  getStorefrontOrders?: any;
  cartMenu?: any;
  date: string;
  time: string;
  showCustomer?: boolean;
  customerImage?: string;
  customerName?: string;
  customerEmail?: string;
  customerNumber?: string;
  address: string;
  note?: string;
  completed?: any;
  review?: string;
  rating?: number;
  onClickIconOpen?: () => void;
  onClickIconClose?: () => void;
  event?: boolean;
  discountAmount?: string;
  checkoutCode?: string;
  restaurantOrder?: boolean;
  paid?: boolean;
  markAsPaid?: any;
  paymentLoading?: boolean;
  noTax?: boolean;
};

export type StorefrontValues = {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryState?: string;
  deliveryArea?: string;
  deliveryTime?: string;
  deliveryAddress?: string;
  discountCode: string;
};

export type EmployeeItemProps = {
  id?: string;
  lastName?: string;
  firstName?: string;
  status?: string;
  email?: string;
  image?: string;
  employeeBalance?: any;
  date?: string;
  time?: string;
  extraClasses: string[];
  showCustomer?: boolean;
  homeDash?: boolean;
  employeeDash?: boolean;
  customerImage?: string;
  customerName?: string;
  address?: string;
  note?: string;
  completed?: any;
  review?: string;
  rating?: number;
  onClickFund?: ({}: CurrentEmployeeProps) => void;
  onClickFreeze?: ({}: CurrentEmployeeProps) => void;
  onClickRemove?: ({}: CurrentEmployeeProps) => void;
  event?: boolean;
  discountAmount?: string;
  selectedView?: string;
  preEmail?: string;
  employee?: any;
  // temp
  // setEmployees?: React.Dispatch<React.SetStateAction<{ id: number; name: string; email: string; img: string; }[]>>;
};

export type SeOrderItemProps = string;

export type TagItemProps = {
  id?: string;
  title: string;
};

export type TabMenuProps = {
  ordersMenu: any;
  selectedOrder: any;
  setSelectedOrder: any;
  containerExtraClasses?: string;
  textExtraClasses?: string;
};

export type PaymentItemProps = {
  bankImage?: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  onDeleteClick: any;
  deleteLoading: boolean;
};

export type DOrderCardProps = {
  title: string;
  total: number;
  to: any;
};

export type CheckItemProps = {
  title: string;
  checked: boolean;
  to: string;
  external?: boolean;
  type?: any;
};

export type CompanyCheckItemProps = {
  num: number;
  title: string;
  checked: boolean;
  to: string;
  action: string;
  type?: any;
  firstCheck?: number;
  setFirstCheck?: any;
};

export type PageTitleProps = {
  title: string;
  extraClasses?: string;
};

export type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TopNavProps = {
  textUrl: any;
  loginUrl?: any;
  text: string;
  login: string;
  signUpUrl?: any;
};

export type LandingPageHeroProps = {
  backgroundImage?: string;
  bgExtraClasses?: string;
  textContainerClasses?: string;
  text1?: string;
  text1ExtraClasses?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text4ExtraClasses?: string;
  buttonTitle?: string;
  buttonClick?: any;
  newFlag?: boolean;
};

export type DropdownProps = {
  label?: string;
  options: any;
  value: string;
  onChange: any;
  isMulti?: any;
  error?: any;
};

export type HowHomeMadeWorksProps = {
  icon: string;
  header: string;
  paragraph: string;
};

export type GalleyProps = {
  foods: any;
  meals: any;
};

export type FoodSafetyProps = {
  backgroundImage: string;
};

export type learnAboutChefsProps = {
  picture1: string;
  picture2: string;
  paragraph: string;
  chefsName: string;
};

export type learnAboutChefsPropsData = {
  data: learnAboutChefsProps[];
  buttonTitle?: any;
  buttonClick?: any;
};

export type testimonailProps = {
  picuture: string;
  review: string;
  name: string;
};

export type testimonailPropsData = {
  data: testimonailProps[];
};

export type alertDialogProps = {
  message: string;
  handleClose: any;
  open: any;
};
