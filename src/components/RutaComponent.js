import { Button } from "rsuite";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RutaComponent = ({ name, category, image }) => {
    return(
        <div className="rutaContainer paper">
            <div className="rutaContent">
                <div>
                    {
                        name
                        ?
                            <h1>{name}</h1>
                        :
                            <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .3)">
                                <Skeleton height={"1.4rem"} duration={3} />
                            </SkeletonTheme>
                    }


                    {
                        category
                        ?
                            <p>{category}</p>
                        :
                            <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .3)">
                                <Skeleton width={"30%"} duration={3} />
                            </SkeletonTheme>
                    }
                </div>
                <div className="rutaButton">
                    <Button size="xs" block>Click para ver</Button>
                </div>
            </div>


            <style jsx>{`
                .rutaContainer {
                    background-image: url(${image ? image : ""});
                    background-size: cover;
                    background-position: center;
                    height: 24rem;
                    width: 16rem;
                    position: relative;
                    z-index: 1;
                    overflow: hidden;
                    transition: .4s;
                }

                .rutaContainer:hover {
                    transform: scale(.9);
                }

                .rutaContainer:after {
                    content: "";
                    position: absolute;
                    background: linear-gradient(rgba(0, 0, 0, .2), #121212);
                    z-index: -1;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                }

                .rutaContent {
                    color: white;
                    padding: 1rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                    display: grid;
                }

                .rutaContent p {
                    color: var(--white-subtitle);
                }

                .rutaButton {
                    align-self: end;
                }
            `}</style>
        </div>
    )
}

export default RutaComponent;