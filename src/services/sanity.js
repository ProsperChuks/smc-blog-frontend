import axios from "axios";

const PROJECTID = import.meta.env.VITE_APP_PROJECTID;
const DATASET = import.meta.env.VITE_APP_DATASET;

class Sanity {
  async loadContent() {
    const QUERY = encodeURIComponent(
      `*[_type == "post"]{title,author->{name},mainImage{asset->{url}},_createdAt,summary[0]{children[0]}, body[0]{children[0]{text}}}`
    );
    let URL = `https://${PROJECTID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    const resp = await axios.get(URL);
    console.log(resp);
    return resp;
  }

  async loadPost(index) {
    const QUERY = encodeURIComponent(
      `*[_type == "post"][${index}]{title,author->{name},mainImage{asset->{url}},_createdAt,summary[0]{children[0]}, body[0]{children[0]{text}}}`
    );
    let URL = `https://${PROJECTID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    const resp = await axios.get(URL);
    console.log(resp);
    return resp;
  }
}
const sanityClient = new Sanity();
export default sanityClient;
