import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FeaturedImage = ({ description, image }) => {
    return(
        <div className="featuredImageContainer paper">
            <div className="featuredImageContent">
                {
                    description
                    ?
                        <p>{description}</p>
                    :
                        <SkeletonTheme color="rgba(255, 255, 255, .1)" highlightColor="rgba(255, 255, 255, .3)">
                            <Skeleton width={"80%"} duration={3} />
                        </SkeletonTheme>
                }
            </div>


            <style jsx>{`
                .featuredImageContainer {
                    background-image: url(${image ? image : ""});
                    background-size: cover;
                    background-position: center;
                    height: 30rem;
                    width: 20rem;
                    overflow: hidden;
                    position: relative;
                    transition: .4s;
                }

                /*.featuredImageContainer:hover {
                    transform: scale(.9);
                }*/

                .featuredImageContent {
                    position: absolute;
                    background: linear-gradient(rgba(0, 0, 0, .6), #121212);
                    right: 0;
                    bottom: 0;
                    left: 0;
                    color: white;
                    padding: 1rem;
                }
            `}</style>
        </div>
    )
}

export default FeaturedImage;