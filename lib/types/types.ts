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
export interface Product {
  id: string;
  name: string;
  price: number;
};

// Your Cart: would compromise of the Product mentioned above  
export interface CartItem {
  product: Product;
  quantity: number;
};


  
export interface CartStore {
  cart: CartItem[]; // Your cart would be treated as an array 
  isSheetOpen: boolean;  //to check if the sheet (notifying when an item is added) is open or not
  addToCart: (product: Product) => void; // adding to the cart fn
  removeFromCart: (productId: string) => void; //removing something from the cart fn
  clearCart: () => void; // removing everything from the cart fn
  updateQuantity: (productId: string, quantity: number) => void; // increasing or decreasing qty from the cart
  setIsSheetOpen: (open: boolean) => void; //to set the value of isSheetOpen
  getTotalPrice: () => number; // New computed property
};
