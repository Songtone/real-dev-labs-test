import {Button, Col, Row} from 'antd';
import'./bookInformationComponent.css';


const SearchBookInformationComponent = (props) => {
    const {book, saveBook} = props;

    const authors = book.authors.map(({name}) => `${name}`).join('|');
    return (
        <div className="bookInformationComponentStyle">
            <Row>
                <Col span={12} >Title</Col>
                <Col span={12} >{book.title}</Col>
            </Row>
            <Row className="rowStyle">
                <Col span={12}>Author</Col>
                <Col span={12}>{authors}</Col>
            </Row>
            <Row className="rowStyle">
                <Col span={12}>Media Type</Col>
                <Col span={12}>{book.media_type}</Col>
            </Row>
            <Row className="rowButtonStyle">
                <Button onClick={() => saveBook(book)}>Save to shortlist</Button>
            </Row>
        </div>

    )
}

export default SearchBookInformationComponent;