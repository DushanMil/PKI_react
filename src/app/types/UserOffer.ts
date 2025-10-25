
interface ShoppingCartItem {
  username: string;
  location: string;
  guests: string;
  title: string;
  image: string;
  date: string;
  state: string; // can be an empty string, "confirmed" or "accepted"

  [Symbol.iterator](): Iterator<any>;
}
