import { Component, Fragment, createRef } from "react";

import Head from "next/head";

import { MainContext } from "../src/config/MainContext";

import { Icon } from "rsuite";

import Header from "../src/components/Header";
import AuthorComponent from "../src/components/AuthorComponent";
import Navigation from "../src/components/Navigation";

export default class extends Component {
    static contextType = MainContext;

    constructor() {
        super();

        this.state = {
            /*          ABOUT US SLIDER             */
            actualAboutUsSlider: 0,
            prevSliderArrow: createRef(),
            sliderContent: createRef(),
            nextSliderArrow: createRef(),
        }
    }


    componentDidMount() {
        this.changeAboutUsSlider(0);
    }

    changeAboutUsSlider = slide => {
        const prevArrow = this.state.prevSliderArrow.current;
        const sliderContent = this.state.sliderContent.current;
        const nextArrow = this.state.nextSliderArrow.current;

        // Toggle arrows
        if(slide === 0) {
            prevArrow.style.visibility = "hidden";
        } else if(slide === 2) {
            nextArrow.style.visibility = "hidden";
        } else {
            prevArrow.style.visibility = "initial";
            nextArrow.style.visibility = "initial";
        }

        const sliderItems = [
            `
                <h1>Nosotros</h1>
                <p>Vive San Carlos es una empresa que está compuesta por jóvenes líderes del territorio, que busca a través de distintos procesos socio-económicos generar mejores oportunidades de progreso a la comunidad sancarlitana especialmente a los jóvenes. Está compuesta por diversos jóvenes que han participado en diferentes procesos juveniles y han liderado grandes iniciativas que han tenido impacto en la población, son reconocidos como jóvenes emprendedores, creativos y que tienen un alto sentido de pertenencia y amor por su territorio.</p>
            `, 
            `
                <h1>Misión</h1>
                <p>La asociación Vive San Carlos, es una entidad de carácter colectivo, sin ánimo de lucro, constituida por personas naturales, como los jóvenes que buscan agruparse para generar empleo a través de las actividades propias del turismo, para capacitar y replicar los conocimientos a través de proyectos, actividades logísticas, campañas sociales y ambientales.</p>
            `,
            `
                <h1>Visión</h1>
                <p>Para el 2024 será una agencia de turismo reconocida en el oriente antioqueño, por la confianza y seguridad que les ofrecemos a nuestros clientes, presentando innovadores servicios y asegurando Una actividad turística responsable, Promoviendo un ambiente de buenas relaciones y obteniendo una mayor satisfacción de los turistas que usen nuestros servicios.</p>
            `
        ];

        sliderContent.innerHTML = sliderItems[slide];
    }

    handleAboutUsSlider = action => {
        let slide = this.state.actualAboutUsSlider;

        if(action === "prev") {
            slide-=1;
        } else {
            slide+=1;
        }

        this.setState({ actualAboutUsSlider: slide })
        this.changeAboutUsSlider(slide);
    }

    render() {
        const { personal, personalKeys } = this.context;
        
        return(
            <Fragment>
                <Head>
                    <title>Contáctar con Vive San Carlos | Agencia de turismo en San Carlos Antioquia</title>
                </Head>

                <section id="about-us-container">
                    <Header />

                    <div id="about-us-slider">
                        <div id="back-arrow" ref={this.state.prevSliderArrow} onClick={() => this.handleAboutUsSlider("prev")}>
                            <Icon icon="angle-left" size="3x" />
                        </div>
                        <div id="slider-content" ref={this.state.sliderContent}>
                            <h1>Nosotros</h1>
                            <p>Vive San Carlos es una empresa que está compuesta por jóvenes líderes del territorio, que busca a través de distintos procesos socio-económicos generar mejores oportunidades de progreso a la comunidad sancarlitana especialmente a los jóvenes. Está compuesta por diversos jóvenes que han participado en diferentes procesos juveniles y han liderado grandes iniciativas que han tenido impacto en la población, son reconocidos como jóvenes emprendedores, creativos y que tienen un alto sentido de pertenencia y amor por su territorio.</p>
                        </div>
                        <div id="next-arrow" ref={this.state.nextSliderArrow} onClick={() => this.handleAboutUsSlider("next")}>
                            <Icon icon="angle-right" size="3x" />
                        </div>
                    </div>
                </section>

                <section id="contact-us-section">
                    <div id="personal-slider-container">
                        <div className="itemsSlider">
                            {
                                personal.length > 0 
                                ?
                                    personal.map((personal, index) => 
                                        <AuthorComponent
                                            key={personalKeys[index]}
                                            photo={personal.photoURL}
                                            name={personal.name}
                                            facebook={personal.facebook}
                                            instagram={personal.instagram}
                                        />
                                    )
                                :
                                    <Fragment>
                                        <AuthorComponent />
                                        <AuthorComponent />
                                        <AuthorComponent />
                                    </Fragment>
                            }
                        </div>
                    </div>

                    <h1>Contáctanos</h1>
                        
                    <span><b>Dirección:</b><p>No disponible</p></span>
                    <span><b>E-mail:</b><p>vivesancarlos2@gmail.com</p></span>

                    <span><b>Teléfono:</b><p>No disponible</p></span>
                    <span><b>Celular:</b><p>+57 3004873721</p></span>

                    <div id="contact-container">
                        <div>
                            <a href="https://wa.me/573004873721">
                                <img src="icons/whatsapp.svg" height="40px" />
                                <h2>WhatsApp</h2>
                            </a>
                        </div>
                        <div>
                            <a href="tel:">
                                <img src="icons/phone.svg" height="40px" />
                                <h2>Llamar</h2>
                            </a>
                        </div>
                    </div>
                </section>

                <Navigation />

                <style jsx global>{`
                    body {
                        background-image: url("images/contact-background.jpg");
                        background-size: cover;
                    }



                    #about-us-container {
                        background-image: url("images/default-background.jpg");
                        background-size: cover;
                        background-position: center;
                        height: 80vh;
                        padding-bottom: 4rem;
                        position: relative;
                        z-index: 1;
                    }

                    #about-us-container:after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .2), #121212);
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }

                    #about-us-container #about-us-slider {
                        min-height: 80%;
                        padding: 2rem 0;
                        color: var(--white-touch);
                        display: grid;
                        grid-template-columns: auto 1fr auto;
                        align-items: center;
                    }
                    
                    #about-us-container #about-us-slider #back-arrow, #next-arrow {
                        padding: 0 .6rem;
                    }

                    #about-us-container #about-us-slider #back-arrow:active *, #next-arrow:active * {
                        transform: scale(1.2);
                    }

                    #about-us-container #about-us-slider #slider-content {
                        padding: 0 .4rem;
                        text-align: justify;
                    }

                    #about-us-container #about-us-slider #slider-content h1 {
                        text-align: center;
                        color: white;
                    }

                    #about-us-container #about-us-slider #slider-content p {
                        color: var(--white-subtitle);
                    }



                    #contact-us-section:before {
                        content: "";
                        background: linear-gradient(#121212, #121212, transparent);
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        z-index: -1;
                    }

                    #contact-us-section {
                        color: white;
                        padding: 4rem 2rem;
                        position: relative;
                        z-index: 1;
                    }

                    #contact-us-section #personal-slider-container {
                        overflow-x: auto;
                        margin: auto -2rem;
                        padding: 1rem 0;
                    }
                    
                    #contact-us-section #personal-slider-container::-webkit-scrollbar {
                        width: 0px;  /* Remove scrollbar space */
                        background: transparent;  /* Optional: just make scrollbar invisible */
                    }

                    #contact-us-section #personal-slider-container .itemsSlider {
                        display: inline-flex;
                    }

                    #contact-us-section #personal-slider-container .itemsSlider >:first-child {
                        margin-left: 1rem;
                    }

                    #contact-us-section #personal-slider-container .itemsSlider >:last-child {
                        margin-right: 1rem;
                    }

                    

                    #contact-us-section span {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .4rem;
                        color: var(--white-subtitle);
                    }

                    #contact-us-section #contact-container {
                        padding: 2rem;
                        text-align: center;
                        display: grid;
                        align-items: center;
                        grid-template-columns: 1fr 1fr;
                    }

                    #contact-us-section #contact-container a {
                        color: inherit;
                    }

                    #contact-us-section #contact-container img {
                        margin: 0 auto;
                    }
                `}</style>
            </Fragment>
        )
    }
}