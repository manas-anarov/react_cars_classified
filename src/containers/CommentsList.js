import React, { Component } from "react";
import axios from 'axios';
import { List, Pagination } from 'antd';
import '../css/custom.css';
import '../css/comment.css';

import { commentsListURL, commentsPaginURL } from "../constants";





class CommentsList extends Component {



  constructor(props) {
    super(props);
    this.state = {
      posts:[],
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,
      count:1
    };
  }

  componentDidMount()
  {
    const articleID = this.props.my_id;
    axios.get(commentsListURL(articleID))
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        activePage:response.data.currentPage,
        pageRangeDisplayed:response.data.total_pages,
        count:response.data.count
      });
    });
  }




 handlePageChange = pageNumber => {
 
    axios.get(commentsPaginURL + '?page=' + pageNumber)
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        pageRangeDisplayed:response.data.total_pages,
      });
    });


    this.setState({activePage: pageNumber});
  }
 
  render() {
    return (
      <div>

        <List>
          {
            this.state.posts.map(post=>{
              return(

                <div>
                  <List.Item>
                    <List.Item.Meta
                      title={post.user}
                      description={post.content}
                    />
                  <div class="comment-time">
                    {post.timestamp}
                  </div>


                  </List.Item>
                </div>
              )
            })
          }
      </List>



{(this.state.count && this.state.count > 20) ? 
  (
    <Pagination 
      total={this.state.totalItemsCount}
      pageSize={20}
      current= {this.state.activePage}
      onChange={this.handlePageChange}
    />
  ):
  (this.state.count && this.state.count > 0)? 
  (''):
  ('')
}

      
</div>


    );
  }


}


export default CommentsList;