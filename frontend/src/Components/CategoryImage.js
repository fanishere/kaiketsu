import React, {Component} from 'react';
import health_logo from './media/Monday/Health_transparent.png';
import personal_logo from './media/Monday/Personal_transparent.png';
import professional_logo from './media/Monday/Professional_transparent.png';

class CategoryImage extends Component {
    render() {
        return (
            <div className="CategoryImage">
            {this.props.category === 'HEALTH'
                ? <img src={health_logo} alt="health"></img>
                : this.props.category === 'PERSONAL' 
                    ? <div className="personal"><img src={personal_logo} alt="personal"></img>
                        <img src={personal_logo} alt="personal"></img>
                        <img src={personal_logo} alt="personal"></img></div>
                    : <img src={professional_logo} alt="professional"></img>}
            
            </div>
        );
    }
}

export default CategoryImage;