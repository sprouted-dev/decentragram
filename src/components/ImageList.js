import React from 'react';
import Identicon from 'identicon.js';
import {toWei, fromWei} from 'web3-utils'

const ImageList = ({images, tipImageOwner}) => {
    const handleTipOwner = (event) => {
        const tipAmount = toWei('0.1', 'Ether')
        tipImageOwner({ id: event.target.name, tipAmount });
    }
    return (
        <div>
            { images.map((image, key) => {
                return (
                    <div className="card mb-4" key={key}>
                        <div className="card-header">
                            <img
                                className='mr-2'
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                            />
                            <small className="text-muted">{image.author}</small>
                        </div>
                        <ul id="imageList" className="list-group list-group-flush">
                            <li className="list-group-item">
                                <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                                                                style={{maxWidth: '420px'}}/></p>
                                <p>{image.description}</p>
                            </li>
                            <li key={key} className="list-group-item py-2">
                                <small className="float-left mt-1 text-muted">
                                    TIPS: {fromWei(image.tipAmount.toString(), 'Ether')} ETH
                                </small>
                                <button
                                    className="btn btn-link btn-sm float-right pt-0"
                                    name={image.id}
                                    onClick={handleTipOwner}
                                >
                                    TIP 0.1 ETH
                                </button>
                            </li>
                        </ul>
                    </div>
                );
            })
            }
        </div>
    );
}

export default ImageList;