import React from "react";

import Link from "next/link";

const Header = () => {
    return(
        <div id="header">
            <Link href="/">
                <a><img src="/images/logo.png" /></a>
            </Link>
            
            <style jsx>{`
                #header {
                    padding: 1rem 0;
                    text-align: center;
                }

                img {
                    height: 4rem;
                }
            
            
            `}</style>
        </div>
    )
}

export default Header;