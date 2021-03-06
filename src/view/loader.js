import AbstractView from './abstract-view';

const createLoaderTemplate = () => (
  `
    <h2 class="animate">Loading</h2>
  `
);

export default class Loader extends AbstractView {

  get template() {
    return createLoaderTemplate();
  }
}
