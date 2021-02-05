import React from 'react';
import ShareImageForm from "./ShareImageForm";
import ImageList from "./ImageList";

const Main = ({images, uploadImage, tipImageOwner}) => {

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                    <div className="content mr-auto ml-auto">
                        <p>&nbsp;</p>
                        <h2>Share Image</h2>
                        <ShareImageForm uploadImage={uploadImage}/>
                        <p>&nbsp;</p>
                        <ImageList images={images} tipImageOwner={tipImageOwner}/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main