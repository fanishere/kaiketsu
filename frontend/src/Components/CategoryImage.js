import React, {Component} from 'react';
import health_logo from './media/Final/health-sketch-final.png';
import personal_logo from './media/Final/balloon-sketch-final.png';
import professional_logo from './media/Final/mountain-sketch-final.png';

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