import PropTypes from "prop-types";

function ElasticsearchProps() {
  return <></>;
}
ElasticsearchProps.propTypes = {
  /** 
   * URL of your elasticsearch instance.
   * 
   * Could be something like http://127.0.0.1:9200 or http://myaws.eu-west-3.es.amazonaws.com
   */
  url: PropTypes.string,
  /**
   * Additional headers. Could do some authorization, e.g: `{ Authorization: "Basic xxx"}`
   */
  headers: PropTypes.optionalObject,
};

export { ElasticsearchProps };
