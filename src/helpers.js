function customQueryMovie(query) {
  if (!query) {
    return { match_all: {} };
  }
  return {
    bool: {
      should: [
        {
          multi_match: {
            query,
            type: "phrase",
            fields: ["overview", "original_title"]
          }
        },
        {
          multi_match: {
            query,
            type: "phrase_prefix",
            fields: ["original_title"]
          }
        }
      ]
    }
  };
}

export const conf = {
  url: "https://scalr.api.appbase.io/react-elasticsearch-films",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from("Qq38oEj7D:a23804f8-f0c4-4dea-9a55-67739275e588").toString(
        "base64"
      )
  }
};
