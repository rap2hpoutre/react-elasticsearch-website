import React from "react";
import { Elasticsearch, SearchBox, Facet, Results } from "react-elasticsearch";
import "./styles.css";

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

export default function demo() {
  return (
    <div class="demo">
      <h3>🍿 Demo application - Movie database</h3>
      <div className="movies">
        <Elasticsearch
          url={"https://scalr.api.appbase.io/react-elasticsearch-films"}
          headers={{
            Authorization:
              "Basic " +
              Buffer.from(
                "Qq38oEj7D:a23804f8-f0c4-4dea-9a55-67739275e588"
              ).toString("base64")
          }}
        >
          <div className="facets">
            <div className="collapsable-facet">
              <div className="collapsable-facet-title">Release date</div>
              <Facet
                id="release_year"
                itemsPerBlock="50"
                showFilter={false}
                items={(data, { isChecked, handleChange }) =>
                  data
                    .filter(item => item.doc_count > 2)
                    .sort((a, b) => b.key - a.key)
                    .map(item => (
                      <label key={item.key}>
                        <input
                          type="checkbox"
                          checked={isChecked(item)}
                          onChange={e => handleChange(item, e.target.checked)}
                        />
                        {item.key || "Not defined"} ({item.doc_count})
                      </label>
                    ))
                }
                fields={["release_year"]}
              />
            </div>
            <div className="collapsable-facet">
              <div className="collapsable-facet-title">Genre</div>
              <Facet
                id="genre"
                itemsPerBlock="50"
                showFilter={false}
                items={(data, { isChecked, handleChange }) =>
                  data
                    .filter(item => item.doc_count > 2)
                    .map(item => (
                      <label key={item.key}>
                        <input
                          type="checkbox"
                          checked={isChecked(item)}
                          onChange={e => handleChange(item, e.target.checked)}
                        />
                        {item.key || "Not defined"} ({item.doc_count})
                      </label>
                    ))
                }
                fields={["genres.keyword"]}
              />
            </div>

            <div className="collapsable-facet">
              <div className="collapsable-facet-title">Original language</div>
              <Facet
                id="original_language"
                itemsPerBlock="50"
                showFilter={false}
                items={(data, { isChecked, handleChange }) =>
                  data
                    .filter(item => item.doc_count > 2)
                    .map(item => (
                      <label key={item.key}>
                        <input
                          type="checkbox"
                          checked={isChecked(item)}
                          onChange={e => handleChange(item, e.target.checked)}
                        />
                        {item.key || "Not defined"} ({item.doc_count})
                      </label>
                    ))
                }
                fields={["original_language.keyword"]}
              />
            </div>
          </div>
          <div className="right-part">
            <div>
              <SearchBox id="main" customQuery={customQueryMovie} />
            </div>
            <Results
              id="result"
              itemsPerPage="12"
              items={data =>
                data.map(({ _source, _score, _id }) => (
                  <div key={_id} className="card">
                    <img src={_source.poster_path} />
                    <span>{_source.original_title}</span>
                  </div>
                ))
              }
            />
          </div>
        </Elasticsearch>
      </div>
    </div>
  );
}
