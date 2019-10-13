const React = require('react');
const ConfirmModal = require('../util/ConfirmModal.jsx');

class QueueUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {swapSendingRequest : false, showSwapConfirm : false, showNotificationModal: false, notificationModalShowMessage: "" };

        this.onSwapAccept = this.onSwapAccept.bind(this);
    }

    onSwapAccept(){
        this.setState({swapSendingRequest: true});
        fetch(`api/swap?queue_name=${this.props.queuename}&target=${this.props.username}`, {method : 'post'})
            .then(response => {
                if (response.status === 200) {
                    this.setState({showSwapConfirm: false});
                    window.location.reload();
                    return;
                } else if (response.status === 202){
                    this.setState({showSwapConfirm : false, showNotificationModal: true, notificationModalShowMessage: "Ваша заявка отправлена!"});

                } else if (response.status === 400){
                    return response.json(); // handling continue
                } else {
                    // TODO: WRITE SOMETHING ELSE ERROR STATUS CATCHING
                    alert('Произошла ошибка. Fetch status : ' + response.status)
                }
                this.setState({swapSendingRequest: false});
            }
            )
            .then(resp => {
                if (resp === undefined) return;

                if (resp["error"] === "self_request"){
                    this.setState({showSwapConfirm : false, showNotificationModal: true, notificationModalShowMessage: "Вы не можете отправлять заявку себе!"});
                } else {
                    this.setState({showSwapConfirm: false});
                }
            })
            .catch(e => alert(e));
    };


    render(){
        return (
            <div className="media text-muted pt-3">
                <span className={"mr-2"}><img src={this.props.imgUrl} className="dropdown-item img-fluid img-thumbnail rounded-circle p-0" style={{width: "40px"}} alt="..." width={"40px"} height={"40px"}/></span>
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <strong className="text-gray-dark">{this.props.fullname}</strong>
                  <div className="dropdown show dropleft">
                    <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-item"><img src={this.props.imgUrl} className="dropdown-item img-fluid img-thumbnail rounded-circle" alt="..." width={"50px"} height={"50px"}/></div>

                        <button className="dropdown-item" onClick={() => this.setState({showSwapConfirm : true})}>Поменяться</button>
                    </div>
                  </div>
                </div>
                <span className="d-block">{this.props.username}</span>
                </div>

                <ConfirmModal
                    sendingrequest={this.state.swapSendingRequest?1:0}
                    show={this.state.showSwapConfirm}
                    onHide={() => this.setState({showSwapConfirm : false})}
                    message={`Вы хотите поменяться местами с пользователем ${this.props.fullname} @ ${this.props.username}`}
                    accept = {() => this.onSwapAccept()} decline={() => this.setState({showSwapConfirm: false})}/>

                <ConfirmModal
                    message={this.state.notificationModalShowMessage}
                    show={this.state.showNotificationModal}
                    accept = {() => this.setState({showNotificationModal: false})} decline={() => this.setState({showNotificationModal: false})}
                />
            </div>
        )
    }
}

module.exports = QueueUser;