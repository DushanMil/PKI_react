
interface CommentItem {
  id: string;
  user: string;
  image: string;
  stars: number;
  text: string;
}

interface EventItem {
  title: string;
  text: string;
  price: string;
  image: string;
  icon: string;
  location: string;
  comments: CommentItem[];

  [Symbol.iterator](): Iterator<any>;
}
