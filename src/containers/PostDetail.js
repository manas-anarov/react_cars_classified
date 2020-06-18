import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Card, Row, Col} from 'antd';
import {  Divider } from 'antd';

import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { postDetailURL, site_host } from "../constants";

import ImageGallery from 'react-image-gallery';

import "../css/image-gallery.css";

const gridStyle = {
  width: '100%',
};



class PostDetail extends React.Component {

    state = {
        article: {},
        images:[],
        item_type:0
    }

    
    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(postDetailURL(articleID))
            .then(res => {
                this.setState({
                    article: res.data,
                    images:res.data.images_slider,
                    item_type:res.data.item_type
                });
            })
    }


    render() {

        var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };


        const articleID = this.props.match.params.articleID;

        return (
            <div>
                

                <Card title={this.state.article.title}>
                    <Card.Grid hoverable={false} style={gridStyle}>{this.state.article.description}</Card.Grid>
                    <Card.Grid hoverable={false} style={gridStyle}>
                        Цена: {this.state.article.price}
                    </Card.Grid>


                    { this.state.item_type == 2 ? (
                            <React.Fragment>
                                <Card.Grid hoverable={false} style={gridStyle}>
                                    Марка: {this.state.article.car_type_name}
                                </Card.Grid>
                                <Card.Grid hoverable={false} style={gridStyle}>
                                    Год: {this.state.article.year}
                                </Card.Grid>
                            </React.Fragment>
                        ) : ('')
                    }

                    
                </Card>





        { this.state.article.image_has ? (
            <ImageGallery items={this.state.images} sizes={300}/>
            ) : ('')
        }


            <CommentCreate my_id = {articleID} />
            <Divider/>
            <CommentsList my_id = {articleID} />
            

            </div>

            
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
    };
};

export default connect(mapStateToProps)(PostDetail);