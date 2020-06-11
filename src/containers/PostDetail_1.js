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

// import "../css/fotorama/jquery.min.css";
// import Fotorama from 'fotorama-react-wrapper'
// import ImageGallery from 'react-image-gallery';

// import "../css/image-gallery.css";
// const cimages = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/1000/600/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//      thumbnail: 'https://picsum.photos/id/1015/1000/600/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/1000/600/',
//   },
// ];



class PostDetail extends React.Component {

    state = {
        article: {},
        images:[]
    }

    
    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(postDetailURL(articleID))
            .then(res => {
                this.setState({
                    article: res.data,
                    images:res.data.images
                });
            })

            // let salam = []

            // this.state.images.forEach((c) => {
            //     salam.push({
            //         original: c.image,
            //         original: c.limage
            //     });

            //     console.log("salam")
    // });


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

                    <p>{this.state.article.description}</p>
                    <p>Цена: {this.state.article.price}</p>
                </Card>
                <br/>


                 <Row gutter={24}>

            <Col span={8} xs={24} sm={24} md={12} lg={12} xl={12} className="col-pad-custom">

                <div class="salam">
                { this.state.article.image_has ? (
                    <Carousel width={350}>
                        {
                            
                            this.state.images.map(post=>{

                              return(
                                <div>
                                  <img src= {site_host + post.file}  />
                                </div>
                              )
                            })
                            
                        }

                    </Carousel>
                    ) : ('')
                }
                </div>
            </Col>

        </Row>



        <Row gutter={24}>

            <Col span={8} xs={24} sm={24} md={12} lg={12} xl={12} className="col-pad-custom">



        <div className="fotorama" data-allowfullscreen="native">
            

            <img src="http://127.0.0.1:8000/media/images/photo_2020-06-04_18-57-46.jpg" />
            <img src="http://127.0.0.1:8000/media/images/photo_2020-06-04_18-57-46.jpg" />
            <img src="http://127.0.0.1:8000/media/images/photo_2020-06-04_18-57-46.jpg" />
            




        </div >


        
              
            </Col>

        </Row>






            { this.state.article.image_has ? (
                    
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