import React, { useEffect, useState } from "react";

// --------------------------- GUARDIAN -----------------------------------------------------

export default function App() {
  const [queryFromInput, setQueryFromInput] = useState("");

  const [articles, setArticles] = useState([]);

  const [pages, setPages] = useState(1);

  const onChangeFunc = inputvalue => {
    // посылает запрос с инпут валю и рендерит с ответом

    setQueryFromInput(inputvalue);
  };

  const onClickFunc = () => {
    fetch(
      `https://content.guardianapis.com/search?q=${queryFromInput}&api-key=test`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.response.results);
      });
  };

  useEffect(() => {
    onClickFunc();
  }, []);

  const nextPage = () => {
    const newPage = pages + 1;

    setPages(newPage);

    fetch(
      `https://content.guardianapis.com/search?page=${newPage}&q=${queryFromInput}&api-key=test`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.response.results);
      });
  };

  const PreviousPage = () => {
    if (pages === 1) {
      return;
    }
    const newPage = pages - 1;

    setPages(newPage);

    fetch(
      `https://content.guardianapis.com/search?page=${newPage}&q=${queryFromInput}&api-key=test`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.response.results);
      });
  };

  return (
    <div className="app">
      {/* <Modal onCloseClick={hideModal}/> */}
      <Input valueProp={queryFromInput} onChangeProp={onChangeFunc} />
      <Button onClick={onClickFunc} />
      <h2>Recent news</h2>
      {articles.map(article => {
        return (
          <p key={article.id}>
            <a href={article.webUrl} target="_blank">
              {article.webTitle}
            </a>
          </p>
        );
      })}
      <button onClick={PreviousPage}>prev</button>
      <button onClick={nextPage}>next</button>
    </div>
  );
}

//  INPUT

function Input({ valueProp, onChangeProp }) {
  const handleChangeProp = e => {
    onChangeProp(e.target.value);
  };

  return (
    <div className="button-wrap">
      <input value={valueProp} onChange={handleChangeProp}></input>
    </div>
  );
}

//  KNOPKA

function Button({ onClick }) {
  return (
    <div className="modal-dialog">
      <div className="button-wrap">
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
}
