import React from "react";

import Link from "next/link";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AuthorComponent = ({ photo, name, facebook, instagram }) => {
    return(
        <div className="authorContainer paper">
            <div className="authorInfo">
                {
                    photo 
                    ? 
                        <div className="authorAvatar"></div>
                    :   
                        <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .3)">
                            <Skeleton height={"4rem"} width={"4rem"} duration={3} circle/>
                        </SkeletonTheme>
                }
                
                
                {
                    name
                    ?
                        <p>{name}</p>
                    :
                        <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .3)">
                            <Skeleton width={"4rem"} duration={3} />
                        </SkeletonTheme>
                }
            </div>

            <div className="authorSocialNetworks">
                {
                    facebook &&
                        <Link href={facebook}>
                            <a target="_blank"><img src="icons/facebook.svg" width="20px" /></a>
                        </Link>
                }

                {
                    instagram &&
                        <Link href={instagram}>
                            <a target="_blank"><img src="icons/instagram.svg" width="20px" /></a>
                        </Link>
                }
            </div>

            <style jsx>{`
                .authorContainer {
                    padding: 1rem;
                    text-align: center;
                    padding: 4rem 1rem;
                    width: 34vw;
                    height: 18rem;
                    display: grid;
                    align-items: center;
                    color: initial;
                }

                .authorInfo {
                    display: grid;
                    grid-template-rows: auto auto;
                    grid-gap: .4rem;
                    justify-content: center;
                }

                .authorAvatar {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 50%;
                    background-color: #f0f0f0;
                    background-image: url(${photo ? photo : ""});
                    background-size: cover;
                    background-position: center;
                    margin: 0 auto;
                }

                .authorSocialNetworks {
                    padding-top: 1rem;
                    display: grid;
                    grid-auto-flow: column;
                }

                .authorSocialNetworks * {
                    margin: 0 auto;
                }
            `}</style>
        </div>
    )
}

export default AuthorComponent;