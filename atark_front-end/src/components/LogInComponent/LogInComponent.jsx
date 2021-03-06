import React, { Component } from 'react';
import { baseUrl } from '../baseUrl';
import { Button } from 'reactstrap';
import { SetWord } from '../translations/Translate';
import moment from "moment";
class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Mail: "",
            Password: ""
        }

        this.addUser = this.addUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setLanguageUA = this.setLanguageUA.bind(this);
        this.setLanguageEN = this.setLanguageEN.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.importExcel = this.importExcel.bind(this);

    }
    addUser(Mail, UserName/*, Password*/) {
        console.log(Mail);
        console.log(UserName);
    }

    changeMail(event) {
        this.setState({ Mail: event.target.value });
    }

    changePassword(event) {
        this.setState({ Password: event.target.value });
    }


    refresh() {
        this.componentDidMount();
    }
    returnUserId(Mail, Password) {
        const newAccount = {
            Mail: Mail,
            Password: Password,
        }
        fetch(baseUrl + "Organization/GetId", {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    console.log(response);
                    if (response === -1) {
                        alert('такого аккаунта нет');
                    }
                    else {
                        document.cookie = "organizationId=" + response;
                        document.cookie = "role=user";
                        alert('Ok');
                    }
                },
                (error) => {
                    console.log('Post account ', error);
                    alert('Your account could not be posted\nError: ' + error);
                    alert('мейл' + newAccount.Mail +
                        'пароль ' + newAccount.Password);

                }
            )
    }

    handleSubmit = event => {
        if (this.state.Mail === "admin" && this.state.Password === "admin") {
            document.cookie = "organizationId=0";
            document.cookie = "role=admin";
            alert('Ok');
            this.refresh();
        }
        else {
            this.returnUserId(this.state.Mail, this.state.Password);
        }
        event.preventDefault();
    }

    setLanguageUA() {
        document.cookie = "lang=UA";
        alert("UA");
    }
    setLanguageEN() {
        document.cookie = "lang=EN";
        alert("EN");
    }
    exportExcel() {
        fetch(baseUrl + "ExportImport/ExportToExcel", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
        .then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "db" + moment().format("DD-MM-YYYY hh:mm:ss") + ".xlsx";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
            });

    }
    importExcel() {
        fetch(baseUrl + "ExportImport/Import", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    console.log(response);
                    alert('Ok');
                },
                (error) => {
                    console.log(' ', error);
                }
            )
    }
    render() {
        return (
            <div className="container">

                <div style={{ width: "600px", marginLeft: "20%", marginTop: "10%" }}>
                    <h2>Логін</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-group" style={{ width: "600px" }}> {SetWord("Mail")}
                                <input className="form-control" id="Mail" name="Mail" value={this.state.Mail} onChange={this.changeMail} />
                            </label>
                            <label className="form-group" style={{ width: "600px" }}> {SetWord("Password")}
                                <input className="form-control" id="Password" name="Password" value={this.state.Password} onChange={this.changePassword} />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}
                        > {SetWord("LogIn")}
                        </button>
                    </form>

                </div>
                <div style={{ width: "600px", marginLeft: "20%", marginTop: "3%" }}>
                    <h2>{SetWord("Language")}</h2>
                    <Button onClick={this.setLanguageUA} className="btn btn-primary"
                        style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
                        UA
            </Button>
                    <Button onClick={this.setLanguageEN} className="btn btn-primary"
                        style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
                        EN
            </Button>
                </div>
                <div style={{ width: "600px", marginLeft: "20%", marginTop: "3%" }}>
                    <h2>{SetWord("Export")}-{SetWord("Import")}</h2>
                    <Button onClick={this.exportExcel} className="btn btn-primary"
                        style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
                        {SetWord("Export")}
                    </Button>
                    <Button onClick={this.importExcel} className="btn btn-primary"
                        style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
                        {SetWord("Import")}
                    </Button>
                </div>
            </div>
        );
    }
}

export default LogIn;