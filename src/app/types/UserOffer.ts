
interface ShoppingCartItem {
  username: string;
  location: string;
  guests: string;
  title: string;
  image: string;
  state: string; // can be an empty string or "confirmed"

  [Symbol.iterator](): Iterator<any>;
}
