import React from "react";
import "whatwg-fetch";

export default class Pets extends React.Component {
    constructor() {
        super();
        this.state = {}
        fetch(`/api/authenticated`, {
			method: "post",
			credentials: "same-origin"
		})
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			if (!json.isAuthenticated) {
				window.location.href = "/login";
				return;
			}
		});
    }

    onComponentWillMount() {
        fetch('/api/')
        fetch('/api/petTangoUrl', {
            credentials: 'same-origin',
            method: 'GET',
        }).then((data) => {
            return data.json();
        }).then((data) => {

        })
    }

    render() {
        return (
            <div>
                <h1>Pet Tango URL</h1>
                <h3>Do Not Edit Unless PetTango Changes Your URL</h3>
                <input value={this.state.url}/>
            </div>
        );
    }
}