import React from "react";

import Head from "next/head";

import { MainContextProvider } from "../src/config/MainContext";

import 'rsuite/lib/styles/index.less';

const App = ({ Component, pageProps }) => {
    return (
        <MainContextProvider>
            <div id="page">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>Vive San Carlos | Agencia de turismo en San Carlos Antioquia</title>
                    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
                    <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
                    <meta name="theme-color" content="#121212" />

                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap" rel="stylesheet" />
                </Head>

                <Component {...pageProps} />
                        
                <style jsx global>{`
                    * {
                        font-size: 12px;
                        font-family: 'Open Sans', sans-serif;
                        margin: 0;
                        box-sizing: border-box;
                        text-decoration: none !important;
                    }
        
                    body {
                        margin: 0;
                        padding-bottom: 4rem;
                        background-color: #121212;
                    }
        
                    #page {
                        min-height: 100vh;
                    }

                    h1, h2, h3, h4, h4, h6 {
                        font-family: 'Roboto', sans-serif;
                        line-height: inherit;
                    }
        
                    h1 {
                        font-size: 1.6rem;
                        font-weight: 700;
                    }
        
                    h2 {
                        font-size: 1.4rem;
                        font-weight: 500;
                    }
        
                    h3 {
                        font-size: 1.2rem;
                        font-weight: 500;
                    }
        
                    h4 {
                        font-size: 1.1rem;
                        font-weight: 500;
                    }
        
                    :root {
                        --vive-blue: #00a6ff;
                        --beach: #00D9C0;
                        --yellow: #F7F052;


                        --white-subtitle: #f0f0f0;
                        --white-touch: #e0e0e0;
                    }

                    .paper {
                        box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
                        background: white;
                        border-radius: .6rem;
                    }

                    .itemsSlider {
                        display: grid;
                        grid-auto-flow: column;
                        grid-gap: 1rem;
                    }
                    
                    `}</style>
            </div>
        </MainContextProvider>
    )
}

export default App;