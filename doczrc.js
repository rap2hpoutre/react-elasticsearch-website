import { css } from "docz-plugin-css";

export default {
  title: "React Elasticsearch",
  description: "This is my awesome documentation",
  menu: ["Home", "Getting started", "Components", "Advanced Usage", "Recipes"],
  plugins: [
    css({
      preprocessor: "postcss"
    })
  ]
};
