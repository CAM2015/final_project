
// tslint:disable-next-line:no-unused-expression

// returns the document (a single school) of the collection we are querying,
    // by its id and containing all of its data

    export const convertSnaps = <T>(snaps) => {
        return  snaps.map(snap => {
          return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          };
        }) as T[];
      };
