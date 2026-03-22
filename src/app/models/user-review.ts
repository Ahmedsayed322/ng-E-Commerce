export interface UserReview {
  id: string;
  title: string;
  productId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  comment: string;
  reviewDate: Date;
}

const names = [
  'Liam Carter',
  'Emma Johnson',
  'Noah Williams',
  'Olivia Brown',
  'Ethan Davis',
  'Ava Martinez',
  'Mason Wilson',
  'Sophia Anderson',
  'Logan Thomas',
  'Isabella Jackson',
  'Lucas White',
  'Mia Harris',
  'James Martin',
  'Charlotte Thompson',
  'Benjamin Garcia',
  'Amelia Moore',
  'Elijah Taylor',
  'Harper Lee',
  'Alexander Lewis',
  'Evelyn Walker',
];

const titles = [
  'Absolutely worth it!',
  'Better than expected',
  'Not impressed honestly',
  'Great value for money',
  'Would buy again',
  'Arrived damaged unfortunately',
  'Perfect gift idea',
  'Solid quality overall',
  'Overpriced in my opinion',
  'Exactly as described',
  'Fast shipping, love it',
  'Decent but nothing special',
  'Highly recommend this',
  'Returned after one week',
  'Five stars no doubt',
  'Good but has flaws',
  'Amazing product!',
  'Just okay for the price',
  'Exceeded my expectations',
  "Wouldn't buy again",
];

const comments = [
  'The quality is much better than I expected for the price. Will definitely order again.',
  'Packaging was a bit rough but the product itself is in great shape. Happy with it.',
  'It looks exactly like the photos. Very satisfied with my purchase overall.',
  'Took a while to arrive but it was worth the wait. Great quality!',
  'Material feels a bit cheap compared to the description, but still usable.',
  'Bought this as a gift and they absolutely loved it. Highly recommend!',
  'Easy to set up and works perfectly out of the box. No complaints at all.',
  "Returned it after a week. Didn't meet my quality expectations unfortunately.",
  'Great customer service when I had an issue. Problem was resolved quickly.',
  'This is my second purchase and the quality is consistent. Love the brand.',
  'A bit smaller than I imagined but still fits my needs perfectly.',
  'Looks premium, feels premium. Definitely a quality product.',
  'I was skeptical at first but it exceeded all my expectations.',
  'The color is slightly different from the photos but still looks nice.',
  'Wore it for the first time today and already got multiple compliments.',
  'Very comfortable and well-made. Good attention to detail throughout.',
  'Not quite what I expected but still decent for everyday use.',
  'Ordered two, both arrived in perfect condition. Impressed with packaging.',
  'Works as advertised. No surprises, which is honestly refreshing.',
  "One of the best purchases I've made this year. Totally worth it.",
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRating(): number {
  const weights = [1, 2, 3, 3, 5, 5, 5]; // skew toward 4-5 stars
  return weights[Math.floor(Math.random() * weights.length)];
}

function randomDate(): Date {
  const start = new Date('2024-01-01').getTime();
  const end = new Date('2026-03-01').getTime();
  return new Date(start + Math.random() * (end - start));
}
function randomProduct(): number {
  return Math.floor(Math.random() * 20 + 1);
}
export const dummyReviews: UserReview[] = Array.from({ length: 100 }, (_, i) => {
  const index = i + 1;
  const avatarIndex = (i % 70) + 1; 
 
  const nameIndex = i % names.length;

  return {
    id: `rev_${String(index).padStart(3, '0')}`,
    title: getRandom(titles),
    productId: `${randomProduct()}`,
    userName: names[nameIndex],
    userImageUrl: `https://i.pravatar.cc/150?img=${avatarIndex}`,
    rating: randomRating(),
    comment: getRandom(comments),
    reviewDate: randomDate(),
  };
});
