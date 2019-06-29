class UserCard extends React.Component {
    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_4-512.png" class="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h3 className="card-title">{this.props.username}</h3>
                    <h5 className="text-muted">{this.props.fullname}</h5>
                    <h6>P3112, 1 курс</h6>
                </div>
            </div>
        )
    }
}