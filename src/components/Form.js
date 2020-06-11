import React from 'react';
import { Form, Input, Button } from 'antd';

import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        const brand = event.target.elements.brand.value;
        const text = event.target.elements.text.value;
        const price = event.target.elements.price.value;

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/v1/add/', {
                    title: title,
                    content: content,
                    text: text,
                    price: price,
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/v1/profile/edit/${articleID}/`, {
                    title: title,
                    content: content,
                    brand: brand,
                    text: text,
                    price: price,
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
        }
    }

    render() {
        return (
        <div>
            <Form onSubmit={(event) => this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.articleID )}>
            <FormItem label="Title" >
                <Input name="title" placeholder="Put a title here" />
            </FormItem>
            <FormItem label="Content" >
                <Input name="content" placeholder="Enter some content ..." />
            </FormItem>
            <FormItem label="Brand" >
                <Input name="brand" placeholder="Enter some content ..." />
            </FormItem>
            <FormItem label="Text" >
                <Input name="text" placeholder="Enter some content ..." />
            </FormItem>
            <FormItem label="Price" >
                <Input name="price"  type='number' placeholder="Enter some content ..." />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
            </FormItem>
            </Form>
        </div>
        );
    }
}

export default CustomForm;