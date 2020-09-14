export default {
  type: "MAIN",
  user: {
    type: "MAIN",
    firstName: {
      type: "string",
      required: true
    },
    lastName: {
      type: "string",
      required: false
    },
    posts: {
      type: "post",
      list: true
    }
  },
  post: {
    type: "MAIN",
    title: {
      type: "string",
      required: true
    },
    content: {
      type: "string",
      required: false
    },
    views: {
      type: "number",
      required: true,
      default: 0
    }
  }
};
