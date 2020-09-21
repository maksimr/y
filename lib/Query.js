export class Query {
  static fields(query) {
    return Query.stringify(Query.normalize(query));
  }

  static stringify(dict) {
    return dict ?
      Object.keys(dict)
        .map((key) => {
          const q = Query.stringify(dict[key]);
          return q ? `${key}(${q})` : key;
        })
        .join(',') :
      '';
  }

  static normalize(q, root = null) {
    const normalize = Query.normalize;
    switch (true) {
      case (q === null || q === undefined):
        return root;
      case (Array.isArray(q)):
        return q.reduce((root, it) => normalize(it, root), root);
      case (typeof q === 'object'):
        return Object.keys(q).reduce((root, it) => {
          root = initRoot();
          root[it] = normalize(q[it], root[it] || {});
          return root;
        }, root);
      default:
        root = initRoot();
        root[q] = root[q] || null;
        return root;
    }

    function initRoot() {
      return root = root || {};
    }
  }
}
