import { Col, Row } from 'antd';
import'./bookInformationComponent.css';


const BookInformationComponent = ({ book }) => {

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
        </div>

    )
}

export default BookInformationComponent;