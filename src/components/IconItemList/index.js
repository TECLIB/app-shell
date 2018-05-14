import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import image from './images/image1.jpg;

export default class IconItemList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.type !== 'file' || this.props.image === '' ? this.props.image : '',
    }
  }

  componentDidMount() {
    if (this.props.type === 'file' && this.props.image !== '') {
      this.getImage()
    }
  }

  getImage = async () => {
    try {
      switch (this.props.image) {
        case 'profile.png':
        case 'android.png':
        case 'apple.png':
        case 'Phone.png':
          const image = require(`../../assets/images/${this.props.image}`)
          this.setState({
            image
          })
          break
        default:
          this.getImageProfile()
          break
      }
    } catch (error) {
      const image = require(`../../assets/images/${this.props.image}`)
      this.setState({
        image
      })
    }
  }

  getImageProfile = () => {
    const urlBase = localStorage.getItem('baseURL')
    let url
    if (this.props.isMin) {
      const image = this.props.image.split('.')
      url = `//${urlBase.split('//')[1]}/front/document.send.php?file=_pictures/${image[0]}_min.${image[1]}`
    } else {
      url = `//${urlBase.split('//')[1]}/front/document.send.php?file=_pictures/${this.props.image}`
    }

    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        this.setState({
          image: `data:image/jpeg;base64,${this.arrayBufferToBase64(buffer)}`,
        })
      })
    })
  }

  arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach(b => binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  render() {
    let style = {
      backgroundColor: this.props.backgroundColor,
      width: this.props.size,
      height: this.props.size,
      backgroundSize: 'cover',
      display: 'inline-block',
    }
    let className = ''
    if (this.props.type !== 'base64') {
      className = 'contentPicture'
      style = {
        ...style,
        WebkitBorderRadius: this.props.size,
        MozBorderRadius: this.props.size,
        borderRadius: this.props.size,
      }
    }

    return (
      <div className={className} style={style}>
        <div className={this.props.imgClass} >
          <img alt="" src={this.state.image} style={style} onClick={this.props.imgClick} />
        </div>
      </div>
    )
  }
}

IconItemList.defaultProps = {
  size: 100,
  backgroundColor: '#e6e6e6',
  image: '',
  type: 'file',
  isMin: false,
  imgClick: () => {},
  imgClass: '',
}

IconItemList.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.oneOf(['file', 'base64', 'localFile']),
  isMin: PropTypes.bool,
  imgClick: PropTypes.func,
  imgClass: PropTypes.string,
}
