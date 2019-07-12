const React = require('react')
const SearchBar = require('./SearchBar.jsx')
const SearchResult = require('./SearchResult.jsx')

class SearchPage extends React.Component {
	render(){
		return (
			<div className="container">
				    <br/>
					<div className="row justify-content-center">
                        <div className="col-12 col-md-12 col-lg-10">
                           <SearchBar/>
                           {/*TODO : rewrite searching parameter*/}
                           <SearchResult loaded={false} searching={false} data={[]}/>
                        </div>
				    </div>
				</div>
			)
	}
}

module.exports = SearchPage