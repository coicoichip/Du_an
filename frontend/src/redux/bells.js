export default function bells(state = 0, { payload, type }) {
  switch (type) {
    case "BELLS":
      return state + 1;
    case "RESET_BELLS":
      return 0;
    default:
      return 0;
  }
}
