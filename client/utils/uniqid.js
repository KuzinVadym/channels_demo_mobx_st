
export default function uniqid() {
  return Math.round(1 - 0.5 + Math.random() * (10000000000000 - 1 + 1));
}