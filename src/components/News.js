import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // articles = [
  //     {
  //         "source": {
  //             "id": "espn-cric-info",
  //             "name": "ESPN Cric Info"
  //         },
  //         "author": null,
  //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //         "publishedAt": "2020-04-27T11:41:47Z",
  //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "espn-cric-info",
  //             "name": "ESPN Cric Info"
  //         },
  //         "author": null,
  //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //         "publishedAt": "2020-03-30T15:26:05Z",
  //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "independent",
  //             "name": "Independent"
  //         },
  //         "author": "James Moore",
  //         "title": "Boris Johnson is getting justifiably hammered – but will his failings make a dent in public opinion?",
  //         "description": "The sleaze row will die down eventually. Politics will move on. But it won’t be long before something emerges to grab our attention",
  //         "url": "http://www.independent.co.uk/voices/boris-johnson-sleaze-hs2-b1961331.html",
  //         "urlToImage": "https://static.independent.co.uk/2021/11/20/10/1354061297.jpg?width=1200&height=690&auto=webp&quality=75",
  //         "publishedAt": "2021-11-20T12:21:47Z",
  //         "content": "Spend some time in the anti-Tory Twitterverse and youll find something new. There is, for the first time in a terribly long time, a scintilla of optimism in the air, replacing what had been something… [+3247 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "the-next-web",
  //             "name": "The Next Web"
  //         },
  //         "author": "Tristan Greene",
  //         "title": "MIT research shows sad reason why deepfakes pose little threat to US politics",
  //         "description": "MIT researchers working with funding from Google's Jigsaw group recently conducted a pair of studies to determine what, if any, potential impact deepfake AI technology political ads ...",
  //         "url": "http://thenextweb.com/news/mit-research-shows-sad-reason-why-deepfakes-pose-little-threat-us-politics",
  //         "urlToImage": "https://img-cdn.tnwcdn.com/image/neural?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2021%2F11%2Ftrumptwitter.jpg&signature=f34a8dec2ba1b7900d52f3329eef927e",
  //         "publishedAt": "2021-11-19T14:40:44Z",
  //         "content": "MIT researchers working with funding from Googles Jigsaw group recently conducted a pair of studies to determine what, if any, potential impact deepfake AI technology political ads could have on US v… [+3244 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "the-jerusalem-post",
  //             "name": "The Jerusalem Post"
  //         },
  //         "author": null,
  //         "title": "Congresswoman Nita Lowey: I am proud to stand with Israel",
  //         "description": "Gantz: Security of Israel is above politics; PA: This is a crime.",
  //         "url": "https://www.jpost.com/Arab-Israeli-Conflict/Gantz-Security-of-Israel-is-above-politics-Palestinians-This-is-a-crime-607595",
  //         "urlToImage": "https://images.jpost.com/image/upload/f_auto,fl_lossy/t_Article2016_ControlFaceDetect/448812",
  //         "publishedAt": "2019-11-13T04:41:00Z",
  //         "content": "US Ambassador David M. Friedman said the US stands “with our friend and ally Israel at this critical moment” on social media on Tuesday after roughly 170 rockets were fired on Israel from the Gaza St… [+6160 chars]"
  //     }
  // ]

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&${props.apikey}&${props.apikey}${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(80);
    console.log(parsedData);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News`;
    updateNews();
    //eslint-disable-next-line
  }, []);

  // handelPreviClick = async () => {
  //     // console.log("previ");
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&${props.apikey}&${props.apikey}d60b8680fd364a9fb5ae571900162c54&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //     // this.setState({ loading: true });
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json()

  //     // this.setState({
  //     //     page: this.state.page - 1,
  //     //     articles: parsedData.articles,
  //     //     loading: false

  //     // })
  //     // console.log(parsedData);
  //     this.setState({ page: this.state.page - 1 });
  //     this.updateNews();

  // }
  // handelNextClick = async () => {
  //     // console.log("next");
  //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

  //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&${props.apikey}&${props.apikey}d60b8680fd364a9fb5ae571900162c54&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //     //     this.setState({ loading: true });
  //     //     let data = await fetch(url);
  //     //     let parsedData = await data.json()

  //     //     this.setState({
  //     //         page: this.state.page + 1,
  //     //         articles: parsedData.articles,
  //     //         loading: false
  //     //     })
  //     // console.log(parsedData);
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&${props.apikey}&${
      props.apikey
    }d60b8680fd364a9fb5ae571900162c54&page=${page + 1}&pageSize=${
      props.pageSize
    }`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        Daily News - Top {capitalizeFirstLetter(props.category)} HeadLines
      </h2>
      {loading && <Spiner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spiner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    tittle={element.title.slice(0, 40)}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    nwesurl={element.url}
                    author={!element.author ? "Unkown" : element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                  {/* {!author?"Unkown":author} */}
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handelPreviClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-info" onClick={this.handelNextClick}>Next &rarr;</button>
                </div> */}
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
