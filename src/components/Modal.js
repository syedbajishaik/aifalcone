import React from "react";
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultime: false,
            token: '',
            restatus: {}
        }
    }
    findFalconeFn = (vehicles, planets) => {
        this.setState({resultime: true});
        fetch("https://findfalcone.herokuapp.com/find", {
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "token": this.state.token,
                "planet_names": [...planets],
                "vehicle_names": [...vehicles]
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.setState({ restatus: json })
            })
    }
    componentDidMount() {
        fetch("https://findfalcone.herokuapp.com/token", {
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json'
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.setState({
                    token: json.token
                })
            })
    }
    render(props) {
        const { selectPair, isModalOpen, closeHandleFn, modalData, resetHandleFn } = this.props;
        return (<>
            <div onClick={() => closeHandleFn()} className={`modal-backdrop fade ${isModalOpen ? 'show' : ''}`}></div>
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header p-0">
                            <h4 className="modal-title m-0 p-0">&nbsp;</h4>
                            {/* <button onClick={() => closeHandleFn()} type="button" className="close" data-dismiss="modal">&times;</button> */}
                        </div>
                        <div className="modal-body px-3 py-2 text-center">
                            {
                                !this.state.resultime ?
                                    modalData.beginmsg ? (<>
                                        <h1 className="text-center m-0 p-3">
                                            Lets do one thing! <br />
                                            Select Vehicle First!!
                                        </h1>
                                    </>) : modalData.cantgomsg ? (<>
                                        <h1 className="text-center m-0 p-3">It cannot reach this Planet</h1>
                                        <h3 className="text-center m-0 p-3">Vehicle's Max Distance is lower than the Planets Distance</h3>
                                    </>) : modalData.condmsg ? selectPair ? (<>
                                        <h1 className="text-center m-0 p-3">
                                            Choose a planet <br /> to search for AI Falcone!
                                        </h1>
                                    </>) : (<>
                                        <h1 className="text-center m-0 p-3">
                                            You can not Target more than one Planet
                                        </h1>
                                    </>) : modalData.warnmsg ? (<>
                                        <h1 className="text-center m-0 p-3">
                                            Enough!!!
                                        </h1>
                                        <h3 className="text-center p-3">A maximum of FOUR planets can be targeted at once.</h3>
                                    </>) : (<>
                                        <div className="col-12 p-0">
                                            <table className="table table-bordered m-0">
                                                <thead>
                                                    <tr>
                                                        <th className="colHead">Selected Vehicles</th>
                                                        <th className="colHead"> - </th>
                                                        <th className="colHead">Selected Planets</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {modalData.vehicleToPlanet.selectedVehiclesArray.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <p className="m-0 p-0 text-center"> {item}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="m-0 p-0 text-center"> to </p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="m-0 p-0 text-center">
                                                                            {
                                                                                modalData.vehicleToPlanet.selectedPlanetsArray[index]
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>) : (<>
                                        <h3 className={this.state.restatus.status === 'false' && 'd-none'}>Searching for AI Falcone...</h3>
                                        <h1 className="col-12 p-0 m-0">{
                                            this.state.restatus.status === 'false' ? 
                                            'There is NO AI Falcone.' :
                                            this.state.restatus.status === 'success' ?
                                            'Success! Found AI Falcone' : 'Searching...'
                                        }</h1>
                                    </>)
                            }
                        </div>
                        <div className="modal-footer px-3 py-2 text-right d-flex flex-wrap justify-content-between">
                            <button onClick={() => resetHandleFn()} type="button" className="btn btn-danger mr-3" data-dismiss="modal">Reset</button>
                            {
                                modalData.vehicleToPlanet.selectedPlanetsArray.length === 4 ? (
                                    <button onClick={() => this.findFalconeFn(modalData.vehicleToPlanet.selectedPlanetsArray, modalData.vehicleToPlanet.selectedVehiclesArray)} type="button" className="btn btn-danger" data-dismiss="modal">Find Falcone!</button>
                                ) : (<>
                                    <button onClick={() => closeHandleFn()} type="button" className="btn btn-danger" data-dismiss="modal">OKAY</button>
                                </>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}
export default Modal;