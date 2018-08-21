import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import I18n from 'shared/i18n'
import ErrorValidation from 'components/ErrorValidation'

/**
 * Component to create a custom input
 * @class TextFieldForm
 * @extends PureComponent
 */
class TextFieldForm extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      isCorrect: true,
      errors: [],
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isCorrect || nextProps.forceValidation) {
      if (nextProps.parametersToEvaluate) {
        const validation = ErrorValidation.validation(nextProps.parametersToEvaluate, nextProps.value)
        return {
          isCorrect: validation.isCorrect,
          errors: validation.errors,
        }
      }
      return null
    }
    return null
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (value) => {
    this.props.function(this.props.name, value)
  }

  /**
   * Validate if the entered data are valid
   * @function validate
   * @param {object} parametersToEvaluate
   * @param {string} value
   */
  validate = (parametersToEvaluate, value) => {
    if (parametersToEvaluate) {
      const validation = ErrorValidation.validation(parametersToEvaluate, value)

      this.setState({
        isCorrect: validation.isCorrect,
        errors: validation.errors,
      })
    }
  }

  /**
   * Open dialog to handle email delete
   * @function dialogDelete
   */
  dialogDelete = () => {
    this.props.confirmation.showDialog({
      title: `${I18n.t('commons.delete')} ${this.props.label}`,
      message: this.props.value,
      isOk: this.deleteEmail,
    })
  }

  /**
   * Delete an email of the list
   * @function deleteEmail
   */
  deleteEmail = () => {
    this.props.delete(this.props.name)
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let isMultiLine = null

    if (this.props.multiline) {
      isMultiLine = {
        multiline: true,
        rows: this.props.rows,
      }
    }

    const deleteIcon = this.props.delete
      ? (
        <Icon
          iconName="Delete"
          style={{ margin: 10, fontSize: 18 }}
          onClick={this.dialogDelete}
        />
      )
      : undefined
    return (
      <div className="froms__col">
        <TextField
          {...isMultiLine}
          componentRef={(input) => { this.inputRef = input }}
          label={this.props.label}
          type={this.props.type}
          name={`${this.props.type}-${this.props.name}`}
          value={(this.props.value || '')}
          placeholder={this.props.placeholder}
          onChanged={() => this.change(this.inputRef.value.trim())}
          onBlur={() => this.validate(this.props.parametersToEvaluate, this.props.value)}
          disabled={this.props.disabled}
          styles={this.props.styles}
          required={this.props.required}
          errorMessage={this.state.isCorrect ? '' : this.state.errors.join(', ')}
        />
        { deleteIcon }
        <br />
      </div>
    )
  }
}

TextFieldForm.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  required: false,
  multiline: false,
  rows: 1,
  placeholder: null,
  function: () => {},
  disabled: false,
  styles: {},
  delete: null,
  parametersToEvaluate: null,
  forceValidation: false,
  confirmation: { showDialog: () => {} },
}

TextFieldForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  function: PropTypes.func,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  delete: PropTypes.func,
  parametersToEvaluate: PropTypes.object,
  // eslint-disable-next-line
  forceValidation: PropTypes.bool,
  required: PropTypes.bool,
  confirmation: PropTypes.object,
}

export default TextFieldForm
