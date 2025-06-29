import { Stripe, StripeElementsOptions } from '@stripe/stripe-js';

//Login Page export type LoginState = {
 
export type LoginState = {
  error: string | null;
};

// SignUp Page
export type RegisterState = {
  error: string | null;
  success?: boolean; // <-- optional success flag
};

export interface UserInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_confirmed_at: string | null;
  }


  


// How a Single Product would look like 

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  product_variants?: ProductVariant[];
};


// Your Cart: would compromise of the Product mentioned above  
export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
};


  
export interface CartStore {
  cart: CartItem[]; // Your cart would be treated as an array 
  isSheetOpen: boolean;  //to check if the sheet (notifying when an item is added) is open or not
  addToCart: (product: Product, variant?: ProductVariant) => void;  // adding to the cart fn
  removeFromCart: (product: Product, variant?: ProductVariant) => void; //removing something from the cart fn
  clearCart: () => void; // removing everything from the cart fn
 updateQuantity: (product: Product, variant: ProductVariant | undefined, quantity: number) => void; // increasing or decreasing qty from the cart
  setIsSheetOpen: (open: boolean) => void; //to set the value of isSheetOpen
  getTotalPrice: () => number; // New computed property
};


// All Collections, Per Collection Content, Single Page Content

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
}

export type CollectionHero = Collection;
export type CollectionCard = Collection;

 
 
export interface ProductCard {
  name: string;
  slug: string;
  image_url: string;
  price: string;
}

export interface ProductCardProps extends ProductCard {
  collectionSlug: string;
}


export interface SingleDisplayCard {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price: number;
  description: string;
  collection_id: string;
  product_variants?: ProductVariant[];
}


export interface SinglePageProps {
  params: {
    collectionSlug: string;
    productSlug: string;
  };
}

// Checkout page types

//Contact_Email
export type EmailFormValues = {
  email: string
  emailOffers: boolean
}

export type DeliveryAddressFormValues = {
  fName: string;  
  lName: string;
  addressLine1: string; 
  addressLine2?: string; // Optional field
  city: string;
  postcode: string;
  phone: string;
}

export type CombinedFormValues = EmailFormValues & DeliveryAddressFormValues;
// export type confirmOrder = {

// }

// Stripe

export interface StripeFormProps {
  clientSecret: string;
  amount?: number;
  paymentIntentId?: string;
}

// Extended props for payment section
export interface PaymentSectionProps extends StripeFormProps {
  error: string | null;
  stripePromise: Promise<Stripe | null>;
  appearance: StripeElementsOptions['appearance'];
}

// Ref interface for exposed methods
export interface StripeCheckoutFormRef {
  handleStripePayment: () => Promise<{ success: boolean; paymentIntentId?: string }>;
}

// Guest Orders
export type GuestOrder = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postcode: string;
  cart?: CartItem[];
  stripe_payment_intent_id: string;
};
