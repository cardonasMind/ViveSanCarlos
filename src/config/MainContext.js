import { Component, createContext } from "react"

import firebase from "./firebase";

import { Notification } from "rsuite";

export const MainContext = createContext();

export class MainContextProvider extends Component {
    constructor() {
        super();

        this.state = {
            presentationalImageData: {},
            featuredImages: [],
            featuredImagesKeys: [],


            routes: [],
            routesKeys: [],


            personal: [],
            personalKeys: [],

            
            isAdmin: ""
        }

        this.baseState = this.state;
    }

    componentDidMount() {
        const db = firebase.firestore();

        /*                  GETTING PRESENTATIONAL IMAGE FROM DB                  */
        db.collection('presentationalImage').doc('image').onSnapshot(docSnapshot => {
            this.setState({ presentationalImageData: docSnapshot.data()});
        }, error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        });


        /*                  GETTING FEATURED IMAGES FROM DB                  */
        db.collection('featuredImages').onSnapshot(docSnapshot => {
            this.setState({ featuredImages: [], featuredImagesKeys: [] }); // Restart state

            docSnapshot.forEach(featuredImage => {
                this.setState(prevState => ({
                    featuredImages: [ ...prevState.featuredImages, featuredImage.data()],
                    featuredImagesKeys: [...prevState.featuredImagesKeys, featuredImage.id]
                }))
            })
        }, error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        });











        
        

        /*                  GETTING ROUTES FROM DB                  */
        db.collection('routes').onSnapshot(docSnapshot => {
            this.setState({ routes: [], routesKeys: [] }); // Restart state
        
            docSnapshot.forEach(route => {
                this.setState(prevState => ({
                    routes: [ ...prevState.routes, route.data()],
                    routesKeys: [...prevState.routesKeys, route.id]
                }))
            })
        }, error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        });





















        /*                  GETTING PERSONAL FROM DB                  */
        db.collection('personal').onSnapshot(docSnapshot => {
            this.setState({ personal: [], personalKeys: [] }); // Restart state

            docSnapshot.forEach(personal => {
                this.setState(prevState => ({
                    personal: [ ...prevState.personal, personal.data()],
                    personalKeys: [...prevState.personalKeys, personal.id]
                }))
            })
        }, error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        });
















        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // Gets if users has isAdmin property in DB¿
                db.collection("users").doc(user.uid).get()
                    .then(doc => {
                        if (doc.exists) {
                            const { isAdmin } = doc.data();
                            this.setState({ isAdmin });
                        } else {
                            // If user isn´t in the DB, add it XD
                            db.collection("users").doc(user.uid).set({
                                isAdmin: false
                            })
                            .then(() => {
                                console.log("User is now in the DB :o");
                            })
                            .catch(error => {
                                Notification["error"]({
                                    title: "Ocurrió un error :(",
                                    description: error
                                });
                            });
                        }
                    })
                    .catch(error => {
                        console.log("Error getting document:", error);
            
                        Notification["error"]({
                            title: "Ocurrió un error :(",
                            description: error
                        });
                    });
            } else {
                // User isn´t logged
                this.setState(this.baseState);
            }
        });
    }

    render() {
        return(
            <MainContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </MainContext.Provider>
        )
    }
}