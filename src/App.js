import React, { Component } from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Post from 'containers/Post'
import BlogCard from 'containers/BlogCard'

import { isArrayEmpty } from 'components/Utils';
//import Panchang from 'components/Panchang'
import Geo from 'components/GeoLocation'
import './App.css'
import 'components/Panchang.css'
//import classes from './containers/BlogCard.module.css'


// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBlogs: true
    };
  }

  blogArr = [
    {
      id: 1,
      title: 'Blog Title 1',
      description: 'blah blah blah'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      description: 'blah blah blah'
    },
    {
      id: 3,
      title: 'Blog Title 3',
      description: 'blah blah blah'
    }
  ]
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((e) => {
      this.setState({ 
        geoLocation: e.coords
      });
    }, async (err) => {
      this.setState({
        geoError: err
      });
    });
  }

  blogCards = isArrayEmpty(this.blogArr) ? [] : this.blogArr.map((item, pos) => {
    //console.log(item);
    return (

      // <Post key={pos} />
      <BlogCard key={pos} title={item.title} description={item.description} id={item.id}/>
    )
  })

  onHideBtnClick = () => {
    let updatesState = !this.state.showBlogs;
    //this.setState({showBlogs:updatesState}) 
    //since setState is ascynchronous, in order to always get the update value...

    this.setState((prevState, prevProps) => {
      return {showBlogs: !prevState.showBlogs}
    });

    //console.log(this.state.showBlogs);
  }

  render(){
    return(
      <Root>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
      
      <div className="Panchang">
        <Geo GEO Data/>
      </div>
    </Root>
    );
  }
}

export default App
