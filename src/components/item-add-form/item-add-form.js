import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {
    state = {
        label: '',
        addElementDisabled: 'disabled'
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
            addElementDisabled: (e.target.value === '') ? 'disabled' : ''
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: '',
            addElementDisabled: 'disabled'
        });
    };
    render() {
        return (
            <form
                className="item-add-form d-flex"
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done"
                    value={this.state.label}
                />
                <button
                    className="btn btn-outline-success"
                    disabled={this.state.addElementDisabled}
                >
                    Add Element
                </button>
            </form>
        )
    };
};