import { Component } from "react";

import { MainContext } from "../config/MainContext";

export default class extends Component {
    static contextType = MainContext;

    render() {
        const { image, description } = this.context.presentationalImageData;
        
        return(
            <div id="presentational-image">
                <div id="presentational-image-content" className="paper">
                    <p>{description ? description : "..."}</p>
                </div>

                <style jsx>{`
                    #presentational-image {
                        background-image: url(${image ? image : "/images/contact-background.jpg"});
                        background-size: cover;
                        background-position: center;
                        //background-attachment: fixed;
                        height: 70vh;
                        position: relative;
                        overflow: hidden;
                    }

                    #presentational-image-content {
                        max-width: 90%;
                        position: absolute;
                        top: 2rem;
                        right: 0;
                        border-radius: 0;
                        text-align: right;
                        padding: .6rem 1rem;
                    }

                    #presentational-image::after {
                        content: "";
                        background: linear-gradient(transparent, transparent, #121212);
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }    
                `}</style>
            </div>
        )
    }
}