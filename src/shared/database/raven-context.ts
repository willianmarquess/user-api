import DocumentStore, { IDocumentStore } from 'ravendb';

export default class RavenContext {
  static getContext(): IDocumentStore {
    const store = new DocumentStore('http://localhost:9010', 'UserApiDocs');
    return store.initialize();
  }
}