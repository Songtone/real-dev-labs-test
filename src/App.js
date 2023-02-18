import {useState, useEffect} from "react";
import {Col, Row} from 'antd';
import './App.css';

import {Button} from 'antd';
import SearchBookInformationComponent from "./components/searchBookInformationComponent";
import BookInformationComponent from "./components/bookInformationComponent";

const App = () => {

    const [shortlist, setShortlist] = useState([]);
    const [name, setName] = useState("");
    const [bookList, setBookList] = useState([]);
    const [reservedBookList, setReservedBookList] = useState([]);

    useEffect(() => {
        fetch('https://gutendex.com/books')
            .then((response) => response.json())
            .then((data) => {
                setBookList(data.results);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, []);

    function saveBook(book) {
        const newBookShortlist = shortlist.concat(book);
        setShortlist(newBookShortlist);
        const updatedBookList = bookList.filter((bookListItem) => bookListItem.id !== book.id);
        setBookList(updatedBookList);
    }

    function saveShortlistBooks(shortlistBooks) {
        localStorage.setItem("1234", JSON.stringify(shortlistBooks));
        setShortlist([]);
    }

    function getReservedBooks() {
        setReservedBookList(JSON.parse(localStorage.getItem("1234")));
        console.log(reservedBookList);
    }

    async function searchBooks(param) {
        fetch('https://gutendex.com/books?search=' + param)
            .then((response) => response.json())
            .then((data) => {
                setBookList(data.results);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="container">
            <div>
                <div>
                    <h1>Gutendex Library</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Author's Name or Title"
                    />
                </div>
                <div>
                    <Button style={{marginTop: '10px'}} onClick={() => searchBooks(name)}>Search</Button>
                </div>
            </div>
            <div>
                <Row>
                    <Col span={8}>
                        <h1>Shortlist Books</h1>
                        <div className="bookResults">
                            {shortlist?.map((shortlistBook) => (
                                <BookInformationComponent book={shortlistBook}/>
                            ))}
                        </div>
                        <Button onClick={() => saveShortlistBooks(shortlist)}>Reserve Books</Button>
                    </Col>
                    <Col span={8}>
                        <div className="bookResults">
                            <h1>Search Result</h1>
                            {bookList?.map((book) => (
                                <>
                                    <SearchBookInformationComponent book={book} saveBook={saveBook}/>
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col span={8}>
                        <h1>Reserved Books</h1>
                        <div className="bookResults">
                            {reservedBookList?.map((reservedBookList) => (
                                <BookInformationComponent book={reservedBookList}/>
                            ))}
                        </div>
                        <Button onClick={() => getReservedBooks()}>Reserve Books</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default App;
