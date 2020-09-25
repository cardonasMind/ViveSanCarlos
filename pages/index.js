import { Component, Fragment, useRef } from "react";

import { MainContext } from "../src/config/MainContext";

import Header from "../src/components/Header";
import PresentationalImage from "../src/components/PresentationalImage";
import FeaturedImage from "../src/components/FeaturedImage";
import Navigation from "../src/components/Navigation";






































const SelectLangPage = () => {
    const selectedLanguageRef = useRef();

    const handleEfe = () => {
        window.scrollTo(0, 10000);
        console.log("f")
    }

    return(
        <div id="page-content">
            <div id="selected-language" ref={selectedLanguageRef}>
                <img id="vive-logo" src="images/logo.png" />

                <div id="centered-languages-container">
                    <div id="select-language-container" onClick={handleEfe}>
                        <div id="english-language" className="paper" onClick={() => selectedLanguageRef.current.style.background = "linear-gradient(45deg, gold, transparent)"}>
                        </div>
                        <div id="spanish-language" className="paper" onClick={() => selectedLanguageRef.current.style.background = "linear-gradient(-45deg, gold, transparent)"}>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                body {
                    padding-bottom: 0 !important;
                }

                #page {
                    background-image: url("images/default-background.jpg");
                    background-size: cover;
                    background-position: center;

                    text-align: center;
                }

                #page-content {
                    background: linear-gradient(transparent, black);
                    height: 100vh;
                }

                #selected-language {
                    height: 100%;
                }

                #vive-logo {
                    width: 40vw;
                    margin: 2rem 0
                }

                #centered-languages-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 60vh;
                }

                #select-language-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: 100%;
                }

                #english-language, #spanish-language {
                    border-radius: 50%;
                    height: 8rem;
                    width: 8rem;
                    margin: 0 auto;
                    background: white;
                    background-size: cover;
                    background-position: center;
                    transition: .4s;
                }

                #english-language:hover, #spanish-language:hover {
                    transform: scale3d(1.3, 1.3, 1.3);
                }

                #english-language {
                    background-image: url("images/lang/english-image.jpg");
                }

                #spanish-language {
                    background-image: url("images/lang/spanish-image.jpg");
                }
            
            `}</style>
        </div>
    )
}







































export default class extends Component {
    static contextType = MainContext;

    state = {
        lang: "null"
    }

    render(){
        
        if(this.state.lang === null) {
            return <SelectLangPage />
        } else {
            const { featuredImages, featuredImagesKeys } = this.context;

            return(
                <Fragment>
                    <PresentationalImage />

                    <main>
                        <Header />

                        <div id="featured-images-container">
                            <div className="itemsSlider">
                                {
                                    featuredImages.length > 0 
                                    ? 
                                        featuredImages.map((featuredImage, index) => 
                                            <FeaturedImage 
                                                key={featuredImagesKeys[index]}
                                                image={featuredImage.image}
                                                description={featuredImage.description}
                                            />
                                        )              
                                    :
                                        <Fragment>
                                            <FeaturedImage />
                                            <FeaturedImage />
                                            <FeaturedImage />
                                        </Fragment>
                                }
                            </div>
                        </div>
                    </main>


                    <Navigation />

                    <style jsx global>{`
                        main {
                            transform: translateY(-20vh);
                        }

                        #featured-images-container {
                            overflow-x: auto;
                        }

                        #featured-images-container::-webkit-scrollbar {
                            width: 0px;  /* Remove scrollbar space */
                            background: transparent;  /* Optional: just make scrollbar invisible */
                        }

                        #featured-images-container .itemsSlider {
                            display: inline-flex;
                        }

                        #featured-images-container .itemsSlider >:first-child {
                            margin-left: 1rem;
                        }

                        #featured-images-container .itemsSlider >:last-child {
                            margin-right: 1rem;
                        }
                        
                    `}</style>
                </Fragment>
            )
        }
    }
}