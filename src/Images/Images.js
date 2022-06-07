import React from 'react';
import img1 from '../Images/alexandra.jpeg';
import img2 from '../Images/Shanti-Headshot.jpeg';
import img3 from '../Images/Alex-Becker.jpeg';
import img4 from '../Images/alexandra.jpeg';





function Images () {

    return (
        <div>
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt= "" />
            {/* <img src={img4} alt="" /> */}
        </div>
    
    )
}

export default Images;