import { getFirestore, collection, addDoc } from "firebase/firestore";

import firebase from "firebase/app";
import "firebase/firestore";

export function seedDatabase(firebase) {
  console.log(firebase, "firebase");
  const users = [
    {
      userId: "lx65we3BUlUNnv0ZjeTnmfzwNxn2",
      username: "natalija",
      fullName: "Natalija Zver",
      emailAddress: "natalijazver929@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "rok",
      fullName: "Rok Povod",
      emailAddress: "rok.pov@gmail.com",
      following: [],
      followers: ["lx65we3BUlUNnv0ZjeTnmfzwNxn2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "nikon",
      fullName: "Nik Sinek",
      emailAddress: "nik@gmail.com",
      following: [],
      followers: ["lx65we3BUlUNnv0ZjeTnmfzwNxn2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "janeznov",
      fullName: "Novak Janez",
      emailAddress: "janez.novak@gmail.com",
      following: [],
      followers: ["lx65we3BUlUNnv0ZjeTnmfzwNxn2"],
      dateCreated: Date.now(),
    },
  ];
  const db = getFirestore(firebase);
  const dbRef = collection(db, "users");
  for (let i = 0; i < users.length; i++) {
    addDoc(dbRef, users[i])
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error, "error");
      });
    // db.collection('users').add(users[i])
  }
  const dbRefPictures = collection(db, "photos");
  for (let i = 1; i <= 5; i++) {
    addDoc(dbRefPictures, {
      photoId: i,
      userId: "2",
      imageSrc: `https://cw45.scrimba.com/images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "nikon",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "janeznov",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    })
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    // firebase
    // .firestore()
    // .collection('photos')
    // .add({
    //   photoId: i,
    //   userId: '2',
    //   imageSrc: `https://cw45.scrimba.com/images/users/raphael/${i}.jpg`,
    //   caption: 'Saint George and the Dragon',
    //   likes: [],
    //   comments: [
    //     {
    //       displayName: 'nikon',
    //       comment: 'Love this place, looks like my animal farm!'
    //     },
    //     {
    //       displayName: 'janeznov',
    //       comment: 'Would you mind if I used this picture?'
    //     }
    //   ],
    //   userLatitude: '40.7128°',
    //   userLongitude: '74.0060°',
    //   dateCreated: Date.now()
    // });
  }
}
