import React, { useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "./css/App.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numPages, setNumPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // Advanced Search
  const [sort, setSort] = useState('votes');
  const [order, setOrder] = useState('desc');
  const [accepted, setAccepted] = useState('accepted');
  const [answers, setAnswers] = useState(0);
  const [title, setTitle] =useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/api/search/?q=${query}&page=${page}&page_size=${pageSize}`)
      .then((response) => {
        setResults(response.data.results);
        setPage(response.data.page);
        setPageSize(response.data.page_size);
        setNumPages(response.data.num_pages);
        setTotalResults(response.data.total_results);
      });
  };

  const handlePageChange = async ({ selected }) => {
    const response = await fetch(`/api/search?q=${query}&page=${selected + 1}&page_size=${pageSize}`);
    const { results } = await response.json();
    setResults(results);
    setPage(selected);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleAcceptedChange = (event) => {
    setAccepted(event.target.value);
  };

  const handleAnswersChange = (event) => {
    setAnswers(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
      
        <input
          type="text"
          placeholder="Search here"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        
        <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
      {/* Advanced Search options */}
      <tbody>
          <tr>
          <td><label htmlFor="sort">Sort by:</label></td>
          <td>
            <select id="sort" value={sort} onChange={handleSortChange}>
              <option value="votes">Votes</option>
              <option value="relevance">Relevance</option>
              <option value="activity">Activity</option>
            </select>
          </td>
          </tr>
          <tr>
            <td><label htmlFor="order">Order:</label></td>
            <td>
              <select id="order" value={order} onChange={handleOrderChange}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="accepted">Accepted:</label></td>
            <td>
            <select id="accepted" value={accepted} onChange={handleAcceptedChange}>
              <option value="true">True</option>
              <option value="false">Fasle</option>
            </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="answers">Answers:</label></td>
            <td>
            <input
              type="number"
              value={answers}
              onChange={handleAnswersChange}
            />
            </td>
          </tr>
          <tr>
          <td><label htmlFor="title">Title:</label></td>
          <td>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          </td>
          </tr>
      </tbody>
      </table>
      <button type="submit">Search</button>
      </form>


      <ul className="list-group mb-4">
        {results.map((result) => (
          // <ul lassName="list-group mb-4">
          // <li className="list-group-item">{result.title}</li>
          // <li className="list-group-item">{result.tags}</li>
          // <li className="list-group-item">{result.is_answered}</li>
          // </ul>
          <div>
            <li className="list-group-item" key={result.question_id}>
              <a href={result.link}>{result.title}</a>
              <div className="container">
              { result.tags.map(tag => (
                <div key={tag} className="badge badge-primary">{tag}</div>
                ))}
                </div>

            </li>
            
          </div>
        ))}
      </ul>
      
      {results.length >0 && (
        <div className="pagination" >
          <ReactPaginate
            previousLabel={"< previous"}
            nextLabel={"next >"}
            breakLabel={"..."}
            pageCount={numPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            initialPage={page-1}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
