import React, { useRef, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { MainContext } from "../config/MainContext";

import Link from "next/link";
import { Icon } from "rsuite";

const Navigation = () => {
    const context = useContext(MainContext);
    
    const actualURL = useRouter().pathname;

    const filledIcons = {
        filledInicio:
        '<path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />',
        filledContactar:
        '<path d="M512 244c176.18 0 319 142.82 319 319v233a32 32 0 01-32 32H225a32 32 0 01-32-32V563c0-176.18 142.82-319 319-319zM484 68h56a8 8 0 018 8v96a8 8 0 01-8 8h-56a8 8 0 01-8-8V76a8 8 0 018-8zM177.25 191.66a8 8 0 0111.32 0l67.88 67.88a8 8 0 010 11.31l-39.6 39.6a8 8 0 01-11.31 0l-67.88-67.88a8 8 0 010-11.31l39.6-39.6zm669.6 0l39.6 39.6a8 8 0 010 11.3l-67.88 67.9a8 8 0 01-11.32 0l-39.6-39.6a8 8 0 010-11.32l67.89-67.88a8 8 0 0111.31 0zM192 892h640a32 32 0 0132 32v24a8 8 0 01-8 8H168a8 8 0 01-8-8v-24a32 32 0 0132-32zm148-317v253h64V575h-64z"></path>'
    };
    
    const inicioIcon = useRef();
    const rutasIcon = useRef();
    const contactarIcon = useRef();

    useEffect(() => {
        const navigationIcons = {
            inicio: inicioIcon.current,
            rutas: rutasIcon.current,
            contactar: contactarIcon.current
        }

        if(actualURL === "/") {
            navigationIcons.inicio.innerHTML = filledIcons.filledInicio;


        } else if(actualURL.startsWith("/rutas")) {
            navigationIcons.rutas.classList.add("active");


        } else if(actualURL === "/contactar") {
            navigationIcons.contactar.innerHTML = filledIcons.filledContactar;

            
        }
    })

    return(
        <div id="navigation">
            <div id="default-navigation">
                <Link href="/">
                    <a id="go-inicio">
                        <svg
                            ref={inicioIcon}
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="home"
                            width="1.4rem"
                            height="1.4rem"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
                        </svg>
                        Inicio
                    </a>
                </Link>

                <Link href="/rutas">
                    <a id="go-rutas" ref={rutasIcon}>
                        <div id="rutas-icon">
                            <Icon icon="map-o" />
                        </div>
                    </a>
                </Link>

                <Link href="/contactar">
                    <a id="go-contactar">
                        <svg
                            ref={contactarIcon}
                            viewBox="64 64 896 896"
                            focusable="false"
                            width="1.4rem"
                            height="1.4rem"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 00-11.3 0l-39.6 39.6a8.03 8.03 0 000 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 00-11.3 0l-67.9 67.9a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z" />
                        </svg>
                        Contáctar
                    </a>
                </Link>
            </div>
            {
                context.isAdmin &&
                    <div id="admin-navigation">
                        <Link href="/administrar">
                            <a>
                                Administrar
                            </a>
                        </Link>
                    </div>
            }
            

            <style jsx>{`
                #navigation {
                    background: linear-gradient(transparent, #121212);
                    display: grid;
                    text-align: center;
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 999;
                    border-radius: 0;
                }

                #navigation #default-navigation {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                }

                #navigation #admin-navigation {
                    background: var(--beach);
                    padding: .6rem 0;
                }

                #navigation #admin-navigation a {
                    color: #121212;
                }

                svg {
                    margin: auto;
                }

                #go-inicio, #go-contactar {
                    padding: .6rem;
                    display: grid;
                    color: white;
                }

                #go-rutas {
                    color: #121212;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 2rem 2rem 0 0;
                }

                #go-rutas #rutas-icon {
                    padding: .6rem;
                    background: gold;
                    border-radius: 50%;
                }

                #go-rutas.active {
                    background: var(--beach);
                    border-top: 4px solid white;
                    border-left: 4px solid var(--yellow);
                    border-right: 4px solid var(--vive-blue);
                }     
            `}</style>
        </div>
    )
}

export default Navigation;