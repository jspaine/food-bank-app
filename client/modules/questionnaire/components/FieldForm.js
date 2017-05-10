import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submit, isValid, isPristine, hasSubmitSucceeded} from 'redux-form'
import {ListGroup} from 'react-bootstrap'

import {selectors} from '../../../store'
import {
  editField,
  deleteField,
  addField,
  updateField
} from '../reducers/questionnaire-editor'

import FieldEdit from './FieldEdit'
import FieldView from './FieldView'

const FORM_NAME = 'fieldForm'

const mapStateToProps = state => ({
  fieldIds: selectors.getFieldIds(state),
  getField: selectors.getFieldById(state),
  editing: selectors.getEditingField(state),
  section: selectors.getSelectedSection(state),
  submitSucceeded: hasSubmitSucceeded(FORM_NAME)(state),
  isValid: isValid(FORM_NAME)(state),
  isPristine: isPristine(FORM_NAME)(state)
})

const mapDispatchToProps = dispatch => ({
  editField: id => dispatch(editField(id)),
  deleteField: (field, sectionId) => dispatch(deleteField(field, sectionId)),
  addField: (field, sectionId) => dispatch(addField(field, sectionId)),
  updateField: field => dispatch(updateField(field)),
  submit: form => dispatch(submit(form))
})

class FieldForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.submitSucceeded && nextProps.submitSucceeded)
      this.handleEdit()()
  }

  handleEdit = id => () => {
    if (id && this.props.editing) return
    this.props.editField(id)
  }

  handleCancel = () => () => this.props.editField()

  handleAdd = () => this.props.addField({}, this.props.section)

  handleDelete = id => () => {
    this.handleCancel()()
    this.props.deleteField(id, this.props.section)
  }

  handleUpdate = fields => this.props.updateField(fields)

  handleKeyUp = id => ev => {
    if (ev.keyCode === 13)
      this.submit()

    if (ev.keyCode === 27) {
      if (!this.props.isValid && this.props.isPristine)
        this.handleDelete(id)()
      else
        this.handleCancel()()
    }
  }

  submit = () => this.props.submit(FORM_NAME)

  render() {
    const {section, fieldIds, getField, editing} = this.props
    const sectionFields = section && fieldIds(section)

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px 0'
          }}
        >
          <h4>Fields</h4>
          <button
            className="btn btn-success"
            onClick={this.handleAdd}
          >
            Add Field
          </button>
        </div>
        <ListGroup>
          {sectionFields && sectionFields.map((id, idx) =>
            id === editing ?
              <FieldEdit
                form={FORM_NAME}
                key={id}
                onSubmit={this.handleUpdate}
                onEdit={this.handleCancel}
                onDelete={this.handleDelete(id)}
                onKeyUp={this.handleKeyUp(id)}
                initialValues={getField(id)}
              /> :
              <FieldView
                key={id}
                idx={idx}
                field={getField(id)}
                onSelect={this.handleEdit(id)}
              />
          )}
        </ListGroup>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldForm)
