import { Component, Fragment } from "react";

import firebase from "../../../src/config/firebase";

import Head from "next/head";
import Link from "next/link";

import { Notification, Icon } from "rsuite";

import Header from "../../../src/components/Header";
import Navigation from "../../../src/components/Navigation";

export default class extends Component {
    state = {
        routeData: {}
    }

    componentDidMount() {
        const routeID = window.location.pathname.slice(7);
        
        const db = firebase.firestore();

        /*                  GETTING THE ROUTE FROM DB                  */
        db.collection('routes').doc(routeID)
        .get().then(doc => {
            if(doc.exists) {
                this.setState({ routeData: doc.data() });
            } else {
                Notification.info({
                    title: "Espera",
                    description: "Ruta no encontrada :("
                });
            }
        })
        .catch(error => Notification.error({
            title: "Ocurrió un error",
            description: error
        }));
    }


    render() {
        const { name, category, image } = this.state.routeData;

        return(
            <Fragment>
                <Head>
                    <title>Ruta {name} con Vive San Carlos | Agencia de turismo en San Carlos Antioquia</title>
                </Head>

                <section id="presentational-image">
                    <div>
                        <Header />
                    </div>
                    <div id="presentational-image-title">
                        <h1>{name ? name : ""}</h1>
                        <p>{category ? category : ""}</p>
                    </div>
                </section>

                <div id="go-home">
                    <Link href="/rutas">
                        <a><Icon icon="back-arrow" /> Volver a Rutas</a>
                    </Link>
                </div>

                <main>
                </main>

                <Navigation />



                <style jsx global>{`
                    body {
                        padding-bottom: 0 !important;
                    }



                    #presentational-image {
                        background-image: url(${image ? image : "/images/contact-background.jpg"});
                        background-size: cover;
                        background-position: center;
                        height: 80vh;
                        position: relative;
                        z-index: 1;
                        color: white;

                        display: grid;
                        grid-template-rows: 1fr 1fr;
                    }

                    #presentational-image:after {
                        content: "";
                        position: absolute;
                        background: linear-gradient(transparent, #121212);
                        z-index: -1;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }

                    #presentational-image-title {
                        align-self: end;
                        padding: 1rem;
                        margin-left: 1rem;
                        border-left: 4px solid white;
                    }



                    #go-home {
                        position: sticky;
                        top: 0;
                        z-index: 1;
                    }

                    #go-home a{
                        padding: .4rem 1rem;
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .4rem;
                        align-items: center;
                        color: var(--white-touch);
                        background: #121212;
                    }

                
                
                `}</style>
            </Fragment>
        )
    }
}