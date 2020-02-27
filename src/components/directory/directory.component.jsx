import React from 'react';
import {connect} from 'react-redux';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';



const Directory =({sections})=>(
    
    // End Constructor

            <div className='directory-menu'>
                {
                  // title,id,imageUrl,size,linkUrl
                  // title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}
                    sections.map(({id, ...otherSectionProps}) =>(
                        <MenuItem key={id} {...otherSectionProps}/>
                    ))
                }
            </div>
   
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})
export default connect(mapStateToProps) (Directory);