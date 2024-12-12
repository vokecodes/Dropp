import * as Yup from "yup";

export const CustomerSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  phoneNumber: Yup.string().required("Phone number is required."),
  email: Yup.string().email().required("Email is required."),
  address: Yup.string().required("Location is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const CompanySignUpSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required."),
  email: Yup.string().email().required("Official Email is required."),
  numberOfEmployees: Yup.number().required("Number Of Eployees is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const EventSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  referralCode: Yup.string().required("Referral code is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
});

export const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  bio: Yup.string(),
  email: Yup.string().email().required("Email is required."),
  phoneNumber: Yup.string(),
  address: Yup.string(),
});

export const EditBusinessSchema = Yup.object().shape({
  businessName: Yup.string(),
});

export const ReviewSchema = Yup.object().shape({
  review: Yup.string().required("Review is required."),
});

export const NewMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  price: Yup.string().required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  minimumQuantity: Yup.string().required("Minimum quantity is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  deliveryDays: Yup.array(Yup.string()).required("Delivery day is required."),
  closeDate: Yup.string().required("Closing date is required."),
  note: Yup.string(),
});

export const DineInNewMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  price: Yup.string().required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  minimumQuantity: Yup.string().required("Minimum quantity is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  category: Yup.string().required("Category is required."),
  note: Yup.string(),
});

export const CashierInputsSchema = Yup.object().shape({
  isSubAdmin: Yup.boolean().optional(),
  employeeName: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const WaiterTableInputsSchema = Yup.object().shape({
  section: Yup.string().required("Section is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  table: Yup.string().required("Table is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const SuperWaiterTableInputsSchema = Yup.object().shape({
  section: Yup.array(Yup.string()).required("Section is required."),
  subTables: Yup.array(Yup.string()).required("Table is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const NewSubscriptionMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  price: Yup.string().required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  note: Yup.string(),
});

export const DeliveryDetailsSchema = Yup.object().shape({
  deliveryAddress: Yup.string().required("Delivery address is required."),
  city: Yup.string().required("City is required."),
  phoneNumber: Yup.string().required("Phone number is required."),
  deliveryTime: Yup.string().required("Delivery time is required."),
  note: Yup.string(),
  checkoutCode: Yup.string(),
});

export const WithdrawAmountSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required."),
});

export const RestaurantCheckoutSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email().optional(),
  phoneNumber: Yup.string().required("Phone Number is required."),
  notes: Yup.string().optional(),
});

export const QsrCheckoutSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email().optional(),
  phoneNumber: Yup.string().required("Phone Number is required."),
});

export const CashierLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  password: Yup.string().required("Password is required."),
});

export const WaiterLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  table: Yup.string().required("Table is required."),
  password: Yup.string().required("Password is required."),
});

export const SuperWaiterLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  password: Yup.string().required("Password is required."),
});

export const CreateSubChefSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
});

export const SectionInputsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
});
