import React, { Component } from 'react';
import { dumpLogs } from '../components/Utils';
import styles from './BlogCard.module.css';
//import '../App.css'

class BlogCard extends Component{
    //dumpLogs(props);
    render() {
        return(
            <div className={styles.BlogCard}>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default BlogCard;
