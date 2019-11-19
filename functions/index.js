// const cors = require('cors')({origin: true});
//
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
//
// const app = require("express")();
//
// exports.getPosts = functions.https.onRequest((req, res) => {
//     var stuff = [];
//     var db = admin.firestore();
//     return db.collection("posts")
//       .get()
//       .then(snapshot => {
//           snapshot.forEach(doc => {
//               var newElement = {
//                 "id": doc.id,
//                 "content": doc.data().content,
//                 "author": doc.data().author,
//                 "created": doc.data().created
//               }
//           stuff = stuff.concat(newElement);
//         });
//         var stuffStr = JSON.stringify(stuff);
//         //console.log("Callback :" + stuffStr);
//
//         res.status(200).send(stuffStr);
//         return null
//       }).catch(reason => {
//         res.send(reason);
//       });
// });

const cors = require("cors")({ origin: true });

// The Cloud Functions for Firebase SDK to create functions & triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// The express app used for routing
const app = require("express")();

// List all the posts under the path /posts
app.get(
  ["/", "/:id"],
  functions.https.onRequest((req, res) => {
    const postid = req.params.id;
    let reference = "posts";
    reference += postid ? "/" + postid : "";

    cors(req, res, () => {
      var stuff = [];
      return admin
        .firestore()
        .collection("posts")
          .get()
          .then(snapshot => {
              snapshot.forEach(doc => {
                  // specify content contains
                  var newElement = {
                    "id": doc.id,
                    "title": doc.data().title,
                    "content": doc.data().content,
                    "author": doc.data().author,
                    "created": doc.data().created
                  }
              stuff = stuff.concat(newElement);
            });
            var stuffStr = JSON.stringify(stuff);
            //console.log("Callback :" + stuffStr);
            res.status(200).send(stuffStr);
            return null
          }).catch(reason => {
            res.send(reason);
          });
      });
  })
);

// set the routes up under the /posts/ endpoint
exports.posts = functions.https.onRequest((req, res) => {
  // Handle routing of /posts without a trailing /,
  if (!req.path) {
    // prepending "/" keeps query params, path params intact
    req.url = `/${req.url}`;
  }
  return app(req, res);
});
