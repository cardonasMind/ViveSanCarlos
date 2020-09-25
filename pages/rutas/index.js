import { Component, Fragment } from "react";

import Head from "next/head";
import Link from "next/link";

import { MainContext } from "../../src/config/MainContext"

import Header from "../../src/components/Header";
import RutaComponent from "../../src/components/RutaComponent";
import Navigation from "../../src/components/Navigation";

export default class extends Component {
    static contextType = MainContext;

    render() {
        const { routes, routesKeys } = this.context;

        return(
            <Fragment>
                <Head>
                    <title>Rutas con Vive San Carlos | Agencia de turismo en San Carlos Antioquia</title>
                </Head>

                <Header />

                
                <div id="rutas-container">
                    <div id="rutas-component">
                        <div className="itemsSlider">
                            {
                                routes.length > 0
                                ?
                                    routes.map((route, index) =>
                                        <Link key={routesKeys[index]} href={`/rutas/[ruta]`} as={`/rutas/${routesKeys[index]}`} >
                                            <a>
                                                <RutaComponent
                                                    name={route.name}
                                                    category={route.category}
                                                    image={route.image}
                                                />
                                            </a>
                                        </Link>
                                        
                                    )
                                :
                                    <Fragment>
                                        <RutaComponent />
                                        <RutaComponent />
                                        <RutaComponent />
                                    </Fragment>
                            }
                        </div>
                    </div>
                </div>
                

                <section id="galery-section">
                    <h1>Galería</h1>
                    
                </section>

                

                <Navigation />


                <style jsx global>{`
                    #rutas-container {
                        position: relative;
                    }
    
                    #rutas-container:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(90deg, #121212, transparent);
                        width: 2rem;
                        z-index: 2;
                    }
    
                    #rutas-container:after {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(270deg, #121212, transparent);
                        width: 2rem;
                        z-index: 2;
                    }
    
                    #rutas-component {
                        overflow-x: auto;
                    }
    
                    #rutas-component::-webkit-scrollbar {
                        width: 0px;  /* Remove scrollbar space */
                        background: transparent;  /* Optional: just make scrollbar invisible */
                    }  

                    #rutas-container .itemsSlider >:first-child {
                        padding-left: 1rem;
                    }
                    
                    #rutas-container .itemsSlider >:last-child {
                        padding-right: 1rem;
                    }




                    #galery-section {
                        background-image: url("images/default-background.jpg");
                        background-size: cover;
                        background-position: center;
                        position: relative;
                        padding: 1rem;
                        padding-top: 10rem;
                        z-index: 1;
                    }

                    #galery-section h1 {
                        color: white;
                        font-size: 2rem;
                        text-align: center;
                        padding: 2rem 0;
                    }

                    #galery-section:before {
                        content: "";
                        background: linear-gradient(#121212, transparent);
                        z-index: -1;
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 10rem;
                        left: 0;
                    }

                    #galery-section:after {
                        content: "";
                        position: absolute;
                        background: linear-gradient(transparent, #121212);
                        z-index: -1;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }
                `}</style>
            </Fragment>
        )
    }
}