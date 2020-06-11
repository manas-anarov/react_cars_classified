import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { commentCreateURL } from "../constants";
import { authAxios } from "../utils";


const FormItem = Form.Item;
const { TextArea } = Input;



class CommentCreate extends Component {

  state = {
    text: '',
  };


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };


  handleSubmit = (e) => {

    const articleID = this.props.my_id;


    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();

    form_data.append('content', this.state.text);



    let url = commentCreateURL + '?type=itemreact&post_id=' + articleID;
    authAxios.post(url, form_data)
        .then(res => {
           alert("Комментарий сакталды");
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>


        <FormItem label="Комментарий" >
          <TextArea rows={2} name="text" placeholder="Текст" id='text' value={this.state.text} onChange={this.handleChange} />
        </FormItem>


        <Button htmlType="submit" type="primary">
          Отправить
        </Button>

        </form>
      </div>

    );
  }
}

export default CommentCreate;