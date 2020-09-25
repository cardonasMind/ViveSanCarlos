import { Component, Fragment, PureComponent } from "react";

import Link from "next/link";

import { MainContext } from "../src/config/MainContext";

import firebase from "../src/config/firebase";

import { Notification, Nav, Icon, Button, Modal, 
    Form, FormGroup, IconButton, Input, ControlLabel, Uploader, Drawer } from "rsuite";

import Header from "../src/components/Header";
import PresentationalImage from "../src/components/PresentationalImage";
import FeaturedImage from "../src/components/FeaturedImage";
import RutaComponent from "../src/components/RutaComponent";
import AuthorComponent from "../src/components/AuthorComponent";



































/*                      NOT LOGGED PAGE                     */
const NotLoggedPage = () => {
    const handleGoogleAuth = () => {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());

        firebase.auth().getRedirectResult()
        .catch(error => {
            Notification["error"]({
                title: "Ocurrió un error :(",
                description: error
            });
        });
    }

    return(
        <Fragment>
            <img src="images/logo.png" alt="Vive San Carlos" onClick={handleGoogleAuth} />

            <style jsx global>{`
                body {
                    background-image: url("images/default-background.jpg");
                    background-size: cover;
                    background-position: center;

                    padding-bottom: 0 !important;
                }

                #page {
                    background: linear-gradient(transparent, black);
                    height: 100%;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }



                img {
                    height: 4rem;
                }
            `}</style>
        </Fragment>
    )
}















































/*                      LOGGED SECTIONS (Just to make things more easy to control)                     */
const HeaderNavigation = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect}>
            <Nav.Item eventKey="inicio" href="#inicio-section"><Icon icon="home" />Inicio</Nav.Item>
            <Nav.Item eventKey="rutas" href="#rutas-section"><Icon icon="map" />Rutas</Nav.Item>
            <Nav.Item eventKey="contactar" href="#contactar-section">
                Contáctar
            </Nav.Item>
            <Link href="/">
                <Nav.Item eventKey="goInicio">
                    <Icon icon="close" />
                </Nav.Item>
            </Link>
        </Nav>
    );
};

class HeaderNavigationComponent extends PureComponent {
    state = {
        active: "inicio"
    }

    handleSelect = active => this.setState({ active })

    render() {
        const { active } = this.state;

        return (
            <div id="header-navigation">
                <HeaderNavigation active={active} onSelect={this.handleSelect} />


                <style jsx global>{`
                    #header-navigation {
                        background: #121212;
                        position: sticky;
                        top: 0;
                        right: 0;
                        left: 0;
                        z-index: 2;
                        padding: 1rem;
                    }

                    #header-navigation ul {
                        display: grid;
                        grid-template-columns: auto auto auto 1fr;
                    }

                    #header-navigation ul li .rs-icon {
                        font-size: 1.4rem;
                    }

                    #header-navigation ul li .rs-icon.rs-icon-map {
                        font-size: 1.2rem;
                    }

                    #header-navigation ul li .rs-icon.rs-icon-close {
                        color: red;
                    }

                    #header-navigation ul li img {
                        width: 1.4rem;
                        color: #8e8e93;
                    }

                    #header-navigation ul li:last-child {
                        text-align: right;
                    }
                `}</style>
            </div>
        );
    }
}











class UploadImageOrURL extends PureComponent {
    handleUpload = e => {
        const file = e.blobFile;
        const reader = new FileReader();
        
        // Set the image once loaded into file reader
        reader.readAsDataURL(file);

        reader.onload = e => {
            this.props.handleChangeImageState("file", e.target.result);
        }
    }

    handleChange = value => this.props.handleChangeImageState("url", value);

    render() {
        const { imageURL } = this.props;
        return(
            <Fragment>
                <FormGroup>
                    <Uploader
                        listType="picture-text"
                        action=""
                        draggable
                        onUpload={this.handleUpload}
                    >
                        <p>Selecciona una Imágen</p>
                    </Uploader>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Desde URL</ControlLabel>
                    <Input value={imageURL} onChange={this.handleChange} />
                </FormGroup>
            </Fragment>
        )
    }
}
































































/*          INICIO SECTION          */
class EditPresentationalImageForm extends PureComponent {
    state = {
        image: {
            url: this.props.image,
            file: ""
        },
        description: this.props.description,
    }

    handleChangeImageState = (type, data) =>  {
        type === "url" ?
            this.setState({ image: {...this.state.image, url: data } })
        :
            this.setState({ image: {...this.state.image, file: data } })
    }


    handleChange = value => this.setState({ description: value });
    

    handleUpdatePresentationalImage = () => {
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();

        const { image, description } = this.state;

        // Check wich type of image will be upload (from URL or selected file)
        if(image.file) {
            Notification["info"]({
                title: "Espera",
                description: "Subiendo imágen"
            });

            // Upload the selected image to firebase and then get the URL
            const uploadPresentationalImage = storageRef.child('presentationalImage')
                .putString(this.state.image.file, 'data_url');
                    
            uploadPresentationalImage.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                    db.collection('presentationalImage').doc('image').update({
                        description,
                        image: downloadURL
                    })
                    .then(() => {
                        Notification["success"]({
                            title: "¡Perfecto!",
                            description: "Imágen Presentacional actualizada desde archivo."
                        });
                    })
                    .catch(error => {
                        Notification["error"]({
                            title: "Ocurrió un error :(",
                            description: error
                        });
                    });
                })
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        } else {
            db.collection('presentationalImage').doc('image').update({
                description,
                image: image.url
            })
            .then(() => {
                Notification["success"]({
                    title: "¡Perfecto!",
                    description: "Imágen Presentacional actualizada desde URL."
                });
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        }
    }


    render() {
        const { image, description } = this.state;

        return(
            <Form>
                <UploadImageOrURL 
                    handleChangeImageState={this.handleChangeImageState}
                    imageURL={image.url}
                />

                <FormGroup>
                    <ControlLabel>Descripción</ControlLabel>
                    <Input value={description} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Button onClick={this.handleUpdatePresentationalImage} appearance="primary">Guardar</Button>
                </FormGroup>
            </Form>
        )
    }
}




class AddFeaturedImageForm extends PureComponent {
    state = {
        image: {
            url: "",
            file: ""
        },
        description: "",
    }

    baseState = this.state;

    handleChangeImageState = (type, data) =>  {
        type === "url" ?
            this.setState({ image: {...this.state.image, url: data } })
        :
            this.setState({ image: {...this.state.image, file: data } })
    }

    handleChange = value => this.setState({ description: value });
    

    handleAddFeaturedImage = () => {
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();
        const newFeaturedImageRef = db.collection("featuredImages").doc();

        const { image, description } = this.state;

        // Check wich type of image will be upload (from URL or selected file)
        if(image.file) {
            Notification["info"]({
                title: "Espera",
                description: "Subiendo imágen"
            });

            // Upload the selected image to firebase and then get the URL
            const uploadFeaturedImage = storageRef.child(`featuredImages/${newFeaturedImageRef.id}`)
                .putString(this.state.image.file, 'data_url');
                        
            uploadFeaturedImage.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                    newFeaturedImageRef.set({
                        description,
                        image: downloadURL
                    })
                    .then(() => {
                        Notification["success"]({
                            title: "¡Perfecto!",
                            description: "Se agregó Imágen Destacada desde archivo."
                        });

                        // Restart the inputs
                        this.setState(this.baseState);
                    })
                    .catch(error => {
                        Notification["error"]({
                            title: "Ocurrió un error :(",
                            description: error
                        });
                    });
                })
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        } else {
            newFeaturedImageRef.set({
                description,
                image: image.url
            })
            .then(() => {
                Notification["success"]({
                    title: "¡Perfecto!",
                    description: "Se agregó Imágen Destacada desde URL."
                });

                // Restart the inputs
                this.setState(this.baseState);
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        }
    }

    render() {
        const { image, description } = this.state;
        return(
            <Form>
                <UploadImageOrURL 
                    handleChangeImageState={this.handleChangeImageState}
                    imageURL={image.url}
                />

                <FormGroup>
                    <ControlLabel>Descripción</ControlLabel>
                    <Input value={description} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Button onClick={this.handleAddFeaturedImage} appearance="primary">Agregar</Button>
                </FormGroup>
            </Form>
        )
    }
}




const FeaturedImageWithButtons = props => {
    const { toggleDeleteFeaturedImageModal, changeActualFeaturedImageData, id, description } = props;
    const featuredImageData = {
        id,
        description
    };

    const toggleDeleteFeaturedImageModalAndChangeFeaturedImage = () => {
        toggleDeleteFeaturedImageModal();
        changeActualFeaturedImageData(featuredImageData)
    }

    return(
        <div className="featuredImageContainerWithButtons">
            <div className="deleteFeaturedImageButton" onClick={toggleDeleteFeaturedImageModalAndChangeFeaturedImage}>
                <Button color="red"><Icon icon="trash"/></Button>
            </div>

            <FeaturedImage {...props} />

            <style jsx>{`
                .featuredImageContainerWithButtons {
                    display: grid;
                    justify-items: center;
                    grid-gap: 1rem;
                }
            `}</style>
        </div>
    )
}




class InicioSection extends Component {
    state = {
        showEditPresentationalImage: false,

        showAddFeaturedImage: false,
        showDeleteFeaturedImageModal: false,
        actualFeaturedImageData: {}
    }

    toggleEditPresentationalImage = () =>
        this.setState(prevState => ({ showEditPresentationalImage: !prevState.showEditPresentationalImage })); 
        

        
    toggleAddFeaturedImage = () =>
        this.setState(prevState => ({ showAddFeaturedImage: !prevState.showAddFeaturedImage })); 

    toggleDeleteFeaturedImageModal = () => 
        this.setState(prevState => ({ showDeleteFeaturedImageModal: !prevState.showDeleteFeaturedImageModal }));

    changeActualFeaturedImageData = featuredImageData => this.setState({ actualFeaturedImageData: featuredImageData });
    
    deleteFeaturedImage = () => {
        const { id, description } = this.state.actualFeaturedImageData;
        const db = firebase.firestore();

        db.collection('featuredImages').doc(id).delete();
        Notification.success({
            title: 'Imágen Destacada eliminada',
            description: <p>Imágen Destacada con descripción <b>{description}</b> ha sido pulverizada.</p>
        })

        this.setState({ showDeleteFeaturedImageModal: false });
    }

    render() {
        const { showEditPresentationalImage, showAddFeaturedImage, showDeleteFeaturedImageModal, actualFeaturedImageData } = this.state;
        const { image, description } = this.props.presentationalImageData;
        const { featuredImages, featuredImagesKeys } = this.props;

        return(
            <section id="inicio-section">
                <h1 className="sectionHeader">
                    <Icon icon="home" size="2x" /> Inicio
                </h1>
    
                <div id="presentational-image-container">
                    <div id="presentational-image-paper" className="paper">
                        <PresentationalImage />
                    </div>
                    <div id="edit-presentational-image">
                        <Button appearance="primary" onClick={this.toggleEditPresentationalImage}>
                            <Icon icon="edit" /> Editar
                        </Button>

                        {/*                        EDIT PRESENTATIONAL IMAGE                */}
                        <Drawer
                            placement="right"
                            show={showEditPresentationalImage}
                            onHide={this.toggleEditPresentationalImage}
                            style={{ width: "100%" }}
                        >
                            <Drawer.Header>
                                <Drawer.Title>Editar Imágen Presentacional</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <EditPresentationalImageForm 
                                    image={image}
                                    description={description}
                                />
                            </Drawer.Body>
                        </Drawer>
                    </div>
    
                    <h2>Imágen presentacional</h2>
                </div>
    
    
    
                <div id="featured-images-container">
                    <div id="featured-images">
                        <div className="itemsSlider">
                            <div id="add-new-featured-image" className="paper">
                                <div id="add-new-featured-image-button" onClick={this.toggleAddFeaturedImage}>
                                    <Icon icon="plus" />
                                </div>
                            </div>

                            {/*                        ADD FEATURED IMAGE                */}
                            <Drawer
                                placement="right"
                                show={showAddFeaturedImage}
                                onHide={this.toggleAddFeaturedImage}
                                style={{ width: "100%" }}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>Agregar Imágen Destacada</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <AddFeaturedImageForm />
                                </Drawer.Body>
                            </Drawer>

                            {
                                featuredImages.length > 0 
                                ? 
                                    featuredImages.map((featuredImage, index) => 
                                        <FeaturedImageWithButtons
                                            key={featuredImagesKeys[index]}
                                            
                                            toggleDeleteFeaturedImageModal={this.toggleDeleteFeaturedImageModal}
                                            changeActualFeaturedImageData={this.changeActualFeaturedImageData}
                                            id={featuredImagesKeys[index]}
                                            image={featuredImage.image}
                                            description={featuredImage.description}
                                        />
                                    )              
                                :
                                    <Fragment>
                                        <FeaturedImageWithButtons 
                                            toggleDeleteFeaturedImageModal={() => {}}
                                            changeActualFeaturedImageData={() => {}}  
                                        />
                                        <FeaturedImageWithButtons 
                                            toggleDeleteFeaturedImageModal={() => {}}
                                            changeActualFeaturedImageData={() => {}}  
                                        />
                                        <FeaturedImageWithButtons 
                                            toggleDeleteFeaturedImageModal={() => {}}
                                            changeActualFeaturedImageData={() => {}}  
                                        />
                                    </Fragment>
                            }

                            {/*                  DELETE FEATURED IMAGE MODAL                     */}
                            <Modal show={showDeleteFeaturedImageModal} style={{ width: "auto" }}>
                                <Modal.Body>
                                    <div style={{ textAlign: "center", marginBottom: "1rem" }}><Icon
                                        icon="remind"
                                        style={{
                                            color: '#ffb300',
                                            fontSize: "2rem"
                                        }}
                                    /></div>
                                    Estás a punto de eliminar la Imágen Destacada con descripción <b>{actualFeaturedImageData.description}</b> 😢, recuerda que esta acción no se puede deshacer.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.deleteFeaturedImage} color="red" appearance="primary">
                                        Eliminar
                                    </Button>
                                    <Button onClick={this.toggleDeleteFeaturedImageModal} appearance="subtle">
                                        Cancelar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                    <h2>Imágenes destacadas</h2>
                </div>
    
    
    
                <style jsx>{`
                    #inicio-section {
                        padding-top: 4rem;
                        background: var(--yellow);
                    }
    
    
    
                    #presentational-image-container {
                        background: rgba(255, 255, 255, .2);
                        padding: 2rem 3rem;
                        text-align: center;
                    }

                    #presentational-image-container #presentational-image-paper {
                        overflow: hidden;
                    }
    
                    #edit-presentational-image {
                        transform: translateY(-1.6rem);
                    }
    
    
                    
                    #featured-images-container {
                        background: rgba(255, 255, 255, .4);
                        padding: 2rem;
                        text-align: center;
                    }

                    #featured-images {
                        overflow-x: auto;
                        margin: 2rem -2rem;
                    }

                    #featured-images::-webkit-scrollbar {
                        width: 0px;  /* Remove scrollbar space */
                        background: transparent;  /* Optional: just make scrollbar invisible */
                    }

                    #featured-images .itemsSlider {
                        display: inline-flex;
                        text-align: initial;
                    }

                    #featured-images .itemsSlider #add-new-featured-image {
                        padding-left: 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 30rem;
                        width: 20rem;
                        margin-top: auto;
                    }
    
                    #featured-images #add-new-featured-image #add-new-featured-image-button {
                        border: 1.6px dashed;
                        border-radius: 50%;
                        width: 4rem;
                        height: 4rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: .4s;
                    }
    
                    #featured-images #add-new-featured-image #add-new-featured-image-button:hover {
                        background: rgba(0, 0, 0, .4);
                    }

                    #featured-images .itemsSlider >:first-child {
                        margin-left: 1rem;
                    }

                    #featured-images .itemsSlider >:last-child {
                        margin-right: 1rem;
                    }
                `}</style>
            </section>
        )
    }


}




































































/*          RUTAS SECTION          */
class AddRouteForm extends PureComponent {
    state = {
        image: {
            url: "",
            file: ""
        },
        name: "",
        category: ""
    }

    baseState = this.state;

    handleChangeImageState = (type, data) =>  {
        type === "url" ?
            this.setState({ image: {...this.state.image, url: data } })
        :
            this.setState({ image: {...this.state.image, file: data } })
    }

    handleChange = (value, e) => this.setState({ [e.target.name]: value });
    
    handleAddRoute = () => {
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();
        const newRouteRef = db.collection("routes").doc();

        const { image, name, category } = this.state;

        // Check wich type of image will be upload (from URL or selected file)
        if(image.file) {
            Notification["info"]({
                title: "Espera",
                description: "Subiendo imágen"
            });

            // Upload the selected image to firebase and then get the URL
            const uploadRouteImage = storageRef.child(`routesImages/${newRouteRef.id}`)
                .putString(image.file, 'data_url');
                        
            uploadRouteImage.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                    newRouteRef.set({
                        image: downloadURL,
                        name,
                        category
                    })
                    .then(() => {
                        Notification["success"]({
                            title: "¡Perfecto!",
                            description: "Se agregó Ruta desde archivo."
                        });

                        // Restart the inputs
                        this.setState(this.baseState);
                    })
                    .catch(error => {
                        Notification["error"]({
                            title: "Ocurrió un error :(",
                            description: error
                        });
                    });
                })
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        } else {
            newRouteRef.set({
                image: image.url,
                name,
                category
            })
            .then(() => {
                Notification["success"]({
                    title: "¡Perfecto!",
                    description: "Se agregó Ruta desde URL."
                });

                // Restart the inputs
                this.setState(this.baseState);
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        }
    }

    render() {
        const { image, name, category } = this.state;

        return(
            <Form>
                <UploadImageOrURL 
                    handleChangeImageState={this.handleChangeImageState}
                    imageURL={image.url}
                />

                <FormGroup>
                    <ControlLabel>Nombre de Ruta</ControlLabel>
                    <Input name="name" value={name} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Categoría</ControlLabel>
                    <Input name="category" value={category} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <Button onClick={this.handleAddRoute} appearance="primary">Agregar</Button>
                </FormGroup>
            </Form>
        )
    }
}




const RutaComponentWithButtons = props => {
    const { toggleDeleteRouteModal, changeActualRouteData, id, name, category } = props;
    const routeData = {
        id,
        name,
        category
    };

    const toggleDeleteRouteModalAndChangeActualRoute = () => {
        toggleDeleteRouteModal();
        changeActualRouteData(routeData)
    }

    return(
        <div className="routeContainerWithButtons">
            <div className="deleteRouteButton" onClick={toggleDeleteRouteModalAndChangeActualRoute}>
                <Button color="red"><Icon icon="trash"/></Button>
            </div>

            <RutaComponent {...props} />

            <style jsx>{`
                .routeContainerWithButtons {
                    display: grid;
                    justify-items: center;
                    grid-gap: 1rem;
                }
            `}</style>
        </div>
    )
}

class RutasSection extends PureComponent {
    state = {
        showAddRoute: false,
        showDeleteRouteModal: false,
        actualRouteData: {}
    }

    toggleAddRoute = () => 
        this.setState(prevState => ({ showAddRoute: !prevState.showAddRoute }));


    toggleDeleteRouteModal = () => 
        this.setState(prevState => ({ showDeleteRouteModal: !prevState.showDeleteRouteModal }));

    deleteRoute = () => {
        const { id, name } = this.state.actualRouteData;
        const db = firebase.firestore();

        db.collection('routes').doc(id).delete();
        Notification.success({
            title: 'Ruta eliminada',
            description: <p>Ruta <b>{name}</b> ha sido eliminada</p>
        })

        this.setState({ showDeleteRouteModal: false });
    }

    changeActualRouteData = routeData => this.setState({ actualRouteData: routeData });

    render() {
        const { showAddRoute, showDeleteRouteModal, actualRouteData } = this.state;
        const { routes, routesKeys } = this.props;

        return(
            <section id="rutas-section">
            <h1 className="sectionHeader">
                <Icon icon="map" size="2x" /> Rutas
            </h1>


            <div id="routes-container">
                <div className="itemsSlider">
                    <div id="add-new-route" className="paper">
                        <div id="add-new-route-button" onClick={this.toggleAddRoute}>
                            <Icon icon="plus" />
                        </div>
                    </div>

                    {/*                            ADD ROUTE                       */}
                    <Drawer
                        placement="right"
                        show={showAddRoute}
                        onHide={this.toggleAddRoute}
                        style={{ width: "100%" }}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Agregar Ruta</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <AddRouteForm />
                        </Drawer.Body>
                    </Drawer>
                            

                    {
                        routes.length > 0
                        ?
                            routes.map((route, index) =>
                                <RutaComponentWithButtons
                                    key={routesKeys[index]} 
                                            
                                    toggleDeleteRouteModal={this.toggleDeleteRouteModal}
                                    changeActualRouteData={this.changeActualRouteData}
                                    id={routesKeys[index]}
                                    name={route.name}
                                    category={route.category}
                                    image={route.image}
                                />
                            )
                        :
                            <Fragment>
                                <RutaComponentWithButtons
                                    toggleDeleteRouteModal={() => {}}
                                    changeActualRouteData={() => {}}  
                                />
                                <RutaComponentWithButtons
                                    toggleDeleteRouteModal={() => {}}
                                    changeActualRouteData={() => {}}  
                                />
                                <RutaComponentWithButtons
                                    toggleDeleteRouteModal={() => {}}
                                    changeActualRouteData={() => {}}  
                                />
                            </Fragment>
                    }

                    {/*                             DELETE ROUTE MODAL                             */}
                    <Modal show={showDeleteRouteModal} style={{ width: "auto" }}>
                        <Modal.Body>
                            <div style={{ textAlign: "center", marginBottom: "1rem" }}><Icon
                                icon="remind"
                                style={{
                                    color: '#ffb300',
                                    fontSize: "2rem"
                                }}
                            /></div>
                            Estás a punto de eliminar la Ruta <b>{actualRouteData.name}</b> 😢, recuerda que esta acción no se puede deshacer.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.deleteRoute} color="red" appearance="primary">
                                Eliminar
                            </Button>
                            <Button onClick={this.toggleDeleteRouteModal} appearance="subtle">
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>


            <div id="galery-container">
                <h2>Galería</h2>

                <div id="add-new-galery-image" className="paper">
                    <Icon icon="plus" />
                </div>
            </div>


            <style jsx global>{`
                #rutas-section {
                    padding-top: 4rem;
                    background: var(--beach);
                }



                #routes-container {
                    background: rgba(255, 255, 255, .2);
                    overflow-x: auto;
                    padding: 4rem 0;
                }

                #routes-container::-webkit-scrollbar {
                    width: 0px;  /* Remove scrollbar space */
                    background: transparent;  /* Optional: just make scrollbar invisible */
                }

                #routes-container .itemsSlider {
                    display: inline-flex;
                }

                #routes-container .itemsSlider .rutaContainer:hover {
                    transform: initial;
                }

                #routes-container .itemsSlider #add-new-route {
                    padding-left: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 24rem;
                    width: 16rem;
                    margin-top: auto;
                }

                #routes-container .itemsSlider #add-new-route #add-new-route-button {
                    border: 1.6px dashed;
                    border-radius: 50%;
                    width: 4rem;
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: .4s;
                }

                #featured-images .itemsSlider #add-new-route #add-new-route-button:hover {
                    background: rgba(0, 0, 0, .4);
                }

                #routes-container .itemsSlider >:first-child{
                    margin-left: 1rem;
                }

                #routes-container .itemsSlider >:last-child{
                    margin-right: 1rem;
                }




                #galery-container {
                    background: rgba(255, 255, 255, .4);
                    padding: 4rem;
                    text-align: center;
                }

                #add-new-galery-image {
                    padding: 1rem 0;
                    background: #f0f0f0;
                    margin: 1rem 0;
                }

                #add-new-galery-image >:first-child {
                    margin: 0 auto;
                    border: 1.6px dashed;
                    border-radius: 50%;
                    width: 4rem;
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: .4s;
                }

                #add-new-galery-image >:first-child:hover {
                    background: rgba(0, 0, 0, .4);
                }
            
            `}</style>
        </section>
        )
    }
}





































































/*          CONTÁCTAR SECTION          */
class AddAuthorForm extends PureComponent {
    state = {
        image: {
            url: "",
            file: ""
        },
        name: "",
        facebook: "",
        instagram: ""
    }

    baseState = this.state;

    handleChangeImageState = (type, data) =>  {
        type === "url" ?
            this.setState({ image: {...this.state.image, url: data } })
        :
            this.setState({ image: {...this.state.image, file: data } })
    }

    handleChage = (value, e) => this.setState({ [e.target.name]: value });

    handleAddAuthor = () => {
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();
        const newAuthorRef = db.collection("personal").doc();

        const { image, name, facebook, instagram } = this.state;

        // Check wich type of image will be upload (from URL or selected file)
        if(image.file) {
            Notification["info"]({
                title: "Espera",
                description: "Subiendo imágen"
            });

            // Upload the selected image to firebase and then get the URL
            const uploadAuthorImage = storageRef.child(`personalImages/${newAuthorRef.id}`)
                .putString(image.file, 'data_url');
                        
            uploadAuthorImage.then(snapshot => {
                snapshot.ref.getDownloadURL().then(downloadURL => {
                    newAuthorRef.set({
                        photoURL: downloadURL,
                        name,
                        facebook,
                        instagram
                    })
                    .then(() => {
                        Notification["success"]({
                            title: "¡Perfecto!",
                            description: "Se agregó un nuevo Miembro desde archivo."
                        });

                        // Restart the inputs
                        this.setState(this.baseState);
                    })
                    .catch(error => {
                        Notification["error"]({
                            title: "Ocurrió un error :(",
                            description: error
                        });
                    });
                })
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        } else {
            newAuthorRef.set({
                photoURL: image.url,
                name,
                facebook,
                instagram
            })
            .then(() => {
                Notification["success"]({
                    title: "¡Perfecto!",
                    description: "Se agregó nuevo Miembro desde URL."
                });

                // Restart the inputs
                this.setState(this.baseState);
            })
            .catch(error => {
                Notification["error"]({
                    title: "Ocurrió un error :(",
                    description: error
                });
            });
        }
    }

    render() {
        const { image, name, facebook, instagram } = this.state;

        return(
            <Form>
                <UploadImageOrURL 
                    handleChangeImageState={this.handleChangeImageState}
                    imageURL={image.url}
                />

                <FormGroup>
                    <ControlLabel>Nombre</ControlLabel>
                    <Input name="name" value={name} onChange={this.handleChage} />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Facebook</ControlLabel>
                    <Input name="facebook" value={facebook} onChange={this.handleChage} />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Instagram</ControlLabel>
                    <Input name="instagram" value={instagram} onChange={this.handleChage} />
                </FormGroup>

                <FormGroup>
                    <Button onClick={this.handleAddAuthor} appearance="primary">Agregar</Button>
                </FormGroup>
            </Form>
        )
    }
}



const AuthorComponentWithButtons = props => {
    const { toggleDeleteAuthorModal, changeActualAuthorData, id, photo, name, facebook, instagram } = props;
    const authorData = {
        id,
        photo,
        name,
        facebook,
        instagram
    };

    const toggleDeleteAuthorModalAndChangeAuthorData = () => {
        toggleDeleteAuthorModal();
        changeActualAuthorData(authorData)
    }

    return(
        <div className="authorContainerWithButtons">
            <div className="deleteAuthorButton" onClick={toggleDeleteAuthorModalAndChangeAuthorData}>
                <Button color="red"><Icon icon="trash"/></Button>
            </div>

            <AuthorComponent {...props} />

            <style jsx>{`
                .authorContainerWithButtons {
                    display: grid;
                    justify-content: center;
                    grid-gap: 1rem;
                }
            `}</style>
        </div>
    )
}



class ContactarSection extends Component {
    state = {
        showAddAuthor: false,
        showDeleteAuthorModal: false,
        actualAuthorData: {}
    }

    toggleAddAuthor = () => 
        this.setState(prevState => ({ showAddAuthor: !prevState.showAddAuthor }));


    toggleDeleteAuthorModal = () => 
        this.setState(prevState => ({ showDeleteAuthorModal: !prevState.showDeleteAuthorModal }));

    deleteAuthor = () => {
        const { id, name } = this.state.actualAuthorData;
        const db = firebase.firestore();

        db.collection('personal').doc(id).delete();
        Notification.success({
            title: 'Miembro eliminado',
            description: <p><b>{name}</b> ha sido eliminado</p>
        })

        this.setState({ showDeleteAuthorModal: false });
    }

    changeActualAuthorData = authorData => this.setState({ actualAuthorData: authorData });




    


    render() {
        const { showAddAuthor, showDeleteAuthorModal, actualAuthorData } = this.state;
        const { personal, personalKeys } = this.props;

        return(
            <section id="contactar-section">
                <h1 className="sectionHeader">Contáctar</h1>
    
    
                <div id="members-container">
                    <div id="members-slider">
                        <div className="itemsSlider">
                            <div id="add-new-personal" className="paper">
                                <div id="add-new-personal-button" onClick={this.toggleAddAuthor}>
                                    <Icon icon="plus" />
                                </div>
                            </div>

                            {/*                            ADD AUTHOR                       */}
                            <Drawer
                                placement="right"
                                show={showAddAuthor}
                                onHide={this.toggleAddAuthor}
                                style={{ width: "100%" }}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>Agregar Miembro de la empresa</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <AddAuthorForm />
                                </Drawer.Body>
                            </Drawer>
                            

                            {
                                personal.length > 0 
                                ?
                                        
                                    personal.map((personal, index) => 
                                        <AuthorComponentWithButtons
                                            key={personalKeys[index]}

                                            toggleDeleteAuthorModal={this.toggleDeleteAuthorModal}
                                            changeActualAuthorData={this.changeActualAuthorData}

                                            id={personalKeys[index]}
                                            photo={personal.photoURL}
                                            name={personal.name}
                                            facebook={personal.facebook}
                                            instagram={personal.instagram}
                                        />
                                    )              
                                        
                                :
                                    <Fragment>
                                        <AuthorComponentWithButtons 
                                            toggleDeleteAuthorModal={() => {}}
                                            changeActualAuthorData={() => {}}
                                        />
                                       <AuthorComponentWithButtons 
                                            toggleDeleteAuthorModal={() => {}}
                                            changeActualAuthorData={() => {}}
                                        />
                                        <AuthorComponentWithButtons 
                                            toggleDeleteAuthorModal={() => {}}
                                            changeActualAuthorData={() => {}}
                                        />
                                    </Fragment>
                            }

                            {/*                             DELETE AUTHOR MODAL                             */}
                            <Modal show={showDeleteAuthorModal} style={{ width: "auto" }}>
                                <Modal.Body>
                                    <div style={{ textAlign: "center", marginBottom: "1rem" }}><Icon
                                        icon="remind"
                                        style={{
                                            color: '#ffb300',
                                            fontSize: "2rem"
                                        }}
                                    /></div>
                                    Estás a punto de eliminar al Miembro <b>{actualAuthorData.name}</b> 😢, recuerda que esta acción no se puede deshacer.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.deleteAuthor} color="red" appearance="primary">
                                        Eliminar
                                    </Button>
                                    <Button onClick={this.toggleDeleteAuthorModal} appearance="subtle">
                                        Cancelar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
    
                    <h2 id="members-container-title">Miembros de la empresa</h2>
                </div>
    
    
                <style jsx>{`
                    #contactar-section {
                        padding-top: 4rem;
                        background: var(--vive-blue);
                    }
    
    
    
                    #members-container {
                        //background: linear-gradient(rgba(255, 255, 255, .2), #121212);
                        background: rgba(255, 255, 255, .2);
                        padding: 4rem;
                        text-align: center;
                    }

                    #members-slider {
                        margin: auto -4rem;
                        overflow-x: auto;
                        padding: 2rem 0;
                    }
    
                    #members-slider::-webkit-scrollbar {
                        width: 0px;  /* Remove scrollbar space */
                        background: transparent;  /* Optional: just make scrollbar invisible */
                    }
    
                    #members-slider #add-new-personal {
                        padding: 1rem;
                        margin-right: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 34vw;
                        height: 18rem;
                        margin-top: auto;
                    }
    
                    #members-slider #add-new-personal #add-new-personal-button {
                        border: 1.6px dashed;
                        border-radius: 50%;
                        width: 4rem;
                        height: 4rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: .4s;
                    }
    
                    #members-slider #add-new-personal #add-new-personal-button:hover {
                        background: rgba(0, 0, 0, .4);
                    }
    
                    #members-slider .itemsSlider {
                        padding: 0 1rem;
                    }
    
                    #members-slider .itemsSlider >:last-child {
                        padding-right: 1rem;
                    }
                `}</style>
            </section>
        )
    }
}













export default class extends Component {
    static contextType = MainContext;

    handleLogout = () => {
        firebase.auth().signOut()
        .then(() => {
            Notification["success"]({
                title: "¡Perfecto!",
                description: "Acabas de cerrar sesión"
            });
        })
        .catch(error => {
            Notification["error"]({
                title: "Ocurrió un error :(",
                description: error
            });
        })
    }

    render() {
        const { isAdmin, presentationalImageData, featuredImages, featuredImagesKeys, 
            routes, routesKeys, personal, personalKeys } = this.context;

        if(isAdmin === true) {
            return(
                <Fragment>
                    <section id="hero-section">
                        <Header />
                        <IconButton onClick={this.handleLogout} icon={<Icon icon="close" />} placement="left" size="sm">
                            Cerrar sesión
                        </IconButton>
                    </section>
                    <HeaderNavigationComponent />
                    

                    <InicioSection 
                        presentationalImageData={presentationalImageData}
                        featuredImages={featuredImages}
                        featuredImagesKeys={featuredImagesKeys}
                    />

                    <RutasSection 
                        routes={routes}
                        routesKeys={routesKeys}
                    />

                    <ContactarSection 
                        personal={personal}
                        personalKeys={personalKeys}
                    />



                    <style jsx global>{`
                        body {
                            padding-bottom: 0;
                        }



                        #hero-section {
                            background-image: url("/images/contact-background.jpg");
                            background-size: cover;
                            background-position: center;
                            text-align: center;
                            color: white;
                            z-index: 1;
                            position: relative;
                            padding: 2rem 0 30vh 0;
                        }

                        #hero-section:after {
                            content: "";
                            background: linear-gradient(transparent, #121212);
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            z-index: -1;
                        }     
                        
                        

                        .sectionHeader {
                            text-align: center;
                            padding: 4rem 0;
                            box-shadow: 0 0 10px;
                        }
                    `}</style>
                </Fragment>
            )
        } else {
            return <NotLoggedPage />
        } 
    }
}