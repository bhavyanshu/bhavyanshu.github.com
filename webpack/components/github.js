import React, { Component } from 'react';
import axios from 'axios';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      repos: []
    };
  }

  sortByStars(repos) {
    repos.sort(function(a,b) {
      return b.stargazers_count - a.stargazers_count; //Descending order for number of stars based sorting.
    });
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/' + this.props.username + '/repos?per_page=100')
    .then(res => {
      const initrepos = res.data;
      this.sortByStars(initrepos);
      this.setState({
        loading: false,
        repos: initrepos
      });
    });
  }

  render() {

    const styles = {
      emptydivStyle: {
        textAlign: 'center'
      },
      imgStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.8)",
        marginBottom:"20px",
        display:'block'
      },
      repoWrapper: {
        marginBottom: '15px',
        paddingRight: '5px',
        paddingLeft: '5px'
      },
      repo: {
        backgroundColor: '#eee',
        height: '150px',
        paddingTop: '5px',
        paddingLeft: '5px'
      },
      repoDesc: {

      },
      repoMeta: {
        position: 'absolute',
        bottom: '5px'
      },
      repoMetaChild: {
        marginRight: '10px'
      }
    }

    return (
      <div className="row">
        <div>
          {this.state.loading ? (
          <div style={styles.emptydivStyle}>
          <h2>Hold on tight, digging out {this.props.username} repositories</h2>
          <img src="assets/themes/hooligan/images/bgs/453.GIF" style={styles.imgStyle} alt="Loading.." />
          </div>
          ) : (
            <div className="">
            {
              this.state.repos.map((repo, index) => {
                if ((repo.name != (this.props.username.toLowerCase()+'.github.com')) && (repo.fork != true)) {
                  var url = repo.homepage ? repo.homepage : repo.html_url;
                  var lang = repo.language ? repo.language : '';
                  return (
                    <div className="col-md-4" key={index} style={styles.repoWrapper}>
                      <div style={styles.repo}>
                        <h3><a href={url}>{repo.name}</a></h3>
                        <p>{repo.description.split(" ").splice(0,15).join(" ") + '...'}</p>
                        <div style={styles.repoMeta}>
                          <span style={styles.repoMetaChild}>{lang}</span>
                          <span className="fa fa-star"></span> <span style={styles.repoMetaChild}>{repo.watchers}</span>
                          <span className="fa fa-code-fork"></span> <span style={styles.repoMetaChild}>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Github;
